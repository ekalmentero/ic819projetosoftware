<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8"/>
    <title>Agendar Equipamento</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="{{asset('css/crud.css')}}">
    <link rel="stylesheet" href="{{asset('css/calender.css')}}">
    <link rel="stylesheet" href="{{asset('css/datatable.css')}}">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.3/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.0/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <link href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

</head>
    <body>
    <div class="row me-2 me-md-5">
        {{--Dashbord--}}
        @include('components.dashboard')

        {{--Template agendar equipamento--}}
        <div class="container text-center col-10 col-sm-9 col-xxl-9 col-md-9 mt-2 me-md-0 ">
            <h1 class=" p-3 bg-dark text-white rounded">Agendar Equipamento</h1>
            <div class="text-end mt-3">
                <button id="visualizar_agenda" type="button" class="btn btn-dark" data-toggle="modal"
                        data-target="#listaAgendamentoModal">
                    <i class="bi bi-calendar-check-fill"></i> Meus Agendamentos
                </button>
            </div>

            @if(session('error'))
                <div class="alert alert-danger text-center my-2 mensagemError">
                    {{ session('error') }}
                </div>
            @endif

            @if(session('message'))
                <div class="alert alert-success text-center my-2 mensagemSucesso">
                    {{ session('message') }}
                </div>
            @endif

            @if(session('disponibilidade'))
                <div class="alert alert-info text-center my-2 mensagemSucesso">
                    {{ session('disponibilidade') }}
                </div>
            @endif

            @if ($errors->any())
                @foreach ($errors->all() as $error)
                    <div class="alert alert-danger text-center my-1 mensagemError">
                        <span>{{ $error }}</span>
                    </div>
                @endforeach
            @endif

            <div class="table-responsive-md d-none d-md-block text-center p-2">
                <table class="table table-bordered" id="projectTable">
                    <thead>
                    <tr class="text-center">
                        <th class="bg-dark text-white" scope="col">#</th>
                        <th class="bg-dark text-white" scope="col">Equipamento</th> <!-- Nova coluna -->
                        <th class="bg-dark text-white" scope="col">Quantidade</th>
                        <th class="bg-dark text-white" scope="col">Tipo</th>
                        <th class="bg-dark text-white" scope="col">Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($equipamentos as $equipamento)

                        <tr class="text-center">
                            <th scope="row">{{$loop->iteration}}</th>
                            <td>{{$equipamento->nome}}</td>
                            <td>{{$equipamento->quantidade}}</td>
                            @foreach($tipo_equipamentos as $tipo_equipamento)
                                @if($tipo_equipamento->id == $equipamento->tipoEquipamento)
                                    <td>{{$tipo_equipamento->descricao}}</td>
                                @endif
                            @endforeach
                            <td scope="col" class="text-center">
                                <a href="#viewEquipamentoModal" class="view" id="visualizar" data-toggle="modal"
                                   data-id="{{ $equipamento->id }}">
                                    <i class="material-icons" data-toggle="tooltip" title="Verificar dados">&#xE417;</i>
                                </a>
                                <a id="agendar-link-{{ $equipamento->id }}" class="agendar-link"
                                   data-id="{{ $equipamento->id }}" data-nome="{{ $equipamento->nome }}">
                                    <i class="material-icons" data-toggle="tooltip" title="Agendar">schedule</i>
                                </a>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>

            <div class="border-top mt-3 mb-3 linha-calender"></div>

            <div id="corpo_calendario">
                <h1 class="p-3 my-4 bg-dark text-white rounded">
                    Horários - <span id="nome_Equipamento">Selecione um equipamento</span>
                </h1>
                <div id='calendar'></div>
            </div>

            <!--------------------tabela mobile ----------------------------------------------------------------------------------->
            <div class="table-responsive-md d-block d-md-none text-center">
                <table class="table table-bordered" id="projectTable2">
                    <thead>
                    <tr class="text-center">
                        <th class="bg-dark text-white" scope="col">#</th>
                        <th class="bg-dark text-white" scope="col">Nome</th>
                        <th class="bg-dark text-white" scope="col">Quantidade</th>
                        <th class="bg-dark text-white" scope="col">Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($equipamentos as $equipamento)
                        <tr class="text-center">
                            <th scope="row">{{$loop->iteration}}</th>
                            <td>{{$equipamento->nome}}</td>
                            <td>{{$equipamento->quantidade}}</td>

                            <td scope="col" class="text-center">
                                <a href="#viewEquipamentoModal" class="view" id="visualizar" data-toggle="modal"
                                   data-id="{{ $equipamento->id }}">
                                    <i class="material-icons" data-toggle="tooltip" title="Verificar dados">&#xE417;</i>
                                </a>
                                <a class="agendar-link" data-id="{{ $equipamento->id }}">
                                    <i class="material-icons" data-toggle="tooltip" title="Agendar">schedule</i>
                                </a>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
            <!--------------------tabela mobile ----------------------------------------------------------------------------------->
        </div>
    </div>

    @include('components.modaisEquipamentos')
    @include('components.modaisAgendar')

    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
            crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js"></script>
    <script src="{{asset('js/crudEquipamentos.js')}}"></script>
    <script src="{{asset('js/crudAgendar.js')}}"></script>
    <script src="{{asset('js/fullCalender/index.global.js')}}"></script>
    <script src="{{asset('js/agendaCalender.js')}}"></script>

    </body>
</html>
