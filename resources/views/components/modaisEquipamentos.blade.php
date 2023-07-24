<!-- Adicionar Modal HTML -->
<div id="addEquipamentoModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="{{ route('equipamentos.salvar') }}" method="POST" class="needs-validation" novalidate>
                @csrf
                <div class="modal-header">
                    <h4 class="modal-title">Adicionar novo equipamento</h4>
                    <button class="btn-close" type="button" data-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="form-group">
                        <label class="my-1">Nome</label>
                        <input type="text" class="form-control" name="nome" pattern="[A-Za-zÀ-ÿ0-9\s]{1,200}" id="nome" required>

                        <div class="invalid-feedback">
                            O nome é obrigatório e deve conter no mínimo 1 letra e no máximo 200 letras!
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="my-1">Quantidade</label>
                        <input type="number" class="form-control quantidade"  name="quantidade" pattern="^[1-9]\d{0,1}|100$" id="quantidade" required>
                        <div class="invalid-feedback">
                            A quantidade é obrigatória e deve conter no mínimo 1 caractere numérico, com um limite de 100 por item.
                            Não são permitidos números negativos.
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="my-1">Descrição</label>
                        <textarea class="form-control descricao" name="descricao" required></textarea>

                        <div class="invalid-feedback">
                            O campo descrição é obrigatório.
                            O campo descrição deve ter no mínimo 10 caracteres.
                            O campo descrição deve ter no máximo 255 caracteres.
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="my-1">Tipo de equipamento</label>
                        <select class="form-select" aria-label="Default select example" name="tipo_equipamento" required>
                            <option value="">Selecione o tipo de equipamento</option>
                            @foreach($tipo_equipamentos as $tipo_equipamento)
                                    <option value="{{$tipo_equipamento->id}}"><span>{{$tipo_equipamento->descricao}}</span></option>
                            @endforeach
                        </select>
                        <div class="invalid-feedback">
                           Selecione o tipo de equipamento
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancelar">
                    <input type="submit" class="btn btn-success" value="Adicionar" id="adicionarEquipamentoBtn">
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Edit Modal HTML -->
<div id="editEquipamentoModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="{{route('equipamentos.editar')}}" method="post" class="needs-validation" novalidate>
                @csrf
                @method('put')
                <input type="hidden" name="equipamento_id" id="id_edit">
                <input type="hidden" name="tipoequipamento_id" id="tipoequipamento_id_edit">
                <div class="modal-header">
                    <h4 class="modal-title">Editar equipamento</h4>
                    <button  class="btn-close"  type="button" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="nome_edit" class="my-1">Nome</label>
                        <input type="text" class="form-control" id="nome_edit"  pattern="[A-Za-zÀ-ÿ0-9\s]{1,200}" name="nome" required>

                        <div class="invalid-feedback">
                            O nome é obrigatório e deve conter no mínimo 1 letra e no máximo 200 letras!
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="quantidade_edit" class="my-1">Quantidade</label>
                        <input type="number" class="form-control" id="quantidade_edit" pattern="^[1-9]\d{0,1}|100$" name="quantidade" required>

                        <div class="invalid-feedback">
                            A quantidade é obrigatória e deve conter no mínimo 1 caractere numérico, com um limite de 100 por item.
                            Não são permitidos números negativos.
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="descricao_edit" class="my-1">Descrição</label>
                        <textarea class="form-control"  id="descricao_edit" name="descricao" required></textarea>

                        <div class="invalid-feedback">
                            O campo descrição é obrigatório.
                            O campo descrição deve ter no mínimo 10 caracteres.
                            O campo descrição deve ter no máximo 255 caracteres.
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="my-1">Tipo de equipamento</label>
                        <select class="form-select" aria-label="Default select example" name="tipo_equipamento" id="tipo_edit" required>
                            <option value=""selected>Selecione o tipo de equipamento</option>
                            @foreach($tipo_equipamentos as $tipo_equipamento)
                                <option value="{{$tipo_equipamento->id}}"><span>{{$tipo_equipamento->descricao}}</span></option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancelar">
                    <input type="submit" class="btn btn-success" value="Adicionar" id="EditarEquipamentoBtn">
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Delete Modal HTML -->
<div id="deleteEquipamentoModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="{{route('equipamentos.deletar')}}" method="post">
                @csrf
                @method('delete')

                <div class="modal-header">
                    <h4 class="modal-title">Deletar Projeto</h4>
                    <button  class="btn-close"  type="button" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <input type="hidden" name="id_equipamento" id="delete_id">
                <div class="modal-body">
                    <p>Tem certeza que deseja deletar o projeto?</p>
                    <p class="text-warning"><small>Esta ação vai deletar seu projeto</small></p>
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
<div id="viewEquipamentoModal" class="modal fade">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Verificar Dados</h4>
                <button class="btn-close" type="button" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" >
                <table class="table table-striped">
                    <tbody>
                    <tr>
                        <td>#</td>
                        <td id="id_equipamento"></td>
                    </tr>
                    <tr>
                        <td>Nome</td>
                        <td id="nome_equipamento"></td>
                    </tr>
                    <tr>
                        <td>Quantidade</td>
                        <td id="quantidade_equipamento"></td>
                    </tr>
                    <tr>
                        <td>Descrição</td>
                        <td id="descricao_equipamento"></td>
                    </tr>

                    <tr>
                        <td>Tipo de equipamento</td>
                        <td id="tipo_equipamento"></td>
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


