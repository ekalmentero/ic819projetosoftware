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
        Schema::create('mensagem', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("fk_compra_id");
            $table->foreign("fk_compra_id")->references("id")->on("compra");
            $table->string("mensagem",2000);
            $table->bigInteger("sender")->unique();
            $table->bigInteger("receiver")->unique();
            $table->dateTime("horamensagem");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mensagem');
    }
};
