<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipamento extends Model
{
    use HasFactory;

    protected $table = 'equipamentos';

    protected $fillable = [
        'nome',
        'quantidade',
        'descricao',

    ];

    public function agendamentos()
    {
        return $this->hasMany(Agendamento::class, 'id_equipamento');
    }

}
