@extends('layouts.main')

@section('title', 'Bem Doces | Administrador')

@section('content')
    <div class="container mt-4">
        <h1>Área de Cupons</h1>
        <div class="row gx-3">           
            <div>
                <a href="{{route('novo-cupom')}}" class="margem d-inline-block"><button type="button" class="btn btn-primary">Adicionar novo cupom</button></a><br><br>
                @foreach($cupons as $cupom)
                <form action="{{route('cupom-delete',[$cupom->id])}}" method="get">
                    <div class="accordion" id="divPedidos">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#{{$cupom->id}}">
                                    <b>Cupom {{$cupom->codigo}}</b>
                                </button>
                            </h2>
                            <div id="{{$cupom->id}}" class="accordion-collapse collapse" data-bs-parent="#divPedidos">
                                <div class="accordion-body">
                                    <div class="form-floating mb-3">
                                        <textarea class="form-control"  id="txtRua" placeholder=" " disabled>{{$cupom->descricao}}</textarea>
                                        <label for="txtRua">Descrição: <span></span></label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="descricao" value="{{$cupom->codigo}}" placeholder= " " disabled></input>
                                        <label for="descricao">Código: <span></span></label>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-floating mb-3">
                                                <input class="form-control" id="valorPromocional" value="{{$cupom->desconto}}%" placeholder=" " disabled></input>
                                                <label for="valorPromocional">Porcentagem de desconto: <span></span></label>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-floating mb-3">
                                                <input class="form-control" value="{{$cupom->numporpessoa}}" id="usosRestantes" placeholder=" " disabled disabled></input>
                                                <label for="usosRestantes">Quantidade de usos por cliente: <span></span></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row"> 
                                        <div class="col-md-6 col-12 mb-3"> 
                                            <div class="border p-3">
                                                <button type="button" class="btn btn-light custom-cursor-pointer" id="mostrarProdutos1">Aplicáveis aos tipos:</button>
                                                <div id="listaProdutos1" >
                                                    @if(!is_null($cupom->tipo1))
                                                    <div class="form-check">
                                                        <input type="checkbox" class="form-check-input" name="produto" value="produto2" id="produto2" disabled/>
                                                        <label class="form-check-label custom-cursor-pointer" for="produto2">{{$cupom->tipo1}}</label>
                                                    </div>
                                                    @endif
                                                    @if(!is_null($cupom->tipo2))
                                                    <div class="form-check">
                                                        <input type="checkbox" class="form-check-input" name="produto" value="produto2" id="produto2" disabled/>
                                                        <label class="form-check-label custom-cursor-pointer" for="produto2">{{$cupom->tipo2}}</label>
                                                    </div>
                                                    @endif
                                                    @if(!is_null($cupom->tipo2))
                                                    <div class="form-check">
                                                        <input type="checkbox" class="form-check-input" name="produto" value="produto2" id="produto2" disabled/>
                                                        <label class="form-check-label custom-cursor-pointer" for="produto2">{{$cupom->tipo3}}</label>
                                                    </div>
                                                    @endif
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-12"> 
                                            <div class="border p-3"> 
                                                <button type="button" class="btn btn-light custom-cursor-pointer" id="mostrarProdutos2">Aplicáveis aos produtos:</button>
                                                <div id="listaProdutos1" style="overflow-y: scroll; height:100px;">
                                                @foreach($prodcupons as $produto)
                                                    @if($produto->cupomid == $cupom->id)
                                                        <div class="form-check">
                                                            <input type="checkbox" class="form-check-input" name="produto" value="{{$produto->nome}}" id="{{$produto->nome}}"disabled />
                                                            <label class="form-check-label custom-cursor-pointer" for="{{$produto->nome}}">{{$produto->nome}}</label>
                                                        </div>
                                                        
                                                    @endif
                                                @endforeach
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <br><br>
                                    <button type="submit" class="btn btn-danger">Excluir cupom</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                @endforeach
            </div>
        </div>
    </div>
    
@endsection
