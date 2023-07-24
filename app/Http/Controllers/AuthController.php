<?php

namespace App\Http\Controllers;

use App\Notifications\ResetPasswordNotification;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\URL;

class AuthController extends Controller
{
    public function showPagePrincipal()
    {
        if (Auth::check()) {
            return redirect('/home'); // Redirecionar para a página inicial, por exemplo
        }

        return view('welcome');
    }

    public function showPageLogin()
    {
        if (Auth::check()) {
            return redirect('/home'); // Redirecionar para a página inicial, por exemplo
        }

        return view('login');
    }

    public function showRegistroForm()
    {
        if (Auth::check()) {
            return redirect('/home'); // Redirecionar para a página inicial, por exemplo
        }
        return view('register');
    }

    public function showRecuperarSenhaForm()
    {
        if (Auth::check()) {
            return redirect('/'); // Redirecionar para a página inicial, por exemplo
        }
        return view('recuperarSenha');
    }

    public function showmudSenhaForm($token)
    {
        return view('trocaSenha',['token' => $token]);
    }

    public function recuperSenha(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ],[
            'email.required' => 'O campo de email é obrigatório.',
            'email.email' => 'Informe um endereço de email válido.',
        ]);

        $response = PASSWORD::broker()->sendResetLink(
            $request->only('email'),
            function ($user, $resetToken) use ($request) {
                $resetUrl = URL::to('/resetar-senha/' . $resetToken . '?email=' . urlencode($request->input('email')));
                $user->notify(new ResetPasswordNotification($resetToken, $resetUrl));
            }
        );

        if ($response == Password::RESET_LINK_SENT) {
            $mensagem = 'Foi enviado uma mensagem para seu email informando os proximos passos para recuperação de sua senha.';
            return redirect()->route('recuperarSenha')->with('success', $mensagem);
        } else {
            $mensagem = 'Não existe nenhuma conta associada a esse email.';
            return redirect()->route('recuperarSenha')->with('danger', $mensagem);
        }

    }

    public function updateSenha(Request $request){
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8',
            'password_confirmation' => 'required|same:password|min:8'
        ],[
            'email.required' => 'O campo de email é obrigatório.',
            'password.required' => 'O campo de senha é obrigatório.',
            'password.min' => 'A senha deve ter pelo menos 8 caracteres.',
            'password_confirmation.min' => 'A senha deve ter pelo menos 8 caracteres.',
            'password_confirmation.required' => 'O campo de confirmação de senha é obrigatório.',
            'password_confirmation.same' => 'As senhas não coincidem.'
        ]);
        $token = $request->input('token');

        $response = Password::broker()->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => null,
                ])->save();
            }
        );

        if ($response) {
            $mensagem = 'Senha mudada com sucesso, efetue o login.';
            return redirect()->route('login')->with('success', $mensagem);
        } else {
            $mensagem = 'Falha ao efetuar mudança de senha!';
            return redirect()->route('password.reset/'.$token)->with('danger', $mensagem);
        }
    }

    public function registrar(Request $request)
    {
        //Validação dos dados do formulário
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'confirm_password' => 'required|same:password',
            'curriculoLattes' => 'required|url',
            'instituicao' => 'required',
        ],[
            'name.required' => 'O campo nome é obrigatório.',
            'name.string' => 'bhdbfsd',
            'email.required' => 'O campo de email é obrigatório.',
            'email.email' => 'Informe um endereço de email válido.',
            'email.unique' => 'Endereço de email já estar em uso.',
            'password.required' => 'O campo de senha é obrigatório.',
            'password.min' => 'A senha deve ter pelo menos 8 caracteres.',
            'confirm_password.required' => 'O campo de confirmação de senha é obrigatório.',
            'confirm_password.same' => 'As senhas não coincidem.',
            'curriculoLattes.url' => 'Coloque um link valido para o Curriculo Lattes.',
            'curriculoLattes.required' => 'O campo Curriculo Lattes é obrigatório.',
            'instituicao.required' => 'O campo Instituição é obrigatório.'
        ]);

        // Criação do novo usuário
        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->datadeNascimento = $request->input('datadeNascimento');
        $user->telefone = $request->input('telefone');
        $user->curriculoLattes = $request->input('curriculoLattes');
        $user->instituicao = $request->input('instituicao');
        $user->funcao = $request->input('funcao');
        $user->sexo = $request->input('sexo');
        $user->save();

        $mensagem = 'Registro concluído com sucesso! Faça login para acessar sua conta.';

        return redirect()->route('login')->with('success', $mensagem);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ], [
            'email.required' => 'O campo de email é obrigatório.',
            'email.email' => 'Informe um endereço de email válido.',
            'password.required' => 'O campo de senha é obrigatório.',
        ]);

        $dados = $request->only('email', 'password'); //busca apenas email e senha

        if (Auth::attempt($dados)) {
            // autenticação bem-sucedida, o usuário está agora autenticado
            $usuario = Auth::user();
            session(['nome_usuario' => $usuario->name]);
            return redirect()->route('home');

        } else {
            // Credenciais informadas estão incorretas
            return redirect()->back()->withErrors(['email' => 'Senha e/ou email da conta incorreta.',]);
        }
    }
    public function logout()
    {
        Auth::logout(); // Destruir a sessão
        return redirect('/');
    }

    public function showPageEditarPerfil()
    {
        return view('pages.editarPerfil'); // Aqui é sem a barra  "/", pois é uma view. E exibe a página de edição do perfil
    }

    public function showPageEditarSenha()
    {
        return view('pages.editarSenha'); // Aqui é sem a barra  "/", pois é uma view. E exibe a página de edição do perfil
    }

}
