# iniciação do projeto laravel

1. instala o php e coloca no PATH
2. instala o [C++](https://learn.microsoft.com/pt-br/cpp/windows/latest-supported-vc-redist?view=msvc-170)

3. vai no php.ini-development (na pasta do php) e mude as seguintes configurações:
    1. descomente (tire o ;) das linhas
        - "extension=curl"
        - "extension=fileinfo"
        - "extension=gd"
        - "extension=mbstring"
        - "extension=openssl"
        - "extension=pdo_mysql"
        - "extension=zip"
    2. descomente a linha
        - extension_dir = "ext"
        - troque "ext" pelo caminho absoluto da pasta "ext" dentro da pasta do php
    3. ache e troque memory_limit de 128M para 256M

4. instalar o Composer (gerenciador de dependências do PHP)
    1. [download](https://getcomposer.org/download/)
    2. rode o instalador
    3. verifique que o caminho do php está correto
    4. next next next
    5. reinicie o PC
    6. depois escreve composer no cmd pra ver se ta tudo serto

5. iniciar projeto Laravel (não precisa criar denovo, só a parte de rodar)
    1. composer create-project laravel/laravel app
    2. com o git BASH digite: chmod +777 app/bootstrap/cache (fica dando erro de não conseguir acessar)
    3. rode o servidor: php artisan serve (dentro da pasta do app)

## uso de rotas no Laravel
### vou usar a pasta teste

o arquivo com as rotas é o `web.php`

uma rota é composta por :
- método (route::get, post, etc...)
- a url nesse caso "/teste"
- uma função ou um [controller](https://laravel.com/docs/10.x/controllers) especificando um método seu (vou fazer com os 2)
- e opcionalmente um [middleware](https://laravel.com/docs/10.x/middleware) (basicamento um método de checagem de autorização)

#### o arquivo deve ser o mais simples o possível, contendo apenas as rotas e os middlewares que as acompanham

## controllers

- são criados pelo console: `php artisan make:controller (nome do controller)`, nesse caso Teste2Controller
- podem ser encontrados em /app/Http/Controllers
- com o controller criado posso usar ele na minha rota, e usar o método socorro que eu criei

## templates 
### blade é o motor de renderização do Laravel

ficam em /resources/views

instale a extensão do VSCode "Laravel Blade Snippets"

- exemplo: homepage
- arquivos **precisam** terminar em .blade.php
- pode usar html normal à vontade, o php vai ficar embutido
- no Controller simplesmente retorne a *view* com o nome do seu template (sem a extensão)
- para usar código php simplesmente coloque dentro de: {{  }}

#### passar dados do controller para a view

- ao retornar a função *view* passe de segundo argumento um array(associativo) com os valores desejados
- no template dentro das {{}} coloque a sua `$variavel`
- agora vamos usar uma *diretiva*(directive) para usar um for dentro do blade
- a diretiva é iniciada com um @, nesse caso: `@foreach(vários as um)`

#### reduzir a repetição

- usamos a diretiva @include('nome do arq')
- ou para código global:
- criamos uma nova pasta dentro da views: components
- dentro do arquvio lauout podemos incluir tanto o header quanto o footer e no meio {{$slot}}
- usamos a "tag" : `x-(nome-do-componente)` e colocamos o html dentro dela

## BD

### o Laravel gerencia o BD automaticamente com *migrações*(migrations)

- conecta no bd pelo .env (não deve estar no rep. pois é diferente em cada máquina)
- no .env ache as variáveis **DB_...**
- migrations ficam em /database/migrations 
- lá ficam as migrations que já vieram inclusas na iniciação, dá pra ter uma noção de como a parada funciona
- com o comando `php artisan migrate` as migrações são feitas, depois de rodar cheque o mysql workbench
- com o comando `php artisan migrate:fresh` as migrações são **re**feitas, perdendo todos os dados

#### adicionar coisas novas sem perder tudo

- `php artisan make:migration adicionarcorfavorita` para criar uma migração nova

nessa nova migração no método up() chamamos o método estático da classe Schema, table, especificamos qual tabela será o nosso alvo nesse teste, users, e criamos uma função com os novos campos.

já na down(), especificamos o que fazor caso a migração seja desfeita.

- agora `php artisan migrate` novamente para que a nova migração seja feita

as migrações oferecem a vantagem de podermos ter um controle maior sobre o banco, já que cada iteração pode ficar separada e sempre vão ser executadas do mesmo jeito para todos.