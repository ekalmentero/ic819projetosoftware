@extends('layouts.main')

@section('title', 'Bem Doces | Administrador')

@section('content')
    <div class="container">
        <h1>{{$noticia->titulo}}</h1>
        <hr>
        @csrf
        <div class="row">
            <div class="col-12">
                <div class="form-floating col-12">
                    <textarea style="width: 100%; height: 150px;" name="descricao" class="form-control" id="descricao" placeholder= " " disabled>{{$noticia->descricao}}</textarea>
                    <label for="descricao">Descrição:</label>
                </div>   
            <br>
            </div>
            <div class="col-sm-12">
                <div class="form-floating mx-auto">
                    <img src="{{asset('/storage/img/produtos/'.$noticia->foto)}}" style="width: 700px; height: 150px">
                </div>
            </div>
        </div>
        <br>
        <a class="btn btn-lg btn-light btn-outline-danger" href="{{route('index')}}">Retornar para página inicial</a>
        <br><br>
    </div>
    <script src="/js/mostrar_imagem_noticia.js"></script>
@endsection