$(document).ready(function() {
    // Ocultar a mensagem de sucesso após 3 segundos
    setTimeout(function() {
        $('.mensagemError').fadeOut('slow');
    }, 7000);
});


$(document).ready(function() {
    $('.delete').click(function() {
        const idProjeto = $(this).data('id');
        $('#delete_id').val(idProjeto);
    });
})

$(document).ready(function() {
    // Ocultar a mensagem de sucesso após 3 segundos
    setTimeout(function() {
        $('#mensagemSucesso').fadeOut('slow');
    }, 3000);
});

document.querySelectorAll('#visualizar').forEach(function(button) {
    button.addEventListener('click', function() {
        const idProj = this.getAttribute('data-id');

        document.getElementById('id_proj').textContent = 'Carregando';
        document.getElementById('titulo').textContent = 'Carregando';
        document.getElementById('data_inicial').textContent = 'Carregando';
        document.getElementById('data_final').textContent =  'Carregando';
        document.getElementById('descricao_vis').textContent = 'Carregando';
        document.getElementById('status').textContent = 'Carregando';
        document.getElementById('participants').textContent = 'Carregando';

        // Fazer uma requisição AJAX para atualizar os dados de projeto
        fetch('/projetos/visualizar/' + idProj)
            .then((response) => response.json())
            .then((data) => {
                const dados = data.projeto;
                const participantes = data.participantes;

                const dataFinalElement = document.getElementById('data_final');
                const dataFinal = dados.data_final;

                if (dataFinal) {
                    dataFinalElement.textContent = new Date(dataFinal).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });
                } else {
                    dataFinalElement.textContent = 'Não definida'; // Define o valor como vazio
                }

                document.getElementById('id_proj').textContent = dados.id;
                document.getElementById('titulo').textContent = dados.titulo;
                document.getElementById('data_inicial').textContent = new Date(dados.data_inicial).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                document.getElementById('descricao_vis').textContent = dados.descricao;

                // Exibir os participantes
                const participantesElement = document.getElementById('participants');
                participantesElement.textContent = '';
                participantes.forEach(function(participante, index) {
                    if (index === participantes.length - 1) {
                        participantesElement.innerText += ` ${participante.name}.`;
                    } else {
                        participantesElement.innerText += ` ${participante.name}, `;
                    }
                });

                document.getElementById('status').textContent = dados.status;
            })
            .catch(function(error) {
                console.log(error);
            });
    });
});

document.querySelectorAll('#editar').forEach(function(button) {
    button.addEventListener('click', function() {
        const idProj = this.getAttribute('data-id');

        document.getElementById('id_edit').value = 'Carregando';
        document.getElementById('titulo_edit').value = 'Carregando';
        document.getElementById('data_inicial_edit').value = 'Carregando';
        document.getElementById('data_final_edit').value = 'Carregando';
        document.getElementById('descricao_edit').value = 'Carregando';
        document.getElementById('status_edit').value = 'Carregando';

        // Fazer uma requisição AJAX para atualizar os dados de projeto
        fetch('/projetos/visualizar/' + idProj)
            .then((response) => response.json())
            .then((data) => {
                const dados = data.projeto;
                const participantes = data.participantes;
                console.log(participantes);
                document.getElementById('id_edit').value = dados.id;
                document.getElementById('titulo_edit').value = dados.titulo;
                document.getElementById('data_inicial_edit').value = dados.data_inicial;
                document.getElementById('data_final_edit').value = dados.data_final;
                document.getElementById('descricao_edit').value = dados.descricao;
                document.getElementById('status_edit').value = dados.status;

                // Marcar as caixas de seleção dos participantes associados ao projeto
                participantes.forEach(function(participante) {
                    const checkbox = document.querySelector(`.participante-checkbox[value="${participante.id}"]`);
                    console.log(participante);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });

            })
            .catch(function(error) {
                console.log(error);
            });
    });
});

$(document).ready(function() {
    // Ativar tooltip
    $('[data-toggle="tooltip"]').tooltip();

    const mobileScreen = window.matchMedia("(max-width: 990px)");

    $(".dashboard-nav-dropdown-toggle").click(function() {
        $(this).closest(".dashboard-nav-dropdown")
            .toggleClass("show")
            .find(".dashboard-nav-dropdown")
            .removeClass("show");
        $(this).parent()
            .siblings()
            .removeClass("show");
    });

    $(".menu-toggle").click(function() {
        if (mobileScreen.matches) {
            $(".dashboard-nav").toggleClass("mobile-show");
        } else {
            $(".dashboard").toggleClass("dashboard-compact");
        }
    });
});


$(document).ready(function() {
    $('.delete').click(function() {
        const idProjeto = $(this).data('id');
        $('#delete_id').val(idProjeto);
    });
})

$(document).ready(function() {
    let expanded = false;
    $('.participantes').click(function() {
        const checkboxes = $(this).siblings(".checkboxes");
        if (!expanded) {
            checkboxes.css("display", "block");
            checkboxes.css("position", "absolute");
            checkboxes.css("z-index", "9999");
            expanded = true;
        } else {
            checkboxes.css("display", "none");
            expanded = false;
        }
    });
});

$(document).ready(function() {
    $('#projectTable').DataTable({
        language: {
            url: 'js/pt-BR.json'
        },
        lengthMenu: [5,10],
        paging: true, // Ativar paginação
        searching: true, // Ativar barra de pesquisa
    });
});

$(document).ready(function() {
    $('#projectTable2').DataTable({
        language: {
            url: 'js/pt-BR.json'
        },
        lengthMenu: [5,10],
        paging: true, // Ativar paginação
        searching: true, // Ativar barra de pesquisa
    });
});
