<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redefinindo senha</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512" crossorigin="anonymous" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
</head>
    <body>
        @include('components.header')
        <div class="container">
            <div class="card justify-content-center text-center"> <!-- Adicionada a classe "text-center" -->
                <div class="card-header"><h4>{{ __('Redefinir senha') }}</h4></div>
                <div class="card-body">
                    <form method="POST" action="{{route('resetar.senha')}}" class="needs-validation" novalidate>
                        @csrf
                        <input type="hidden" name="token" value="{{$token}}">
                        <div class="row justify-content-center"> <!-- Adicionada a classe "row" e a classe "justify-content-center" -->
                            <div class="col-md-8"> <!-- Modificada a classe para "col-md-8" -->
                                <label for="email" class="col-md-4 form-label text-md-right">Endereço de E-mail:</label>
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{  request('email') }}" required autocomplete="email" autofocus readonly>

                                <label for="password" class="col-md-4 col-form-label text-md-right">Senha:</label>
                                <input type="password" class="form-control" name="password" id="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,30}$" title="A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, e ter de 8 a 30 caracteres." required oninput="verificarSenhas()">
                                <div class="invalid-feedback">
                                    A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, e ter de 8 a 30 caracteres.
                                </div>
                                <span id="senhaMessage" class="text-danger"></span>
                                <div>
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirmar Senha:</label>
                                <input type="password" class="form-control" name="password_confirmation" id="confirm_password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,30}$" title="A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, e ter de 8 a 30 caracteres." required oninput="verificarSenhas()">
                                <div class="invalid-feedback">
                                    A senha deve conter no mínimo 8 e no máximo de 30 caracteres.
                                </div>
                                <span id="confirmeSenhaMessage" class="text-danger"></span>
                                </div>

                                @if ($errors->any())
                                    @foreach ($errors->all() as $error)
                                        <div class="alert alert-danger text-center mt-3">
                                            {{ $error }}
                                        </div>
                                    @endforeach
                                @endif
                                @if (session('success'))
                                    <div class="alert alert-success  text-center mt-3">
                                        {{ session('success') }}
                                    </div>
                                @endif
                                @if (session('danger'))
                                    <div class="alert alert-danger  text-center mt-3">
                                        {{ session('danger') }}
                                    </div>
                                @endif
                            </div>
                        </div>

                        <div class="d-flex justify-content-center mt-3"> <!-- Adicionada a classe "mt-3" para espaçamento superior -->
                            <button type="submit" class="btn btn-outline-primary">Enviar</button> <!-- Removida a classe "my-2" -->
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </body>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
            crossorigin="anonymous"></script>
    <script src="{{ asset('js/validacao.js') }}" ></script>

</html>
