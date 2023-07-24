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
        Schema::create('agendamento', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_pesquisador');
            $table->unsignedBigInteger('id_equipamento');
            $table->datetime('data_hora_inicial');
            $table->datetime('data_hora_final');
            $table->timestamps();

            // Chaves estrangeiras
            $table->foreign('id_pesquisador')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_equipamento')->references('id')->on('equipamentos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agendamento');
    }
};
