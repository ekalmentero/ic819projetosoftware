<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cupom_compra extends Model
{
    use HasFactory;
    protected $table = 'cupom_compra';
    protected $fillable = [
        'fk_compra_id',
        'fk_cupom_id',
        
    ];
}
