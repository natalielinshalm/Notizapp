<?php

namespace Database\Seeders;

use App\Models\KwmUser;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Erster Benutzer
        $user1 = new KwmUser();
        $user1->firstName = 'Max';
        $user1->lastName = 'Mustermann';
        $user1->email = 'max.mustermann@example.com';
        $user1->password = bcrypt('password'); // bcrypt, um das Passwort zu hashen
        $user1->save();

        // Zweiter Benutzer
        $user2 = new KwmUser();
        $user2->firstName = 'Natalie';
        $user2->lastName = 'Linshalm';
        $user2->email = 'nati.linshalm@example.com';
        $user2->password = bcrypt('password'); // bcrypt, um das Passwort zu hashen
        $user2->save();
    }
}
