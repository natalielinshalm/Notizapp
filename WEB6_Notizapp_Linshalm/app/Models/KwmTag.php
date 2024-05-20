<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KwmTag extends Model
{
    use HasFactory;
    protected $fillable = ['title'];

    // Beziehung zu KwmNote
        // Ein Tag-Objekt kann mehrere Note-Objekte haben
    public function notes()
    {
        return $this->belongsToMany(KwmNote::class, 'note_tags', 'tag_id', 'note_id');
    }

    // Beziehung zu KwmToDo
        // Ein Tag-Objekt kann mehrere To Do Objekte haben
    public function toDos()
    {
        return $this->belongsToMany(KwmToDo::class, 'todo_tags', 'tag_id', 'todo_id');
    }
}
