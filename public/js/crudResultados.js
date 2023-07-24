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
    $('#adicionarResultadoBtn').click(function() {
        var projetoId = $('#selectProjetos').val();
        $('#projeto_id').val(projetoId);
    });
});


//atribuir id de projeto ao modal de editar
$(document).ready(function() {
    $('#EditarResultadoBtn').click(function() {
        var projetoId = $('#selectProjetos').val();
        $('#projeto_id_edit').val(projetoId);
    });
});

$(document).ready(function() {
    $('.delete').click(function() {
        var resultadoId = $(this).data('id');
        $('#delete_id').val(resultadoId);
    });
});

document.querySelectorAll('#visualizar').forEach(function(button) {
    button.addEventListener('click', function() {
        const idResultado = this.getAttribute('data-id');

        document.getElementById('id_resultado').textContent = 'Carregando';
        document.getElementById('titulo_resultado').textContent = 'Carregando';
        document.getElementById('data_resultado').textContent = 'Carregando';
        document.getElementById('link_resultado').textContent = 'Carregando';
        document.getElementById('descricao_resultado').textContent = 'Carregando';

        // Fazer uma requisição AJAX para atualizar os dados do item
        fetch('/resultados/visualizar/' + idResultado)
            .then((response) => response.json())
            .then((data) => {
                const resultado = data.resultado;

                document.getElementById('id_resultado').textContent = resultado.id;
                document.getElementById('titulo_resultado').textContent = resultado.titulo;
                document.getElementById('data_resultado').textContent = new Date(resultado.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                document.getElementById('link_resultado').textContent = resultado.link;
                document.getElementById('descricao_resultado').textContent = resultado.descricao;
            })
            .catch(function(error) {
                console.log(error);
            });
    });
});

document.querySelectorAll('#editar').forEach(function(button) {
    button.addEventListener('click', function() {
        const idResultado = this.getAttribute('data-id');

        document.getElementById('id_edit').value = idResultado;
        document.getElementById('titulo_resultado').value = 'Carregando';
        document.getElementById('data_resultado').value = 'Carregando';
        document.getElementById('link_resultado').value = 'Carregando';
        document.getElementById('descricao_resultado').value = 'Carregando';

        // Fazer uma requisição AJAX para atualizar os dados de projeto
        fetch('/resultados/visualizar/' + idResultado)
            .then((response) => response.json())
            .then((data) => {
                const resultado = data.resultado;

                document.getElementById('titulo_edit').value = resultado.titulo;
                document.getElementById('data_edit').value = resultado.data;
                document.getElementById('link_edit').value = resultado.link;
                document.getElementById('descricao_edit').value = resultado.descricao;

            })
            .catch(function(error) {
                console.log(error);
            });
    });
});
