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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 100);
            $table->string('telefone', 20);
            $table->string('email', 100)->unique();
            $table->smallInteger('idade');
            $table->string('sexo', 1);
            $table->string('cidade', 100);
            $table->string('estado', 2);
            $table->string('bio', 500)->nullable();
            $table->string('password');
            $table->boolean('admin')->default(false);
            $table->string('fotoPerfil', 500)->nullable();
            $table->integer('emprestimosConcedidos')->nullable();
            $table->integer('emprestimosRequeridos')->nullable();
            $table->double('nota')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
