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
        Schema::create('kwm_notes', function (Blueprint $table) {
            $table->id(); // Erstellt eine 'id' Spalte (Primärschlüssel)
            $table->unsignedBigInteger('list_id'); // Erstellt eine 'list_id' Spalte
            $table->string('title'); // Erstellt eine 'title' Spalte
            $table->text('description')->nullable(); // Erstellt eine 'description' Spalte
            $table->foreign('list_id')->references('id')->on('kwm_lists'); // Definiert 'list_id' als Fremdschlüssel
            $table->timestamps(); // Erstellt 'created_at' und 'updated_at' Spalten
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kwm_notes');
    }
};
