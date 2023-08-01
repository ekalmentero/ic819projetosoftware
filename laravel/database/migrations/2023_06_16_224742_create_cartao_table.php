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
        Schema::create('cartao', function (Blueprint $table) {
            $table->id();
            $table->string("numerocartao",255);
            $table->string("cvv",255);
            $table->date("datavencimento");
            $table->string("nometitular",200);
            $table->unsignedBigInteger("fk_user_id");
            $table->foreign("fk_user_id")->references("id")->on("users");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cartao');
    }
};
