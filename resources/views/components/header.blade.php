<header class="container d-flex justify-items-center">
    <div class="container ">
        <nav class="navbar navbar-expand-lg p-4" style="background-color: #ffffff;">
            <div class="container-fluid">
                <a class="navbar-brand ms-5 me-0 mt-3" href="{{route("welcome")}}"> <img  src="{{ asset('img/laborganizer2.png') }}" alt="logo" width="250" height="75"></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse ms-4 me-0" id="navbarSupportedContent">
                    <ul class="navbar-nav">
                        <li class="nav-item ms-5 me-5">
                            <a class="nav-link active" aria-current="page" href="{{route("welcome")}}">Página Inicial</a>
                        </li>
                        <li class="nav-item mx-5">
                            <a class="nav-link active" href="#">Ajuda</a>
                        </li>
                        <li class="nav-item ms-5 me-0">
                            <a class="nav-link active" href="{{route("login")}}">
                                <i class="fas fa-user " style="margin-right: 5px;"></i>
                                Entre ou cadastre-se
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</header>
