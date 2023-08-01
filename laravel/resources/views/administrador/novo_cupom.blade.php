@extends('layouts.main')

@section('title', 'Bem Doces | Administrador')

@section('content')
    <div class="container">
        <h1>Novo Cupom</h1>
        <hr>
        <form class="mt-3"  action="{{route('cupom-create')}}" method="post">
            @csrf
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-floating mb-3">
                        <input class="form-control border" type="text" maxlength="255" name="codigo" placeholder=" " />
                        <label for="nome">Código do cupom</label>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea style="width: 100%; height: 150px;" class="form-control" maxlength="1000" id="descricao" name="descricao" placeholder=" "></textarea>
                        <label for="descricao">Descrição:</label>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <input class="form-control" type="number" step="any" name="desconto" max="100" oninput="limitInput(this, 100)" placeholder=" " />
                                <label for="txtCEP">Porcentagem de desconto:<span></span></label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <input class="form-control border" type="number" name="numporpessoa"  oninput="limitInput(this, 999999)" placeholder=" " />
                                <label class="form-label" for="quantidade">Quantidade de usos por cliente:</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-12 mb-3"> 
                            <div class="border p-3" style="background-color: white">
                                <button type="button" class="btn btn-light custom-cursor-pointer" id="mostrarProdutos1">Aplicáveis aos tipos</button>
                                <div id="listaProdutos1" style="display: none;">
                                    <div class="form-check">
                                        <input type="checkbox" class="form-check-input" name="tipo1" value="Embalagens e Descartáveis" id="produto2" />
                                        <label class="form-check-label custom-cursor-pointer" for="produto2">Embalagens e Descartáveis</label>
                                    </div>
                                    <div class="form-check">
                                        <input type="checkbox" class="form-check-input" name="tipo2" value="Artigos para Festa" id="produto3" />
                                        <label class="form-check-label custom-cursor-pointer" for="produto3">Artigos para Festa</label>
                                    </div>
                                    <div class="form-check">
                                        <input type="checkbox" class="form-check-input" name="tipo3" value="Doces e Bebida" id="produto4" />
                                        <label class="form-check-label custom-cursor-pointer" for="produto4">Doces e Bebida</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-12"> 
                            <div class="border p-3" style="background-color: white"> 
                                <button type="button" class="btn btn-light custom-cursor-pointer" id="mostrarProdutos2">Aplicáveis aos  produtos:</button>
                                <div id="listaProdutos2" style="display: none;overflow-y: scroll; height:100px;">
                                @foreach($produtos as $produto)
                                    <div class="form-check">
                                        <input type="checkbox" class="form-check-input" name="produto[]" value="{{$produto->id}}" id="{{$produto->id}}" />
                                        <label class="form-check-label custom-cursor-pointer" for="{{$produto->id}}">{{$produto->nome}}</label>
                                    </div>
                                @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <img src="/../../img/imagem_cupom.png" style="width:80%; height:80%">
                </div>
            </div>
            <br>
            <a class="btn btn-lg btn-light btn-outline-danger" href="{{route('gerenciar-cupom')}}">Cancelar</a>
            <input type="submit" value="Cadastrar" class="btn btn-lg btn-light btn-outline-danger"/>
            <br><br>
        </form>
    </div>
    <script src="/js/expandir_checkbox_cupom.js"></script>
    <script src="/js/tratamento_dados_numeros.js"></script>
@endsection
