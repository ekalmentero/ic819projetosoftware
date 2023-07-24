<!-- SideBar tamanho de janela media a xxl -->
<div class="container d-none d-md-block col-xxl-3 col-md-4 ms-0">
    <div class=" d-flex flex-column  position-fixed flex-shrink-0 align-items-stretch text-white bg-dark p-3 m-0"
         style="width: 20%; height:100%">
        <a href="{{route('home')}}"
           class="d-flex align-items-start mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span class="fs-4">LabOrganizer</span>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">

            <li class="nav-item">
                <a href="{{route('home')}}" class="nav-link text-white" aria-current="page">
                    Página Inicial
                </a>
            </li>
            <li>
                <a href="{{route('projetos')}}" class="nav-link text-white">
                    Meus projetos
                </a>
            </li>
            <li>
                <a href="{{route('itens')}}" class="nav-link text-white">
                    Estoque
                </a>
            </li>
            <li>
                <a href="{{route('resultados')}}" class="nav-link text-white">
                    Resultados
                </a>
            </li>
            @if(Auth::user()->tipoUsuario == 1)
                <li>
                    <a href="{{route('equipamentos')}}" class="nav-link text-white">
                        Gerenciar equipamentos
                    </a>
                </li>
            @endif
            <li>
                <a href="{{route('agendarEquipamento')}}" class="nav-link text-white">
                    Agenda de equipamentos
                </a>
            </li>
        </ul>
        <hr>
        <div class="dropdown">
            <a class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1"
               data-bs-toggle="dropdown" aria-expanded="false">
                <img
                    src="https://img.favpng.com/17/1/20/user-interface-design-computer-icons-default-png-favpng-A0tt8aVzdqP30RjwFGhjNABpm.jpg"
                    alt="" width="32" height="32" class="rounded-circle me-2">
                <?php $nomeCompleto = Auth::user()->name; ?>
                <?php $nomes = explode(' ', $nomeCompleto); ?>
                <strong>{{ $nomes[0] }}</strong>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                <li><a class="dropdown-item" href="{{route("editarSenha")}}">Editar senha</a></li>
                <li><a class="dropdown-item" href="{{route("editarPerfil")}}">Editar perfil</a></li>
                <li>
                    <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="{{route("logout")}}">Logout</a></li>
            </ul>
        </div>
    </div>
</div>

<!-- SideBar tamanho de janela mobile a sm (pequena) -->

<div class="container d-block col-2 col-sm-3 d-md-none d-xxl-none text-center">
    <div class=" d-flex flex-column flex-shrink-0 bg-dark position-fixed pt-3" style="width: 15%; height:100%">

        <ul class="nav nav-pills nav-flush flex-column ">
            <li class="nav-item">

                <a href="{{route('home')}}" class="d-block link-dark text-decoration-none" title="Icon-only" data-bs-toggle="tooltip"
                   data-bs-placement="right">
                    <img src="{{asset('img/logomobile.png')}}" width="40" height="45">
                    <span class="visually-hidden">Icon-only</span>
                </a>

            </li>
            <li class="nav-item">
                <a href="{{route('home')}}" class="nav-link py-3 border-bottom" aria-current="page" title="Home"
                   data-bs-toggle="tooltip" data-bs-placement="right">
                    <i class="bi bi-house-door" style="color: #f1f1f1"></i>
                </a>
            </li>
            <li>
                <a href="{{route('projetos')}}" class="nav-link py-3 border-bottom" title="Projetos"
                   data-bs-toggle="tooltip" data-bs-placement="right">
                    <i class="fas fa-paste" style="color: #f1f1f1"></i>
                </a>
            </li>
            <li>
                <a href="{{route('itens')}}" class="nav-link py-3 border-bottom" title="Itens" data-bs-toggle="tooltip"
                   data-bs-placement="right">
                    <i class="bi bi-inboxes" style="color: #f1f1f1"></i>
                </a>
            </li>
            <li>
                <a href="{{route('resultados')}}" class="nav-link py-3 border-bottom" title="Resultados" data-bs-toggle="tooltip"
                   data-bs-placement="right">
                    <i class="bi bi-clipboard" style="color: #f1f1f1"></i>
                </a>
            </li>
            @if(Auth::user()->tipoUsuario == 1)
            <li>
                <a href="{{route('equipamentos')}}" class="nav-link py-3 border-bottom" title="Gerenciar Equipamentos" data-bs-toggle="tooltip"
                   data-bs-placement="right">
                    <i class="fas fa-microscope" style="color: #f1f1f1"></i>
                </a>
            </li>
            @endif
            <li>
                <a href="{{route('agendarEquipamento')}}" class="nav-link py-3 border-bottom" title="Agendar Equipamentos" data-bs-toggle="tooltip"
                   data-bs-placement="right">
                    <i class="far fa-calendar" style="color: #f1f1f1"></i>
                </a>
            </li>
        </ul>
        <div class="dropdown border-top">
            <a href="#"
               class="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
               id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
                <img
                    src="https://img.favpng.com/17/1/20/user-interface-design-computer-icons-default-png-favpng-A0tt8aVzdqP30RjwFGhjNABpm.jpg"
                    alt="user" width="24" height="24" class="rounded-circle">
            </a>

            <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
                <li><a class="dropdown-item" href="{{route("editarSenha")}}">Editar senha</a></li>
                <li><a class="dropdown-item" href="{{route("editarPerfil")}}">Editar perfil</a></li>
                <li>
                    <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="{{route("logout")}}">Logout</a></li>
            </ul>
        </div>
    </div>
</div>
