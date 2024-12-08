// Dynamické načtení stromu složek a Markdown souborů
document.addEventListener('DOMContentLoaded', () => {
  const treeContainer = document.getElementById('fileTree');
  const contentContainer = document.getElementById('markdownContent');

  // Dynamické načtení struktury složky
  fetch('docs/')
    .then(response => {
      if (!response.ok) throw new Error('Chyba při načítání složky docs');
      return response.text();
    })
    .then(html => {
      // Načtení obsahu adresáře jako seznam souborů (pouze na serveru)
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const links = Array.from(doc.querySelectorAll('a'))
        .filter(link => !link.href.endsWith('/')) // Filtruj složky
        .map(link => link.href);

      generateTree(links, treeContainer);
    })
    .catch(err => console.error(err));

  // Vygeneruj strom souborů
  function generateTree(files, parentElement) {
    files.forEach(file => {
      const li = document.createElement('li');
      li.textContent = file.split('/').pop(); // Zobraz jen název souboru
      li.addEventListener('click', () => loadMarkdown(file));
      parentElement.appendChild(li);
    });
  }

  // Načtení obsahu Markdown souboru
  async function loadMarkdown(filePath) {
    try {
      const response = await fetch(filePath);
      const text = await response.text();
      contentContainer.innerHTML = marked.parse(text); // Převod Markdown na HTML
    } catch (err) {
      contentContainer.textContent = 'Chyba při načítání obsahu.';
    }
  }
});

