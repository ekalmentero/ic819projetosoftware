<div id="addAgendamentoModal" class="modal fade modal-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="{{ route('agendamento.salvar') }}" method="POST" class="needs-validation" novalidate>
                @csrf
                @method('POST')
                <div class="modal-header">
                    <h4 class="modal-title">Novo Agendamento</h4>
                    <button class="btn-close cancelarBtn" type="button" data-dismiss="modal"
                            aria-label="Close"></button>
                </div>

                <input type="hidden" class="id_Equipamento" name="id_equipamento">

                <div class="modal-body">
                    <div class="form-group">
                    <label for="data_hora_inicial" class="my-1">Data e Hora Inicio</label>
                    <input type="datetime-local" class="form-control" id="data_hora_inicial" name="data_hora_inicial"
                           pattern="\d{4}-\d{2}-\d{2}T\d{2}:\d{2}" required>
                    </div>
                    <div class="invalid-feedback">
                        A data e hora são obrigatórias.
                    </div>

                    <div class="form-group">
                    <label for="data_hora_final" class="my-1">Data e Hora Final</label>
                    <input type="datetime-local" class="form-control" id="data_hora_final" name="data_hora_final"
                           pattern="\d{4}-\d{2}-\d{2}T\d{2}:\d{2}" required>
                    </div>
                    <div class="invalid-feedback">
                        A data e hora são obrigatórias.
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default cancelarBtn" data-dismiss="modal">Cancelar</button>
                    <input type="submit" class="btn btn-success botaoEnviar2" value="Adicionar" id="enviarBtn2">
                </div>
            </form>
        </div>
    </div>
</div>

<div id="editAgendamentoModal" class="modal fade modal-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="{{route('agendamento.editar')}}" method="post" class="needs-validation" novalidate>
                @csrf
                @method('put')
                <div class="modal-header">
                    <h4 class="modal-title">Editar Agendamento</h4>
                    <button class="btn-close cancelarBtn" type="button" data-dismiss="modal"
                            aria-label="Close"></button>
                </div>

                <input type="hidden" class="id_agendamento" name="id_agendamento">
                <input type="hidden" class="id_Equipamento" name="id_equipamento">

                <div class="modal-body">
                    <label for="data_hora_inicial" class="my-1">Data e Hora Inicio</label>
                    <input type="datetime-local" class="form-control" id="edit_data_hora_inicial"
                           name="data_hora_inicial"
                           required>
                    <div class="invalid-feedback">
                        A data e hora são obrigatórias.
                    </div>

                    <label for="data_hora_final" class="my-1">Data e Hora Final</label>
                    <input type="datetime-local" class="form-control" id="edit_data_hora_final" name="data_hora_final"
                           required>
                    <div class="invalid-feedback">
                        A data e hora são obrigatórias.
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default cancelarBtn" data-dismiss="modal">Cancelar</button>
                    <a id="btnExcluir" data-toggle="modal" data-target="#excluirModal" class="btn btn-danger cancelarBtn" data-dismiss="modal">Excluir</a>
                    <input type="submit" class="btn btn-success botaoEnviar2" value="Adicionar" id="enviarBtn2">
                </div>
            </form>
        </div>
    </div>
</div>

<div id="listaAgendamentoModal" class="modal fade modal-2">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Meus Agendamentos</h4>
                <button class="btn-close cancelarBtn" type="button" data-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>Equipamento</th>
                        <th>Data e Hora Inicial</th>
                        <th>Data e Hora Final</th>
                    </tr>
                    </thead>
                    <tbody id="agendamentosBody">
                    </tbody>
                </table>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-primary cancelarBtn" data-dismiss="modal">Fechar</button>
            </div>
        </div>
    </div>
</div>

<div id="excluirModal" class="modal fade modal-2">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Deseja Realmente deletar esse Agendamento?</h4>
                <button class="btn-close cancelarBtn" type="button" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <form method="post" action="{{route('agendamento.deletar')}}">
                @csrf
                @method('delete')

                <input type="hidden" class="id_agendamento" name="id_agendamento">

                <div class="modal-body">
                    <h5>Após a exclusão não será possivel recuperar esse agendamento.</h5>
                </div>

                <div class="modal-footer">
                    <button type="submit" class="btn btn-danger botaoEnviar" id="enviarBtn2">Excluir</button>
                    <button type="button" class="btn btn-primary cancelarBtn" data-dismiss="modal">Fechar</button>
                </div>
            </form>

        </div>
    </div>
</div>
