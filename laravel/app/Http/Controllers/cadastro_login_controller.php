<?php

namespace App\Http\Controllers;

use App\Http\Requests\cadastrorequest;
use App\Http\Requests\loginrequest;
use App\Http\Requests\updatedadosrequest;
use App\Models\Compras;
use App\Models\User;
use Hamcrest\Core\IsNull;
use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules\Exists;

use function PHPUnit\Framework\isNull;

class cadastro_login_controller extends Controller
{
    public function cadastro(cadastrorequest $request){

        $data = $request->all();
        $data['senha'] = Hash::make($request->senha);
        $user = User::create($data);
        $novocarrinho = new Compras();
        $novocarrinho->status= 'carrinho';
        $novocarrinho->fk_user_cliente_id= $user->id;
        $novocarrinho->save();
        
        return redirect()->route('tela_cadastro')->with("mensagem_sucesso","usuário cadastrado com sucesso");
       
    }
    public function login(loginrequest $request){
        
        $user = User::where('email',$request->input('email'))->first();

        if(!$user){
            return redirect()->route('tela_login')->with('mensagem_falha','Email incorreto');
        }else if(!password_verify(request()->input('senha'),$user->senha)){
            return redirect()->route('tela_login')->with('mensagem_falha','Senha incorreta');
        }

        Auth::loginUsingId($user->id);
        session()->put('user',$user);

        if($user->usertype =='cliente'){
            $carrinho= DB::table('Compra')
            ->where('fk_user_cliente_id','=',$user->id)
            ->where('status','=','carrinho')->first();
            
            if(!$carrinho){
                $novocarrinho = new Compras();
                $novocarrinho->status= 'carrinho';
                $novocarrinho->fk_user_cliente_id= $user->id;
                $novocarrinho->save();
                Session()->put('carrinho',$novocarrinho);
            }else{
                Session()->put('carrinho',$carrinho);
            }   
            return redirect()->route('index');
        }
        if($user->usertype =='administrador'){
            return redirect()->route('index');
        }
        if($user->usertype =='atendente'){
            return redirect()->route('index');
        }
    }

    public function logout(){
        Auth::logout();
        session()->pull('user');
        return redirect()->route('index');

    }
    public function dados_update(updatedadosrequest $request){
        $user =user::findOrFail(session('user')->id);
        if(!is_null($request->email)){
            $user->email=$request->email;
        }
        if(!is_null($request->telefone)){
            if($request->telefone!=$user->telefone){
                $user->telefone=$request->telefone;
            }else{
                return redirect()->back()->with('mensagem_falha','o telefone deve ser diferente do atual');
            }
        }
        if(!is_null($request->confirma_senha)){
            if(!password_verify($request->confirma_senha,$user->senha)){
                $user->senha= Hash::make($request->senha);
            }else{
                return redirect()->back()->with('mensagem_falha','a senha deve ser diferente da atual');
            }
            
        }
        $user->save();
        session()->put('user',$user);
        return redirect()->back()->with('mensagem_sucesso','dados alterados com sucesso');

    }
}
