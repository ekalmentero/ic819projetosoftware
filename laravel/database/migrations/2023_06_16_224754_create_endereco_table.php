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
        Schema::create('endereco', function (Blueprint $table) {
            $table->id();
            $table->integer("cep");
            $table->integer("numero");
            $table->string("estado",100);
            $table->string("cidade",200);
            $table->string("bairro",200);
            $table->string("rua",200);
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
        Schema::dropIfExists('endereco');
    }
};
