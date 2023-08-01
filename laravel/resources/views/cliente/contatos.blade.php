@extends('layouts.main')

@section('title', 'Bem Doces | Contatos')

@section('content')
    <div class="container">
        <h2 class="border p-3" style="background-color: white;">Bem vindo(a), {{session('user')->nome}}</h2>
        <br>
        <div class="row gx-3">
            <div class="col-4">
                <div class="list-group">
                    <a href="{{route('atualizar-dados')}}" class="list-group-item list-group-item-action bg-danger text-light">
                        <i class="bi-mailbox fs-6"></i> Dados cadastrais
                    </a>
                    <a href="{{route('tela_endereco')}}" class="list-group-item list-group-item-action">
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
                <form action="{{route('dados-update')}}" method="get">
                    <div class="form-floating mb-3 col-md-16">
                        <input class="form-control" type="email" id="txtEmail" name="email" value="{{session('user')->email}}" placeholder=" " autofocus/>
                        <label for="txtEmail">E-mail</label>
                    </div>
                    <div class="form-floating mb-3 col-md-16">
                        <input class="form-control" type="text" id="txtTelefone" name="telefone" value="{{session('user')->telefone}}" placeholder=" " />
                        <label for="txtTelefone">Telefone</label>
                    </div> 
                    <div class="form-floating mb-3 col-md-16">
                        <input class="form-control border" type="password" name="senha" value="{{old('senha')}}" id="txtSenha" placeholder=" " />
                        <label for="txtSenha">Nova senha</label>
                    </div>
                    <div class="form-floating mb-3 col-md-16">
                        <input class="form-control border" type="password" name="confirma_senha" value="{{old('confirma_senha')}}" id="txtConfirmacaoSenha" placeholder=" " />
                        <label class="form-label" for="txtConfirmacaoSenha">Confirmação da Senha</label><br>
                        <button type="submit" class="btn btn-danger">Salvar alterações</button>
                    </div>                           
                </form>
            </div>
        </div>
    </div>
    <br>
@endsection


        