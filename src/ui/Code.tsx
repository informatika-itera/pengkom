import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './Icon';
import { tokenize } from './highlight';
import type { Snippet } from './snippet';
import './code.css';

/**
 * A highlight that belongs to the slide's animation: it appears at fragment `at` (click number on the slide).
 * Without `persist` it disappears at the next click (a moving spotlight); `pin` also leaves a numbered marker.
 */
export type Mark = { lines: number[]; at: number; persist?: boolean; pin?: number };

type CodeProps = {
  /** Source text; use {...snip('p05/jumlah')} to pass file + code together. */
  code: string;
  lang?: string;
  /** Animated highlights. A slide with no animation has no highlight, unless the slide explains those lines. */
  marks?: Mark[];
  /** Allow opening the full-screen, scrollable view (default). */
  expandable?: boolean;
};

const frag = (at: number, kind: string) => ({ className: `fragment ${kind}`, 'data-fragment-index': at });

/** Full-screen scrollable view of a code or output card, closed with Esc, a click on the backdrop, or the close button. */
function Expanded({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    // Reveal listens on document; stopping the event in the capture phase on window keeps arrow keys for scrolling.
    const onKey = (e: KeyboardEvent) => {
      e.stopPropagation();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onClose]);
  return createPortal(
    <div className="expanded" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-bar"><span>{title}</span>
          <button type="button" onClick={onClose} aria-label="Tutup"><Icon name="close" size={28} />Tutup · Esc</button></div>
        <div className="sheet-body">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

/** Python mark: two interlocking rounded blocks in blue and yellow with an eye each (a simplified take on the logo). */
function PythonMark() {
  return (
    <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
      <path fill="#3776ab" d="M16 3H9.5A3.500 3.500 0 0 0 6 6.500V13h13.500A2.500 2.500 0 0 0 22 10.500V6.500A3.500 3.500 0 0 0 18.500 3z" />
      <path fill="#ffc331" d="M16 29h6.500a3.500 3.500 0 0 0 3.500-3.500V19H12.500A2.500 2.500 0 0 0 10 21.500v4A3.500 3.500 0 0 0 13.500 29z" />
      <path fill="#3776ab" d="M6 13v6a3 3 0 0 0 3 3h3v-3.500A2.500 2.500 0 0 1 14.500 16H19v-3z" opacity=".85" />
      <path fill="#ffc331" d="M26 19v-6a3 3 0 0 0-3-3h-3v3.500a2.500 2.500 0 0 1-2.500 2.500H13v3z" opacity=".85" />
      <circle cx="12.500" cy="6.500" r="1.200" fill="#fff" /><circle cx="19.500" cy="25.500" r="1.200" fill="#fff" />
    </svg>
  );
}

function ExpandButton({ onClick, label }: { onClick: () => void; label: string }) {
  return <button type="button" className="expand-btn" onClick={onClick} aria-label={label} title={label}><Icon name="open_in_full" size={22} /></button>;
}

function CodeLines({ code, lang, marks = [] }: { code: string; lang: string; marks?: Mark[] }) {
  const lines = tokenize(code, lang);
  return (
    <code>{lines.map((toks, i) => {
      const n = i + 1;
      const here = marks.filter((m) => m.lines.includes(n));
      return (
        <span key={i} className="ln">
          {here.map((m, k) => <span key={k} aria-hidden="true" {...frag(m.at, m.persist ? 'band' : 'band current-visible')} />)}
          {toks.map((t, j) => <span key={j} style={{ color: t.color, fontStyle: t.italic ? 'italic' : undefined }}>{t.text}</span>)}
          {here.filter((m) => m.pin && n === Math.max(...m.lines)).map((m) => <Pin key={m.pin} n={m.pin!} at={m.at} />)}
          {'\n'}
        </span>
      );
    })}</code>
  );
}

/** Syntax-highlighted code card with file chip, line numbers, animated highlight band and pins. */
export function CodeBlock({ code, lang = 'python', marks = [], expandable = true }: CodeProps) {
  const [open, setOpen] = useState(false);
  return (
    <figure className="code-card">
      <figcaption className="code-bar">
        <span className="chip-lang" role="img" aria-label={lang === 'python' ? 'Python' : lang}>{lang === 'python' ? <PythonMark /> : lang}</span>
        {expandable && <ExpandButton onClick={() => setOpen(true)} label="Lihat kode layar penuh" />}
      </figcaption>
      <pre className="code-src" tabIndex={0}><CodeLines code={code} lang={lang} marks={marks} /></pre>
      {open && <Expanded title="Kode Python" onClose={() => setOpen(false)}>
        <pre className="code-src big"><CodeLines code={code} lang={lang} /></pre>
      </Expanded>}
    </figure>
  );
}

export const Pin = ({ n, at }: { n: number; at?: number }) => (
  <span aria-label={`penanda ${n}`} {...(at ? frag(at, 'pin fade-in') : { className: 'pin' })}>{n}</span>
);

/**
 * Program output in the style of a Colab cell: a plain "Keluaran" card, one real line per output line.
 * Long outputs scroll inside the card; the button opens the whole output full screen.
 */
export function Output({ out, figs = [], label = 'Keluaran' }: { out: string; figs?: string[]; label?: string }) {
  const [open, setOpen] = useState(false);
  const text = out.replace(/\n$/, '') || (figs.length ? '' : '(tidak ada output)');
  const body = (cls: string) => (<>
    {text && <pre className={`out-body${cls}${/Error/.test(text) ? ' wrap' : ''}`} tabIndex={0}><code>{text}</code></pre>}
    {figs.map((f, i) => <img key={i} className={`out-fig${cls}`} src={f} alt={`Grafik ${i + 1}`} />)}
  </>);
  return (
    <figure className="output">
      <figcaption className="out-bar"><Icon name="play_arrow" size={22} fill={1} /><span className="lbl">{label}</span>
        <ExpandButton onClick={() => setOpen(true)} label="Lihat keluaran layar penuh" /></figcaption>
      {body('')}
      {open && <Expanded title={label} onClose={() => setOpen(false)}>{body(' big')}</Expanded>}
    </figure>
  );
}

/** Prediction prompt (PRIMM "Predict"): shown before the output is revealed. */
export function Predict({ children, title = 'Tebak dulu' }: { children: ReactNode; title?: string }) {
  return (
    <div className="predict">
      <div className="lbl"><Icon name="psychology_alt" size={24} fill={1} />{title}</div>
      <div>{children}</div>
    </div>
  );
}

/** Numbered explanation beside a pinned code line; appears at the same click as its highlight. */
export const PinNote = ({ n, at, current, children }: { n: number; at?: number; current?: boolean; children: ReactNode }) => (
  <div {...(at ? frag(at, current ? 'pin-note current-visible' : 'pin-note fade-up') : { className: 'pin-note' })}><Pin n={n} /><div>{children}</div></div>
);

/** One explained step: the lines it highlights and the note shown with them. */
export type Step = { lines: number[]; note: ReactNode };

/**
 * Standard code slide: the code on the left; on the right the prediction prompt, which the real output replaces
 * on click 1. `steps` then walk through the code one click at a time: the band moves, the note and its pin appear.
 */
export function CodeRun({ snippet, steps = [], predict, out }: { snippet: Snippet; steps?: Step[]; predict?: ReactNode; out?: string }) {
  // a figure takes the room the stacked notes would need: show one note at a time (in the same spot), no pins
  const replace = snippet.figs.length > 0;
  const marks: Mark[] = steps.map((s, i) => ({ lines: s.lines, at: i + 2, pin: replace ? undefined : i + 1 }));
  return (
    <div className="code-run">
      <div className="main"><CodeBlock code={snippet.code} marks={marks} /></div>
      <div className="side">
        <div className="slot">
          {predict && <div {...frag(1, 'fade-out')}><Predict>{predict}</Predict></div>}
          <div {...frag(1, 'fade-up')}><Output out={out ?? snippet.out} figs={snippet.figs} /></div>
        </div>
        <div className={replace ? 'slot' : 'notes'}>
          {steps.map((s, i) => <PinNote key={i} n={i + 1} at={i + 2} current={replace}>{s.note}</PinNote>)}
        </div>
      </div>
    </div>
  );
}

/**
 * Trace table, revealed one round per click. Variable values come from a real run (scripts/run-snippets.ts).
 * `show` lists 1-based round numbers; gaps are drawn as ⋮ and appear together with the next row.
 * Each row is fragment `from + index`, so a slide can start the table after other animation.
 */
export function TraceTable({ snippet, vars, show, from = 1, roundLabel = 'Putaran' }: {
  snippet: Snippet; vars: string[]; show: number[]; from?: number; roundLabel?: string;
}) {
  const rows = snippet.trace;
  if (!rows) throw new Error(`Snippet ${snippet.file} has no .trace sidecar`);
  return (
    <table className="trace">
      <thead><tr><th>{roundLabel}</th>{vars.map((v) => <th key={v} className="mono">{v}</th>)}</tr></thead>
      <tbody>{show.flatMap((r, i) => {
        const at = from + i;
        const gap = i > 0 && r - show[i - 1] > 1;
        return [
          gap && <tr key={`g${r}`} aria-hidden="true" {...frag(at, 'gap')}><td colSpan={vars.length + 1}>⋮</td></tr>,
          <tr key={r} {...frag(at, 'round')}><td>{r}</td>{vars.map((v) => <td key={v} className="mono">{rows[r - 1]?.[v] ?? '—'}</td>)}</tr>,
        ];
      })}</tbody>
    </table>
  );
}

/** A list drawn as numbered boxes: positive indices below, negative indices above (optional). */
export function ListDiagram({ items, negative = false, mark = [] }: { items: ReactNode[]; negative?: boolean; mark?: number[] }) {
  return (
    <div className="list-diagram" role="img" aria-label={`list dengan ${items.length} elemen`}>
      {items.map((it, i) => (
        <div key={i} className={`cell${mark.includes(i) ? ' on' : ''}`}>
          {negative && <span className="neg">[{i - items.length}]</span>}
          <span className="val mono">{it}</span>
          <span className="pos">[{i}]</span>
        </div>
      ))}
    </div>
  );
}
