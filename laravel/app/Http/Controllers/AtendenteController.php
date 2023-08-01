<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Compras;

class AtendenteController extends Controller
{
    public function Index(){
        $compras = Compras::select('*')
            ->where('status', '!=', 'compra finalizada')
            ->where('status', '!=', 'compra cancelada')
            ->get();
        return view('/atendente/index')->with('compras', $compras);
    }
}
