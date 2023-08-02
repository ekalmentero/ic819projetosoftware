<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use App\Models\Livro;
use App\Models\Anuncio;
use App\Models\Categoria;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //cria solto
        Livro::factory(20)->create();
        User::factory(20)->create();
        Categoria::factory(30)->create(/*[
            'idLivro' => Livro::factory()->create()->id
        ]*/);

        #comentei idLivro pq tava dando erro de campo não encontrado

        //pra criar anuncio sem requerente
        User::factory(30)->create()->each(function($usuario){
            $livro = Livro::factory()->create();
            Anuncio::factory()->create([
                'idDono' => $usuario->id,
                'idLivro' => $livro->id
            ]);
        });

        //pra criar anuncio com requerente
        User::factory(30)->create()->each(function($usuario){
            $livro = Livro::factory()->create();
            $requerente = User::factory()->create();
            Anuncio::factory()->create([
                'idDono' => $usuario->id,
                'idRequerente' => $requerente->id,
                'idLivro' => $livro->id
            ]);
        });
    }
}
