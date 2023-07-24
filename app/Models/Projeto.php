<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projeto extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'data_inicial',
        'data_final',
        'descricao',
        'status',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'usuario_projeto', 'projeto_id', 'usuario_id');
    }

    public function itens()
    {
        return $this->hasMany(Item::class);
    }

    public function resultados(){
        return $this->hasMany(Resultado::class);
    }

}
