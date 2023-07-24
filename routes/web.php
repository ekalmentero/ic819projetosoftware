<?php

use App\Http\Controllers\EquipamentoController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ResultadoController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjetoController;
use App\Http\Controllers\AgendarEquipamentoController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [AuthController::class, 'showPagePrincipal'])->name('welcome');
Route::get('/login', [AuthController::class, 'showPageLogin'])->name('login');
Route::get('/registrar', [AuthController::class, 'showRegistroForm'])->name('register');
Route::get('/login/recuperar_senha', [AuthController::class, 'showRecuperarSenhaForm'])->name('recuperarSenha');
Route::get('/resetar-senha/{token}', [AuthController::class,'showmudSenhaForm'])->name('password.reset');

Route::post('/resetar-senha', [AuthController::class,'updateSenha'])->name('resetar.senha');
Route::post('/recuperar_senha', [AuthController::class, 'recuperSenha'])->name('recuperar_senha');
Route::post('/registrar/save', [AuthController::class, 'registrar'])->name('registrar');
Route::post('/login',[AuthController::class, 'login'])->name('login');
Route::get('/logout',[AuthController::class, 'logout'])->name('logout');

Route::middleware(['auth'])->group(function () {
    //Rotas projetos
    Route::get('/projetos', [ProjetoController::class, 'listarProjetos'])->name('projetos');
    Route::post('/projetos/salvar', [ProjetoController::class, 'cadastrarProjeto'])->name('salvar_projeto');
    Route::get('/projetos/visualizar/{id}', [ProjetoController::class, 'verificarProjeto'])->name('verificar_projeto');
    Route::put('/projetos/editar', [ProjetoController::class, 'editarProjeto'])->name('editar_projeto');
    Route::delete('/projetos/deletar', [ProjetoController::class, 'deletarProjeto'])->name('deletar_projeto');

    Route::get('/projetos/editarPerfil', [ProjetoController::class, 'showPageEditarPerfil'])->name('editarPerfil'); //Pega o get "/editar...", vai no "Auth:: , showPageEdit..." e aida dá um nome
    Route::get('/projetos/editarSenha', [ProjetoController::class, 'showPageEditarSenha'])->name('editarSenha');

    Route::post('/projetos/editarPerfil/save', [ProjetoController::class, 'editarPerfil'])->name('editarPerfilSave');
    Route::post('/projetos/editarSenha/save', [ProjetoController::class, 'editarSenha'])->name('editarSenhaSave'); //Esse "nome" que damos, é usado no HTML action (do forms).

    //Rota Page principal
    Route::get('/home', [ProjetoController::class, 'home'])->name('home');

    //Pages de Itens
    Route::get('/itens', [ItemController::class, 'showPageItens'])->name('itens');
    Route::get('/itens/buscar', [ItemController::class,'obterItensDoProjeto'])->name('itens.buscar');
    Route::post('/itens/salvar', [ItemController::class,'cadastrarItem'])->name('itens.salvar');
    Route::get('/itens/visualizar/{id}', [ItemController::class, 'visualizarItem'])->name('itens.visualizar');
    Route::put('/itens/editar', [ItemController::class, 'editarItem'])->name('itens.editar');
    Route::delete('/itens/deletar', [ItemController::class, 'deletarItem'])->name('itens.deletar');

    //Pages de Resultados
    Route::get('/resultados', [ResultadoController::class, 'showPageResultados'])->name('resultados');
    Route::get('/resultados/buscar', [ResultadoController::class,'obterResultadosDoProjeto'])->name('resultados.buscar');
    Route::post('/resultados/salvar', [ResultadoController::class,'cadastrarResultado'])->name('resultados.salvar');
    Route::get('/resultados/visualizar/{id}', [ResultadoController::class, 'visualizarResultado'])->name('resultados.visualizar');
    Route::put('/resultados/editar', [ResultadoController::class, 'editarResultado'])->name('resultados.editar');
    Route::delete('/resultados/deletar', [ResultadoController::class, 'deletarResultado'])->name('resultados.deletar');

    //Pages de Gerenciar Equipamentos
    Route::get('/equipamentos', [EquipamentoController::class, 'showPageEquipamentos'])->name('equipamentos');
    Route::get('/equipamentos/buscar', [EquipamentoController::class,'obterEquipamentosDoProjeto'])->name('equipamentos.buscar');
    Route::post('/equipamentos/salvar', [EquipamentoController::class,'cadastrarEquipamento'])->name('equipamentos.salvar');
    Route::get('/equipamentos/visualizar/{id}', [EquipamentoController::class, 'visualizarEquipamento'])->name('equipamentos.visualizar');
    Route::put('/equipamentos/editar', [EquipamentoController::class, 'editarEquipamento'])->name('equipamentos.editar');
    Route::delete('/equipamentos/deletar', [EquipamentoController::class, 'deletarEquipamento'])->name('equipamentos.deletar');

    //Rotas de agendar equipamento
    Route::get('/agendarEquipamento', [AgendarEquipamentoController::class, 'showPageAgendarEquipamentos'])->name('agendarEquipamento');
    Route::get('/agendamentos/buscar', [AgendarEquipamentoController::class, 'obterAgendamentodeEquipamento'])->name('agendamentosEquipamento');
    Route::get('/meusAgendamentos', [AgendarEquipamentoController::class, 'obterAgendamentos'])->name('meusAgendamentos');
    Route::post('/agendamentos/salvar', [AgendarEquipamentoController::class, 'agendarEquipamento'])->name('agendamento.salvar');
    Route::put('/agendamentos/editar', [AgendarEquipamentoController::class, 'atualizarAgendamento'])->name('agendamento.editar');
    Route::delete('/agendamentos/deletar', [AgendarEquipamentoController::class,'deletarAgendamento'])->name('agendamento.deletar');
});


