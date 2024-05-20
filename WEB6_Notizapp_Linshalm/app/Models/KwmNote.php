<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KwmNote extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'list_id'];

    // Beziehung zu KwmList
        // Ein Note-Objekt gehört zu einem List-Objekt
    public function list()
    {
        return $this->belongsTo(KwmList::class, 'list_id', 'id');
    }

    // Beziehung zu KwmToDo
        // Ein Note-Objekt kann mehrere To Do Objekte haben
    public function toDos()
    {
        return $this->hasMany(KwmToDo::class, 'note_id');
    }

    // Beziehung zu KwmTag
        // Ein Note-Objekt kann mehrere Tag-Objekte haben
    public function tags()
    {
        return $this->belongsToMany(KwmTag::class, 'note_tags', 'note_id', 'tag_id');
    }
}
