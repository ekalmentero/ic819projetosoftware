<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoEquipamentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tipo_equipamentos')->insert([
            ['descricao' => 'Equipamento Comum'],
            ['descricao' => 'Fluxo laminar'],
        ]);
    }
}
