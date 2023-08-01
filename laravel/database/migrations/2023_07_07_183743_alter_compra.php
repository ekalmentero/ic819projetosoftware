<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('compra', function (Blueprint $table) {
            
            $table->string("tipo_pagamento",10)->nullable($value = true);
            $table->string("frete",3)->nullable($value = true);
            $table->decimal("troco",12,2)->nullable($value = true);
            $table->decimal("valortotal",12,2)->nullable($value = true);
            $table->dateTime("hora_compra")->nullable($value = true);
            $table->dateTime("hora_finalizacao")->nullable($value = true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
