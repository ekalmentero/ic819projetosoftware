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
        Schema::table('produto', function (Blueprint $table) {
            
            $table->string("deletado",1);
        });
        Schema::table('endereco', function (Blueprint $table) {
            
            $table->string("deletado",1);
        });
        Schema::table('cartao', function (Blueprint $table) {
            
            $table->string("deletado",1);
        });
        Schema::table('cupom', function (Blueprint $table) {
            
            $table->string("deletado",1);
        });
        Schema::table('noticia', function (Blueprint $table) {
            
            $table->string("deletado",1);
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
