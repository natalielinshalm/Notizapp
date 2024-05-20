<?php

namespace App\Http\Controllers;

use App\Models\KwmUser;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class KwmUserController extends Controller
{

    public function index(): JsonResponse
    {
        //Gibt alle Benutzer zurück
        $users = KwmUser::all();
        return response()->json($users, 200);
    }

    public function show($id): JsonResponse
    {
        //Gibt einen Benutzer anhand seiner ID zurück
        $user = KwmUser::find($id);
        return $user ? response()->json($user, 200) : response()->json(null, 404);
    }

    public function store(Request $request): JsonResponse
    {
        //Die Funktion speichert einen neuen Benutzer
        $validatedData = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:kwm_users',
            'password' => 'required|string|min:6',
        ]);

        $user = KwmUser::create([
            'firstName' => $validatedData['firstName'],
            'lastName' => $validatedData['lastName'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);

        return response()->json($user, 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        //Die Funktion aktualisiert einen Benutzer
        $user = KwmUser::find($id);

        if (!$user) {
            return response()->json(null, 404);
        }

        $validatedData = $request->validate([
            'firstName' => 'string|max:255',
            'lastName' => 'string|max:255',
            'email' => 'string|email|max:255|unique:kwm_users,email,' . $id,
            'password' => 'string|min:6',
        ]);

        $user->update($validatedData);

        return response()->json($user, 200);
    }

    public function destroy($id): JsonResponse
    {
        //Die Funktion löscht einen Benutzer
        $user = KwmUser::find($id);

        if (!$user) {
            return response()->json(null, 404);
        }

        $user->delete();

        return response()->json(null, 204);
    }

    public function findBySearchTerm(string $searchTerm): JsonResponse
    {
        // Suche Benutzer, die den Suchbegriff im Namen oder in der E-Mail enthalten
        $users = KwmUser::query()
            ->where('firstName', 'LIKE', "%{$searchTerm}%")
            ->orWhere('lastName', 'LIKE', "%{$searchTerm}%")
            ->orWhere('email', 'LIKE', "%{$searchTerm}%")
            ->get();

        return response()->json($users, 200);
    }

}
