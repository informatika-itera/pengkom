// Runs every src/code/**/*.py and stores its real terminal output next to it (<name>.out.txt).
//   bun scripts/run-snippets.ts           regenerate outputs
//   bun scripts/run-snippets.ts --check   fail if a stored output differs from a fresh run (used by `build`)
// Sidecar files: <name>.in (stdin fixture), <name>.norun (never executed, e.g. infinite loops),
// <name>.trace ("<line>: var1 var2" → <name>.trace.json with the variables after each run of that line).
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { rmSync } from 'node:fs';

const root = resolve(import.meta.dirname, '../src/code');
const helper = resolve(import.meta.dirname, 'run_snippet.py');
const check = process.argv.includes('--check');
// Python with pandas/matplotlib/seaborn (scripts/requirements.txt): the project venv if present, else the system one
const venv = resolve(import.meta.dirname, '../.venv/bin/python3');
const python = existsSync(venv) ? venv : 'python3';
// Snippets run in public/data so that pd.read_csv('mahasiswa.csv') behaves exactly as in the students' notebook
const cwd = resolve(import.meta.dirname, '../public/data');

const walk = (d: string): string[] =>
  readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));

let bad = 0, count = 0;
for (const py of walk(root).filter((f) => f.endsWith('.py'))) {
  const base = py.slice(0, -3);
  if (existsSync(`${base}.norun`)) continue;
  const args = [helper, py];
  if (existsSync(`${base}.in`)) args.push(`${base}.in`);
  if (existsSync(`${base}.trace`)) args.push('--trace', readFileSync(`${base}.trace`, 'utf8').trim());
  if (!check) for (const f of readdirSync(join(py, '..')).filter((f) => f.startsWith(`${base.split('/').pop()}.fig-`))) rmSync(join(py, '..', f));
  const r = spawnSync(python, args, { cwd, encoding: 'utf8', timeout: 60_000, env: { ...process.env, MPLBACKEND: 'Agg', PYTHONIOENCODING: 'utf-8' } });
  count++;
  if (r.status !== 0) { console.error(`FAIL ${py}\n${r.stderr}`); bad++; continue; }
  const out = `${base}.out.txt`;
  if (check) {
    if (!existsSync(out) || readFileSync(out, 'utf8') !== r.stdout) { console.error(`STALE ${out} — run: bun run gen:outputs`); bad++; }
  } else writeFileSync(out, r.stdout);
}
console.log(`${check ? 'checked' : 'generated'} ${count} snippet outputs${bad ? `, ${bad} problem(s)` : ''}`);
if (bad) process.exit(1);
