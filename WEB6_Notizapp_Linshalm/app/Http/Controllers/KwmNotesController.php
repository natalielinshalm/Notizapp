<?php

namespace App\Http\Controllers;

use App\Models\KwmNote;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class KwmNotesController extends Controller
{
    // Liste aller Notizen
    public function index(): JsonResponse
    {
        $notes = KwmNote::with('list.user')->get();
        return response()->json($notes, 200);
    }

    // Notiz anhand der ID anzeigen
    public function show($id): JsonResponse
    {
        $note = KwmNote::with('list.user')->find($id);
        return $note ? response()->json($note, 200) : response()->json(null, 404);
    }

    // Neue Notiz erstellen
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'string|nullable',
            'list_id' => 'required|exists:kwm_lists,id',
        ]);

        $note = KwmNote::create($validatedData);

        return response()->json($note, 201);
    }

    // Notiz aktualisieren
    public function update(Request $request, $id): JsonResponse
    {
        $note = KwmNote::find($id);

        if (!$note) {
            return response()->json(null, 404);
        }

        $validatedData = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string|nullable',
            // Weitere Felder nach Bedarf
        ]);

        $note->update($validatedData);

        return response()->json($note, 200);
    }

    // Notiz löschen
    public function destroy($id): JsonResponse
    {
        $note = KwmNote::find($id);

        if (!$note) {
            return response()->json(null, 404);
        }

        $note->delete();

        return response()->json(null, 204);
    }

    public function findBySearchTerm(string $searchTerm): JsonResponse
    {
        $notes = KwmNote::query()
            ->where('title', 'LIKE', "%{$searchTerm}%")
            ->orWhere('description', 'LIKE', "%{$searchTerm}%")
            ->with('list.user')
            ->get();

        return response()->json($notes, 200);
    }



}
