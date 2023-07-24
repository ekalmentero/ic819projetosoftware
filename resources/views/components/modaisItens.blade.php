<!-- Adicionar Modal HTML -->
<div id="addEmployeeModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="{{route('itens.salvar')}}" method="POST" class="needs-validation" novalidate>
                @csrf
                <div class="modal-header">
                    <h4 class="modal-title">Adicionar novo Item</h4>
                    <button class="btn-close" type="button" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <input type="hidden" name="projeto_id" id="projeto_id" value="">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="nome" class="my-1">Nome</label>
                        <input type="text" class="form-control" name="nome" pattern="[A-Za-zÀ-ÿ0-9\s]{1,300}" id="nome" required>

                        <div class="invalid-feedback">
                            O nome é obrigatório e deve conter no mínimo 1 letra e no máximo 300 letras!
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="quantidade" class="my-1">Quantidade</label>
                        <input type="text" class="form-control quantidade" name="quantidade" pattern="^[1-9]\d{0,1}|100$" id="quantidade" required>

                        <div class="invalid-feedback">
                            A quantidade é obrigatória e deve conter no mínimo 1 caractere numérico, com um limite de 100 por item.
                            Não são permitidos números negativos.
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
                    <input type="submit" class="btn btn-success" value="Adicionar" id="adicionarItemBtn">
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Edit Modal HTML -->
<div id="editEmployeeModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="{{route('itens.editar')}}" method="post" class="needs-validation" novalidate>
                @csrf
                @method('put')
                <input type="hidden" name="item_id" id="id_edit">
                <input type="hidden" name="projeto_id" id="projeto_id_edit" value="">
                <div class="modal-header">
                    <h4 class="modal-title">Editar Item</h4>
                    <button  class="btn-close"  type="button" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="nome_edit" class="my-1">Nome</label>
                        <input type="text" class="form-control" id="nome_edit" pattern="[A-Za-zÀ-ÿ0-9\s]{1,300}" name="nome" required>

                        <div class="invalid-feedback">
                            O nome é obrigatório e deve conter no mínimo 1 letra e no máximo 300 letras!
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="quantidade_edit" class="my-1">Quantidade</label>
                        <input type="text" class="form-control quantidade" id="quantidade_edit" pattern="^[1-9]\d{0,1}|100$" name="quantidade" required>

                        <div class="invalid-feedback">
                            A quantidade é obrigatória e deve conter no mínimo 1 caractere numérico, com um limite de 100 por item.
                            Não são permitidos números negativos.
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="descricao_edit" class="my-1">Descrição</label>
                        <textarea class="form-control descricao" id="descricao_edit" name="descricao" required></textarea>

                        <div class="invalid-feedback">
                            O campo descrição é obrigatório.
                            O campo descrição deve ter no mínimo 10 caracteres.
                            O campo descrição deve ter no máximo 255 caracteres.
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancelar">
                    <input type="submit" class="btn btn-success" value="Adicionar" id="EditarItemBtn">
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Delete Modal HTML -->
<div id="deleteEmployeeModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="{{route('itens.deletar')}}" method="post">
                @csrf
                @method('delete')

                <div class="modal-header">
                    <h4 class="modal-title">Excluir Item</h4>
                    <button  class="btn-close"  type="button" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <input type="hidden" name="id_item" id="delete_id">
                <div class="modal-body">
                    <p>Tem certeza que deseja excluir o Item?</p>
                    <p class="text-warning"><small>Esta ação vai excluir seu item permanentemente</small></p>
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
                <h4 class="modal-title">Verificar Item</h4>
                <button class="btn-close" type="button" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table table-striped">
                    <tbody>
                    <tr>
                        <td>#</td>
                        <td id="id_item"></td>
                    </tr>
                    <tr>
                        <td>Nome</td>
                        <td id="nome_item"></td>
                    </tr>
                    <tr>
                        <td>Quantidade</td>
                        <td id="quantidade_item"></td>
                    </tr>
                    <tr>
                        <td>Descrição</td>
                        <td id="descricao_item"></td>
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
