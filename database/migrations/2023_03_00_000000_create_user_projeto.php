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
        Schema::create('usuario_projeto', function (Blueprint $table) {
            $table->unsignedBigInteger('usuario_id');
            $table->unsignedBigInteger('projeto_id');
            $table->string('tipo_participacao')->nullable();
            $table->timestamps();

            $table->foreign('projeto_id')->references('id')->on('projetos')->onDelete('cascade');
            $table->foreign('usuario_id')->references('id')->on('users')->onDelete('cascade');

            $table->primary(['usuario_id','projeto_id']);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuario_projeto');
    }
};
