<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    use HasFactory;

    protected $fillable = [
    
        'place_id',
        'name',
        'longitude',
        'latitude',
    ];


    public function place()
    {
        return $this->belongsTo(Place::class);
    }
}
