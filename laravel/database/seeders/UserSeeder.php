<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'nome' => Str::random(10),
            'senha' => Hash::make('password'),
            'email' => Str::random(10).'@gmail.com',
            'telefone' => '21987199930',
            'usertype' => 'cliente'
        ]);
    }
}
