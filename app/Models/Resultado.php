<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resultado extends Model
{
    use HasFactory;

    protected $table = 'resultados';

    protected $fillable = [
        'titulo',
        'data',
        'link',
        'descricao'
    ];

    public function projeto(){
        return $this->belongsTo(Projeto::class);
    }
}
