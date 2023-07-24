<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseCleanerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('itens')->truncate();

        //PROBLEMA AO FAZER A LIMPA DE USERS. Terei que desativar a checagem (verificação de chaves estrangeiras será temporariamente desativada):
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('users')->truncate();
        // Adicione outras tabelas que você deseja limpar aqui
        DB::table('projetos')->truncate();

        DB::table('equipamentos')->truncate();
        DB::table('resultados')->truncate();
        DB::table('tipo_equipamentos')->truncate();
        DB::table('tipo_usuario')->truncate();



        // Executar outros seeders se necessário
        $this->call([
            // Adicione outros seeders que você deseja executar após a limpeza aqui
        ]);


        //Ativar o que desativei para fazer a LIMPA de "users" sem dar problemas.
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
