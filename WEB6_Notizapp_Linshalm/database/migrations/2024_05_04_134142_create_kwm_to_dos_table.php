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
        Schema::create('kwm_toDos', function (Blueprint $table) {
            $table->id(); // Primärschlüssel
            $table->string('title'); //Titel des Eintrages
            $table->text('description')->nullable(); // Beschreibung, nullable, falls keine Beschreibung vorhanden ist
            $table->date('dueDate')->nullable(); // Fälligkeitsdatum, nullable, falls kein Datum gesetzt ist
            $table->unsignedBigInteger('note_id'); // Fremdschlüssel, der auf 'kwm_notes.id' verweist
            $table->foreign('note_id')->references('id')->on('kwm_notes')->onDelete('cascade');
            $table->timestamps(); // Erstellungs- und Aktualisierungszeitpunkte
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kwm_toDos');
    }
};
