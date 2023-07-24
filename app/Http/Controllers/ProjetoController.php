<?php

namespace App\Http\Controllers;

use App\Models\Projeto;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProjetoController extends Controller
{
    public function home(){

        $projetos = Projeto::all();
        return view('pages.home', compact('projetos'));

    }
    public function listarProjetos()
    {
        //Dados do usuario logado
        $usuario = Auth::user();

        //verificando se é admin e retornando todos os projetos
        if ($usuario->tipoUsuario == 1) {
            $projetos = Projeto::all();
        } else {
            $projetos = $usuario->projetos;
        }

        //buscando participantes
        $participantes = User::where('tipoUsuario', '2')->where('id', '!=', Auth::user()->id)->get();

        return view('pages.projetos', compact('projetos', 'participantes'));
    }

    public function cadastrarProjeto(Request $request){
        try{
            //validações
            $request->validate([
                'titulo' => 'required|min:1|max:50|unique:projetos' ,
                'data_inicial' => 'required|date|before_or_equal:today|',
                'data_final' => 'nullable|date|after_or_equal:today',
                'descricao' => 'required|string|min:10|max:255',
            ],[
                'titulo.unique' => 'O titulo já está em uso.',
                'titulo.required' => 'O campo título é obrigatório.',
                'titulo.min' => 'O campo título deve ter pelo menos 1 caractere.',
                'titulo.max' => 'O campo título deve ter no máximo 50 caracteres.',
                'data_inicial.required' => 'O campo data inicial é obrigatório.',
                'data_inicial.before_or_equal' => 'A data inicial deve ser igual ou anterior à data atual.',
                'data_inicial.date' => 'O campo data inicial deve ser uma data válida.',
                'data_final.date' => 'O campo data final deve ser uma data válida.',
                'data_final.after_or_equal' => 'A data final deve ser igual ou posterior à data atual.',
                'descricao.required' => 'O campo descrição é obrigatório.',
                'descricao.string' => 'O campo descrição deve ser uma sequência de caracteres.',
                'descricao.min' => 'O campo descrição deve ter no mínimo 10 caracteres.',
                'descricao.max' => 'O campo descrição deve ter no máximo 255 caracteres.'
            ]);

            // Criar um novo projeto
            $projeto = new Projeto;
            $projeto->titulo = trim($request->titulo);
            $projeto->data_inicial = $request->data_inicial;
            $projeto->data_final =  $request->data_final;
            $projeto->descricao = trim($request->descricao);
            $projeto->status = trim($request->status);
            $projeto->save();

            // salvar o projeto associado ao usuário atual
            $usuario = Auth::user();

            // Associar usuário como criador do projeto
            $usuario->projetos()->attach($projeto->id, ['tipo_participacao' => 'criador']);

            $participantes = $request->input('participantes', []);

            //Adicionar participantes
            foreach ($participantes as $participanteId) {
                $projeto->users()->attach($participanteId, ['tipo_participacao' => 'participante']);
            }

            return redirect()->route('projetos')->with('success', 'Projeto adicionado com sucesso!');

        }catch (\Exception $exception) {

            return redirect()->back()->withErrors([$exception->getMessage()]);
        }
    }

    public function verificarProjeto($id){

        //filtra o projeto baseado no id
        $projeto = Projeto::findOrFail($id);

        // Carrega os participantes do projeto
        $participantes = $projeto->users;

        // Retorna um JSON com o projeto e os participantes
        return response()->json(['projeto' => $projeto, 'participantes' => $participantes]);
    }

    public function editarProjeto(Request $request){

        try{
            $idDoProjeto = $request->input('id');
            //validações
            $request->validate([
                'titulo' => 'required|min:1|max:50|unique:projetos,titulo,' . $idDoProjeto,
                'data_inicial' => 'required|date|before_or_equal:today|',
                'data_final' => 'nullable|date|after_or_equal:today',
                'descricao' => 'required|string|min:10|max:255',
            ],[
                'titulo.unique' => 'O titulo já está em uso.',
                'titulo.required' => 'O campo título é obrigatório.',
                'titulo.min' => 'O campo título deve ter pelo menos 1 caractere.',
                'titulo.max' => 'O campo título deve ter no máximo 50 caracteres.',
                'data_inicial.required' => 'O campo data inicial é obrigatório.',
                'data_inicial.before_or_equal' => 'A data inicial deve ser igual ou anterior à data atual.',
                'data_inicial.date' => 'O campo data inicial deve ser uma data válida.',
                'data_final.date' => 'O campo data final deve ser uma data válida.',
                'data_final.after_or_equal' => 'A data final deve ser igual ou posterior à data atual.',
                'descricao.required' => 'O campo descrição é obrigatório.',
                'descricao.string' => 'O campo descrição deve ser uma sequência de caracteres.',
                'descricao.min' => 'O campo descrição deve ter no mínimo 10 caracteres.',
                'descricao.max' => 'O campo descrição deve ter no máximo 255 caracteres.'
            ]);

            //Recuperar projeto com id
            $projeto = Projeto::find($request->input('id'));

            $projeto->titulo = trim($request->titulo);
            $projeto->data_inicial = $request->data_inicial;
            $projeto->data_final =  $request->data_final;
            $projeto->descricao = trim($request->descricao);
            $projeto->status = trim($request->status);
            $projeto->save();

            $participantes = $request->input('participantes', []);

            // busca todos os projetos de todos os usuarios, onde a condição da participação é diferente
            // de criador, logo apos cria uma lista com todos os ids, e retorna um array.
            $participantesAtuais = $projeto->users()->where('tipo_participacao', '!=', 'criador')->pluck('id')->toArray();

            // identifica os participantes a serem adicionados
            $participantesAdicionar = array_diff($participantes, $participantesAtuais);

            // Identifica os participantes a serem removidos
            $participantesRemover = array_diff($participantesAtuais, $participantes);

            // aqui adiciona participantes que não esta associado ao projeto
            foreach ($participantesAdicionar as $participanteId) {
                $projeto->users()->attach($participanteId, ['tipo_participacao' => 'participante']);
            }

            // aqui remove participantes associados ao projeto
            foreach ($participantesRemover as $participanteId) {
                $projeto->users()->detach($participanteId);
            }

            return redirect()->route('projetos')->with('success', 'Projeto editado com sucesso!');

        }catch (\Exception $exception) {

            return redirect()->back()->withErrors([$exception->getMessage()]);
        }
    }

    public function deletarProjeto(Request $request){

        $projeto = Projeto::find($request->input('id'));
        $projetoDeletado = $projeto->delete();

        if($projetoDeletado){
            return redirect()->route('projetos')->with('success', 'Projeto excluído com sucesso!');
        } else{
            return redirect()->route('projetos')->with('error', 'Projeto não foi excluído!');
        }
    }



    public function showPageEditarPerfil()
    {
        if (Auth::check()) {
            // Indicando que estamos a mudar o usuário LOGADO (AUTENTICADO)
            $user = Auth::user();
            return view('pages.editarPerfil', compact('user'));; // Aqui é sem a barra  "/", pois é uma view. E exibe a página de edição do perfil
        }
        else {
            return redirect('/login');// Aqui é com a barra  "/", pois é um redirecionamento (caso o usuário não esteja logado).
        }
    }

    public function showPageEditarSenha()
    {
        if (Auth::check()) {
            return view('pages.editarSenha'); // Aqui é sem a barra  "/", pois é uma view. E exibe a página de edição do perfil
        }
        else {
        return redirect('/login'); // Aqui é com a barra  "/", pois é um redirecionamento (caso o usuário não esteja logado).
        }
    }

    public function editarPerfil (Request $request)
    {

        // Indicando que estamos a mudar o usuário LOGADO (AUTENTICADO)
        $user = Auth::user();



        //Validação dos dados do formulário
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,'.$user->id, //o valor do campo deve ser único na tabela "users"
            // na coluna "email", MAS o ID do usuário atual ($user->id) é fornecido para que o próprio valor do usuário
            //atual seja ignorado durante a verificação de unicidade.

            #'password' => 'required|string|min:8',
            #'confirm_password' => 'required|same:password',
            'curriculoLattes' => 'required|url',
            'instituicao' => 'required',
        ], [
            'name.required' => 'O campo nome é obrigatório.',
            'name.string' => 'bhdbfsd',
            'email.required' => 'O campo de email é obrigatório.',
            'email.email' => 'Informe um endereço de email válido.',
            'email.unique' => 'Endereço de email já estar em uso.',
            #'password.required' => 'O campo de senha é obrigatório.',
            #'password.min' => 'A senha deve ter pelo menos 8 caracteres.',
            #'confirm_password.required' => 'O campo de confirmação de senha é obrigatório.',
            #'confirm_password.same' => 'As senhas não coincidem.',
            'curriculoLattes.url' => 'Coloque um link valido para o Curriculo Lattes.',
            'curriculoLattes.required' => 'O campo Curriculo Lattes é obrigatório.',
            'instituicao.required' => 'O campo Instituição é obrigatório.'
        ]);

        if ($user) {
            $campos = [
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'datadeNascimento' => $request->input('datadeNascimento'),
                'telefone' => $request->input('telefone'),
                'curriculoLattes' => $request->input('curriculoLattes'),
                'instituicao' => $request->input('instituicao'),
                'funcao' => $request->input('funcao'),
                'sexo' => $request->input('sexo'),
            ];

            // Verificar e atualizar os campos se os novos valores forem diferentes dos valores atuais
            foreach ($campos as $campo => $novoValor) {
                $valorAtual = $user->{$campo};

                if ($novoValor !== $valorAtual) {
                    $user->{$campo} = $novoValor;
                }
            }

            $user->save();

            $mensagem = 'Edição guardada com sucesso!';
            return redirect()->back()->with('success', $mensagem);
            #Foi necessário na pág. blade verificar a existência da chave "success" na sessão usando @if(session('success'))
        }
    }

    public function editarSenha (Request $request)
    {
        //Validação dos dados do formulário
        $request->validate([
            'senhaNova' => 'required|string|min:8',
            'confirmeSenhaNova' => 'required|same:senhaNova',
            'senhaAntiga' => 'required',

        ], [

            'senhaNova.required' => 'O campo de senha é obrigatório.',
            'senhaNova.min' => 'A senha deve ter pelo menos 8 caracteres.',
            'confirmeSenhaNova.required' => 'O campo de confirmação de senha é obrigatório.',
            'confirmeSenhaNova.same' => 'As senhas não coincidem.',

        ]);

        // Indicando que estamos a mudar o usuário LOGADO (AUTENTICADO)
        $user = Auth::user();

        // Verifica se a senha antiga fornecida corresponde à senha atual no banco de dados
        if (!Hash::check($request->senhaAntiga, $user->password)) {
            // Senha antiga incorreta
            $mensagem = 'A senha antiga não corresponde à senha atual.';
            return redirect()->back()->with('error', $mensagem);
        }

        // Atualiza a senha com a nova senha fornecida
        $user->password = Hash::make($request->senhaNova);
        $user->save();

        $mensagem = 'Edição guardada com sucesso!';
        return redirect()->back()->with('success', $mensagem);
        #Foi necessário na pág. blade verificar a existência da chave "success" na sessão usando @if(session('success'))

    }


}
