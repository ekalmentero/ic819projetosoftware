@extends('layouts.main')

@section('title', 'Bem Doces | Cartão')

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
                    <a href="{{route('tela_endereco')}}" class="list-group-item list-group-item-action">
                        <i class="bi-house-door fs-6"></i> Endereço
                    </a>
                    <a href="{{route('pedidos')}}" class="list-group-item list-group-item-action">
                        <i class="bi-truck fs-6"></i> Pedidos
                    </a>
                    <a href="{{route('tela_cartao')}}" class="list-group-item list-group-item-action bg-danger text-light">
                        <i class="bi bi-card-list"></i>Cartão
                    </a>
                    <a href="{{route('index')}}" class="list-group-item list-group-item-action">
                        <i class="bi-door-open fs-6"></i> Sair
                    </a>
                </div>
            </div>
            <div class="col-8">
                <a href="{{route('novo_cartao')}}"><button type="button" class="btn btn-danger">Adicionar novo Cartão</button></a><br><br>
                
                    <div class="accordion" id="divPedidos">
                    @foreach($cartoes as $cartao) 
                    <form action="{{route('cartao-delete',[$cartao->id])}}" method="get">   
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#pedido000010">
                                    <b>{{$cartao->apelido}}</b>
                                </button>
                            </h2>
                            <div id="pedido000010" class="accordion-collapse collapse" data-bs-parent="#divPedidos">
                                <div class="accordion-body">
                                    <div class="d-flex align-items-center">
                                        <div class="form-floating mb-3 col-md-6 col-lg-4">
                                            <input class="form-control" value="{{$cartao->numerocartao}}" type="text" id="txtCEP" placeholder=" " readonly/>
                                            <label for="txtCEP"><b>Número:</b> <span></span></label>
                                        </div>
                                        <div class="form-floating mb-3 col-md-4 espacamento">
                                            <input class="form-control" type="text" value="não exibido por segurança" id="txtNumero" placeholder=""readonly />
                                            <label for="txtNumero"><b>CVV:</b> <span></span></label>
                                        </div>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input class="form-control" type="text" value="{{$cartao->nometitular}}" id="txtRua" placeholder=" " readonly/>
                                        <label for="txtRua"><b>Nome do titular:</b> <span></span></label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input class="form-control" type="text" value="{{$cartao->apelido}}" id="txtRua" placeholder=" " readonly/>
                                        <label for="txtRua"><b>apelido do cartão:</b> <span></span></label>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <div class="form-floating mb-3 col-md-6 col-lg-4">
                                            <input class="form-control" type="text" id="txtCidade" value="{{ date('m/y', strtotime($cartao->datavencimento)) }}" placeholder=" " readonly/>
                                            <label for="txtCEP"><b>Data de Vencimento:</b> <span></span></label>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-danger">Excluir cartão</button>
                                    
                                </div>
                            </div>
                        </div>
                    </form>
                    @endforeach
                    </div>
                
            </div>
        </div>
    </div>
    <br>
@endsection