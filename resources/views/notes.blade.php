@extends('layouts.master')
@section('content')


<div class="container py-5" id="notes-container">

    <notes-application></notes-application>


</div>
<script src="{{ asset('js/notes.js') }}"></script>

@endsection