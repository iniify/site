document.addEventListener('DOMContentLoaded', () => {
  const treeContainer = document.getElementById('fileTree');
  const contentContainer = document.getElementById('markdownContent');

  // Dynamické načtení seznamu souborů
  async function fetchFiles(folder) {
    try {
      const response = await fetch(`${folder}`);
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const links = Array.from(doc.querySelectorAll('a')).map(a => a.href);

      return links.filter(link => link.startsWith(folder));
    } catch (err) {
      console.error('Chyba při načítání souborů:', err);
      return [];
    }
  }

  // Vytvoření stromu složek
  async function generateTree(folder, parentElement) {
    const files = await fetchFiles(folder);
    files.forEach(file => {
      const li = document.createElement('li');
      li.textContent = file.split('/').pop();
      li.addEventListener('click', () => loadMarkdown(file));
      parentElement.appendChild(li);
    });
  }

  // Načtení obsahu Markdown souboru
  async function loadMarkdown(filePath) {
    try {
      const response = await fetch(filePath);
      const text = await response.text();
      contentContainer.innerHTML = marked.parse(text);
    } catch (err) {
      contentContainer.textContent = 'Chyba při načítání obsahu.';
    }
  }

  // Inicializace
  generateTree('docs/', treeContainer);
});


