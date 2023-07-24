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
            $table->unsignedBigInteger('tipoUsuario')->nullable()->default('2');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('telefone');
            $table->string('datadeNascimento');
            $table->string('sexo')->nullable();
            $table->string('curriculoLattes');
            $table->string('instituicao');
            $table->string('funcao')->nullable();
            $table->rememberToken();
            $table->timestamps();

            $table->foreign('tipoUsuario')->references('id')->on('tipo_usuario');
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
