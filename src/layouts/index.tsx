import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Slide } from '@revealjs/react';
import { Icon, CodeBlock, CodeRun, Output, Predict, TraceTable, type Snippet, type Mark, type Step } from '../ui';
import { BrushBackground } from '../ui/BrushBackground';
import { useFitText } from '../ui/useFitText';
import { asset } from '../ui/assets';
import './layouts.css';

type Common = { notes?: string; children?: ReactNode };

/** Meeting info for the footer; provided once per deck via <DeckMeta>. */
const MetaCtx = createContext<{ meeting: number; topic: string }>({ meeting: 0, topic: '' });
export const DeckMeta = ({ meeting, topic, children }: { meeting: number; topic: string; children: ReactNode }) => (
  <MetaCtx.Provider value={{ meeting, topic }}>{children}</MetaCtx.Provider>
);

export function Page({ cls = '', notes, footer = true, children }: { cls?: string; footer?: boolean } & Common) {
  const { meeting, topic } = useContext(MetaCtx);
  return (
    <Slide className={`page ${cls}`} notes={notes}>
      <div className="inner">{children}</div>
      {footer && <div className="page-foot"><b>Pertemuan {meeting}</b> · {topic}</div>}
    </Slide>
  );
}

/** Pairs with the title: the one sentence a student should take away from the slide. */
export const Take = ({ children, icon = 'lightbulb' }: { children: ReactNode; icon?: string }) => (
  <div className="take"><Icon name={icon} size={28} fill={1} /><div>{children}</div></div>
);

/** Left column of the cover/closing slide (canvas px, with clearance): brush strokes stay out of it. */
const TEXT_ZONE = [{ x: 0, y: 30, w: 700, h: 540 }, { x: 0, y: 590, w: 420, h: 110 }, { x: 940, y: 0, w: 340, h: 130 }];

const CLOSING_ZONE = [{ x: 0, y: 230, w: 720, h: 300 }, { x: 0, y: 590, w: 460, h: 130 }];

const Logos = () => (
  <span className="logos">
    <img src={asset('logo/logo_itera.png')} alt="ITERA" />
    <img src={asset('logo/logo_kampus_berdampak.png')} alt="DIKTI Saintek Berdampak" />
  </span>
);

export function TitleSlide({ meeting, course, title, lede, tags = [], notes }: {
  meeting: number; course: string; title: string; lede: ReactNode; tags?: { icon: string; label: string }[];
} & Common) {
  const h1 = useFitText<HTMLHeadingElement>(76, 48, title);
  return (
    <Page cls="cover" footer={false} notes={notes}>
      <BrushBackground seed={meeting} avoid={TEXT_ZONE} />
      <div className="num">{String(meeting).padStart(2, '0')}</div>
      <div className="kicker">{course} · Pertemuan {meeting}</div>
      <h1 ref={h1}>{title}</h1>
      <p className="lede">{lede}</p>
      <div className="meta">
        <Logos />
        {tags.map((t) => <span className="chip" key={t.label}><Icon name={t.icon} size={22} fill={1} />{t.label}</span>)}
      </div>
    </Page>
  );
}

/** Learning objectives: measurable verbs (Bloom), each one is checked again in the exit ticket. */
export function ObjectivesSlide({ title, items, notes }: { title: string; items: { verb: string; text: ReactNode }[] } & Common) {
  return (
    <Page notes={notes}>
      <h2>{title}</h2>
      <ol className="objectives">{items.map((it, i) => (
        <li key={i}><span className="n">{i + 1}</span><span><b>{it.verb}</b> {it.text}</span></li>
      ))}</ol>
    </Page>
  );
}

export function ContentSlide({ title, notes, children }: { title: ReactNode } & Common) {
  return <Page notes={notes}><h2>{title}</h2>{children}</Page>;
}

/** Standard code slide (variant A): code + prediction + real output, then the code walked through step by step. */
export function CodeSlide({ title, snippet, steps, predict, take, out, notes }: {
  title: ReactNode; snippet: Snippet; steps?: Step[]; predict?: ReactNode; take?: ReactNode; out?: string;
} & Common) {
  return (
    <Page notes={notes}>
      <h2>{title}</h2>
      <CodeRun snippet={snippet} steps={steps} predict={predict} out={out} />
      {take && <Take>{take}</Take>}
    </Page>
  );
}

/**
 * Trace slide (variant C): one code card and the variable table. Each click is one round: the table gets a row
 * and the band marks the line that produced it (`line`). The real output appears last.
 */
