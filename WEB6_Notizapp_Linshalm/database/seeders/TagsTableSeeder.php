<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Beispiel für das Einfügen von Tags
        $tags = [
            ['title' => 'Wichtig'],
            ['title' => 'Persönlich'],
            ['title' => 'Arbeit'],
            ['title' => 'Einkaufen'],
            ['title' => 'Erledigen'],
            // Füge hier weitere Tags hinzu, falls gewünscht
        ];

        DB::table('kwm_tags')->insert($tags);
    }
}
