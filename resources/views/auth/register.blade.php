@extends('layouts.master')

@section('content')
    <div id="register-form">
        <registration-form></registration-form>
    </div>

    <script src="{{ asset('js/register.js') }}"></script>

    @endsection
