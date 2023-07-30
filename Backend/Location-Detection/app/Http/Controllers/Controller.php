<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Place;
use App\Models\History;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    // function sign_up(Request $request){
    //     $user = User::create([
    //         'name' => $request->name,
    //         'email' => $request->email,
    //         'password'=> $request->password,
    //     ])->save();

    //     return response()->json([
    //         'message' => 'User created successfully',
    //         'user' => $user,
    //     ]);
    // } 

    function add_place(Request $request)
    {
        // $user = Auth::user();

        $place = Place::create([
            'name' => $request->name,
            'longitude' => $request->longitude,
            'latitude' => $request->latitude,
            'radius' => $request->radius,
            // 'user_id' => $user->id,
        ]);


        return response()->json([
            'message' => 'Place added successfully',
            'place' => $place,
        ]);
    }

    function get_places()
    {
        $places = Place::all();

        return response()->json([
            'message' => 'Places fetched successfully',
            'places' => $places,
        ]);
    }

    function add_history(Request $request)
    {

        $longitude = $request->longitude;
        $latitude = $request->latitude;

        $within = Place::isWithinRadius($latitude, $longitude);


        $history = History::create([
            'name' => $within != null ? Place::find($within)->name : 'Other',
            'longitude' => $request->longitude,
            'latitude' => $request->latitude,
            'place_id' => $within,
        ]);

        return response()->json([
            'message' => 'History added successfully',
            'history' => $history,
        ]);
    }

    function get_history()
    {
        $histories = History::all();

        return response()->json([
            'message' => 'Histories fetched successfully',
            'history' => $histories,
        ]);
    }
}
