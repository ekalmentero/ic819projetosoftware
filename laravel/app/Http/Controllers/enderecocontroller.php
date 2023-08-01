<?php

namespace App\Http\Controllers;

use App\Http\Requests\enderecorequest;
use App\Models\Endereco;
use Illuminate\Http\Request;

class enderecocontroller extends Controller
{
    public function endereco_create(enderecorequest $request){
        
        
       
       
        $endereco =new  Endereco();
        $endereco->cep = $request->cep;
        $endereco->numero = $request->numero;
        
        $endereco->cidade = $request->cidade;
        $endereco->bairro = $request->bairro;
        $endereco->rua = $request->rua;
        $endereco->apelido = $request->apelido;
        $endereco->fk_user_id = session('user')->id;

        $endereco->save();

        return redirect()->route('tela_endereco')->with("mensagem_sucesso","endereço cadastrado com sucesso");
        
    }
    public function endereco_delete($id){
        
        $endereco = endereco::findOrFail($id);
        $endereco->deletado='s';
        $endereco->save();
        return redirect()->back()->with("mensagem_sucesso","produto deletado com sucesso");
        
    }
    public function endereco_update(enderecorequest $request, $id){
        
        $endereco =Endereco::findOrFail($id);
        $endereco->cep = $request->cep;
        $endereco->numero = $request->numero;
        
        $endereco->cidade = $request->cidade;
        $endereco->bairro = $request->bairro;
        $endereco->rua = $request->rua;
        $endereco->apelido = $request->apelido;

        $endereco->save();
       return redirect()->back()->with("mensagem_sucesso","endereco atualizado com sucesso");
    }
}
