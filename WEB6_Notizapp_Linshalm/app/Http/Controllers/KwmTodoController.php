<?php

namespace App\Http\Controllers;

use App\Models\KwmToDo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;


class KwmTodoController extends Controller
{
    // Liste aller To-dos
    public function index(): JsonResponse
    {
        $todos = KwmToDo::with('note.list')->get();
        return response()->json($todos, 200);
    }


    // To-do anhand der ID anzeigen
    public function show($id): JsonResponse
    {
        $todo = KwmToDo::with('note.list')->find($id);
        return $todo ? response()->json($todo, 200) : response()->json(null, 404);
    }

    // Funktion, um ein neues To-do zu erstellen
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'string|nullable',
            'note_id' => 'required|exists:kwm_notes,id',
        ]);

        $todo = KwmToDo::create($validatedData);

        return response()->json($todo, 201);
    }


    // To-do aktualisieren
    public function update(Request $request, $id): JsonResponse
    {
        $todo = KwmToDo::find($id);

        if (!$todo) {
            return response()->json(null, 404);
        }

        $validatedData = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string|nullable',
            // Weitere Felder nach Bedarf
        ]);

        $todo->update($validatedData);

        return response()->json($todo, 200);
    }

    // To-do löschen
    public function destroy($id): JsonResponse
    {
        $todo = KwmToDo::find($id);

        if (!$todo) {
            return response()->json(null, 404);
        }

        $todo->delete();

        return response()->json(null, 204);
    }

    public function findBySearchTerm(string $searchTerm): JsonResponse
    {
        $todos = KwmToDo::query()
            ->where('title', 'LIKE', "%{$searchTerm}%")
            ->orWhere('description', 'LIKE', "%{$searchTerm}%")
            ->with('note.list')
            ->get();

        return response()->json($todos, 200);
    }

}

