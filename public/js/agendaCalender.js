//deixei como global pra conseguir acessar essa variavel pra limpar os agendamentos e aparecer novos
var calendar;
document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var dataAtual = new Date().toISOString().split('T')[0];

    calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'pt-br',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialDate: dataAtual,
        buttonText: {
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia'
        },
        validRange: {
            start: new Date().toISOString().split('T')[0]
        },
        navLinks: true,
        selectable: true,
        selectMirror: true,
        select: function (arg) {
            // Abrir o modal diretamente ao selecionar uma data/hora
            $('#addAgendamentoModal').modal('show');

            var dataHoraInicialSelecionada = arg.start;
            var dataHoraFinalSelecionada = arg.end;

            var momentoInit = moment(dataHoraInicialSelecionada)
            var momentoFinal = moment(dataHoraFinalSelecionada)

            var dataHoraInitFormatada = momentoInit.format('YYYY-MM-DDTHH:mm');
            var dataHoraFinalFormatada = momentoFinal.format('YYYY-MM-DDTHH:mm');

            // Preencher os campos do modal com a data e a hora selecionadas
            $('#data_hora_inicial').val(dataHoraInitFormatada);
            $('#data_hora_final').val(dataHoraFinalFormatada);

            // Fechar o modal de adição ao clicar no botão de cancelar
            var butoesCancelar = document.querySelectorAll('#addAgendamentoModal .cancelarBtn, #addAgendamentoModal .btn-close');
            butoesCancelar.forEach(function (button) {
                button.addEventListener('click', function () {
                    $('#addAgendamentoModal').modal('hide');
                });
            });

        },
        eventClick: function (info) {
            var agendamento = info.event;

            if (agendamento.startEditable) {
                // Abra o modal de edição preenchendo os dados do evento
                $('#editAgendamentoModal').modal('show');

                var dataHoraInicialSelecionada = agendamento.start;
                var dataHoraFinalSelecionada = agendamento.end;
                var idAgendamento = agendamento.id;

                var momentoInit = moment(dataHoraInicialSelecionada)
                var momentoFinal = moment(dataHoraFinalSelecionada)

                var dataHoraInitFormatada = momentoInit.format('YYYY-MM-DDTHH:mm');
                var dataHoraFinalFormatada = momentoFinal.format('YYYY-MM-DDTHH:mm');

                // Preencher os campos do modal com a data e a hora selecionadas
                $('#edit_data_hora_inicial').val(dataHoraInitFormatada);
                $('#edit_data_hora_final').val(dataHoraFinalFormatada);

                $('.id_agendamento').each(function() {
                    $(this).val(idAgendamento);
                });

                // Fechar o modal de edição ao clicar no botão de cancelar
                var editButoesCancelar = document.querySelectorAll('#editAgendamentoModal .cancelarBtn, #editAgendamentoModal .btn-close');
                editButoesCancelar.forEach(function (button) {
                    button.addEventListener('click', function () {
                        $('#editAgendamentoModal').modal('hide');
                    });
                });
            }

        },
        dayMaxEvents: true, // allow "more" link when too many events
        events: []

    });

    calendar.render();

});

$(document).ready(function() {
    $('.agendar-link').click(function(event) {
        event.preventDefault();

        // Obter o ID e o nome do equipamento do atributo "data-id" e "data-nome"
        var equipamentoId = $(this).data('id');
        var equipamentoNome = $(this).data('nome');

        // Atualizar o nome do equipamento no HTML
        $('#nome_Equipamento').text(equipamentoNome);

        // Definir o valor do campo oculto no formulário com o class do equipamento
        $('.id_Equipamento').each(function() {
            $(this).val(equipamentoId);
        });

        // Chamar a função buscarEventos com o equipamentoId
        buscarAgendamentos(equipamentoId);
    });
});

// função para remover todos os agendamentos do calendário
function removerAgendamentos() {
    if (calendar) {
        calendar.removeAllEvents();
    }
}

// função para adicionar agendamentos ao calendário
function adicionarAgendamentos(agendamentos) {
    if (calendar) {
        calendar.addEventSource(agendamentos);
    }
}

// aaaaaaaaaaaaaaaaa eu vou surtarrrrrrrrrrr
function buscarAgendamentos(equipamentoId) {
    // Fazer a requisição assíncrona para buscar os eventos do equipamento
    fetch('/agendamentos/buscar?equipamentoId=' + equipamentoId)
        .then(response => response.json())
        .then(data => {
            removerAgendamentos(); // remover eventos existentes
            adicionarAgendamentos(data); // adicionar novos eventos
        })
        .catch(error => {
            console.log(error);
        });
}







