<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compras extends Model
{
    use HasFactory;
    protected $table = 'compra';

    protected $fillable = [
        'status',
        'descricao',
        'fk_user_cliente_id',
        'fk_user_atendente_id',
        'fk_cartao_id',
        'fk_endereco_id',
        'tipo_pagamento',
        'frete',
        'troco',
        'valortotal',
        'hora_compra',
        'hora_finalizacao',
        
    ];

    protected $attributes = [
        'descricao' => ' ',
        'fk_user_cliente_id'=>NULL,
        'fk_user_atendente_id'=>NULL,
        'fk_cartao_id'=>NULL,
        'fk_endereco_id'=>NULL,
        'tipo_pagamento'=>NULL,
        'frete'=>NULL,
        'troco'=>NULL,
        'valortotal'=>0.00,
        'hora_compra'=>NULL,
        'hora_finalizacao'=>NULL,
    ];

    public function comprador()
    {
        return $this->hasOne(User::class, 'id', 'fk_user_cliente_id');
    }

    public function atendente()
    {
        return $this->hasOne(User::class, 'id', 'fk_user_atendente_id');
    }

    public function cartao()
    {
        return $this->hasOne(Cartao::class, 'id', 'fk_cartao_id');
    }

    public function endereco()
    {
        return $this->hasOne(Endereco::class, 'id', 'fk_endereco_id');
    }
}
