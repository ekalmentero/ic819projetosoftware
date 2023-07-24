(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms2 = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms2).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

$(document).ready(function() {
    $('.agendar-link').click(function(event) {
        event.preventDefault(); // Evita o comportamento padrão do link

        var calendario = $('.linha-calender');
        $('html, body').animate({
            scrollTop: calendario.offset().top
        });
    });
});

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
        $('.mensagemSucesso').fadeOut('slow');
    }, 5000);
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
    $('#projectTable2').DataTable({
        language: {
            url: 'js/pt-BR.json'
        },
        lengthMenu: [5,10],
        paging: true, // Ativar paginação
        searching: true, // Ativar barra de pesquisa
    });
});

document.getElementById('visualizar_agenda').addEventListener('click', function() {
        // Fazer uma requisição AJAX para obter os agendamentos
        fetch('/meusAgendamentos')
            .then(response => response.json())
            .then(data => {
                // Limpar a tabela de agendamentos
                document.getElementById('agendamentosBody').innerHTML = '';

                // Preencher os agendamentos na tabela
                data.forEach(function(agendamento) {
                    var equipamento = agendamento.nome_equipamento;
                    var dataHoraInicial = new Date(agendamento.data_hora_inicial).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                    var dataHoraFinal =  new Date(agendamento.data_hora_final).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

                    var row = '<tr>' +
                        '<td>' + equipamento + '</td>' +
                        '<td>' + dataHoraInicial + '</td>' +
                        '<td>' + dataHoraFinal + '</td>' +
                        '</tr>';

                    document.getElementById('agendamentosBody').innerHTML += row;
                });
            })
            .catch(function(error) {
                console.log(error);
            });
});


//Repare que os modais têm os seguintes seletores:
//
// Modal de adicionar funcionário: #addEmployeeModal
// Modal de editar funcionário: #editEmployeeModal
function setupValidation2(modalSelector) {
    //Busca todos os formulários aos quais queremos aplicar estilos personalizados de validação de Bootstrap
    const forms2 = document.querySelectorAll(
        `${modalSelector}.needs-validation`
    );


    // Faz um loop sobre eles e evita submissão
    Array.from(forms2).forEach((form) => {
        form.addEventListener("submit", (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add("was-validated");
        }, false);
    });

    // Opção 1 - "ontem" pois "hoje" dava problema. Aí segue a regra de negócio agora:
    const validarDatasIniciaiseFinais2 = () => {
        const dataInicialInput2 = document.querySelector(
            `${modalSelector} [name="data_hora_inicial"]`
        );

        const dataFinalInput2 = document.querySelector(
            `${modalSelector} [name="data_hora_final"]`
        );

        const dataInicial2 = dataInicialInput2.value;
        const dataFinal2 = dataFinalInput2.value;

        const invalidFeedbackInicial2 = document.querySelectorAll(
            `${modalSelector} .invalid-feedback`
        )[0];


        const invalidFeedbackFinal2 = document.querySelectorAll(
            `${modalSelector} .invalid-feedback`
        )[1];

        const hoje2 = new Date();
        const ontem2 = new Date(hoje2);
        ontem2.setDate(ontem2.getDate() - 1);

        const DataInicialFormat = new Date(dataInicial2);
        const dataInicialDia = DataInicialFormat.getDate();
        const dataInicialMes = DataInicialFormat.getMonth();
        const dataInicialAno = DataInicialFormat.getFullYear();
        const dataInicialHora = DataInicialFormat.getHours();
        const dataInicialMinutos = DataInicialFormat.getMinutes();

        const DataFinalFormat = new Date(dataFinal2);
        const dataFinalDia = DataFinalFormat.getDate();
        const dataFinalMes = DataFinalFormat.getMonth();
        const dataFinalAno = DataFinalFormat.getFullYear();
        const dataFinalHora = DataFinalFormat.getHours();
        const dataFinalMinutos = DataFinalFormat.getMinutes();

        const dataInicialValida2 = new Date(dataInicial2) >= hoje2;
        let dataFinalValida2 =  new Date(dataFinal2) >= hoje2 || new Date(dataFinal2) > new Date(dataInicial2)|| !dataFinal2 || new Date(dataFinal2) > ontem2 || new Date(dataFinal2).toDateString() === ontem2.toDateString();
        if((dataInicialDia>dataFinalDia && dataInicialMes==dataFinalMes && dataInicialAno == dataFinalAno) || ((dataInicialDia==dataFinalDia && dataInicialMes==dataFinalMes && dataInicialAno == dataFinalAno) && ((dataInicialHora>dataFinalHora) || (dataInicialHora==dataFinalHora && dataInicialMinutos>=dataFinalMinutos)))){
            dataFinalValida2 = false;
        }

        if (
            dataInicial2 &&
            dataInicialValida2 &&
            dataFinalValida2
        ) {
            invalidFeedbackInicial2.style.display = "none";
            invalidFeedbackFinal2.style.display = "none";
            dataInicialInput2.setCustomValidity("");
            dataFinalInput2.setCustomValidity("");
            return true;
        } else {
            if (!dataInicial2 || !dataInicialValida2) {
                invalidFeedbackInicial2.textContent =
                    "A data e a hora inicial deve ser válida e superior ou igual à data e à hora atual.";
                invalidFeedbackInicial2.style.display = "block";
                //invalidFeedbackFinal2.style.display = "none";
                dataFinalInput2.setCustomValidity("");
                dataInicialInput2.setCustomValidity(
                    "A data e a hora inicial deve ser válida e superior ou igual à data e à hora atual."
                );
            } if(!dataFinal2 || !dataFinalValida2) {
                //invalidFeedbackInicial2.style.display = "none";
                invalidFeedbackFinal2.textContent =
                    "A data final deve ser válida e posterior à data e à hora inicial.";
                invalidFeedbackFinal2.style.display = "block";
                dataInicialInput2.setCustomValidity("");
                dataFinalInput2.setCustomValidity("Campo obrigatório");
            }
            return false;
        }
    };



    // Event listener para o botão de envio
    const botaoEnviar2 = document.querySelector(
        `${modalSelector} .botaoEnviar2`
    );
    botaoEnviar2.addEventListener("click", (event) => {
        if (!validarDatasIniciaiseFinais2()) {
            event.preventDefault();
        }
    });

    // Event listener para o input de data inicial
    const dataInicialInput2 = document.querySelector(
        `${modalSelector} [name="data_hora_inicial"]`
    );
    dataInicialInput2.addEventListener("input", validarDatasIniciaiseFinais2);

    // Event listener para o input de data final
    const dataFinalInput2 = document.querySelector(
        `${modalSelector} [name="data_hora_final"]`
    );
    dataFinalInput2.addEventListener("input", validarDatasIniciaiseFinais2);
}

// Chamadas para configurar a validação em cada modal específico
setupValidation2("#addAgendamentoModal");
setupValidation2("#editAgendamentoModal");

