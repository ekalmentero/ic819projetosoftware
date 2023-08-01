<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cupom extends Model
{
    use HasFactory;
    protected $table = 'cupom';
    protected $fillable = [
        'desconto',
        'descricao',
        'deletado',
        'codigo',
        'numporpessoa',
        'tipo1',
        'tipo2',
        'tipo3',
        
        
    ];
    protected $attributes = [
        
        'tipo1'=>'',
        'tipo2'=>'',
        'tipo3'=>'',
        'descricao'=>' ',
        'deletado'=>'',
    ];
}
