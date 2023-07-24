<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8" />
    <title>Editar Senha</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="{{asset('css/crud.css')}}">
    <link rel="stylesheet" href="{{asset('css/datatable.css')}}">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.3/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.0/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <link href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>
<body>
    <div class='row me-4'>
        {{--Dashbord--}}
        @include('components.dashboard');

        {{--Template Editar perfil--}}
        <div class="container  text-center col-10 col-sm-9 col-xxl-9 col-md-8 mt-5 me-sm-0 me-md-5">
            <div class="dashboard-content">
                <div class="container">
                    <main>
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                    <div class="row mb-4 text-center border rounded" style="background-color: #edf2f7">
                                        <h2 class="mt-2">Editar senha</h2>
                                    </div>
                                    <form action="{{route('editarSenhaSave')}}" method="post" class="needs-validation" novalidate>

                                        @csrf
                                        <div class="row border rounded mb-4 " style="background-color: #edf2f7">
                                            <div class="col-md-6"> <!-- Campos a esquerda: -->
                                                <div class="my-4">
                                                    <label for="password" class="form-label">Senha nova:</label>
                                                    <input type="password" class="form-control" name="senhaNova" id="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,30}$" title="A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, e ter de 8 a 30 caracteres." required minlength="8" maxlength="30" oninput="verificarSenhas()">
                                                    <div class="invalid-feedback">
                                                        A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, e ter de 8 a 30 caracteres.
                                                    </div>
                                                    <span id="senhaMessage" class="text-danger"></span>
                                                </div>


                                            </div>

                                            <div class="col-md-6"> <!-- Campos a direita agora: -->
                                                <div class="my-4">
                                                    <label for="password" class="form-label">Confirme a senha nova:</label>
                                                    <input type="password" class="form-control" name="confirmeSenhaNova" id="confirm_password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,30}$" title="A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, e ter de 8 a 30 caracteres." required minlength="8" maxlength="30" oninput="verificarSenhas()">
                                                    <div class="invalid-feedback">
                                                        A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, e ter de 8 a 30 caracteres.
                                                    </div>
                                                    <span id="confirmeSenhaMessage" class="text-danger"></span>
                                                </div>
                                            </div>

                                            <div class="my-4 text-center">
                                                <div class="my-0">
                                                    <label for="password" class="form-label">Senha antiga:</label>
                                                    <input type="password" class="form-control" name="senhaAntiga" required minlength="8" maxlength="30" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,30}$" title="A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, e ter de 8 a 30 caracteres." >
                                                    <div class="invalid-feedback">
                                                        A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, e ter de 8 a 30 caracteres.
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="text-center">
                                                <button type="submit" class="btn btn-primary mb-4">Enviar</button>
                                            </div>


                                        </div>
                                    </form>

                                    @if(session('success'))
                                        <div class="alert alert-success text-center mt-3">
                                            <span>{{ session('success') }}</span>
                                        </div>
                                    @endif

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
                </div>
            </div>
        </div>
    </div>
</body>
</html>
