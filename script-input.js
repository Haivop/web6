let accordions = {};

function upload(){
  fetch('save.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(accordions)
  })
  .then(response => response.text())
  .then(data => alert(data))
  .catch(error => console.error('Помилка:', error));
};

document.getElementById('add').addEventListener('click', (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  document.getElementById('title').value = '';
  document.getElementById('content').value = '';

  accordions[title] = content;

  load(title, accordions[title]);
  upload();
});

function load(title, content){
  const container = document.getElementById('accordionDisplay');
  const item = document.createElement('div');
  item.className = 'accordion-item';
  item.style.backgroundColor = 'wheat';
  item.style.margin = '30px';

  const header = document.createElement('h3');
  header.textContent = title;
  header.className = 'accordion-header';
  header.style.marginBottom = '0px';
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  });

  const contents = document.createElement('p');
  contents.textContent = content;
  contents.className = 'accordion-content';
  contents.style.display = 'block';
  contents.style.marginTop = '0px';

  const button = document.createElement('button');
  button.textContent = "Видалити"
  button.addEventListener('click', () => {
    container.removeChild(item);
    delete accordions[title];
    upload();
  });

  item.appendChild(header);
  item.appendChild(contents);
  item.appendChild(button);
  container.appendChild(item);
}

async function displayAccordion() {
  const response = await fetch('accordion.json');

  if (response.ok) {
    const data = await response.json();
    accordions = data;
    const container = document.getElementById('accordionDisplay');
    container.innerHTML = '';

    Object.keys(data).forEach(key => {
        load(key, data[key]);
      }
    );
  } else {
    console.error('Помилка завантаження даних');
  }
}

displayAccordion();
