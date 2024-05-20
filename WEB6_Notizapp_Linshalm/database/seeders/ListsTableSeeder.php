<?php

namespace Database\Seeders;

use App\Models\KwmList;
use App\Models\KwmUser;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ListsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //erster Eintrag
        $list = new KwmList();
        $list->name = 'List 2';
        $list->user_id = 1;

        //Hole den ersten Benutzer und verknüpfe ihn mit der Liste
        $user = KwmUser::first();
        $list->user()->associate($user);


        //in die Datenbank speichern
        $list->save();
    }
}
