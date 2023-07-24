<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Novo Cadastro</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512" crossorigin="anonymous" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"> </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.js"></script>


</head>

<body>
    @include('components.header')

<main>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="row mb-4 text-center border rounded" style="background-color: #edf2f7">
                    <h2 class="mt-4">Criar nova conta:</h2>
                    <h4 class="my-2">Já tem uma conta? Faça seu login <a href="{{route('login')}}"> aqui</a></h4>
                </div>
                <form action="{{route('registrar')}}" method="post" class="needs-validation" novalidate>

                    @csrf

                    <div class="row border rounded mb-4 " style="background-color: #edf2f7">
                        <div class="col-md-6">
                            <div class="my-4">
                                <label for="nome" class="form-label">Nome:</label>

                                <input type="text" class="form-control" id="nome" name="name" pattern="[A-Za-zÀ-ÿ\s]{1,300}" required>
                                <!-- Se quiser, adicione o apóstrofo ' -->

                                <div class="invalid-feedback">
                                    O nome é obrigatório e deve conter no mínimo 1 letra e no máximo 300 letras.
                                </div>
                            </div>

                            <div class="my-4">
                                <label for="email" class="form-label">E-mail:</label>
                                <input type="email" class="form-control" id="email" name="email" required>
                                <div class="invalid-feedback">
                                    Digite um e-mail válido.
                                </div>
                            </div>

                            <div class="my-4">
                                <label for="password" class="form-label">Senha:</label>

                                <input type="password" class="form-control" name="password" id="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,30}$" title="A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, e ter de 8 a 30 caracteres." required oninput="verificarSenhas()">
                                <!--
                                ^ e $: indicam o início e o fim da string, garantindo que a expressão regular corresponda à string de senha inteira, em vez de apenas uma substring dentro da senha.
                                [A-Za-z\d]{8,30}: corresponde a qualquer combinação de letras maiúsculas, minúsculas e dígitos, com um comprimento mínimo de 8 caracteres e máximo de 30 caracteres.

                                (?=.*[a-z]): Verifica a presença de pelo menos uma letra minúscula (é uma assertiva positiva lookahead).
                                (?=.*[A-Z]): Verifica a presença de pelo menos uma letra maiúscula.
                                (?=.*\d): Verifica a presença de pelo menos um dígito (número).

                                \W = caracteres especiais.
                                -->
                                <div class="invalid-feedback">
                                    A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, e ter de 8 a 30 caracteres.
                                </div>
                                <span id="senhaMessage" class="text-danger"></span>

                            </div>

                            <div class="my-4">
                                <label for="confirm_password" class="form-label">Repetir Senha:</label>

                                <input type="password" class="form-control" name="confirm_password" id="confirm_password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,30}$" title="A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, e ter de 8 a 30 caracteres." required oninput="verificarSenhas()">
                                <div class="invalid-feedback">
                                    A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, e ter de 8 a 30 caracteres.
                                </div>
                                <span id="confirmeSenhaMessage" class="text-danger"></span>

                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="my-4">
                                <label for="datadeNascimento" class="form-label">Data de Nascimento: </label>
                                <input type="date" class="form-control" id="datanascimento" name="datadeNascimento" title="A data de nascimento deve ser válida e relativa a uma idade menor que 130 anos e maior que 13 anos." required oninput="validarDataNascimento()">
                                <div class="invalid-feedback">
                                    A data de nascimento deve ser válida e relativa a uma idade menor que 130 anos e maior que 13 anos.
                                </div>
                                <span id="datadeNascimentoMessage" class="text-danger"></span>
                            </div>

                            <div class="my-4">
                                <label for="celular" class="form-label">Celular:</label>

                                <input type="tel" class="form-control" id="celular" name="telefone"pattern="\([0-9]{2}\)[\s][0-9]{5}-[0-9]{4,5}" title="Digite um número de celular válido com DDD (21 12345 6789)" required >
                                <script> $('#celular').mask('(00) 00000-0000');</script>


                                <div class="invalid-feedback">
                                    Digite um número de celular válido com DDD (21 12345 6789).
                                </div>
                            </div>

                            <div class="my-4">
                                <label for="curriculoLattes" class="form-label">Currículo Lattes:</label>
                                <input type="text" class="form-control" id="lattes" name="curriculoLattes" title="Digite uma URL válida (http://www.exemplo.com).">
                                <div class="invalid-feedback">
                                    Digite uma URL válida ex:(http://www.exemplo.com)
                                </div>
                                <span id="curriculoLattesMessage" class="text-danger"></span>


                            </div>

                            <div class="my-4">
                                <label for="instituicao" class="form-label">Instituição:</label>

                                <input type="text" class="form-control" id="instituicao" name="instituicao" pattern="[A-Za-zÀ-ÿ\s]{1,200}" title="A instituição deve conter no mínimo 1 e no máximo 200 caracteres alfanuméricos." required>

                                <div class="invalid-feedback">
                                    A instituição deve conter no mínimo 1 e no máximo 200 caracteres alfanuméricos.
                                </div>
                                <span id="instituicaoMessage" class="text-danger"></span>

                            </div>
                        </div>

                        <div class="my-4 text-center">
                            <label for="funcao" class="form-label">Função:</label>

                            <input type="text" class="form-control" id="funcao" name="funcao" pattern="[A-Za-zÀ-ÿ\s]{1,200}" title="A função deve ser composta apenas por caracteres alfanuméricos, ter no mínimo 1 e no máximo 200 caracteres.">

                            <div class="invalid-feedback">
                                A função deve ser composta apenas por caracteres alfanuméricos, ter no mínimo 1 e no máximo 200 caracteres.
                            </div>
                            <span id="funcaoMessage" class="text-danger"></span>
                        </div>

                        <div class="my-4 text-center">
                            <label class="form-label">Sexo:  </label>
                            <div class="form-check-inline">
                                <input class="form-check-input" type="radio" name="sexo" id="Feminino" value="Feminino">
                                <label class="form-check-label" for="feminino">Feminino</label>
                            </div>
                            <div class="form-check-inline">
                                <input class="form-check-input" type="radio" name="sexo" id="Masculino" value="Masculino"
                                       checked>
                                <label class="form-check-label" for="masculino">Masculino</label>
                            </div>
                        </div>

                        <div class="text-center">
                            <button type="submit" class="btn btn-primary mb-4">Enviar</button>
                        </div>
                    </div>
                </form>

                @if ($errors->any())
                    @foreach ($errors->all() as $error)
                        <div class="alert alert-danger text-center mt-3">
                            <span>{{ $error }}</span>
                        </div>
                    @endforeach
                @endif

            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
            crossorigin="anonymous"></script>

    <script src="{{ asset('js/validacao.js') }}" ></script>

</main>
</body>
</html>
