<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Projeto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ItemController extends Controller
{
    public function showPageItens(){

        $usuario = Auth::user();

        if ($usuario->tipoUsuario == 1) {
            $projetos = Projeto::all();
        } else {
            $projetos = $usuario->projetos;
        }

        return view('pages.itens', compact('projetos'));
    }

    public function obterItensDoProjeto(Request $request)
    {
        $projeto = $request->input('id_projeto');

        // Lógica para obter os itens do projeto selecionado
        $projeto = Projeto::find($projeto);

        //buscar itens projeto
        $itens = $projeto->itens()->get();

        $usuario = Auth::user();
        $projetos = $usuario->projetos;

        return view('pages.itens', compact('itens', 'projetos'))
            ->with('projetoSelecionado', $projeto);
    }

    public function cadastrarItem(Request $request){

        try{
            $request->validate([
                'nome' => 'required',
                'quantidade' => 'required|numeric|min:1',
                'descricao' => 'required| |min:10|max:255',
                'projeto_id' => 'required|exists:projetos,id',
            ], [
                'nome.required' => 'O campo nome é obrigatório.',
                'quantidade.required' => 'O campo quantidade é obrigatório.',
                'quantidade.numeric' => 'O campo quantidade deve ser um número.',
                'quantidade.min' => 'O campo quantidade deve ser maior que zero.',
                'descricao.required' => 'O campo descrição é obrigatório.',
                'projeto_id.exists' => 'O projeto selecionado não existe.',
                'projeto_id.required' =>'Selecione um projeto para adicionar item.',
                'descricao.min' => 'O campo descrição deve ter no mínimo 10 caracteres.',
                'descricao.max' => 'O campo descrição deve ter no máximo 255 caracteres.'
            ]);

            $projetoId = $request->input('projeto_id');

            $itens = new Item;
            $itens->nome = trim($request->input('nome'));
            $itens->quantidade = $request->input('quantidade');
            $itens->descricao = trim($request->input('descricao'));
            $itens->projeto_id = $projetoId;
            $itens->save();

            return redirect()->back()->with('success', 'Item adicionado com sucesso!');

        }catch (\Exception $exception) {

            return redirect()->back()->withErrors([$exception->getMessage()]);
        }
    }
    public function visualizarItem($idItem)
    {
        // Buscar o item pelo ID
        $item = Item::findOrFail($idItem);

        // Retornar os dados do item em formato JSON
        return response()->json(['item' => $item]);
    }

    public function editarItem(Request $request)
    {
        try {
            $request->validate([
                'nome' => 'required',
                'quantidade' => 'required|numeric|min:1',
                'descricao' => 'required|min:10|max:255',
            ], [
                'nome.required' => 'O campo "nome" é obrigatório.',
                'quantidade.required' => 'O campo quantidade é obrigatório.',
                'quantidade.numeric' => 'O campo quantidade deve ser um número.',
                'quantidade.min' => 'O campo quantidade deve ser maior que zero.',
                'descricao.required' => 'O campo descrição é obrigatório.',
                'descricao.min' => 'O campo descrição deve ter no mínimo 10 caracteres.',
                'descricao.max' => 'O campo descrição deve ter no máximo 255 caracteres.'
            ]);
            $idItem = $request->input('item_id');

            $item = Item::findOrFail($idItem);
            $item->nome = trim($request->input('nome'));
            $item->quantidade = $request->input('quantidade');
            $item->descricao = trim($request->input('descricao'));
            $item->projeto_id = $request->input('projeto_id');
            $item->save();

            return redirect()->back()->with('success', 'Item atualizado com sucesso!');

        } catch (\Exception $exception) {
            return redirect()->back()->withErrors([$exception->getMessage()]);
        }
    }

    public function deletarItem(Request $request){

        $idItem = $request->input('id_item');

        $item = Item::find($idItem);
        $ItemDeletado = $item->delete();

        if($ItemDeletado){
            return redirect()->back()->with('success', 'Item excluído com sucesso!');
        } else{
            return redirect()->route('itens')->with('error', 'item não foi excluído!');
        }
    }

}
