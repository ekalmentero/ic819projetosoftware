<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agendamento extends Model
{
    use HasFactory;

    protected $table = 'agendamento';


    public function users()
    {
        return $this->belongsTo(User::class, 'id_pesquisador');
    }

    public function equipamento()
    {
        return $this->belongsTo(Equipamento::class, 'id_equipamento');
    }

}
