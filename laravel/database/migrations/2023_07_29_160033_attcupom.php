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
        Schema::table('cupom_produto', function (Blueprint $table) {
            $table->dropColumn('qtdrestante');
        });
        Schema::table('cupom_user', function (Blueprint $table) {
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
