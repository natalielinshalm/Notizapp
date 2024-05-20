<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NotesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {

        DB::table('kwm_notes')->insert([
            [
                'list_id' => 1,
                'title' => 'Erste Notiz',
                'description' => 'Dies ist der Inhalt der ersten Notiz.',
                'created_at' => now(),
                'updated_at' => now(),
            ]

        ]);
    }
}
