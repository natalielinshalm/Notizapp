<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class KwmToDo extends Model
{
    use HasFactory;

    protected $table = 'kwm_toDos';

    protected $fillable = ['title', 'description', 'dueDate', 'note_id'];

    // Beziehung zu KwmNote
        // Ein To Do-Objekt gehört zu einem Note-Objekt
    public function note()
    {
        return $this->belongsTo(KwmNote::class, 'note_id');
    }

    // Beziehung zu KwmTag
        // Ein To Do-Objekt kann mehrere Tags haben
    public function tags()
    {
        return $this->belongsToMany(KwmTag::class, 'todo_tags', 'todo_id', 'tag_id');
    }
}
