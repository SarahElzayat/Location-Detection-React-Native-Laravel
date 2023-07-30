<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Place extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'longitude',
        'latitude',
        'radius',
    ];
    public static  function isWithinRadius($latitude, $longitude)
    {
        $earthRadius = 6371; // Earth's radius in kilometers
        $minRad = PHP_INT_MAX;
        $minPlace = null;
        foreach (Place::all() as $place) {
            $lat1 = deg2rad($place->latitude);
            $lon1 = deg2rad($place->longitude);
            $lat2 = deg2rad($latitude);
            $lon2 = deg2rad($longitude);

            $dlat = $lat2 - $lat1;
            $dlon = $lon2 - $lon1;

            $a = sin($dlat / 2) ** 2 + cos($lat1) * cos($lat2) * sin($dlon / 2) ** 2;
            $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
            $distance = $earthRadius * $c * 1000.0;

            if ($distance <= $place->radius && $distance < $minRad) {
                $minPlace = $place->id;
                $minRad = $distance;
            }
        }

        return $minPlace;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function histories()
    {
        return $this->hasMany(History::class);
    }
}
