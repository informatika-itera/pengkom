import { createHighlighterCore, createCssVariablesTheme } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import python from 'shiki/langs/python.mjs';

// Colors come from CSS variables (--shiki-*) mapped to the generated MD3 tokens in ui/code.css,
// so the same markup is correct in light and dark themes.
const theme = createCssVariablesTheme({ name: 'pkom', variablePrefix: '--shiki-', variableDefaults: {}, fontStyle: true });

const highlighter = await createHighlighterCore({
  themes: [theme],
  langs: [python],
  engine: createJavaScriptRegexEngine(),
});

export type Token = { text: string; color?: string; italic?: boolean };

/** One array of tokens per source line. */
export function tokenize(code: string, lang = 'python'): Token[][] {
  const { tokens } = highlighter.codeToTokens(code.replace(/\n$/, ''), { lang, theme: 'pkom' });
  return tokens.map((line) =>
    line.map((t) => ({ text: t.content, color: t.color, italic: !!((t.fontStyle ?? 0) & 1) })),
  );
}
