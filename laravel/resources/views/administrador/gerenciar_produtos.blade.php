@extends('layouts.main')

@section('title', 'Bem Doces | Administrador')

@section('content')
    <div class="container">
        <h1>Área do Administrador</h1>
        <br>
        <div class="row gx-3">
            <div class="col-6">
                <div class="list-group">
                    <div class="d-flex align-items-center">
                        <a href="" class="list-group-item list-group-item-action text-light" style="background-color: rgb(146, 129, 248)">
                            <i class="bi bi-cash-stack fs-6"></i> Gerenciar Produtos
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="list-group">
                    <div class="d-flex align-items-center">
                        <a href="gerenciar_feed" class="list-group-item list-group-item-action">
                            <i class="bi-mailbox fs-6"></i> Gerenciar Feed Notícias
                        </a>
                    </div>
                </div>
            </div>         
            <div>
                <br>
                <a href="{{route('novo-produto-index')}}" class="margem d-inline-block"><button type="button" class="btn btn-primary" style="margin-bottom: 30px;">Adicionar novo produto</button></a>
                @foreach($produtos as $produto)
                <form  action="{{route('produto-update',[$produto->id])}}"  method="get">
                    <div class="accordion" id="divPedidos">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#pedido{{ $produto->id }}">
                                    <b>{{$produto->nome}}</b>
                                </button>
                            </h2>
                            <div id="pedido{{ $produto->id }}" class="accordion-collapse collapse" data-bs-parent="#divPedidos">
                                <div class="accordion-body">
                                    <div class="form-floating mb-3">
                                        <input class="form-control" type="text" value="{{$produto->nome}}" name="nome" id="txtRua" placeholder=" " />
                                        <label for="txtRua">Nome: <span></span></label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <textarea style="width: 100%; height: 150px;"  name="descricao" class="form-control" id="descricao" placeholder= " ">{{$produto->descricao}}</textarea>
                                        <label for="descricao">Descrição: <span></span></label>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex align-items-center">
                                            <div class="form-floating mb-3 col-md-3">
                                                <input class="form-control" name="valor" value="{{$produto->valor}}" type="number" placeholder=" " />
                                                <label for="txtCEP">Preço: <span></span></label>
                                            </div>
                                            <div class="form-floating mb-3 col-md-3 espacamento">
                                                <input class="form-control" name="quantidade" value="{{$produto->quantidade}}" type="number" id="txtNumero" placeholder=" " />
                                                <label for="txtNumero">Quantidade: <span></span></label>
                                            </div>
                                            
                                            <div class="form-floating mb-3 col-md-3 espacamento">
                                                <select class="form-control"value="{{$produto->tipo}}" name="tipo" id="tipo" placeholder=" ">
                                                @if($produto->tipo == 'Embalagens e Descartáveis' )
                                                    <option>Embalagens e Descartáveis</option>
                                                    <option >Artigos para Festa</option>
                                                    <option >Doces e Bebidas</option>
                                                @elseif(($produto->tipo == 'Artigos para Festa' ))
                                                    <option >Artigos para Festa</option>
                                                    <option>Embalagens e Descartáveis</option>
                                                    <option >Doces e Bebidas</option>
                                                @else
                                                    <option >Doces e Bebidas</option>
                                                    <option>Embalagens e Descartáveis</option>
                                                    <option >Artigos para Festa</option>
                                                @endif
                                                </select>
                                                <label for="tipo"><b>Tipo:</b></label>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-center" id="imagemPreview"></div>
                                    <br><br>
                                    <button type="button" onclick="window.location='{{route("produto-delete",[$produto->id])}}'" class="btn btn-danger">Excluir produto</button>
                                    <button type="submit" class="btn btn-success">Salvar alterações</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                @endforeach
            </div>
        </div>
    </div>
    <br>
    <script src="/js/preview_imagem.js"></script>
@endsection