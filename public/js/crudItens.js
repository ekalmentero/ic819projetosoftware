$(document).ready(function() {
    $('#projectTable').DataTable({
        language: {
            url: '/js/pt-BR.json'
        },
        lengthMenu: [5,10],
        paging: true, // Ativar paginação
        searching: true, // Ativar barra de pesquisa
    });
});

$(document).ready(function() {
    // Ocultar a mensagem de sucesso após 3 segundos
    setTimeout(function() {
        $('#mensagemSucesso').fadeOut('slow');
    }, 3000);
});

$(document).ready(function() {
    // Ocultar a mensagem de sucesso após 3 segundos
    setTimeout(function() {
        $('.mensagemError').fadeOut('slow');
    }, 7000);
});

//atribuir id de projeto ao modal de adicionar
$(document).ready(function() {
    $('#adicionarItemBtn').click(function() {
        var projetoId = $('#selectProjetos').val();
        $('#projeto_id').val(projetoId);
    });
});


//atribuir id de projeto ao modal de editar
$(document).ready(function() {
    $('#EditarItemBtn').click(function() {
        var projetoId = $('#selectProjetos').val();
        $('#projeto_id_edit').val(projetoId);
    });
});

$(document).ready(function() {
    $('.delete').click(function() {
        var itemId = $(this).data('id');
        $('#delete_id').val(itemId);
    });
});

document.querySelectorAll('#visualizar').forEach(function(button) {
    button.addEventListener('click', function() {
        const idItem = this.getAttribute('data-id');

        document.getElementById('id_item').textContent = 'Carregando';
        document.getElementById('nome_item').textContent = 'Carregando';
        document.getElementById('quantidade_item').textContent = 'Carregando';
        document.getElementById('descricao_item').textContent = 'Carregando';

        // Fazer uma requisição AJAX para atualizar os dados do item
        fetch('/itens/visualizar/' + idItem)
            .then((response) => response.json())
            .then((data) => {
                const item = data.item;

                document.getElementById('id_item').textContent = item.id;
                document.getElementById('nome_item').textContent = item.nome;
                document.getElementById('quantidade_item').textContent = item.quantidade;
                document.getElementById('descricao_item').textContent = item.descricao;
            })
            .catch(function(error) {
                console.log(error);
            });
    });
});

document.querySelectorAll('#editar').forEach(function(button) {
    button.addEventListener('click', function() {
        const idItem = this.getAttribute('data-id');

        document.getElementById('id_edit').value = idItem;
        document.getElementById('nome_edit').value = 'Carregando';
        document.getElementById('quantidade_edit').value = 'Carregando';
        document.getElementById('descricao_edit').value = 'Carregando';

        // Fazer uma requisição AJAX para atualizar os dados de projeto
        fetch('/itens/visualizar/' + idItem)
            .then((response) => response.json())
            .then((data) => {
                const item = data.item;

                document.getElementById('nome_edit').value = item.nome;
                document.getElementById('quantidade_edit').value = item.quantidade;
                document.getElementById('descricao_edit').value = item.descricao;

            })
            .catch(function(error) {
                console.log(error);
            });
    });
});
