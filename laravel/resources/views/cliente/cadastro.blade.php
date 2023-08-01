
@extends('layouts.main')

@section('content')

<div class="container">
    <h1>Realize seu cadastro</h1>
    <hr>
    <form class="mt-3" action="{{route('cadastro-store')}}" method="post">
        @csrf
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <fieldset class="row gx-3">
                    <legend>Dados Pessoais</legend>
                    <div class="form-floating mb-3">
                        <input class="form-control border" type="text" name="nome" id="txtNome" maxlength="200" value="{{old('nome')}}" placeholder=" "autofocus />
                        <label for="txtNome">Nome</label>
                    </div>
                </fieldset>
            </div>
            <div class="col-sm-12 col-md-6">
                <fieldset class="row gx-3">
                    <legend>Contatos</legend>
                    <div class="form-floating mb-3 col-md-6">
                        <input class="form-control border" type="email" name="email" value="{{old('email')}}" id="txtEmail" placeholder=" " />
                        <label for="txtEmail">E-mail</label>
                    </div>
                    <div class="form-floating mb-3 col-md-6">
                        <input class="form-control border" placeholder=" " name="telefone" value="{{old('telefone')}}" minlength="11" maxlength="11" type="text" id="txtTelefone" oninput="this.value = this.value.replace(/[^0-9]/g, '')" />
                        <label for="txtTelefone">Telefone</label>
                    </div>
                </fieldset>
            <br>
            </div>
                <div class="col-sm-12">
                    <fieldset class="row gx-3">
                        <legend>Senha de Acesso</legend>
                        <div class="form-floating mb-3 col-md-6">
                            <input class="form-control border" type="password" name="senha" value="{{old('senha')}}" id="txtSenha" placeholder=" " />
                            <label for="txtSenha">Senha</label>
                        </div>
                        <div class="form-floating mb-3 col-md-6">
                            <input class="form-control border" type="password" name="confirma_senha" value="{{old('confirma_senha')}}" id="txtConfirmacaoSenha" placeholder=" " />
                            <label class="form-label" for="txtConfirmacaoSenha">Confirmação da Senha</label>
                        </div>
                    </fieldset>
                </div>
            </div>
            <br>
            <a class="btn btn-lg btn-light btn-outline-danger" href="/">Cancelar</a>
            <input type="submit" value="Cadastrar" class="btn btn-lg btn-light btn-outline-danger"/>
        </div> 
        <br>
    </form>
</div>
@endsection
