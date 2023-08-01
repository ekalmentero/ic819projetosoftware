<?php

namespace App\Http\Controllers;

use App\Http\Requests\editprodutorequest;
use App\Http\Requests\produtorequest;
use App\Models\produto;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\Return_;

use Illuminate\Support\Facades\File;
class produtoscontroller extends Controller


{
    public function produtos_create(produtorequest $request){
        
        $produto =new  produto();
       if($request->hasFile('imagem')){
        $produto->nome = $request->nome;
        $produto->tipo = $request->tipo;
        if(!is_null($request->descricao)){
            $produto->descricao = $request->descricao;
        }
        
        $produto->quantidade = $request->quantidade;
        $produto->valor = $request->valor;
        $filename =$request->file('imagem')->getClientOriginalName();
            if($request->file('imagem')->isValid()){
                $path =$request->file('imagem')->storeAs('public/img/produtos',$filename);
                $produto->imagem = $filename;
                $produto->save();
                return redirect()->route('administrador-index')->with("mensagem_sucesso","produto cadastrado com sucesso");
            }
       }
       
       
       return redirect()->route('administrador-index')->with("mensagem_falha","Erro com a imagem");
    }
    public function produtos_update(editprodutorequest $request, $id){
        
        $produto = produto::findOrFail($id);
        $produto->nome = $request->nome;
        $produto->tipo = $request->tipo;
        if(!is_null($request->descricao)){
            $produto->descricao = $request->descricao;
        }
    
        $produto->quantidade = $request->quantidade;
        $produto->valor = $request->valor;
        $produto->save();
       return redirect()->back()->with("mensagem_sucesso","produto atualizado com sucesso");
    }

    public function produtos_delete(Request $request, $id){
        
        $produto = produto::findOrFail($id);
        if(File::exists($produto->imagem)){
            File::delete($produto->imagem);
        }
        $produto->deletado='s';
        $produto->save();
       return redirect()->back()->with("mensagem_sucesso","produto deletado com sucesso");
    }
}
