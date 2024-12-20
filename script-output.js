async function loadAccordion() {
  const response = await fetch('accordion.json');

  if (response.ok) {
    const data = await response.json();
    const container = document.getElementById('accordionDisplay');
    container.innerHTML = '';

    Object.keys(data).forEach(key => {
        const item = document.createElement('div');
        item.className = 'accordion-item';
        item.style.backgroundColor = 'wheat';
        item.style.margin = '30px';

        const header = document.createElement('h3');
        header.textContent = key;
        header.className = 'accordion-header';
        header.style.marginBottom = '0px';
        header.addEventListener('click', () => {
          const content = header.nextElementSibling;
          content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });

        const content = document.createElement('p');
        content.textContent = data[key];
        content.className = 'accordion-content';
        content.style.display = 'block';
        content.style.marginTop = '0px';

        item.appendChild(header);
        item.appendChild(content);
        container.appendChild(item);
      }
    );
  } else {
    console.error('Помилка завантаження даних');
  }
}

loadAccordion();
setInterval(loadAccordion(), 5000);