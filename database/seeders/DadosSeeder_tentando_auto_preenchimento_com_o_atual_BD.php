<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Projeto;
use App\Models\Equipamento;
use App\Models\Resultado;
use App\Models\Tipo_equipamento ;

use Illuminate\Support\Facades\DB; //IMPORTANTE

class DadosSeeder_tentando_auto_preenchimento_com_o_atual_BD extends Seeder
{
    public function run()
    {
        // Inserir dados da tabela 'users'
        $users = User::all();
        foreach ($users as $user) {
            $userData = $user->toArray();
            $userData['password'] = bcrypt('Aa123456#'); // Substitua 'senha' pela senha desejada
            User::firstOrCreate(['id' => $userData['id']], $userData);
        }

        // Inserir dados da tabela 'projetos'
        $projetos = Projeto::all();
        foreach ($projetos as $projeto) {
            Projeto::updateOrCreate(['id' => $projeto->id], [
                'titulo' => $projeto->titulo,
                'data_inicial' => $projeto->data_inicial,
                'data_final' => $projeto->data_final,
                'descricao' => $projeto->descricao,
                'status' => $projeto->status,
                'created_at' => '2023-07-07 19:15:12',
                'updated_at' => $projeto->updated_at,
            ]);
        }

        // Inserir dados da tabela 'equipamentos'
        $equipamentos = Equipamento::all();
        foreach ($equipamentos as $equipamento) {
            Equipamento::updateOrCreate(['id' => $equipamento->id], [
                'tipoEquipamento' => $equipamento->tipoEquipamento,
                'nome' => $equipamento->nome,
                'quantidade' => $equipamento->quantidade,
                'descricao' => $equipamento->descricao,
                'created_at' => '2023-07-07 19:15:12',
                'updated_at' => $equipamento->updated_at,
            ]);
        }

        // Inserir dados da tabela 'resultados'
        $resultados = Resultado::all();
        foreach ($resultados as $resultado) {
            Resultado::create($resultado->toArray());
        }

        // Inserir dados da tabela 'tipo_equipamentos'
        $tipoEquipamentos = Tipo_equipamento::all();
        foreach ($tipoEquipamentos as $tipoEquipamento) {
            Tipo_Equipamento::updateOrCreate(['id' => $tipoEquipamento->id], [
                'descricao' => $tipoEquipamento->descricao,
                'created_at' => '2023-07-07 19:15:12',
                'updated_at' => $tipoEquipamento->updated_at,
            ]);
        }

/*
        // Inserir dados da tabela 'tipo_usuario'
        $tipoUsuarios = tipo_usuario::all();
        foreach ($tipoUsuarios as $tipoUsuario) {
            Tipo_usuario::create($tipoUsuario->toArray());
        }
*/

    }
}
