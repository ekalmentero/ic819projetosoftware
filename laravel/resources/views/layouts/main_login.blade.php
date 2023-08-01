<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
        
    <link rel="icon" href="img/favicon.ico" type="image/x-icon">

    <!-- Style local-->
    
    <link rel="stylesheet" href="/css/style_logado.css">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/node_modules/bootstrap-icons/font/bootstrap-icons.css">

    <title>@yield('title')</title>
    </head>
    <body>
        <div class="d-flex flex-column wrapper background">
            <nav class="navbar navbar-expand-lg navbar-dark bg-danger border-bottom shadow-sm mb-3">
                <div class="container">
                <img class="logo" src="{{ asset('img/logo.png') }}"></img>
                <a class="navbar-brand" href="/"><strong>Bem Doces</strong></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse">
                    <span class="navbar-toggler-icon"></span>
                </button>

                    <div class="navbar-collapse collapse">
                        <ul class="navbar-nav flex-grow-1">
                            <li class="nav-item"><span class="nav-link text-white">Cel: (24) 99999-8752</span></li>
                            <li class="nav-item"><span class="nav-link text-white">E-mail: bemdoces2019@gmail.com</span></li>
                        </ul>
                        <div class="align-self-end">
                            <ul class="navbar-nav">
                                <li class="nav-item"><a href="contatos" class="nav-link text-white">Acessar minha conta</a></li>
                                <li class="nav-item"><a href="{{route('login-destroy')}}" class="nav-link text-white">Sair</a></li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link text-white">
                                        <svg class="bi" width="24" height="24" fill="currentColor">
                                            <use xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#cart3"></use>
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>    
            </nav>
        <header>
            @yield('header')
        </header>
         <!-- Tratamento de erros e respostas do servidor-->
         @if($errors->any())
                <div class="error">
                    @foreach($errors->all() as $error)
                        <p>{{$error}}</p>
                    @endforeach
                </div>
            @elseif(session('mensagem_sucesso'))
                <div class="success">
                    <p>{{session('mensagem_sucesso')}}</p>
                </div>
            @elseif(session('mensagem_falha'))
                <div class="error">
                    <p>{{session('mensagem_falha')}}</p>
                </div>
            @endif
        <main class="flex-fill">
            @yield('content')
        </main>
            <footer class="border-top text-light footer">
                <div class="container">
                    <div class="row py-3">
                        <div class="col-12 col-md-4 text-center">&copy; 2023 - Bem Doces</div>
                        <div class="col-12 col-md-4 text-center">Rua Osório Gomes de Brito, 94, Vila Nova</div>
                        <div class="col-12 col-md-4 text-center">Barra Mansa, RJ</div>
                    </div>
                </div>
            </footer>
        </div>
        <!-- Bootstrap JavaScript -->
        <script src="/node_modules/bootstrap/dist/js/bootstrap.bundle.js"></script>
    </body>
</html>
