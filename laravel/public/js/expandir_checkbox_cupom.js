const mostrarProdutos1Button = document.getElementById('mostrarProdutos1');
const listaProdutos1 = document.getElementById('listaProdutos1');

const mostrarProdutos2Button = document.getElementById('mostrarProdutos2');
const listaProdutos2 = document.getElementById('listaProdutos2');

// Evite que o evento de clique no botão afete o comportamento do acordeão
mostrarProdutos1Button.addEventListener('click', function(event) {
    event.stopPropagation();
    listaProdutos1.style.display = listaProdutos1.style.display === 'none' ? 'block' : 'none';
});

// Evite que o evento de clique no botão afete o comportamento do acordeão
mostrarProdutos2Button.addEventListener('click', function(event) {
    event.stopPropagation();
    listaProdutos2.style.display = listaProdutos2.style.display === 'none' ? 'block' : 'none';
});