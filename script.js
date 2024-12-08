// Načítání stromu souborů
document.addEventListener('DOMContentLoaded', () => {
  const treeContainer = document.getElementById('fileTree');
  const contentContainer = document.getElementById('markdownContent');

  // Stromová struktura (ručně, nebo automatizujte)
  const tree = {
    "slozka1": {
      "soubor1.md": "submodul/slozka1/soubor1.md",
      "soubor2.md": "submodul/slozka1/soubor2.md"
    },
    "slozka2": {
      "soubor3.md": "submodul/slozka2/soubor3.md"
    },
    "soubor4.md": "submodul/soubor4.md"
  };

  // Generování stromu
  function generateTree(tree, parentElement) {
    Object.keys(tree).forEach(key => {
      const li = document.createElement('li');
      if (typeof tree[key] === 'string') {
        li.textContent = key;
        li.addEventListener('click', () => loadMarkdown(tree[key]));
      } else {
        li.textContent = key;
        const ul = document.createElement('ul');
        generateTree(tree[key], ul);
        li.appendChild(ul);
      }
      parentElement.appendChild(li);
    });
  }

  generateTree(tree, treeContainer);

  // Načítání obsahu Markdown souboru
  async function loadMarkdown(filePath) {
    try {
      const response = await fetch(filePath);
      const text = await response.text();
      contentContainer.innerHTML = marked.parse(text); // Použití knihovny "marked" pro převod Markdown na HTML
    } catch (err) {
      contentContainer.textContent = 'Chyba při načítání souboru.';
    }
  }
});
