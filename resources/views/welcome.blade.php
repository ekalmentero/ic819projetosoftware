<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LabOrganizer</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512" crossorigin="anonymous" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
</head>

<body>
    @include('components.header')

<main>
    <div class="container mt-3">
        <div class="row" style="background-color: #f1f1f1;">
            <div class="col-md-6 col-12">
                <div class="container p-5">
                    <h1>Vamos organizar<br>
                        seus projetos!</h1>

                    <div class="mt-4">
                            <span>Aqui você pode organizar seus projetos dentro do laboratório, organizando os participantes, resultados dos experimentos, estoque e agendamento de equipamentos.</span>
                    </div>

                    <div class="mt-4">
                        <a href="{{route("login")}}">
                            <button type="button" class="btn btn-outline-dark">Comece aqui</button>
                        </a>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-12 pe-0">
                <img src="{{ asset('img/pessoaMicroscopio.jpg') }}"  alt="microscopio" width="100%" height="100%">
            </div>
        </div>
    </div>
</main>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
        crossorigin="anonymous"></script>
</body>
</html>
