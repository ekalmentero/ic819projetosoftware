<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class produto extends Model
{
    protected $table = 'produto';
    use HasFactory;

    protected $fillable = [
        'nome',
        'tipo',
        'descricao',
        'valor',
        'imagem',
        'quantidade',
        'deletado',
        
    ];

    protected $attributes = [
        'descricao' => ' ', 
        'deletado'=>'',
        
    ];
}
