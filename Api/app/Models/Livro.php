<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livro extends Model
{
    use HasFactory;

    protected $table = 'livros';

    protected $fillable = [
        'titulo',
        'autor',
        'sinopse',
        'editora',
        'edicao',
        'idioma',
        'ano',
        'numPag',
        'categoria1',
        'categoria2',
        'categoria3',
        'sbn10',
        'sbn13',
    ];
    public function categorias()
    {
        return $this->belongsToMany(Categoria::class, 'categoria_livro', 'idLivro', 'idCategoria');
    }
}
