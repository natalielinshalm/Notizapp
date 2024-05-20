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
        Schema::create('todo_tags', function (Blueprint $table) {
            $table->unsignedBigInteger('todo_id');
            $table->unsignedBigInteger('tag_id');
            $table->foreign('todo_id')->references('id')->on('kwm_toDos')->onDelete('cascade');
            $table->foreign('tag_id')->references('id')->on('kwm_tags')->onDelete('cascade');
            $table->primary(['todo_id', 'tag_id']); // Zusammengesetzter Primärschlüssel
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todo_tags');
    }
};
