<?php

namespace App\Http\Controllers;

use App\Http\Requests\cupomrequest;
use App\Models\cupom;
use App\Models\cupom_produto;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\Foreach_;

use function PHPUnit\Framework\isNull;

class cupomcontroller extends Controller
{
    public function cupom_create(cupomrequest $request){
        $selects=0;
        $cupom =new  cupom();
        $cupom->desconto=$request->desconto;
        if(!is_null($request->descricao)){
            $cupom->descricao=$request->descricao;
        }
        if(!is_null($request->tipo1)){
            $cupom->tipo1=$request->tipo1;
            $selects++;
        }
        if(!is_null($request->tipo2)){
            $cupom->tipo2=$request->tipo2;
            $selects++;
        }
        if(!is_null($request->tipo3)){
            $cupom->tipo3=$request->tipo3;
            $selects++;
        }
        if(is_null($request->produto) && $selects==0){
            return redirect()->back()->with('mensagem_falha','escolha algum alvo para o cupom');
        }
        $cupom->codigo=$request->codigo;
        $cupom->numporpessoa=$request->numporpessoa;
        $cupom->save();
        
        if(!is_null($request->produto)){
            foreach($request->produto as $produto){
                $prodcupom =new cupom_produto;
                $prodcupom->fk_produto_id=$produto;
                $prodcupom->fk_cupom_id=$cupom->id;
                $prodcupom->save();
            }
        }
        return redirect()->route('gerenciar-cupom')->with('mensagem_sucesso','cupom cadastrado com sucesso');     
       }
    
    public function cupom_delete( $id){
        
        $cupom = cupom::findOrFail($id);
        $prodcupom=cupom_produto::where('fk_cupom_id','=',$id)->get();
        $cupom->deletado='s';
        $cupom->save();
        foreach($prodcupom as $produto){
            $produto->deletado='s';
            $produto->save();
        }
        
       return redirect()->back()->with("mensagem_sucesso","cupom deletado com sucesso");
    }
}

