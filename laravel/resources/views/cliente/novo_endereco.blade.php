@extends('layouts.main')

@section('title','Bem Doces | Novo Endereco')

@section('content')

<div class="container">
    <h1>Novo Endereço</h1>
    <hr>
    <form class="mt-3" action="{{route('endereco-create')}}" method="post">
        @csrf
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <fieldset class="row gx-3">
                    <div class="form-floating mb-3">
                        <input class="form-control border" type="text" maxlength="200" name="rua" id="txtNome" value="{{old('rua')}}" placeholder=" "autofocus/>
                        <label for="txtNome">Rua</label>
                    </div>
                </fieldset>
            </div>
            <div class="col-sm-12 col-md-6">
                <fieldset class="row gx-3">
                    <div class="form-floating mb-3 col-md-6">
                        <input class="form-control border" type="text" maxlength="8" name="cep" value="{{old('cep')}}" id="txtEmail" placeholder=" " />
                        <label for="txtEmail">CEP</label>
                    </div>
                    <div class="form-floating mb-3 col-md-6">
                        <input class="form-control border" placeholder=" " maxlength="4" name="numero" value="{{old('numero')}}"  type="text" id="txtTelefone" />
                        <label for="txtTelefone" oninput="this.value = this.value.replace(/[^0-9]/g, '')">Número</label>
                    </div>
                </fieldset>
            <br>
            </div>
            <div class="col-sm-12">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-floating mb-3">
                            <input class="form-control border" type="text" maxlength="200" name="bairro" value="{{old('bairro')}}" id="txtSenha" placeholder=" " />
                            <label for="txtSenha">Bairro</label>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-floating mb-3">
                            <input class="form-control border" type="text" maxlength="200" name="apelido" value="{{old('apelido')}}" id="txtSenha" placeholder=" " />
                            <label for="txtSenha">Apelido</label>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-floating mb-3">
                            <input class="form-control border" type="text" maxlength="200" name="cidade" value="{{old('cidade')}}" id="txtConfirmacaoSenha" placeholder=" " />
                            <label class="form-label" for="txtConfirmacaoSenha">Cidade</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a class="btn btn-lg btn-light btn-outline-danger" href="{{route('tela_endereco')}}">Cancelar</a>
        <input type="submit" value="Cadastrar" class="btn btn-lg btn-light btn-outline-danger"/>
        <br><br>
    </form>
</div>
@endsection
