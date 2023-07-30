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
        Schema::create('places', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('longitude', 9, 6);
            $table->decimal('latitude', 8, 6);
            $table->float('radius');
            // $table->unsignedBigInteger('user_id');
            $table->timestamps();
            // $table->foreign('user_id')
            //     ->references('id')
            //     ->on('users')
            //     ->onCascade('delete');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('places');
    }
};
