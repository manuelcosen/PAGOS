const accounts = ['Cuenta Corriente Banco Nación', 'Cuenta MercadoPago'];
const companies = ['Fábrica Dina', 'Sucursal Gaona', 'Sucursal Beiró'];
const wrapperA = document.getElementById('accounts-wrapper');
const wrapperC = document.getElementById('companies-wrapper');
const svg = document.getElementById('lines');
const tableBody = document.getElementById('payments-body');
const input = document.getElementById('amount-input');
let dragNode = null;

function render() {
  accounts.forEach((a, i) => {
    const div = document.createElement('div');
    div.className = 'node';
    div.textContent = a;
    div.draggable = true;
    div.id = 'acc-' + i;
    div.ondragstart = e => { dragNode = a; e.dataTransfer.setData('text/plain', a); };
    wrapperA.appendChild(div);
  });
  companies.forEach((c, i) => {
    const div = document.createElement('div');
    div.className = 'node';
    div.textContent = c;
    div.id = 'com-' + i;
    div.ondragover = e => e.preventDefault();
    div.ondrop = e => {
      const amount = parseFloat(input.value);
      if (!amount || amount <= 0) return alert('Ingresá un monto válido');
      drawLine(document.getElementById('acc-' + accounts.indexOf(dragNode)), div);
      const row = document.createElement('tr');
      row.innerHTML = `<td>$${amount}</td><td>${dragNode}</td><td>${c}</td>`;
      tableBody.appendChild(row);
      input.value = '';
    };
    wrapperC.appendChild(div);
  });
}

function drawLine(fromEl, toEl) {
  const r1 = fromEl.getBoundingClientRect();
  const r2 = toEl.getBoundingClientRect();
  const x1 = r1.right - r1.width / 2;
  const y1 = r1.top + r1.height / 2;
  const x2 = r2.left + r2.width / 2;
  const y2 = r2.top + r2.height / 2;
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', x1); line.setAttribute('y1', y1);
  line.setAttribute('x2', x2); line.setAttribute('y2', y2);
  line.setAttribute('stroke', '#00695c'); line.setAttribute('stroke-width', '2');
  svg.appendChild(line);
}

window.onload = render;