export function TraceSlide({ title, snippet, vars, show, line, take, output = true, notes }: {
  title: ReactNode; snippet: Snippet; vars: string[]; show: number[]; line: number; take?: ReactNode; output?: boolean;
} & Common) {
  const marks: Mark[] = show.map((_, i) => ({ lines: [line], at: i + 1 }));
  return (
    <Page notes={notes}>
      <h2>{title}</h2>
      <div className="trace-layout">
        <div className="left">
          <CodeBlock code={snippet.code} marks={marks} />
          {output && <div className="fragment fade-up" data-fragment-index={show.length + 1}><Output out={snippet.out} figs={snippet.figs} /></div>}
        </div>
        <TraceTable snippet={snippet} vars={vars} show={show} />
      </div>
      {take && <Take>{take}</Take>}
    </Page>
  );
}

export type Side = { label: string; tone: 'pos' | 'neg' | 'neutral'; icon: string; snippet: Snippet; hl?: number[]; out?: string };
/** Two code cards side by side with a labelled verdict (icon + word, never color alone). */
export function CompareCodeSlide({ title, left, right, take, notes }: { title: ReactNode; left: Side; right: Side; take?: ReactNode } & Common) {
  const col = (s: Side) => (
    <div className={`cmp ${s.tone}`}>
      <div className="verdict"><Icon name={s.icon} size={28} fill={1} />{s.label}</div>
      <CodeBlock code={s.snippet.code} marks={s.hl && [{ lines: s.hl, at: 2, persist: true }]} />
      <div className="fragment fade-up" data-fragment-index={1}><Output out={s.out ?? s.snippet.out} figs={s.snippet.figs} /></div>
    </div>
  );
  return (
    <Page notes={notes}>
      <h2>{title}</h2>
      <div className="cmp-grid">{col(left)}{col(right)}</div>
      {take && <Take>{take}</Take>}
    </Page>
  );
}

/** Misconception callout: what students usually think, and what actually happens. */
export const Misconception = ({ children }: { children: ReactNode }) => (
  <div className="misconception"><div className="lbl"><Icon name="error" size={24} fill={1} />Salah kaprah</div><div>{children}</div></div>
);

export type PracticeItem = { n: number; title: string; spec: ReactNode; example: Snippet };
/** Practice tasks: spec plus the expected terminal output (from the instructor solution, never hand-typed). */
export function PracticeSlide({ title, lede, items, notes }: { title: ReactNode; lede?: ReactNode; items: PracticeItem[] } & Common) {
  return (
    <Page notes={notes}>
      <h2>{title}</h2>
      {lede && <p className="lede">{lede}</p>}
      <div className="practice" data-n={items.length}>{items.map((it) => (
        <div className="task" key={it.n}>
          <div className="th"><span className="n">{it.n}</span><h3>{it.title}</h3></div>
          <p>{it.spec}</p>
          <Output out={it.example.out} figs={it.example.figs} label="Contoh hasil" />
        </div>
      ))}</div>
    </Page>
  );
}

export type TicketItem = { objective: number; q: ReactNode; snippet: Snippet; why?: ReactNode };
/**
 * Exit ticket, one question per slide (so only one code card is on screen): code on the left, question on
 * the right, real output on click. Each question maps to a learning objective.
 */
export function TicketSlide({ title, item, notes }: { title: ReactNode; item: TicketItem } & Common) {
  return (
    <Page notes={notes}>
      <h2>{title}</h2>
      <div className="ticket">
        <CodeBlock code={item.snippet.code} />
        <div className="tk">
          <div className="tq"><span className="obj">Tujuan {item.objective}</span><Predict title="Tebak">{item.q}</Predict></div>
          <div className="fragment fade-up" data-fragment-index={1}><Output out={item.snippet.out} figs={item.snippet.figs} /></div>
          {item.why && <div className="fragment fade-up ans" data-fragment-index={2}><Icon name="check_circle" size={28} fill={1} /><span>{item.why}</span></div>}
        </div>
      </div>
    </Page>
  );
}

export function SummarySlide({ title, points, notes }: { title: ReactNode; points: { head: ReactNode; body: ReactNode }[] } & Common) {
  return (
    <Page notes={notes}>
      <h2>{title}</h2>
      <div className="summary">{points.map((p, i) => (
        <div className="s" key={i}><div className="n">{i + 1}</div><div><b>{p.head}</b><br />{p.body}</div></div>
      ))}</div>
    </Page>
  );
}

