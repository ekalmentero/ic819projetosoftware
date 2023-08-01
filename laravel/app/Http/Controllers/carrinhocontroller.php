<?php

namespace App\Http\Controllers;

use App\Http\Requests\editprodutocarrinhorequest;
use App\Http\Requests\editprodutorequest;
use App\Models\Cartao;
use App\Models\Compras;
use App\Models\cupom;
use App\Models\cupom_compra;
use App\Models\cupom_produto;
use App\Models\cupom_user;
use App\Models\Endereco;
use App\Models\produto;
use App\Models\produto_compra;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\isNull;

class carrinhocontroller extends Controller
{

    public function index() {
        $produtos = produto::select('produto.*','produto_compra.quantidade as quantidade_carrinho')
            ->join('produto_compra', 'produto_compra.fk_produto_id', '=', 'produto.id')
            ->join('compra', 'produto_compra.fk_compra_id', '=', 'compra.id')
            ->where('compra.id', '=', session('carrinho')->id)
            ->get();
        
        $msg='';
        foreach($produtos as $produto){
            if($produto->quantidade_carrinho>$produto->quantidade){
                $procom= produto_compra::where('fk_produto_id',$produto->id)
                ->where('fk_compra_id','=',session('carrinho')->id)
                ->first();
                $procom->quantidade=$produto->quantidade;
                $procom->save();
                $msg='infelizmente o estoque foi alterado,produtos podem ter sido diminuidos ou apagados';
                session()->flash("mensagem_falha",$msg);
            }
            if($produto->quantidade==0){
                produto_compra::where('fk_produto_id',$produto->id)
                ->where('fk_compra_id','=',session('carrinho')->id)
                ->first()
                ->delete();
                $msg='infelizmente o estoque foi alterado, produtos podem ter sido diminuidos ou apagados';
                session()->flash("mensagem_falha",$msg);
            }
        }
        $produtos = produto::select('produto.*','produto_compra.quantidade as quantidade_carrinho')
            ->join('produto_compra', 'produto_compra.fk_produto_id', '=', 'produto.id')
            ->join('compra', 'produto_compra.fk_compra_id', '=', 'compra.id')
            ->where('compra.id', '=', session('carrinho')->id)
            ->get();
        $valortotal=0;
        foreach($produtos as $produto){    
            $valortotal+=$produto->valor *$produto->quantidade_carrinho;
        }
        session('carrinho')->valortotal = $valortotal;
        return view('cliente\carrinho',['produtos'=> $produtos]);
        
        
    }

