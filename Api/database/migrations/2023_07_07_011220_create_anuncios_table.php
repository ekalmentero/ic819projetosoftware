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
        Schema::create('anuncios', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idDono');
            $table->unsignedBigInteger('idRequerente')->nullable();
            $table->unsignedBigInteger('idLivro');
            $table->boolean('ativo')->default(false);
            $table->integer('tempoEmprestimo')->nullable();
            $table->boolean('emprestado')->default(false);
            $table->date('dataInicioPrazo')->nullable();
            $table->date('dataFimPrazo')->nullable();
            $table->date('dataFim')->nullable();
            $table->integer('avaliacao')->nullable();
            $table->string('relato')->nullable();
            $table->timestamps();

            $table->foreign('idDono')->references('id')->on('users');
            $table->foreign('idRequerente')->references('id')->on('users');
            $table->foreign('idLivro')->references('id')->on('livros');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anuncios');
    }
};
