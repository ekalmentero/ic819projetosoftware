@extends('layouts.main')

@section('title','Bem Doces | Novo Cartão')

@section('content')

<div class="container">
    <h1>Novo Cartão</h1>
    <hr>
    <form class="mt-3" action="{{route('cartao-create')}}" method="post">
        @csrf
        <div class="row">
            <div class="col-sm-12">
                <div class="form-floating mb-3 col-md-6">
                    <input class="form-control border" type="text"  maxlength="200" name="nometitular" placeholder=" " />
                    <label for="txtEmail">Nome completo do Titular</label>
                </div>
                <div class="form-floating col-sm-12 col-md-6">
                    <input class="form-control border" type="text" minlength="3" maxlength="3" name="cvv" placeholder=" " oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
                    <label for="txtTelefone">CVV</label>
                </div>   
            <br>
            </div>
            <div class="col-sm-12">
                <div class="col-md-4">
                    <div class="form-floating mb-3">
                        <input class="form-control border" minlength="12" maxlength="12" name="numerocartao" type="text" placeholder=" " oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
                        <label for="txtSenha">Número do Cartão</label>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-floating mb-3">
                        <input class="form-control border" name="apelido" maxlength="200" type="text" placeholder=" " />
                        <label for="txtSenha">apelido do Cartão</label>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-floating mb-3">
                        <input class="form-control border" type="month" name="datavencimento" placeholder=" " />
                        <label class="form-label" for="txtConfirmacaoSenha">Data de Vencimento</label>
                    </div>
                </div>
            </div>
        </div>
        <a class="btn btn-lg btn-light btn-outline-danger" href="cartao">Cancelar</a>
        <input type="submit" value="Cadastrar" class="btn btn-lg btn-light btn-outline-danger"/>
        <br><br>
    </form>
</div>
@endsection
