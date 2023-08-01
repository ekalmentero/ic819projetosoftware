@extends('layouts.main')

@section('title','Bem Doces')

@section('title', 'Bem Doces')

@section('header')
<div class="container">
    <div id="carouselMain" class="carousel slide carousel-dark" data-bs-ride="carousel">
        <div class="carousel-inner">
            @foreach($noticias as $noticia)
            <div class="carousel-item active" data-bs-interval="3000">
                <a href="{{route('noticia',[$noticia->id])}}" ><img src="{{asset('/storage/img/produtos/'.$noticia->foto)}}" class="d-none d-md-block w-100" style="width:1400px; height:300px" alt=""></a>
            </div>
            @endforeach
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselMain" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselMain" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
        </button>
    </div>
    <hr class="mt-3">
</div>
@endsection

@section('content')
<div class="container">
    <div class="row">
        <div class="col-12 col-md-5">
            <form  action="{{route('pesquisa_produto')}}" method="get" class="justify-content-center justify-content-md-start mb-3 mb-md-0">
                <div class="input-group input-group-sm">
                    <input type="text" value="{{old('textobusca')}}" class="form-control" name="textobusca" placeholder="Digite aqui o que procura">
                    <button class="btn btn-danger">Buscar</button>
                </div>
            
        </div>
        <div class="col-12 col-md-7">
            <div class="d-flex flex-row-reverse justify-content-center justify-content-md-start">
                
                    <select class="d-inline-block" name="tipobusca" class="form-select form-select-sm">
                        
                    @if($tipobusca == 2)
                        <option>Ordenar pelo menor preço</option>
                        <option>Ordenar pelo maior preço</option>
                        <option>Ordenar pelo nome</option>
                    @elseif($tipobusca == 3)
                        <option>Ordenar pelo maior preço</option>
                        <option>Ordenar pelo nome</option>
                        <option>Ordenar pelo menor preço</option>
                    @else
                        <option>Ordenar pelo nome</option>
                        <option>Ordenar pelo menor preço</option>
                        <option>Ordenar pelo maior preço</option>
                    @endif
                    </select>
                </form>
                
            </div>
        </div>
    </div>

    <hr mt-3>

    <div class="row g-3">
        @if(session('user'))
            @if(session('user')->usertype == 'cliente')   
            <!-- exibição de produtos para cliente --> 
                @foreach($produtos as $produto)
                    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex flex-column">
                        <div class="card text-center bg-light d-flex flex-column" style="flex-grow: 1;">
                            <a href="#" class="position-absolute end-0 p-2 text-danger">
                                <i class="bi-suit-heart" style="font-size: 24px; line-height: 24px;"></i>
                            </a>
                            <a href="{{route('visualizar-produto',[$produto->id])}}">
                                <img src="{{asset('/storage/img/produtos/'.$produto->imagem)}}" class="card-img-top">
                            </a>
                            <div class="card-header">
                                R$ {{$produto->valor}}
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">{{$produto->nome}}</h5>
                            </div>
                            <div class="card-footer">
                                @if($produto->quantidade==0)
                                <a href="#" class="btn btn-light disabled mt-2 d-block">
                                    <small>Reabastecendo Estoque</small>
                                </a>
                                <small class="text-danger">
                                    <b>Produto Esgotado</b>
                                </small>
                                @else
                                <a href="{{route('visualizar-produto',[$produto->id])}}" class="btn btn-danger mt-2 d-block">
                                    Adicionar ao Carrinho
                                </a>
                                <small class="text-success">
                                    @if($produto->quantidade==1)
                                        {{$produto->quantidade}} unidade em estoque
                                    @else
                                        {{$produto->quantidade}} unidades em estoque
                                    @endif
                                </small>
                                @endif
                            </div>
                        </div>
                    </div>
                 @endforeach
            @elseif(session('user')->usertype == 'administrador')
                <!-- exibição de produtos para administrador --> 
                @foreach($produtos as $produto)
                    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex flex-column">
                        <div class="card text-center bg-light d-flex flex-column" style="flex-grow: 1;">
                            <a href="#" class="position-absolute end-0 p-2 text-danger">
                                <i class="bi-suit-heart" style="font-size: 24px; line-height: 24px;"></i>
                            </a>
                            <a href="{{route('administrador-index')}}">
                                <img src="{{asset('/storage/img/produtos/'.$produto->imagem)}}" class="card-img-top">
                            </a>
                            <div class="card-header">
                                R$ {{$produto->valor}}
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">{{$produto->nome}}</h5>
                            </div>
                            <div class="card-footer">
                                @if($produto->quantidade==0)
                                <a href="{{route('administrador-index')}}" class="btn btn-light disabled mt-2 d-block">
                                    <small>Reabasteça o Estoque</small>
                                </a>
                                <small class="text-danger">
                                    <b>Produto Esgotado</b>
                                </small>
                                @else
                                <a href="{{route('administrador-index')}}" class="btn btn-danger mt-2 d-block">
                                    Gerenciar produto
                                </a>
                                <small class="text-success">
                                    @if($produto->quantidade==1)
                                        {{$produto->quantidade}} unidade em estoque
                                    @else
                                        {{$produto->quantidade}} unidade em estoque
                                    @endif
                                </small>
                                @endif
                            </div>
                        </div>
                    </div>
                 @endforeach
            @elseif(session('user')->usertype == 'atendente')     
                <!-- exibição de produtos para atendente --> 
                @foreach($produtos as $produto)
                    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex flex-column">
                        <div class="card text-center bg-light d-flex flex-column" style="flex-grow: 1;">
                            <a  class="position-absolute end-0 p-2 text-danger">
                                <i class="bi-suit-heart" style="font-size: 24px; line-height: 24px;"></i>
                            </a>
                            <a >
                                <img src="{{asset('/storage/img/produtos/'.$produto->imagem)}}" class="card-img-top">
                            </a>
                            <div class="card-header">
                                R$ {{$produto->valor}}
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">{{$produto->nome}}</h5>
                            </div>
                            <div class="card-footer">
                                @if($produto->quantidade==0)
                                <a  class="btn btn-light disabled mt-2 d-block">
                                    <small>Administrador precisa reabastecer o Estoque</small>
                                </a>
                                <small class="text-danger">
                                    <b>Produto Esgotado</b>
                                </small>
                                @else
                                
                                <small class="text-success">
                                    @if($produto->quantidade==1)
                                        {{$produto->quantidade}} unidade em estoque
                                    @else
                                        {{$produto->quantidade}} unidade em estoque
                                    @endif
                                </small>
                                @endif
                            </div>
                        </div>
                    </div>
                 @endforeach
            @endif

        @else
            @foreach($produtos as $produto)
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex flex-column">
                <div class="card text-center bg-light d-flex flex-column" style="flex-grow: 1;">
                    <a  class="position-absolute end-0 p-2 text-danger">
                        <i class="bi-suit-heart" style="font-size: 24px; line-height: 24px;"></i>
                    </a>
                    <a>
                        <img src="{{asset('/storage/img/produtos/'.$produto->imagem)}}" class="card-img-top">
                    </a>
                    <div class="card-header">
                        R$ {{$produto->valor}}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{$produto->nome}}</h5>
                    </div>
                    <div class="card-footer">
                        @if($produto->quantidade==0)
                        <a  class="btn btn-light disabled mt-2 d-block">
                            <small>Reabastecendo Estoque</small>
                        </a>
                        <small class="text-danger">
                            <b>Produto Esgotado</b>
                        </small>
                        @else
                        <a  class="btn btn-danger mt-2 d-block">
                            Faça login para comprar
                        </a>
                        <small class="text-success">
                            @if($produto->quantidade==1)
                                {{$produto->quantidade}} unidade em estoque
                            @else
                                {{$produto->quantidade}} unidade em estoque
                            @endif
                        </small>
                        @endif
                    </div>
                </div>
            </div>
            @endforeach
        @endif


    <hr class="mt-3">
    
</div>
@endsection
