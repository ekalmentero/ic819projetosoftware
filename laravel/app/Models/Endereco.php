<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Endereco extends Model
{
    use HasFactory;
    protected $table = 'endereco';
    protected $fillable = [
        'cep',
        'numero',
        'estado',
        'cidade',
        'fk_user_id',
        'bairro',
        'rua',
        'apelido',
        'deletado',
        
    ];
    protected $attributes = [
        
        'estado'=>' ',
        'deletado'=>'',
    ];
    
}
