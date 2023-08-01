<?php

namespace App\Http\Controllers;

use App\Http\Requests\cartaorequest;
use App\Models\Cartao;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class cartaocontroller extends Controller
{
    public function cartao_create(cartaorequest $request){
        
        $data = Carbon::createFromFormat('Y-m', $request->input('datavencimento'))->toDateString();
       
       
       $cartao =new  Cartao();
       $data = Carbon::createFromFormat('Y-m', $request->input('datavencimento'))->toDateString();
        $cartao->numerocartao = $request->numerocartao;
        $cartao->cvv = Hash::make($request->cvv);
        $cartao->nometitular = $request->nometitular;
        $cartao->datavencimento = $data;
        $cartao->apelido = $request->apelido;
        $cartao->fk_user_id = session('user')->id;

        $cartao->save();

        return redirect()->route('tela_cartao')->with("mensagem_sucesso","cartão cadastrado com sucesso");
        
    }
    public function cartao_delete($id){
        
        $cartao = Cartao::findOrFail($id);
        $cartao->deletado='s';
        $cartao->save();
        return redirect()->back()->with("mensagem_sucesso","produto deletado com sucesso");
        
    }
}
