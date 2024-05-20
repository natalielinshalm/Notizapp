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
        Schema::create('kwm_lists', function (Blueprint $table) {
            $table->id(); // Erstellt eine 'id' Spalte (Primärschlüssel)
            $table->string('name'); // Erstellt eine 'name' Spalte
            $table->unsignedBigInteger('user_id'); // Erstellt eine 'user_id' Spalte
            $table->foreign('user_id')->references('id')->on('kwm_users'); // Definiert 'user_id' als Fremdschlüssel
            $table->timestamps(); // Optional: Erstellt 'created_at' und 'updated_at' Spalten
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kwm_lists');
    }
};
