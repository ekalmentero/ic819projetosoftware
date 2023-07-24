<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(DatabaseCleanerSeeder::class);
        $this->call(class: TipoUsuarioSeeder::class);
        $this->call(class: UsuarioAdmSeeder::class);

        $this->call(class: ProjetosTableSeeder::class);
        //$this->call(ItensTableSeeder::class); //TIVE QUE POR JUNTO EM PROJETOS, ENTÃO NÃO É CHAMADO

        $this->call(class: TipoEquipamentoSeeder::class);
    }
}
