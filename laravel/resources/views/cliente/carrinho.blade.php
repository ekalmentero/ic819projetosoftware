@extends('layouts.main')

@section('title','Bem Doces')

@section('title', 'Bem Doces')

@section('content')
    <div class="container shadow-lg" style="background-color: #464242; padding:10px; border-radius: 8px">
        <h2 class="h2" style="color:white; background-color: #464242; padding: 5px; border-radius: 3px">Carrinho de Compras</h2>       
        <ul class="list-group mb-3">
            <li class="list-group-item py-3">
                @foreach($produtos as $produto)
                    <form method="put" action="{{route('carrinho-produto-update',[$produto->id])}}">
                        <div class="row g-3 border rounded p-2">
                            <div class="col-4 col-md-3 col-lg-2">
                                <a href="#">
                                    <img src="{{asset('/storage/img/produtos/'.$produto->imagem)}}" class="img-thumbnail">
                                </a>
                            </div>
                            <div class="col-8 col-md-9 col-lg-7 col-xl-8 text-left align-self-center">
                                <h4>
                                    <b><a href="#" class="text-decoration-none text-danger">
                                            {{$produto->nome}}</a></b>
                                </h4>
                                
                            </div>
                            <div
                                class="col-6 offset-6 col-sm-6 offset-sm-6 col-md-4 offset-md-8 col-lg-3 offset-lg-0 col-xl-2 align-self-center mt-3">
                                <div class="input-group">
                                    <input type="number" class="form-control text-center border-dark" name="quantidade" value="{{$produto->quantidade_carrinho}}" max="{{$produto->quantidade}}" required>
                                    <button class="btn btn-outline-success btn-sm" type="submit">
                                        <i class="bi bi-bag-check" style="font-size: 16px; line-height: 16px;"></i>
                                    </button>
                                    <button class="btn btn-outline-danger border-dark btn-sm" type="button">
                                        <a href="{{route('carrinho-produto-delete',[$produto->id])}}">
                                        <i class="bi-trash" style="font-size: 16px; line-height: 16px;"></i>
                                        </a>
                                    </button>
                                </div>
                                <div class="text-end mt-2">
                                    <small class="text-secondary">Valor individual: R$ {{$produto->valor}}</small><br>
                                    <span class="text-dark">Valor Total: R$ {{$produto->valor*$produto->quantidade_carrinho}}</span>
                                </div>
                            </div>
                        </div>
                        <br>
                    </form>
                @endforeach
            </li>
            <li class="list-group-item py-3">
                <form name="f2" id="f2" method="get" action="{{route('carrinho-processar')}}">
                <div class="text-end">
                    <span class="d-block text-center">Código Cupom: <input name="cupom" type="text" placeholder="cupom opcional"><br></span>
                    <h4 class="text-dark mb-3">
                        Valor Total: R$ {{session('carrinho')->valortotal}}
                    </h4>
                    <a href="{{route('index')}}" class="btn btn-outline-success btn-lg">
                        Continuar Comprando                            
                    </a>
                    <input type="submit" value="Finalizar Compra" class="btn btn-danger btn-lg ms-2 mt-xs-3">
                </div>
                </form>
            </li>
        </ul>
    </div>
    <br>

@endsection
