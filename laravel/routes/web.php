<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    cadastro_login_controller,
    viewscontroller,
    AtendenteController,
    carrinhocontroller,
    cartaocontroller,
    CompraController,
    cupomcontroller,
    enderecocontroller,
    noticiacontroller,
    produtoscontroller
};
use App\Http\Middleware\verificaadministrador;
use App\Http\Middleware\verificaatendente;
use App\Http\Middleware\verificacliente;
use App\Http\Middleware\verificalogado;

// Matheus alterar aqui


// Matheus alterar aqui
Route::get('/visualizar_noticia', function () {
    return view('/visualizar_noticia');
});

// rotas para acesso do cliente
route::middleware([verificacliente::class])->group(function(){

    //Cliente
    route::prefix('cliente')->group(function(){

        
        Route::get('/pedidos', [viewscontroller::class, 'tela_pedidos'])->name('pedidos');
        route::prefix('atualizar_dados')->group(function(){
            Route::get('/', [viewscontroller::class, 'tela_contatos'])->name('atualizar-dados');
            Route::get('/update', [cadastro_login_controller::class, 'dados_update'])->name('dados-update');
        });
        route::prefix('endereco')->group(function(){
            Route::get('/novo', [viewscontroller::class, 'tela_novo_endereco'])->name('novo_endereco');
            Route::get('/', [viewscontroller::class, 'tela_endereco'])->name('tela_endereco');
            Route::post('/create', [enderecocontroller::class, 'endereco_create'])->name('endereco-create');
            Route::get('/delete/{id}', [enderecocontroller::class, 'endereco_delete'])->name('endereco-delete');
            Route::get('/update/{id}', [enderecocontroller::class, 'endereco_update'])->name('endereco-update');
        });
        route::prefix('cartao')->group(function(){
            Route::get('/novo', [viewscontroller::class, 'tela_novo_cartao'])->name('novo_cartao');
            Route::get('/', [viewscontroller::class, 'tela_cartao'])->name('tela_cartao');
            Route::post('/create', [cartaocontroller::class, 'cartao_create'])->name('cartao-create');
            Route::get('/delete/{id}', [cartaocontroller::class, 'cartao_delete'])->name('cartao-delete');
        });
        
        Route::get('/produto/{id}', [viewscontroller::class, 'tela_visualizar_produto'])->name('visualizar-produto');
        route::prefix('carrinho')->group(function(){
            Route::get('/', [carrinhocontroller::class, 'index'])->name('carrinho-index');
            Route::get('/processar', [carrinhocontroller::class, 'processar_pedido'])->name('carrinho-processar');
            Route::get('/finalizar}', [carrinhocontroller::class, 'finalizar_pedido'])->name('carrinho-finalizar');
            route::prefix('produto')->group(function(){
                Route::get('/insert/{id}', [carrinhocontroller::class, 'inserir_produto'])->name('carrinho-produto-insert');
                Route::get('/update/{id}', [carrinhocontroller::class, 'editar_produto'])->name('carrinho-produto-update');
                Route::get('/delete/{id}', [carrinhocontroller::class, 'deletar_produto'])->name('carrinho-produto-delete');
            });
        });
        
        
    
    });
    

});



// rotas para acesso do atendente
route::middleware([verificaatendente::class])->group(function(){

    //Route Atendente

    route::prefix('atendente')->group(function(){
        Route::get('/', [viewscontroller::class, 'tela_atendente'])->name('atendente-index');

        route::prefix('compra')->group(function(){

            Route::get('/alterar-status/{id}', [CompraController::class, 'AlterarStatus'])->name('compra-alterar-status');
        });
    });

});

// rotas para acesso do administrador
route::middleware([verificaadministrador::class])->group(function(){

    //Administrador
    route::prefix('administrador')->group(function(){

        Route::get('/gerenciar_produtos', [viewscontroller::class, 'tela_administrador'])->name('administrador-index');
        Route::get('/gerenciar_feed', [viewscontroller::class, 'tela_gerenciar_feed'])->name('gerenciar-feed');
        Route::get('/gerenciar_cupom', [viewscontroller::class, 'tela_gerenciar_cupom'])->name('gerenciar-cupom');
        Route::get('/visualizar_pedidos', [viewscontroller::class, 'tela_visualizar_pedidos'])->name('visualizar-pedidos');
        route::prefix('noticia')->group(function(){
            
            Route::get('/nova', [viewscontroller::class, 'tela_nova_noticia'])->name('nova-noticia');
            Route::post('/create', [noticiacontroller::class, 'noticia_create'])->name('noticia-create');
            Route::get('/delete/{id}', [noticiacontroller::class, 'noticia_delete'])->name('noticia-delete');
        });
        route::prefix('cupom')->group(function(){
            
            Route::get('/novo', [viewscontroller::class, 'tela_novo_cupom'])->name('novo-cupom');
            Route::post('/create', [cupomcontroller::class, 'cupom_create'])->name('cupom-create');
            Route::get('/update/{id}', [cupomcontroller::class, 'cupom_update'])->name('cupom-update');
            Route::get('/delete/{id}', [cupomcontroller::class, 'cupom_delete'])->name('cupom-delete');
        });

        route::prefix('produto')->group(function(){

            Route::get('/', [viewscontroller::class, 'novo_produto'])->name('novo-produto-index');
            Route::post('/create', [produtoscontroller::class, 'produtos_create'])->name('novo-produto-create');
            Route::get('/update/{id}', [produtoscontroller::class, 'produtos_update'])->name('produto-update');
            Route::get('/delete/{id}', [produtoscontroller::class, 'produtos_delete'])->name('produto-delete');
        });
        
        

    });
    

});



// rotas para acesso deslogado
route::middleware([verificalogado::class])->group(function(){

    //Route Controlar Cadastro
    route::prefix('cadastro')->group(function(){
        Route::get('/', [viewscontroller::class,'tela_cadastro'])->name('tela_cadastro');
        Route::post('/store', [cadastro_login_controller::class,'cadastro'])->name('cadastro-store');
    });

    //tela de login
    route::prefix('login')->group(function(){
        Route::get('/',[viewscontroller::class,'tela_login'])->name('tela_login');
        Route::get('/destroy', [cadastro_login_controller::class,'logout'])->name('login-destroy');

    });

});


// Rotas de acesso global

Route::get('/',[viewscontroller::class,'tela_index'])->name('index');
Route::get('/pesquisaproduto',[viewscontroller::class,'pesquisa_produto'])->name('pesquisa_produto');
Route::post('/login/store', [cadastro_login_controller::class,'login'])->name('login-store');
Route::get('/login/destroy', [cadastro_login_controller::class,'logout'])->name('login-destroy');
Route::get('/noticia/{id}',[viewscontroller::class,'visualizar_noticia'])->name('noticia');
 

//Route tratamento de Erros

Route::fallback(function () {
    return "Erro de rota!";
});



