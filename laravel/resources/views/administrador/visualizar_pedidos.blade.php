@extends('layouts.main')

@section('title', 'Bem Doces')

@section('content')
    <div class="container">
        <div class="row gx-3">
            <div class="col-12 col-md-8">
                <div class="accordion" id="tipo4">
                    @foreach($compras as $compra)
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#pedido{{$compra->id}}">
                                @if($compra->status == 'pedido recebido')
                                <b>Pedido {{$compra->id}} - <span>{{$compra->nome}}</span> - <span style="color:blue">{{$compra->status}}</span></b>
                                @elseif($compra->status == 'Pedido Cancelado')
                                <b>Pedido {{$compra->id}} - <span>{{$compra->nome}}</span> - <span style="color:red">{{$compra->status}}</span></b>
                                @elseif($compra->status == 'Pedido Entregue')
                                <b>Pedido {{$compra->id}} - <span>{{$compra->nome}}</span> - <span style="color:green">{{$compra->status}}</span></b>
                                @else
                                <b>Pedido {{$compra->id}} - <span>{{$compra->nome}}</span> - <span style="color:orange">{{$compra->status}}</span></b>
                                @endif
                                <span class="mx-1">realizado em {{ date('d/m/y',strtotime($compra->hora_compra)) }}</span>
                            </button>
                        </h2>
                        <div id="pedido{{$compra->id}}" class="accordion-collapse collapse" data-bs-parent="#divPedidos">
                            
                            <i class="fas fa-info-circle"></i>
                            <div class="accordion-body">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Produto</th>
                                            <th class="text-end">R$ Unit.</th>
                                            <th class="text-center">Qtde.</th>
                                            <th class="text-end">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach($produtos as $produtosachados)
                                            @if($produtosachados->fk_compra_id == $compra->id)
                                                <tr>
                                                    <td>{{$produtosachados->nomeproduto}}</td>
                                                    <td class="text-end">R$ {{$produtosachados->valorproduto}}</td>
                                                    <td class="text-center">{{$produtosachados->quantidade}}</td>
                                                    <td class="text-end">R$ {{$produtosachados->valorproduto * $produtosachados->quantidade}}</td>
                                                </tr>
                                            @endif
                                        @endforeach
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th class="text-end" colspan="3">Valor dos Produtos:</th>
                                            <td class="text-end">R$ {{$compra->valortotal}}</td>
                                        </tr>
                                        @if(is_null($compra->endereco))
                                        <tr>
                                            <th class="text-end" colspan="3">Valor do Frete:</th>
                                                <td class="text-end"> R$ 0,00</td>                                          
                                        </tr>
                                        @else
                                        <tr>
                                            <th class="text-end" colspan="3">Valor do Frete:</th>
                                                <td class="text-end"> R$ {{$compra->frete}}</td>
                                        </tr>
                                        <tr>
                                            @foreach($enderecos as $endereco)
                                                @if($compra->id== $endereco->compraid)
                                                    <th class="text-end" colspan="3">Endereço:</th>
                                                    <td class="text-end">Rua {{$endereco->rua}} {{$endereco->numero}}, {{$endereco->bairro}}</td>
                                                @endif
                                            @endforeach
                                        </tr>
                                        @endif
                                        <tr>
                                            <th class="text-end" colspan="3">Valor a Pagar:</th>
                                            
                                                <td class="text-end">R$ {{$compra->valortotal+$compra->frete}}</td>
                                            
                                        </tr>
                                        <tr>
                                            <th class="text-end" colspan="3">Forma de Pagamento:</th>
                                            @if($compra->tipo_pagamento == 'dinheiro')
                                                <td class="text-end">pagamento em dinheiro</td>
                                            @elseif($compra->tipo_pagamento == 'pix')
                                                <td class="text-end">pagamento em pix</td>
                                            @else
                                                <td class="text-end">pagamento em cartão</td>
                                            @endif
                                        </tr>
                                    </tfoot>
                                </table>
                                @if(!is_null($compra->descricao))
                                <textarea class="form-control border rounded" style="width: 100%" placeholder="mensagem do atendente" disabled>{{$compra->descricao}}</textarea>
                                @endif
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
    <script src="/js/alterar_status_pedido.js"></script>
@endsection
