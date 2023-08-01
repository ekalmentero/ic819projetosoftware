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
        Schema::create('compra', function (Blueprint $table) {
            $table->id();
            $table->string('status', 20);
            $table->string('descricao', 1000);
            $table->unsignedBigInteger('fk_user_cliente_id');
            $table->foreign("fk_user_cliente_id")->references("id")->on("users");
            $table->unsignedBigInteger('fk_user_atendente_id')->nullable($value = true);
            $table->foreign("fk_user_atendente_id")->references("id")->on("users");
            $table->unsignedBigInteger('fk_cartao_id')->nullable($value = true);
            $table->foreign("fk_cartao_id")->references("id")->on("cartao");
            $table->unsignedBigInteger('fk_endereco_id')->nullable($value = true);
            $table->foreign("fk_endereco_id")->references("id")->on("endereco");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('compra');
    }
};
