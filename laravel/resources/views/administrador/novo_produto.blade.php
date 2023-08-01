@extends('layouts.main')

@section('title', 'Bem Doces | Administrador')

@section('content')
    <div class="container">
        <h1>Novo Produto</h1>
        <hr>
        <form class="mt-3" enctype="multipart/form-data" action="{{route('novo-produto-create')}}" method="post">
            @csrf
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-floating mb-3">
                        <input class="form-control border" type="text" name="nome" placeholder=" " maxlength="200"/>
                        <label for="nome">Nome do Produto</label>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea style="width: 100%; height: 150px;" class="form-control" maxlength="1000" id="descricao" name="descricao" placeholder=" "></textarea>
                        <label for="descricao">Descrição:</label>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <input class="form-control" type="number" oninput="limitDigits(this, 7)" step="any" name="valor" placeholder=" "/>
                                <label for="txtCEP" >Preço:<span></span></label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <input class="form-control border" type="number" name="quantidade" step = "1" oninput="limitInput(this, 999999)" placeholder=" "/>
                                <label class="form-label" for="quantidade">Quantidade:</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-floating mb-3">
                            <select class="form-control" id="tipo" name="tipo" placeholder=" ">
                                <option>Embalagens e Descartáveis</option>
                                <option>Artigos para Festa</option>
                                <option>Doces e Bebidas</option>
                            </select>
                            <label for="tipo"><b>Tipo:</b></label>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="col-md-6">
                        <div class="form-floating mb-3">
                            <input class="form-control" type="file" accept="image/png,image/jpeg" id="imagemInput" name="imagem" placeholder=" " />
                            <label for="imagemInput">Imagem:</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-floating mb-3" id="imagemPreview"></div>
                    </div>
                </div>
            </div>
            <br>
            <a class="btn btn-lg btn-light btn-outline-primary" href="{{route('administrador-index')}}">Cancelar</a>
            <input type="submit" value="Cadastrar" class="btn btn-lg btn-light btn-outline-primary"/>
            <br><br>
        </form>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="/js/preview_imagem.js"></script>
    <script src="/js/tratamento_dados_numeros.js"></script>

@endsection
