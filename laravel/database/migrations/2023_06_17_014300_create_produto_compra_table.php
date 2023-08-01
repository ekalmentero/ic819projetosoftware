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
        Schema::create('produto_compra', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('fk_produto_id');
            $table->foreign("fk_produto_id")->references("id")->on("produto");
            $table->unsignedBigInteger('fk_compra_id');
            $table->foreign("fk_compra_id")->references("id")->on("compra");
            $table->integer("quantidade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produto_compra');
    }
};
