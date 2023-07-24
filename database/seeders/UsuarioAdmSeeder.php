<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsuarioAdmSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'tipoUsuario' => 1, // ID do tipo de usuário administrador
            'name' => 'Administrador',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('123456789'),
            'telefone' => '123456789',
            'datadeNascimento' => '1990-01-01',
            'sexo' => 'Masculino',
            'curriculoLattes' => '',
            'instituicao' => 'Admin Institution',
            'funcao' => 'Admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
