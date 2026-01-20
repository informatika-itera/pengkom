(() => {
  const map = {
    "✅": "bi-check-circle",
    "⚠️": "bi-exclamation-triangle",
    "⚠": "bi-exclamation-triangle",
    "📝": "bi-pencil-square",
    "💻": "bi-laptop",
    "🎯": "bi-bullseye",
    "🎓": "bi-mortarboard",
    "👋": "bi-hand-thumbs-up",
    "📦": "bi-box-seam",
    "📊": "bi-bar-chart",
    "📈": "bi-graph-up",
    "📚": "bi-book",
    "🧠": "bi-cpu",
    "🔀": "bi-shuffle",
    "⚖️": "bi-scale",
    "⚖": "bi-scale",
    "🔄": "bi-arrow-repeat",
    "📋": "bi-card-checklist",
    "⚙️": "bi-gear",
    "⚙": "bi-gear",
    "💾": "bi-hdd",
    "🧩": "bi-puzzle",
    "🎉": "bi-stars",
    "☁️": "bi-cloud",
    "☁": "bi-cloud",
    "🐍": "bi-code-slash",
    "🔑": "bi-key",
    "🌍": "bi-globe",
    "💡": "bi-lightbulb",
    "🎨": "bi-palette",
    "⚡": "bi-lightning",
    "🔍": "bi-search",
    "✨": "bi-stars",
    "🌡️": "bi-thermometer",
    "🌡": "bi-thermometer",
    "📄": "bi-file-earmark-text"
  };

  const emojiRegex = new RegExp(Object.keys(map).join("|"), "g");
  const skipTags = new Set(["CODE", "PRE", "SCRIPT", "STYLE", "TEXTAREA"]);

  const replaceInTextNode = (node) => {
    const text = node.nodeValue;
    if (!emojiRegex.test(text)) return;

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    text.replace(emojiRegex, (match, offset) => {
      if (offset > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, offset)));
      }
      const icon = document.createElement("i");
      icon.className = `bi ${map[match]} icon-inline`;
      icon.setAttribute("aria-hidden", "true");
      fragment.appendChild(icon);
      lastIndex = offset + match.length;
      return match;
    });

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    node.parentNode.replaceChild(fragment, node);
  };

  const walk = (root) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        const parent = node.parentNode;
        if (!parent || skipTags.has(parent.nodeName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(replaceInTextNode);
  };

  const processEmojis = () => {
    const root = document.querySelector(".slides") || document.body;
    walk(root);
  };

  // If Reveal is loaded, wait for ready event
  if (typeof Reveal !== 'undefined') {
    Reveal.on('ready', processEmojis);
  } else {
    // Fallback: process on DOMContentLoaded
    document.addEventListener("DOMContentLoaded", processEmojis);
  }
})();
