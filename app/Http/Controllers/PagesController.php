<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    
    /**
     * Returns the index page of the site.
     *
     * @param Request $request
     * @return void
     */
    public function indexPage(Request $request) {
        return view('index');
    }
}
