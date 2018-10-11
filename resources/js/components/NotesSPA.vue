<template>
    <div class="row justify-content-center">

        <div class="col-md-4 py-2">
            <div class="card">
                <div class="card-header">Create New Note</div>
                <div class="card-body">

                    <div class="form-group row">
                        <label for="note_title">
                            Note Title
                        </label>
                        <input type="text" class="form-control" v-model="new_note_form.title">
                    </div>

                    <div class="form-group row">
                        <label for="note_body">
                            Note Text
                        </label>
                        <textarea type="text" class="form-control" resize="false" v-model="new_note_form.body"></textarea>
                    </div>

                    <div class="form-group row">
                        <label for="note_body">
                            Note Color
                        </label>
                        <select class="form-control" v-model="new_note_form.color">
                            <option selected disabled value="white">
                                White
                            </option>
                            <option value="blue">
                                Blue
                            </option>
                            <option value="red">
                                Red
                            </option>
                            <option value="green">
                                Green
                            </option>
                        </select>
                    </div>

                    <div class="form-group row justify-content-center">
                        <button class="btn btn-info" v-on:click="addNote">Add Note</button>
                    </div>

                </div>
            </div>
        </div>

        <div class="col-md-8 py-2">
            <div class="card">
                <div class="card-header">My Notes</div>
                <div class="card-body">

                    <div class="row justify-content-center" v-if="note_list.length == 0">
                        <div class="">
                            You haven't added any notes as of yet!
                        </div>
                    </div>

                    <div v-for="note of note_list">
                        <div :class="bg-note.color"class="py-5">
                            <h2>{{note.title}}</h2>
                            <div>{{note.body}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import Loading from "vue-loading-overlay";
import { Form, FormError, Note } from "../classes.js";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  mounted() {},
  components: {
    Loading
  },
  data() {
    return {
      new_note_form: new Form({
        title: null,
        body: null,
        color: null
      }),
      edit_note_form: new Form({
        new_title: null,
        new_body: null
      }),
      note_list: []
    };
  },
  methods: {
    addNote() {
        this.note_list.push(new Note(this.new_note_form.title, this.new_note_form.body, this.new_note_form.color));
    }
  }
};
</script>