    public function processar_pedido(Request $request) {
        
        $produtos = produto::select('produto.*','produto_compra.quantidade as quantidade_carrinho')
            ->join('produto_compra', 'produto_compra.fk_produto_id', '=', 'produto.id')
            ->join('compra', 'produto_compra.fk_compra_id', '=', 'compra.id')
            ->where('compra.id', '=', session('carrinho')->id)
            ->get();
        
        $msg='';
        foreach($produtos as $produto){
            if($produto->quantidade_carrinho>$produto->quantidade){
                $procom= produto_compra::where('fk_produto_id',$produto->id)
                ->where('fk_compra_id','=',session('carrinho')->id)
                ->first();
                $procom->quantidade=$produto->quantidade;
                $procom->save();
                $msg='infelizmente o estoque foi alterado,produtos podem ter sido diminuidos ou apagados';
                session()->flash("mensagem_falha",$msg);
            }
            if($produto->quantidade==0){
                produto_compra::where('fk_produto_id',$produto->id)
                ->where('fk_compra_id','=',session('carrinho')->id)
                ->first()
                ->delete();
                $msg='infelizmente o estoque foi alterado, produtos podem ter sido diminuidos ou apagados';
                session()->flash("mensagem_falha",$msg);
            }
        }
        $produtos = produto::select('produto.*','produto_compra.quantidade as quantidade_carrinho','produto_compra.id as prodcompraid','produto_compra.valorproduto as valor_carrinho')
            ->join('produto_compra', 'produto_compra.fk_produto_id', '=', 'produto.id')
            ->join('compra', 'produto_compra.fk_compra_id', '=', 'compra.id')
            ->where('compra.id', '=', session('carrinho')->id)
            ->get();
        $valortotal=0;
        foreach($produtos as $produto){    
            $prodcompra= produto_compra::findOrFail($produto->prodcompraid);
            $prodcompra->valorproduto=$produto->valor;
            $prodcompra->save();
            $valortotal+=$produto->valor_carrinho *$produto->quantidade_carrinho;
        }
        $produtos = produto::select('produto.*','produto_compra.quantidade as quantidade_carrinho','produto_compra.id as prodcompraid','produto_compra.valorproduto as valor_carrinho')
            ->join('produto_compra', 'produto_compra.fk_produto_id', '=', 'produto.id')
            ->join('compra', 'produto_compra.fk_compra_id', '=', 'compra.id')
            ->where('compra.id', '=', session('carrinho')->id)
            ->get();
        session('carrinho')->valortotal = $valortotal;
        if(!is_null($request->cupom)){
            $cupom =cupom::where('codigo','=',$request->cupom)->get()->first();
            if(is_null($cupom)){
                return redirect()->back()->with('mensagem_falha','código de cupom inexistente');
            }
            $cupomprodkeys =cupom_produto::where('fk_cupom_id','=',$cupom->id)
                ->get();
            $usercupom= cupom_user::where('fk_user_id','=',session('user')->id)
                ->where('fk_cupom_id','=',$cupom->id)
                ->get()->first();
            
            if(is_null($usercupom)){
                $usercupom=new cupom_user;
                $usercupom->fk_cupom_id=$cupom->id;
                $usercupom->fk_user_id=session('user')->id;
                $usercupom->qtdrestante=$cupom->numporpessoa;
                $usercupom->save();
            }
            if($usercupom->qtdrestante==0){
                return redirect()->back()->with('mensagem_falha','acabaram seus usos desse cupom');
            }else{
                $usercupom->qtdrestante--;
                $usercupom->save();
            }
            $cupomcompra= cupom_compra::where('fk_compra_id','=',session('carrinho')->id)
                ->where('fk_cupom_id','=',$cupom->id)
                ->get()->first();
            if(is_null($cupomcompra)){
                $cupomcompra=new cupom_compra;
                $cupomcompra->fk_cupom_id=$cupom->id;
                $cupomcompra->fk_compra_id=session('carrinho')->id;
                $cupomcompra->save();
            }else{
                $cupomcompra->fk_cupom_id=$cupom->id;
                $cupomcompra->save();
            }
            $valortotal=0;
            
            foreach($produtos as $produto){    
                if($produto->tipo==$cupom->tipo1 || $produto->tipo==$cupom->tipo2 || $produto->tipo==$cupom->tipo3 ){
                    $newprodcompra=produto_compra::findOrFail($produto->prodcompraid);
                    $newprodcompra->valorproduto=($produto->valor*(100-$cupom->desconto))/100;
                    $newprodcompra->save();
                }
                foreach($cupomprodkeys as $key){
                    
                    if($produto->id==$key->fk_produto_id){
                        $newprodcompra=produto_compra::findOrFail($produto->prodcompraid);
                        $newprodcompra->valorproduto=($produto->valor*(100-$cupom->desconto))/100;
                        $newprodcompra->save();
                    }
                }
            }
            $produtos = produto::select('produto.*','produto_compra.quantidade as quantidade_carrinho','produto_compra.valorproduto as valor_carrinho')
            ->join('produto_compra', 'produto_compra.fk_produto_id', '=', 'produto.id')
            ->join('compra', 'produto_compra.fk_compra_id', '=', 'compra.id')
            ->where('compra.id', '=', session('carrinho')->id)
            ->get();
            $valortotal=0;
            foreach($produtos as $produto){    
                $valortotal+=$produto->valor_carrinho *$produto->quantidade_carrinho;
            }
            session('carrinho')->valortotal = $valortotal;
        }
        $cartoes = Cartao::where('fk_user_id','=',session('user')->id)
                        ->where('deletado','!=','s')->get(); 
        $enderecos = Endereco::where('fk_user_id','=',session('user')->id)
                        ->where('deletado','!=','s')->get();               
        return view('cliente\fechamento_pedido',['produtos'=> $produtos, 'cartoes'=> $cartoes,'enderecos'=>$enderecos]);
        
    }

