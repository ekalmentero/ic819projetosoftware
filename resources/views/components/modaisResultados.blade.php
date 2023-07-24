<!-- Adicionar Modal HTML -->
<div id="addEmployeeModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="{{route('resultados.salvar')}}" method="POST" class="needs-validation" novalidate>
                @csrf
                <div class="modal-header">
                    <h4 class="modal-title">Adicionar novo Resultado</h4>
                    <button class="btn-close" type="button" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <input type="hidden" name="projeto_id" id="projeto_id" value="">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="titulo" class="my-1">Titulo</label>
                        <input type="text" class="form-control titulo" name="titulo" id="titulo" required>

                        <div class="invalid-feedback">
                            O campo título é obrigatório.
                            O campo título deve ter no mínimo 5 caracteres.
                            O campo título deve ter no máximo 50 caracteres.
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="my-1">Data</label>
                        <input type="date" class="form-control data"  name="data" required>
                        <div class="invalid-feedback">
                            Insira uma data válida!
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="link" class="my-1">Link</label>
                        <textarea class="form-control link" name="link" id="link" required></textarea>

                        <div class="invalid-feedback">
                            Insira uma URL válida!
                        </div>

                    </div>
                    <div class="form-group">
                        <label for="descricao" class="my-1">Descrição</label>
                        <textarea class="form-control descricao" name="descricao" id="descricao" required></textarea>

                        <div class="invalid-feedback">
                            O campo descrição é obrigatório.
                            O campo descrição deve ter no mínimo 10 caracteres.
                            O campo descrição deve ter no máximo 255 caracteres.
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancelar">
                    <input type="submit" class="btn btn-success" value="Adicionar" id="adicionarResultadoBtn">
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Edit Modal HTML -->
<div id="editEmployeeModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="{{route('resultados.editar')}}" method="post" class="needs-validation" novalidate>
                @csrf
                @method('put')
                <input type="hidden" name="resultado_id" id="id_edit">
                <input type="hidden" name="projeto_id" id="projeto_id_edit" value="">
                <div class="modal-header">
                    <h4 class="modal-title">Editar Resultado</h4>
                    <button  class="btn-close"  type="button" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="titulo_edit" class="my-1">Título</label>
                        <input type="text" class="form-control titulo" id="titulo_edit"  name="titulo" required>

                        <div class="invalid-feedback">
                            O campo título é obrigatório.
                            O campo título deve ter no mínimo 5 caracteres.
                            O campo título deve ter no máximo 50 caracteres.
                        </div>

                    </div>
                    <div class="form-group">
                        <label for="data_edit" class="my-1">Data</label>
                        <input type="date" class="form-control data" id="data_edit" name="data" required>

                        <div class="invalid-feedback">
                            Insira uma data válida!
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="link_edit" class="my-1">Link</label>
                        <textarea class="form-control link" id="link_edit" name="link" required></textarea>

                        <div class="invalid-feedback">
                            Insira uma URL válida!
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="descricao" class="my-1">Descrição</label>
                        <textarea class="form-control descricao" name="descricao" id="descricao_edit" required></textarea>

                        <div class="invalid-feedback">
                            O campo descrição é obrigatório.
                            O campo descrição deve ter no mínimo 10 caracteres.
                            O campo descrição deve ter no máximo 255 caracteres.
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancelar">
                    <input type="submit" class="btn btn-success" value="Adicionar" id="EditarResultadoBtn">
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Delete Modal HTML -->
<div id="deleteEmployeeModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="{{route('resultados.deletar')}}" method="post">
                @csrf
                @method('delete')

                <div class="modal-header">
                    <h4 class="modal-title">Excluir Resultado</h4>
                    <button  class="btn-close"  type="button" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <input type="hidden" name="id_resultado" id="delete_id">
                <div class="modal-body">
                    <p>Tem certeza que deseja deletar o Resultado?</p>
                    <p class="text-warning"><small>Esta ação vai excluir seu resultado permanentemente</small></p>
                </div>
                <div class="modal-footer">
                    <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancelar">
                    <input type="submit" class="btn btn-danger" value="Excluir">
                </div>
            </form>
        </div>
    </div>
</div>

<!-- View Modal HTML -->
<div id="viewEmployeeModal" class="modal fade">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Verificar Resultado</h4>
                <button class="btn-close" type="button" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table table-striped">
                    <tbody>
                    <tr>
                        <td>#</td>
                        <td id="id_resultado"></td>
                    </tr>
                    <tr>
                        <td>Título</td>
                        <td id="titulo_resultado"></td>
                    </tr>
                    <tr>
                        <td>Data</td>
                        <td id="data_resultado"></td>
                    </tr>
                    <tr>
                        <td>Link</td>
                        <td id="link_resultado"></td>
                    </tr>
                    <tr>
                        <td>Descrição</td>
                        <td id="descricao_resultado"></td>
                    </tr>
                    </tbody>
                </table>
                <div class="modal-footer">
                    <input type="button" class="btn btn-primary" data-dismiss="modal" value="Voltar">
                </div>
            </div>
        </div>
    </div>
</div>
