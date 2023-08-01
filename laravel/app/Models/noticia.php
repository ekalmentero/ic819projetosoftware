<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class noticia extends Model
{
    protected $table = 'noticia';
    use HasFactory;

    protected $fillable = [
        'titulo',
        'descricao',
        'foto',
        'deletado',
        
    ];

    protected $attributes = [
        'descricao' => ' ', 
        'deletado'=>'',
        
    ];
}
