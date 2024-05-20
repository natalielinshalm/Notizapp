<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KwmList extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'user_id'];


    // Beziehung zu KwmUser
        // Ein List-Objekt gehört zu einem User-Objekt
    public function user()
    {
        return $this->belongsTo(KwmUser::class, 'user_id', 'id');
    }

    // Beziehung zu KwmNote
        // Ein List-Objekt kann mehrere Note-Objekte haben
    public function notes()
    {
        return $this->hasMany(KwmNote::class, 'list_id', 'id');
    }
    }
