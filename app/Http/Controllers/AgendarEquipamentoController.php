<?php

namespace App\Http\Controllers;

use App\Models\Agendamento;
use App\Models\Equipamento;
use App\Models\Tipo_equipamento;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AgendarEquipamentoController extends Controller
{
    public function showPageAgendarEquipamentos()
    {
        $equipamentos = Equipamento::all();

        $tipo_equipamentos = Tipo_equipamento::all();
        return view('pages.agendar', compact('tipo_equipamentos', 'equipamentos'));
    }

    public function obterAgendamentodeEquipamento(Request $request)
    {
        $equipamentoId = $request->get('equipamentoId');

        $seusAgendamentos = auth()->user()->agendamentos()->where('id_equipamento', $equipamentoId)->get();

        $agendamentosEquipamento = Agendamento::where('id_equipamento', $equipamentoId)
            ->whereDoesntHave('users', function ($query) {
                $query->where('id_pesquisador', auth()->id());
            })
            ->get();

        // formatabdo os agendamentos no formato esperado pelo FullCalendar
        $agendamentos = [];

        foreach ($seusAgendamentos as $agendamento) {
            $agendamentos[] = [
                'id' => $agendamento->id,
                'title' => 'Agendamento de ' . $agendamento->users->name,
                'start' => $agendamento->data_hora_inicial,
                'end' => $agendamento->data_hora_final,
                'editable' => true,
                // Outras propriedades do evento, se necessário
            ];
        }

        foreach ($agendamentosEquipamento as $agendamento) {
            $agendamentos[] = [
                'id' => $agendamento->id,
                'title' => 'Agendamento de ' . $agendamento->users->name,
                'start' => $agendamento->data_hora_inicial,
                'end' => $agendamento->data_hora_final,
                'editable' => false,
                // outras propriedades do evento, se necessário
            ];
        }

        // Retorne os agendamentos no formato JSON
        return response()->json($agendamentos);
    }

    public function obterAgendamentos(Request $request)
    {
        $userId = Auth::user()->id;

        $meusAgendamentos = Agendamento::where('id_pesquisador', $userId)
            ->join('equipamentos', 'agendamento.id_equipamento', '=', 'equipamentos.id')
            ->select('agendamento.*', 'equipamentos.nome as nome_equipamento')
            ->get();

        // Retorne os agendamentos no formato JSON
        return response()->json($meusAgendamentos);
    }

    private function obterdisponibilidadeEquipamento($data_hora_inicial, $data_hora_final, $equipamento_id){

        $quantidade_agendamentos = Agendamento::where(function ($query) use ($data_hora_inicial, $data_hora_final) {
            $query->where(function ($query) use ($data_hora_inicial, $data_hora_final) {
                $query->where('data_hora_inicial', '>=', $data_hora_inicial)
                    ->where('data_hora_inicial', '<', $data_hora_final);
            })//verificando no intervalo
            ->orWhere(function ($query) use ($data_hora_inicial, $data_hora_final) {
                $query->where('data_hora_final', '>', $data_hora_inicial)
                    ->where('data_hora_final', '<=', $data_hora_final);
            })
                ->orWhere(function ($query) use ($data_hora_inicial, $data_hora_final) {
                    $query->where('data_hora_inicial', '<=', $data_hora_inicial)
                        ->where('data_hora_final', '>=', $data_hora_final);
                });
        })
            ->where('id_equipamento', $equipamento_id)
            ->count();

        return $quantidade_agendamentos;
    }

    public function agendarEquipamento(Request $request)
    {
        try {
            $request->validate([
                'data_hora_inicial' => 'required|date',
                'data_hora_final' => 'required|date|after:data_hora_inicial|date_format:Y-m-d\TH:i',
                'id_equipamento' => 'required|exists:equipamentos,id',
            ], [
                'data_hora_inicial.required' => 'A data e hora inicial são obrigatórias.',
                'data_hora_inicial.date' => 'A data e hora inicial deve estar em um formato válido.',
                'data_hora_final.required' => 'A data e hora final é obrigatória.',
                'data_hora_final.date' => 'A data e hora final deve estar em um formato válido.',
                'data_hora_final.after' => 'A data e hora final deve ser posterior à data e hora inicial.',
                'data_hora_final.date_format' => 'A data e hora final deve estar no formato válido (YYYY-MM-DDTHH:mm).',
                'id_equipamento.required' => 'Selecione um equipamento antes.',
                'id_equipamento.exists' => 'O ID do equipamento informado não é válido.',
            ]);

            $userId = Auth::user()->id;
            $data_hora_inicial = Carbon::parse($request->input('data_hora_inicial'));
            $data_hora_final = Carbon::parse($request->input('data_hora_final'));
            $equipamento_id = $request->input('id_equipamento');

            $equipamento = Equipamento::findOrFail($equipamento_id);

            $quantidade_equipamentos = $equipamento->quantidade ?? 0;

            $quantidade_agendamentos = $this-> obterdisponibilidadeEquipamento($data_hora_inicial, $data_hora_final,$equipamento_id);

            if ($quantidade_agendamentos < $quantidade_equipamentos) {
                $equipamentos_disponiveis = $quantidade_equipamentos - $quantidade_agendamentos;
                $mensagem = 'Equipamento disponível, restam ' . $equipamentos_disponiveis - 1 . ' nesse horário';

                $agendamento = new Agendamento;
                $agendamento->data_hora_inicial = $data_hora_inicial;
                $agendamento->data_hora_final = $data_hora_final;
                $agendamento->id_pesquisador = $userId;
                $agendamento->id_equipamento = $equipamento_id;
                $agendamento->save();

                return redirect()->back()->with([
                    'message' => 'Agendamento realizado com sucesso.',
                    'disponibilidade' => $mensagem,
                    'quantidade_equipamentos' => $quantidade_equipamentos,
                ]);

            } else {

                return redirect()->back()->with([
                    'error' => 'Equipamento indisponível, todos os equipamentos estão em uso nesse horário.',
                ]);
            }

        } catch (\Exception $exception) {
            return redirect()->back()->withErrors([$exception->getMessage()]);
        }
    }

    public function atualizarAgendamento(Request $request)
    {
        try {
            $request->validate([
                'data_hora_inicial' => 'required|date',
                'data_hora_final' => 'required|date|after:data_hora_inicial|date_format:Y-m-d\TH:i',
                'id_equipamento' => 'required|exists:equipamentos,id',
                'id_agendamento' => 'required|exists:agendamento,id'
            ], [
                'data_hora_inicial.required' => 'A data e hora inicial são obrigatórias.',
                'data_hora_inicial.date' => 'A data e hora inicial deve estar em um formato válido.',
                'data_hora_final.required' => 'A data e hora final é obrigatória.',
                'data_hora_final.date' => 'A data e hora final deve estar em um formato válido.',
                'data_hora_final.after' => 'A data e hora final deve ser posterior à data e hora inicial.',
                'data_hora_final.date_format' => 'A data e hora final deve estar no formato válido (YYYY-MM-DDTHH:mm).',
                'id_equipamento.required' => 'Selecione um equipamento antes.',
                'id_equipamento.exists' => 'O ID do equipamento informado não é válido.',
            ]);

            $data_hora_inicial = Carbon::parse($request->input('data_hora_inicial'));
            $data_hora_final = Carbon::parse($request->input('data_hora_final'));
            $equipamento_id = $request->input('id_equipamento');
            $id_agendamento = $request->input('id_agendamento');

            $equipamento = Equipamento::findOrFail($equipamento_id);

            $quantidade_equipamentos = $equipamento->quantidade ?? 0;

            $quantidade_agendamentos = $this-> obterdisponibilidadeEquipamento($data_hora_inicial, $data_hora_final,$equipamento_id);

            if ($quantidade_agendamentos < $quantidade_equipamentos) {
                $equipamentos_disponiveis = $quantidade_equipamentos - $quantidade_agendamentos;
                $mensagem = 'Equipamento disponível, restam ' . $equipamentos_disponiveis . ' nesse horário';

                $agendamento = Agendamento::findOrFail($id_agendamento);
                $agendamento->data_hora_inicial = $data_hora_inicial;
                $agendamento->data_hora_final = $data_hora_final;
                $agendamento->id_equipamento = $equipamento_id;
                $agendamento->save();


                return redirect()->back()->with([
                    'message' => 'Agendamento editado com sucesso.',
                    'disponibilidade' => $mensagem,
                    'quantidade_equipamentos' => $quantidade_equipamentos,
                ]);

            } else {

                return redirect()->back()->with([
                    'error' => 'Equipamento indisponível, todos os equipamentos estão em uso nesse horário.',
                ]);
            }

        } catch (\Exception $exception) {
            return redirect()->back()->withErrors([$exception->getMessage()]);
        }
    }

    public function deletarAgendamento(Request $request)
    {
        try {
            $id_agendamento = $request->input('id_agendamento');
            $agendamento = Agendamento::findOrFail( $id_agendamento);
            $agendamento->delete();

            return redirect()->back()->with([
                'message' => 'Agendamento excluido com sucesso.',
            ]);

        } catch (\Exception $exception) {
            return redirect()->back()->withErrors([$exception->getMessage()]);
        }
    }
}
