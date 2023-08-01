<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cupom_user extends Model
{
    use HasFactory;
    protected $table = 'cupom_user';
    protected $fillable = [
        'fk_user_id',
        'fk_cupom_id',
        'qtdrestante',

    ];
}