export function AssignmentSlide({ title, tasks, steps, submit, notes }: {
  title: ReactNode; tasks: { head: string; body: ReactNode }[]; steps: ReactNode[];
  submit: { file: string; deadline: string };
} & Common) {
  return (
    <Page notes={notes}>
      <h2>{title}</h2>
      <div className="assign">
        <div className="tasks">{tasks.map((t, i) => (
          <div className="t" key={i}><div className="n">{i + 1}</div><div><b>{t.head}</b><br />{t.body}</div></div>
        ))}</div>
        <div className="aside">
          <div className="how"><h3><Icon name="checklist" size={28} fill={1} />Cara mengerjakan</h3>
            <ol>{steps.map((s, i) => <li key={i}>{s}</li>)}</ol></div>
          <div className="submit"><Icon name="upload_file" size={28} fill={1} />
            <div><code>{submit.file}</code><br />Unggah ke LMS · <b>{submit.deadline}</b></div></div>
        </div>
      </div>
    </Page>
  );
}

export function NextSlide({ title, lede, snippet, notes, children }: { title: string; lede: ReactNode; snippet?: Snippet } & Common) {
  return (
    <Page notes={notes}>
      <h2>{title}</h2>
      <p className="lede">{lede}</p>
      {snippet ? <CodeRun snippet={snippet} /> : children}
    </Page>
  );
}

/** Input → process → output, for explaining a function (or any transformation) as a machine. */
export function IOFlow({ input, process, output }: { input: ReactNode; process: ReactNode; output: ReactNode }) {
  const box = (cls: string, label: string, icon: string, body: ReactNode) => (
    <div className={`io ${cls}`}><div className="io-lbl"><Icon name={icon} size={26} fill={1} />{label}</div><div className="io-body">{body}</div></div>
  );
  return (
    <div className="io-flow">
      {box('in', 'Masukan', 'login', input)}
      <Icon name="arrow_forward" size={44} />
      {box('proc', 'Proses', 'settings', process)}
      <Icon name="arrow_forward" size={44} />
      {box('out', 'Hasil', 'logout', output)}
    </div>
  );
}

/** A grid of short idea cards (icon, head, one line): for concepts that have no code to show. */
export function CardGrid({ items, cols = 2 }: { items: { icon: string; head: ReactNode; body?: ReactNode; tone?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'error' }[]; cols?: 2 | 3 | 4 }) {
  return (
    <div className="card-grid" data-cols={cols}>{items.map((it, i) => (
      <div className={`idea ${it.tone ?? 'neutral'}`} key={i}>
        <span className="ico"><Icon name={it.icon} size={34} fill={1} /></span>
        <div><b>{it.head}</b>{it.body && <p>{it.body}</p>}</div>
      </div>
    ))}</div>
  );
}

