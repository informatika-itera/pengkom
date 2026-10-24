import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { DeckShell } from '../deck-shell/DeckShell';

// every src/decks/pertemuan-NN.tsx is a deck, keyed by its meeting number
const files = import.meta.glob('../decks/pertemuan-*.tsx');
const decks: Record<string, ReturnType<typeof lazy>> = Object.fromEntries(
  Object.entries(files).map(([path, load]) => [String(Number(/pertemuan-(\d+)/.exec(path)![1])), lazy(load as () => Promise<{ default: React.ComponentType }>)]),
);

const id = document.documentElement.dataset.deck ?? '';
const Content = decks[id];

createRoot(document.getElementById('root')!).render(
  Content ? (
    <Suspense fallback={null}>
      <DeckShell><Content /></DeckShell>
    </Suspense>
  ) : <p>Deck tidak ditemukan: {id}</p>,
);
