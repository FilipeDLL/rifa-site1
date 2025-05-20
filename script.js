const selectNumero = document.getElementById('numero');
const lista = document.getElementById('lista');

// Preenche o select com números de 1 a 150
for(let i=1; i<=150; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = i;
  selectNumero.appendChild(option);
}

// Função para carregar os dados do localStorage e atualizar a tabela
function carregarDados() {
  const dados = JSON.parse(localStorage.getItem('compradoresRifa')) || {};
  lista.innerHTML = '';

  for (const numero in dados) {
    const { nome, telefone } = dados[numero];
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${numero}</td>
      <td>${nome}</td>
      <td>${telefone}</td>
      <td><button class="btn-excluir" onclick="excluirCompra(${numero})">Excluir</button></td>
    `;

    lista.appendChild(tr);
  }
}

// Função para registrar a compra
function registrarCompra() {
  const numero = selectNumero.value;
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();

  if (!numero) {
    alert('Por favor, selecione um número da rifa.');
    return;
  }
  if (!nome) {
    alert('Por favor, informe o nome do comprador.');
    return;
  }
  if (!telefone) {
    alert('Por favor, informe o telefone de contato.');
    return;
  }

  const dados = JSON.parse(localStorage.getItem('compradoresRifa')) || {};

  if (dados[numero]) {
    alert('Esse número já foi comprado.');
    return;
  }

  dados[numero] = { nome, telefone };
  localStorage.setItem('compradoresRifa', JSON.stringify(dados));

  alert('Compra registrada com sucesso!');
  
  // Limpa os campos
  selectNumero.value = '';
  document.getElementById('nome').value = '';
  document.getElementById('telefone').value = '';

  carregarDados();
}

// Função para excluir um cadastro
function excluirCompra(numero) {
  if (!confirm(`Deseja realmente excluir o número ${numero}?`)) return;

  const dados = JSON.parse(localStorage.getItem('compradoresRifa')) || {};
  delete dados[numero];
  localStorage.setItem('compradoresRifa', JSON.stringify(dados));
  carregarDados();
}

// Carrega os dados ao abrir a página
carregarDados();