    public function finalizar_pedido(Request $request){
        $produtos = produto::select('produto.*','produto_compra.quantidade as quantidade_carrinho')
            ->join('produto_compra', 'produto_compra.fk_produto_id', '=', 'produto.id')
            ->join('compra', 'produto_compra.fk_compra_id', '=', 'compra.id')
            ->where('compra.id', '=', session('carrinho')->id)
            ->get();
        
        $msg='';
        foreach($produtos as $produto){
            if($produto->quantidade_carrinho>$produto->quantidade){
                $procom= produto_compra::where('fk_produto_id',$produto->id)
                ->where('fk_compra_id','=',session('carrinho')->id)
                ->first();
                $procom->quantidade=$produto->quantidade;
                $procom->save();
                $msg='infelizmente o estoque foi alterado,produtos podem ter sido diminuidos ou apagados';
                session()->flash("mensagem_falha",$msg);
            }
            if($produto->quantidade==0){
                produto_compra::where('fk_produto_id',$produto->id)
                ->where('fk_compra_id','=',session('carrinho')->id)
                ->first()
                ->delete();
                $msg='infelizmente o estoque foi alterado, produtos podem ter sido diminuidos ou apagados';
                session()->flash("mensagem_falha",$msg);
            }
        }
        if($msg!=''){
            return redirect()->back();
        }
        $produtosretirar = produto_compra::where('fk_compra_id', '=', session('carrinho')->id)
        ->get();
        
        foreach($produtosretirar as $produto){
            $prodantigo= produto::where('id','=',$produto->fk_produto_id)->get()->first();
            $prodantigo->quantidade-=$produto->quantidade;
            $prodantigo->save();
        }
        if($request->pagamento =='dinheiro'){
            $troco = $request->troco-session('carrinho')->valortotal;
            if($troco<0){
                $troco=0;
            }
            session('carrinho')->troco= $troco;
            session('carrinho')->tipo_pagamento= 'dinheiro';
        
        }else if($request->pagamento == 'pix'){
            session('carrinho')->troco= 0;
            session('carrinho')->tipo_pagamento= 'pix';
        }else if(!is_null($request->pagamento)){
            session('carrinho')->tipo_pagamento= 'cartao';
            session('carrinho')->fk_cartao_id=$request->pagamento;
        }else{
            return redirect()->back()->with('mensagem_falha','selecione um método de pagamento');
        }

        if($request->endereco =='semfrete'){
            session('carrinho')->frete= 0.00;
            
        }else if(is_null($request->endereco)){
            return redirect()->back()->with('mensagem_falha',"escolha um método de entrega");
        }else{
            
            session('carrinho')->frete= 7.00;
            session('carrinho')->fk_endereco_id=$request->endereco;
            
        }
        $carrinho= Compras::findOrFail(session('carrinho')->id);
        $carrinho->status="pedido recebido";
        $carrinho->descricao=session('carrinho')->descricao;
        $carrinho->frete=session('carrinho')->frete;
        $carrinho->fk_user_atendente_id=session('carrinho')->fk_user_atendente_id;
        $carrinho->fk_cartao_id=session('carrinho')->fk_cartao_id;
        $carrinho->fk_endereco_id=session('carrinho')->fk_endereco_id;
        $carrinho->tipo_pagamento=session('carrinho')->tipo_pagamento;
        $carrinho->troco=session('carrinho')->troco;
        $carrinho->valortotal=session('carrinho')->valortotal;
        $carrinho->hora_compra=Carbon::now()->toDateTimeString();
        $carrinho->save();
        $novocarrinho = new Compras();
        $novocarrinho->status= 'carrinho';
        $novocarrinho->fk_user_cliente_id= session('user')->id;
        $novocarrinho->save();
        Session()->put('carrinho',$novocarrinho);

        return redirect()->route('index')->with("mensagem_sucesso","pedido feito com sucesso!");
    }
    public function inserir_produto(Request $request, $id){
        $produto= produto::where('id',$id)->first();
        $procom = new produto_compra();
        $procom->quantidade = $request->input('quantidade');
        $procom->valorproduto = $produto->valor;
        $procom->tipoproduto = $produto->tipo;
        $procom->nomeproduto = $produto->nome;
        $procom->fk_produto_id = $id;
        $procom->fk_compra_id = session('carrinho')->id;
        $procom->save();
        return redirect()->back()->with('mensagem_sucesso','produto adicionado com sucesso');
    }
    public function deletar_produto($id){
        $procom= produto_compra::where('fk_produto_id',$id)
            ->where('fk_compra_id','=',session('carrinho')->id)
            ->first();
        $procom->delete();
        return redirect()->back()->with('mensagem_sucesso','produto deletado com sucesso');
        
    }
    public function editar_produto(editprodutocarrinhorequest $request, $id){
        $produto= produto::where('id',$id)->first();
        $procom= produto_compra::where('fk_produto_id',$id)
            ->where('fk_compra_id','=',session('carrinho')->id)
            ->first();

        if($request->quantidade==0){
            $procom->delete();
            return redirect()->back()->with('mensagem_sucesso','produto deletado com sucesso');
        }
        if($produto->quantidade==0){
            $procom->delete();
            return redirect()->back()->with('mensagem_falha','infelizmente o estoque acabou durante o processamento');
        }
        if($request->quantidade<=$produto->quantidade){
            $procom->quantidade=$request->quantidade;
            
            $procom->save();
            return redirect()->back()->with('mensagem_sucesso','quantidade alterada com sucesso');
        }else{ 
            $procom->quantidade=$produto->quantidade;
            $procom->save();
            return redirect()->back()->with('mensagem_falha','infelizmente o estoque diminuiu durante o processamento');
        }
    }

    
}
