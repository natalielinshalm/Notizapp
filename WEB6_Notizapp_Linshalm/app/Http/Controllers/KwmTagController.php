<?php

namespace App\Http\Controllers;

use App\Models\KwmTag;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class KwmTagController extends Controller
{
    // Liste aller Tags inklusive deren Beziehungen
    public function index(): JsonResponse
    {
        $tags = KwmTag::with('notes', 'toDos')->get();
        return response()->json($tags, 200);
    }



    // Tag anhand der ID anzeigen mit Beziehungen
    public function show($id): JsonResponse
    {
        $tag = KwmTag::with('notes', 'toDos')->where('id', $id)->first();

        if (!$tag) {
            return response()->json(null, 404);
        }

        return response()->json($tag, 200);
    }

    // Neues Tag erstellen
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',

        ]);

        $tag = KwmTag::create($validatedData);

        return response()->json($tag, 201);
    }

    // Tag aktualisieren
    public function update(Request $request, $id): JsonResponse
    {
        $tag = KwmTag::find($id);

        if (!$tag) {
            return response()->json(null, 404);
        }

        $validatedData = $request->validate([
            'title' => 'string|max:255',

        ]);

        $tag->update($validatedData);

        return response()->json($tag, 200);
    }

    // Tag löschen
    public function destroy($id): JsonResponse
    {
        $tag = KwmTag::find($id);

        if (!$tag) {
            return response()->json(null, 404);
        }

        $tag->delete();

        return response()->json(null, 204);
    }

    //suche nach einem tag
    public function findBySearchTerm($searchTerm): JsonResponse
    {
        $tags = KwmTag::where('title', 'like', '%' . $searchTerm . '%')->get();
        return response()->json($tags, 200);
    }
}

