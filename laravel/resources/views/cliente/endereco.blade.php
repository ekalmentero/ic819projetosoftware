@extends('layouts.main')

@section('title', 'Bem Doces | Endereço')

@section('content')
    <div class="container">
        <h2 class="border p-3" style="background-color: white;">Bem vindo(a), {{session('user')->nome}}</h2>
        <br>
        <div class="row gx-3">
            <div class="col-4">
            <div class="list-group">
                    <a href="{{route('atualizar-dados')}}" class="list-group-item list-group-item-action">
                        <i class="bi-mailbox fs-6"></i> Dados cadastrais
                    </a>
                    <a href="{{route('tela_endereco')}}" class="list-group-item list-group-item-action bg-danger text-light">
                        <i class="bi-house-door fs-6"></i> Endereço
                    </a>
                    <a href="{{route('pedidos')}}" class="list-group-item list-group-item-action">
                        <i class="bi-truck fs-6"></i> Pedidos
                    </a>
                    <a href="{{route('tela_cartao')}}" class="list-group-item list-group-item-action">
                        <i class="bi bi-card-list"></i> Cartão
                    </a>
                    <a href="{{route('index')}}" class="list-group-item list-group-item-action">
                        <i class="bi-door-open fs-6"></i> Sair
                    </a>
                </div>
            </div>
            <div class="col-8">
                <a href="{{route('novo_endereco')}}"><button type="button" class="btn btn-danger">Adicionar novo endereço</button></a><br><br>
                @foreach($enderecos as $endereco)
                <form action="{{route('endereco-update',[$endereco->id])}}" method="get">
                    <div class="accordion" id="divPedidos">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#{{$endereco->id}}">
                                    <b>{{$endereco->apelido}}</b>
                                </button>
                            </h2>
                            <div id="{{$endereco->id}}" class="accordion-collapse collapse" data-bs-parent="#divPedidos">
                                <div class="accordion-body">
                                    <div class="d-flex align-items-center">
                                        <div class="form-floating mb-3 col-md-6 col-lg-4">
                                            <input class="form-control" name="cep" type="numeric" maxlength="8" id="txtCEP" value="{{$endereco->cep}}" placeholder=" " />
                                            <label for="txtCEP"><b>CEP:</b></label>
                                        </div>
                                        <div class="form-floating mb-3 col-md-4 espacamento">
                                            <input class="form-control" type="numeric" name="numero" maxlength="4" value="{{$endereco->numero}}" id="txtNumero" placeholder=" " />
                                            <label for="txtNumero"><b>Número:</b> </label>
                                        </div>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input class="form-control" type="text" name="rua" maxlength="200" value="{{$endereco->rua}}" id="txtRua" placeholder=" " />
                                        <label for="txtRua"><b>Rua:</b> </label>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <div class="form-floating mb-3 col-md-6 col-lg-4">
                                            <input class="form-control" type="text" name="cidade" maxlength="200" value="{{$endereco->cidade}}" id="txtCidade" placeholder=" " />
                                            <label for="txtCEP"><b>Cidade:</b> </label>
                                        </div>
                                        <div class="form-floating mb-3 col-md-4 espacamento">
                                            <input class="form-control" type="text" name="bairro" maxlength="200" id="txtBairro" value="{{$endereco->bairro}}" placeholder=" " />
                                            <label for="txtNumero"><b>Bairro:</b> </label>
                                        </div>
                                        <div class="form-floating mb-3 col-md-4 espacamento">
                                            <input class="form-control" type="text" name="apelido" maxlength="200" id="txtBairro" value="{{$endereco->apelido}}" placeholder=" " />
                                            <label for="txtNumero"><b>Apelido:</b> </label>
                                        </div>
                                    </div>
                                    <button type="button" onclick="window.location='{{route("endereco-delete",[$endereco->id])}}'" class="btn btn-danger">Excluir endereço</button>
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
@endsection