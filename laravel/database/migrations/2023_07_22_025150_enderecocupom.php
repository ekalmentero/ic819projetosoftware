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
            
            $table->dropColumn('regras');
            $table->string('descricao', 1000);
        });

        Schema::create('cupom_produto', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('fk_cupom_id');
            $table->foreign("fk_cupom_id")->references("id")->on("cupom");
            $table->unsignedBigInteger('fk_produto_id')->nullable();
            $table->foreign("fk_produto_id")->references("id")->on("produto")->nullOnDelete();
            $table->timestamps();
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
