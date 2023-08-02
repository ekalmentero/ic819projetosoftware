<?php

namespace App\Http\Controllers;

use App\Models\Anuncio;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class AnuncioController extends Controller
{
    public function register(Request $request){
        $anuncio = Anuncio::create([
            'idDono' => $request->idDono,
            'idLivro' => $request->idLivro,
            'ativo' => true,
            'dataInicioPrazo' => $request->dataInicioPrazo,
            'dataFimPrazo' => $request->dataFimPrazo,
        ]);
        $response['status'] = 1;
        $response['message'] = 'Anuncio Registered Successfully';
        $response['code'] = 200;

        return response()->json($response);
    }
    public function todosAnuncios(){
        $Anuncios = Anuncio::where('ativo', 1)->get();

        if($Anuncios->isEmpty()){
            $response['status'] = 0;
            $response['message'] = 'Nenhum Anuncio';
            $response['code'] = 404;
            return response()->json($response);
        }

        return response()->json($Anuncios);
    }

    public function anunciosPorIdDono($idDono){
        $anuncios = Anuncio::where('idDono', $idDono)
                                    ->where('ativo', 1)
                                    ->get();

        if($anuncios->isEmpty()){
            $response['status'] = 0;
            $response['message'] = 'Anuncio não encontrado';
            $response['code'] = 404;
            return response()->json($response);
        }
        return response()->json($anuncios);
    }

    public function meusEmprestimos($idUser) {
        $anuncios = Anuncio::where('idRequerente', $idUser)
                            ->orWhere('idDono', $idUser)
                            ->where('emprestado', 1)
                            ->get();
    
        if ($anuncios->isEmpty()) {
            $response['status'] = 0;
            $response['message'] = 'Anuncio não encontrado';
            $response['code'] = 404;
            return response()->json($response);
        }
    
        return response()->json($anuncios);
    }
    
    

    public function anunciosPorId($id){
        $anuncios = Anuncio::where('id', $id)->get();

        if($anuncios->isEmpty()){
            $response['status'] = 0;
            $response['message'] = 'Anuncio não encontrado';
            $response['code'] = 404;
            return response()->json($response);
        }
        return response()->json($anuncios);
    }

    public function cincoRecentes(){
        $anuncios = Anuncio::orderBy('created_at', 'desc')
                                            ->take(5)
                                            ->where('ativo', 1)
                                            ->get();

        if($anuncios->isEmpty()){
            $response['status'] = 0;
            $response['message'] = 'Nenhum anuncio';
            $response['code'] = 404;
            return response()->json($response);
        }

        return response()->json($anuncios);
    }

    public function solicitarEmprestimo($id, Request $request)
    {
        $anuncios = Anuncio::find($id);
    
        if (!$anuncios) {
            return response()->json(['message' => 'Anúncio não encontrado'], 404);
        }
    
        $anuncios->update($request->only("idRequerente", "tempoEmprestimo"));
    
        $anuncios->save();
    
        return response()->json(['code' => 200, 'status' => 1, 'message' => 'Empréstimo solicitado com sucesso', 'data' => $anuncios]);
    }
    
    public function concederEmprestimo($id, Request $request)
    {
        $anuncios = Anuncio::find($id);
    
        if (!$anuncios) {
            return response()->json(['message' => 'Anúncio não encontrado'], 404);
        }
    
        $anuncios->update($request->only("emprestado", "dataInicioPrazo", "dataFimPrazo"));
    
        $anuncios->save();
    
        return response()->json(['code' => 200, 'status' => 1, 'message' => 'Empréstimo concedido com sucesso', 'data' => $anuncios]);
    }

    public function encerrarEmprestimo($id, Request $request)
    {
        $anuncios = Anuncio::find($id);
    
        if (!$anuncios) {
            return response()->json(['message' => 'Anúncio não encontrado'], 404);
        }
    
        $anuncios->update($request->only("ativo", "dataFim"));
    
        $anuncios->save();
    
        return response()->json(['code' => 200, 'status' => 1, 'message' => 'Empréstimo encerrado com sucesso', 'data' => $anuncios]);
    }

    public function avaliarEmprestimo($id, Request $request)
    {
        $anuncios = Anuncio::find($id);
    
        if (!$anuncios) {
            return response()->json(['message' => 'Anúncio não encontrado'], 404);
        }
    
        $anuncios->update($request->only("avaliacao", "relato"));
    
        $anuncios->save();
    
        return response()->json(['code' => 200, 'status' => 1, 'message' => 'Avaliação enviada com sucesso', 'data' => $anuncios]);
    }
    
    
}
