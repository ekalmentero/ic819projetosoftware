<?php

use App\Models\Livro;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LivroController;
use App\Http\Controllers\AnuncioController;
use App\Http\Controllers\CategoriaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//User
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::get('/usuarioPorId/{id}', [UserController::class, 'usuarioPorId']);
Route::get('storage/{filename}', [UserController::class, 'getFotoPerfil'])->name('user.getFotoPerfil');
Route::put('emprestimosConcedidos/{id}', [UserController::class, 'emprestimosConcedidos']);
Route::put('emprestimosRequeridos/{id}', [UserController::class, 'emprestimosRequeridos']);
Route::put('notaUser/{id}', [UserController::class, 'notaUser']);
Route::put('/atualizaUser/{id}', [UserController::class, 'atualizaUser']);

//Categoria
Route::get('/todasCategorias', [CategoriaController::class, 'todasCategorias']);

//Livro
Route::post('/registerLivro', [LivroController::class, 'register']);
Route::get('/todosLivros', [LivroController::class, 'todosLivros']);
Route::get('/livroPorId/{id}', [LivroController::class, 'livroPorId']);
Route::get('/livroPorIdDono/{idDono}', [LivroController::class, 'livroPorIdDono']);
Route::get('/livrosCategoria/{id}', [LivroController::class, 'livrosCategoria']);

//Anuncio
Route::post('/registerAnuncio', [AnuncioController::class, 'register']);
Route::get('/cincoRecentes', [AnuncioController::class, 'cincoRecentes']);
Route::get('/todosAnuncios', [AnuncioController::class, 'todosAnuncios']);
Route::get('/anunciosPorIdDono/{idDono}', [AnuncioController::class, 'anunciosPorIdDono']);
Route::get('/anuncioPorId/{id}', [AnuncioController::class, 'anunciosPorId']);
Route::get('/meusEmprestimos/{id}', [AnuncioController::class, 'meusEmprestimos']);
Route::put('/solicitarEmprestimo/{id}', [AnuncioController::class, 'solicitarEmprestimo']);
Route::put('/concederEmprestimo/{id}', [AnuncioController::class, 'concederEmprestimo']);
Route::put('/encerrarEmprestimo/{id}', [AnuncioController::class, 'encerrarEmprestimo']);
Route::put('/avaliarEmprestimo/{id}', [AnuncioController::class, 'avaliarEmprestimo']);
