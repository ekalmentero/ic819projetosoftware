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
        Schema::create('livros', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('autor');
            $table->string('sinopse')->nullable();
            $table->string('editora')->nullable();
            $table->string('edicao')->nullable();
            $table->string('idioma');
            $table->string('ano');
            $table->integer('numPag');
            $table->string('categoria1');
            $table->string('categoria2')->nullable();
            $table->string('categoria3')->nullable();
            $table->unsignedBigInteger('sbn10');
            $table->unsignedBigInteger('sbn13');
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livros');
    }
};
