@extends('layouts.main')

@section('title', 'Bem Doces | Administrador')

@section('content')
    <div class="container">
        <h1>Nova Notícia</h1>
        <hr>
        <form class="mt-3" enctype="multipart/form-data" action="{{route('noticia-create')}}" method="post">
            @csrf
            <div class="row">
                <div class="col-12">
                    <div class="form-floating mb-3">
                        <input class="form-control border" name="titulo" type="text" placeholder=" " maxlength="200"/>
                        <label for="txtEmail">Título: </label>
                    </div>
                    <div class="form-floating col-12">
                        <textarea style="width: 100%; height: 150px;" name="descricao" class="form-control" id="descricao" placeholder= " "></textarea>
                        <label for="descricao">Descrição:</label>
                    </div>   
                <br>
                </div>
                <div class="col-sm-12">
                Para melhor resolução, envie imagens com o formato 1400x300<br><br>
                    <div class="d-flex justify-content-center">
                        <div class="form-floating mb-3">
                            <input class="form-control" type="file" accept="image/png,image/jpeg" name="imagem" id="imagemInput" placeholder=" " />
                            <label for="imagemInput">Imagem:</label>
                        </div>
                    </div>
                    <div class="form-floating mx-auto">
                        <div class="form-floating mb-3" id="imagemPreview"></div>
                    </div>
                </div>
            </div>
            <br>
            <a class="btn btn-lg btn-light btn-outline-primary" href="../gerenciar_feed">Cancelar</a>
            <input type="submit" value="Cadastrar" class="btn btn-lg btn-light btn-outline-primary"/>
            <br><br>
        </form>
    </div>
    <script src="/js/mostrar_imagem_noticia.js"></script>
@endsection