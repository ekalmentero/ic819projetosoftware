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
        Schema::table('compra', function (Blueprint $table) {
            $table->unsignedBigInteger('fk_user_atendente_id')->nullable()->change();
            $table->unsignedBigInteger('fk_cartao_id')->nullable()->change();
            $table->unsignedBigInteger('fk_endereco_id')->nullable()->change();
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
