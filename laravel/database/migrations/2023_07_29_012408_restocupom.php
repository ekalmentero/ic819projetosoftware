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
        Schema::table('cupom', function (Blueprint $table) {
            
            $table->string('codigo', 255);
            $table->integer('numporpessoa');
            $table->dropColumn('tipo');
            $table->string('tipo1', 255);
            $table->string('tipo2', 255);
            $table->string('tipo3', 255);
        });
        Schema::table('cupom_produto', function (Blueprint $table) {
            $table->integer('qtdrestante');
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
