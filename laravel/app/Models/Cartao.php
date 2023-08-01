<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cartao extends Model
{
    use HasFactory;
    protected $table = 'cartao';

    protected $fillable = [
        'numerocartao',
        'cvv',
        'datavencimento',
        'nometitular',
        'fk_user_id',
        'apelido',
        'deletado',
        
        
    ];
    
   
    protected $attributes = [
        
        
        'deletado'=>'',
    ];
    protected $dates = ['datavencimento'];

    protected $casts = [
        'cvv' => 'hashed',
    ];
}
