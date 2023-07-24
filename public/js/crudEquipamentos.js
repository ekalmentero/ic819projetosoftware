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



$(document).ready(function() {
    $('.delete').click(function() {
        var equipamentoId = $(this).data('id');
        $('#delete_id').val(equipamentoId);
    });
});

document.querySelectorAll('#visualizar').forEach(function(button) {
    button.addEventListener('click', function() {
        const idEquipamento = this.getAttribute('data-id');

        document.getElementById('id_equipamento').textContent = 'Carregando';
        document.getElementById('nome_equipamento').textContent = 'Carregando';
        document.getElementById('quantidade_equipamento').textContent = 'Carregando';
        document.getElementById('descricao_equipamento').textContent = 'Carregando';
        document.getElementById('tipo_equipamento').textContent = 'Carregando';


        // Fazer uma requisição AJAX para atualizar os dados do item
        fetch('/equipamentos/visualizar/' + idEquipamento)
            .then((response) => response.json())
            .then((data) => {
                const equipamento = data.equipamento;
                const tipoEquipamento = data.tipoEquipamento;

                document.getElementById('id_equipamento').textContent = equipamento.id;
                document.getElementById('nome_equipamento').textContent = equipamento.nome;
                document.getElementById('quantidade_equipamento').textContent = equipamento.quantidade;
                document.getElementById('descricao_equipamento').textContent = equipamento.descricao;
                document.getElementById('tipo_equipamento').textContent = tipoEquipamento.descricao;

            })
            .catch(function(error) {
                console.log(error);
            });
    });
});

document.querySelectorAll('#editar').forEach(function(button) {
    button.addEventListener('click', function() {
        const idEquipamento = this.getAttribute('data-id');

        document.getElementById('id_edit').value = idEquipamento;
        document.getElementById('nome_edit').value = 'Carregando';
        document.getElementById('quantidade_edit').value = 'Carregando';
        document.getElementById('descricao_edit').value = 'Carregando';
        document.getElementById('tipo_edit').value = 'Carregando';


        // Fazer uma requisição AJAX para atualizar os dados de projeto
        fetch('/equipamentos/visualizar/' + idEquipamento)
            .then((response) => response.json())
            .then((data) => {
                const equipamento = data.equipamento;

                document.getElementById('nome_edit').value = equipamento.nome;
                document.getElementById('quantidade_edit').value = equipamento.quantidade;
                document.getElementById('descricao_edit').value = equipamento.descricao;
                document.getElementById('tipo_edit').value = equipamento.tipoEquipamento;

            })
            .catch(function(error) {
                console.log(error);
            });
    });
});
