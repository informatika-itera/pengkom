"""Run one Python snippet the way a student would in a terminal.

Usage: python3 run_snippet.py <file.py> [<file.in>] [--trace "<line>: v1 v2"]
Prints the terminal transcript (typed input is echoed after each prompt) to stdout.
With --trace, also writes <file>.trace.json: the variables' values after each execution of <line>.
"""
import builtins, io, json, os, runpy, sys, contextlib

path = sys.argv[1]
args = sys.argv[2:]
stdin_path = next((a for a in args if a.endswith('.in')), None)
trace_spec = args[args.index('--trace') + 1] if '--trace' in args else None

typed = open(stdin_path, encoding='utf-8').read().splitlines() if stdin_path else []
_input = builtins.input

def fake_input(prompt=''):
    if not typed:
        raise EOFError('snippet asked for more input than its .in fixture provides')
    value = typed.pop(0)
    print(f'{prompt}{value}')
    return value

builtins.input = fake_input

# Snippets that draw with matplotlib/seaborn: plt.show() saves each figure as <name>.fig-N.svg next to the snippet
# (the slide shows it in the output card, like a Colab cell would).
figs = 0
if any(k in open(path, encoding='utf-8').read() for k in ('matplotlib', 'seaborn')):
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    matplotlib.rcParams.update({'figure.figsize': (6.4, 3.2), 'font.size': 12, 'savefig.bbox': 'tight', 'svg.hashsalt': 'pkom'})
    base = os.path.splitext(os.path.abspath(path))[0]

    def show(*a, **k):
        global figs
        for num in plt.get_fignums():
            figs += 1
            plt.figure(num).savefig(f'{base}.fig-{figs}.svg', format='svg', metadata={'Date': None})
        plt.close('all')
    plt.show = show

rows, last = [], None
if trace_spec:
    line_s, names_s = trace_spec.split(':')
    target, names = int(line_s), names_s.split()
    abspath = os.path.abspath(path)

    def snap(frame):
        rows.append({n: repr(frame.f_locals[n]) for n in names if n in frame.f_locals})

    def tracer(frame, event, arg):
        global last
        if frame.f_code.co_filename != abspath:
            return None
        if event == 'line':
            if last == target:
                snap(frame)
            last = frame.f_lineno
        elif event == 'return' and last == target:
            snap(frame)
        return tracer
    sys.settrace(tracer)

try:
    runpy.run_path(path, run_name='__main__')
finally:
    sys.settrace(None)
    builtins.input = _input
    if trace_spec:
        with open(os.path.splitext(path)[0] + '.trace.json', 'w', encoding='utf-8') as f:
            json.dump(rows, f, ensure_ascii=False)
