<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    public function todasCategorias(){
        $categorias = Categoria::all();

        if($categorias->isEmpty()){
            $response['status'] = 0;
            $response['message'] = 'Nenhuma categoria';
            $response['code'] = 404;
            return response()->json($response);
        }

        return response()->json($categorias);
    }
}
