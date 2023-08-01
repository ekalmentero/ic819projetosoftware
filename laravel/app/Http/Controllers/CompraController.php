<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Compras;
use Carbon\Carbon;

class CompraController extends Controller
{
    
    
    public function AlterarStatus (Request $request,$id)
    {
        $status=array(
            'Pedido aguardando busca pelo cliente',
            'Pedido saiu para a entrega',
            'Pedido Entregue',
            'Pedido Cancelado');
        $compra = Compras::findOrFail($id);
        $novostatus =$request->status;
        
        if(!in_array($novostatus,$status)){
            return redirect()->back()->with("mensagem_falha",'selecione um valor válido');

        }else if($novostatus=='Pedido Entregue'){

            $compra->hora_finalizacao =Carbon::now()->toDateTimeString();
        }else if($novostatus=='Pedido Cancelado'){
            $compra->hora_finalizacao =Carbon::now()->toDateTimeString();
        }
        
        if(!is_null($request->input('d1'.$id))){
            $compra->descricao= $request->input('d1'.$id);
        }elseif(!is_null($request->input('d2'.$id))){
            $compra->descricao= $request->input('d2'.$id);
        }elseif(!is_null($request->input('d3'.$id))){
            $compra->descricao= $request->input('d3'.$id);
        }
        
        $compra->status=$novostatus;
        $compra->save();
        return redirect()->back()->with('mensagem_sucesso', 'alteração feita com sucesso');
       
        
    
    }
}
