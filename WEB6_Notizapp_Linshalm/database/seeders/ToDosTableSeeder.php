<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ToDosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {


        DB::table('kwm_toDos')->insert([
            [
                'note_id' => 1,
                'title' => 'Erster ToDo-Eintrag',
                'description' => 'Beschreibung des ersten ToDo-Eintrags',
                'dueDate' => now()->addWeeks(1), // Fälligkeitsdatum in einer Woche
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