/** Two lists side by side, each with an icon and a label (never color alone): what is allowed and what is not. */
export function DoDont({ good, bad }: { good: { title: string; items: ReactNode[] }; bad: { title: string; items: ReactNode[] } }) {
  const col = (cls: string, icon: string, c: { title: string; items: ReactNode[] }) => (
    <div className={`dd ${cls}`}>
      <div className="dd-head"><Icon name={icon} size={32} fill={1} />{c.title}</div>
      <ul>{c.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
    </div>
  );
  return <div className="dodont">{col('good', 'check_circle', good)}{col('bad', 'cancel', bad)}</div>;
}

/** A variable drawn as a labelled box: the name on the label, the value inside. */
export function VarBoxes({ vars }: { vars: { name: string; value: ReactNode }[] }) {
  return (
    <div className="varboxes">{vars.map((v) => (
      <div className="vb" key={v.name}><div className="vb-val mono">{v.value}</div><div className="vb-name mono">{v.name}</div></div>
    ))}</div>
  );
}

/**
 * Multiple-choice check for ideas that have no code to run (exit tickets for concepts). The answer is revealed
 * on click: the right option turns green with a check icon and the reason appears.
 */
export function ChoiceSlide({ title, objective, q, options, answer, why, notes }: {
  title: ReactNode; objective: number; q: ReactNode; options: ReactNode[]; answer: number; why: ReactNode;
} & Common) {
  return (
    <Page notes={notes}>
      <h2>{title}</h2>
      <div className="choice">
        <div className="tq"><span className="obj">Tujuan {objective}</span><Predict title="Pilih jawaban">{q}</Predict></div>
        <ol className="opts">{options.map((o, i) => (
          <li key={i} className={i === answer ? 'opt right fragment' : 'opt'} data-fragment-index={i === answer ? 1 : undefined}>
            <span className="letter">{String.fromCharCode(65 + i)}</span><span>{o}</span>
            {i === answer && <span className="mark"><Icon name="check_circle" size={32} fill={1} /></span>}
          </li>
        ))}</ol>
        <div className="fragment fade-up ans" data-fragment-index={1}><Icon name="check_circle" size={28} fill={1} /><span>{why}</span></div>
      </div>
    </Page>
  );
}

/** Truth table for `and`, `or` and `not`, computed (not typed) so it cannot disagree with Python. */
export function TruthTable() {
  const tf = (v: boolean) => (v ? 'True' : 'False');
  const rows = [[true, true], [true, false], [false, true], [false, false]];
  return (
    <div className="truth">
      <table className="ref">
        <thead><tr><th>A</th><th>B</th><th>A and B</th><th>A or B</th></tr></thead>
        <tbody>{rows.map(([a, b], i) => (
          <tr key={i}><td>{tf(a)}</td><td>{tf(b)}</td><td>{tf(a && b)}</td><td>{tf(a || b)}</td></tr>
        ))}</tbody>
      </table>
      <table className="ref">
        <thead><tr><th>A</th><th>not A</th></tr></thead>
        <tbody>{[true, false].map((a) => <tr key={String(a)}><td>{tf(a)}</td><td>{tf(!a)}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

/** Countdown for quizzes: Start / Pause / Reset. Shows an unmistakable (icon + text) message when time is up. */
export function QuizTimer({ minutes }: { minutes: number }) {
  const total = minutes * 60;
  const [left, setLeft] = useState(total);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const t = window.setInterval(() => setLeft((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => window.clearInterval(t);
  }, [running]);
  useEffect(() => { if (left === 0) setRunning(false); }, [left]);
  const done = left === 0;
  const mm = String(Math.floor(left / 60)).padStart(2, '0'), ss = String(left % 60).padStart(2, '0');
  return (
    <div className={`timer${done ? ' done' : ''}${left <= 60 && !done ? ' low' : ''}`} role="timer" aria-live="off">
      <div className="digits mono">{mm}:{ss}</div>
      {done && <div className="msg"><Icon name="alarm" size={36} fill={1} />Waktu habis. Kumpulkan jawaban sekarang.</div>}
      <div className="btns">
        <button type="button" onClick={() => setRunning((r) => !r)} disabled={done}>
          <Icon name={running ? 'pause' : 'play_arrow'} size={30} fill={1} />{running ? 'Jeda' : left === total ? 'Mulai' : 'Lanjut'}
        </button>
        <button type="button" className="ghost" onClick={() => { setRunning(false); setLeft(total); }}><Icon name="restart_alt" size={30} />Ulang</button>
      </div>
    </div>
  );
}

/** Numbered how-to steps (for a procedure students perform, e.g. uploading a file to Colab). */
export function StepList({ steps }: { steps: { head: ReactNode; body?: ReactNode }[] }) {
  return (
    <ol className="steplist">{steps.map((st, i) => (
      <li key={i}><span className="n">{i + 1}</span><div><b>{st.head}</b>{st.body && <><br />{st.body}</>}</div></li>
    ))}</ol>
  );
}

/** Reference table (method / meaning), the one place a slide may be mostly text. */
export function RefTable({ head, rows, plain }: { head: [string, string]; rows: [ReactNode, ReactNode][]; plain?: boolean }) {
  return (
    <table className={`ref${plain ? ' plain' : ''}`}>
      <thead><tr><th>{head[0]}</th><th>{head[1]}</th></tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}><td>{r[0]}</td><td>{r[1]}</td></tr>)}</tbody>
    </table>
  );
}

export function ClosingSlide({ title = 'Ada pertanyaan?', lede, next, notes }: { title?: string; lede: ReactNode; next?: string } & Common) {
  const { meeting } = useContext(MetaCtx);
  return (
    <Page cls="cover closing" footer={false} notes={notes}>
      <BrushBackground seed={meeting + 3} avoid={CLOSING_ZONE} />
      <h1>{title}</h1>
      <p className="lede">{lede}</p>
      {next && <div className="next-line"><span className="label">Berikutnya</span><span className="text"><Icon name="arrow_forward" size={32} />{next}</span></div>}
      <Logos />
    </Page>
  );
}
