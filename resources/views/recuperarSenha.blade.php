<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512" crossorigin="anonymous" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
</head>

<body>
@include('components.header')

<main>
    <div class="container mt-3">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card mt-4">
                    <h4 class="card-header ">Esqueci minha senha</h4>
                    <div class="card-body ">
                        <form action="{{route('recuperar_senha')}}" method="post">
                            @csrf
                            <div class="form-group my-3">
                                <label for="email" class="mb-2">Insira seu email para procurar sua conta.</label>
                                <input type="email" class="form-control" id="email" name="email">
                            </div>
                            <div class="d-flex justify-content-end mt-2">
                                <button type="submit" class="btn btn-outline-primary me-2">Enviar</button>
                                <a href="{{route('login')}}" class="btn btn-outline-secondary">Voltar</a>
                            </div>
                        </form>
                    </div>
                </div>
                <div>
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
        </div>
    </div>
</main>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
        crossorigin="anonymous"></script>
</body>
</html>
