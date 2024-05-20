<?php

namespace App\Http\Controllers;

use App\Models\KwmList;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KwmListController extends Controller
{
    public function index(): JsonResponse
    {
        /*lade alle Listen mit allen Beziehungen
        eager loading bedeutet, dass wir alle Beziehungen der Listen mitladen*/
        $lists = KwmList::with('notes', 'user')->get();
        return response()->json($lists, 200);
    }


    public function findByID(int $id): JsonResponse
    {
        // Lade eine Liste anhand ihrer ID mit allen Beziehungen
        $list = KwmList::with(['notes', 'user'])->find($id);
        return $list ? response()->json($list, 200) : response()->json(null, 404);
    }

    public function save(Request $request): JsonResponse
    {
        // Validiere die Anfrage
        $validatedData = $request->validate([
            'name' => 'required|string|max:255', // Stelle sicher, dass ein Name angegeben wurde
            'user_id' => 'required|exists:kwm_users,id', // Stelle sicher, dass die user_id existiert
        ]);

        DB::beginTransaction();

        try {
            // Erstelle eine neue Liste mit den validierten Daten
            $list = KwmList::create($validatedData);

            // Hier könntest du weitere Operationen hinzufügen, z.B. das Anlegen von Notizen oder ToDos

            DB::commit(); // Bestätige die Transaktion, wenn alles erfolgreich war

            // Gebe die neu erstellte Liste als JSON zurück
            return response()->json($list, 201);
        } catch (\Exception $e) {
            DB::rollBack(); // Mache die Transaktion rückgängig, wenn ein Fehler aufgetreten ist
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        // Die Funktion aktualisiert eine Liste anhand ihrer ID
        $list = KwmList::find($id);

        if (!$list) {
            return response()->json(null, 404);
        }

        $validatedData = $request->validate([
            'name' => 'string|max:255',
            // Weitere Felder nach Bedarf
        ]);

        $list->update($validatedData);

        return response()->json($list, 200);
    }

    public function destroy($id): JsonResponse
    {
        // Die Funktion löscht eine Liste anhand ihrer ID
        $list = KwmList::find($id);

        if (!$list) {
            return response()->json(null, 404);
        }

        // Lösche alle abhängigen Notizen
        $list->notes()->delete();

        $list->delete();

        return response()->json(null, 204);
    }

    public function findBySearchTerm(string $searchTerm): JsonResponse
    {
        // Suche nach einer Liste anhand eines Namens
        $lists = KwmList::query()
            ->where('name', 'LIKE', "%{$searchTerm}%")
            ->with('user')
            ->get();

        return response()->json($lists, 200);
    }




}
