<template>
    <div class="row justify-content-md-center">
        <div class="col-sm-12 col-md-12 col-lg py-2">
            <div class="card  text-white bg-dark ">
                <div class="card-header">Create New Note</div>
                <div class="card-body">
                    <div class="form-group row px-3">
                        <label for="note_title">
                            Note Title
                        </label>
                        <input type="text" required v-bind:class="{'is-invalid': new_errors.has('title')}" maxlength="30" class="form-control" v-model="new_note.title">
                    </div>
                    <div class="form-group row justify-content-center" v-if="new_errors.has('title')">
                        <div class="alert bg-danger text-white p-2 m-2">
                            {{ new_errors.get('title') }}
                        </div>
                    </div>
                    <div class="form-group row  px-3">
                        <label for="note_body">
                            Note Body
                        </label>
                        <textarea required type="text" v-bind:class="{'is-invalid': new_errors.has('body')}" class="form-control" resize="false" v-model="new_note.body"></textarea>
                    </div>
                    <div class="form-group row justify-content-center" v-if="new_errors.has('body')">
                        <div class="alert bg-danger text-white p-2 m-2">
                            {{ new_errors.get('body') }}
                        </div>
                    </div>
                    <div class="form-group row align-items-center">
                        <div class="col-12">
                            <label for="note_color">
                                Note Color
                            </label>
                        </div>
                        <div class="w-100 d-lg-none"></div>
                        <div class="col-lg col-md-12 py-2">
                            <select v-bind:class="{'is-invalid': new_errors.has('color')}" class="form-control" v-model="new_note.color">
                                <option v-for="item in colors" :key="item.color" :value="item.class">
                                    {{item.color}}
                                </option>
                            </select>
                        </div>
                        <div class="w-100 d-lg-none"></div>

                        <div class="col">
                            <button class="btn btn-info" v-on:click="addNote">Add Note</button>
                        </div>

                    </div>

                    <div class="form-group row justify-content-center" v-if="new_errors.has('color')">
                        <div class="alert bg-danger text-white p-2 m-2">
                            {{ new_errors.get('color') }}
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="col-sm-12 col-md-12 col-lg-8 py-2">
            <div class="card  text-white bg-dark ">
                <div class="card-header">My Notes</div>
                <div class="card-body">

                    <div class="row justify-content-center" v-if="note_list.length == 0">
                        <div class="">
                            You haven't added any notes as of yet!
                        </div>
                    </div>

                    <div class="row justify-content-center my-3 p-0" v-for="note of note_list" :key="note.id">
                        <div class="col-md-10 card p-0" :class="note.color">
                            <div class="card-header justify-content-center row m-0 p-0">
                                <div class="text-left col-auto">
                                    <h4 class="px-1"><span class="badge badge-secondary">#{{note.id}}</span></h4>
                                </div>
                                <div class="col-8">
                                    <input v-if="note.edit_active" type="text" class="form-control text-center mt-2 pb-0 my-0" style="font-size: 1.35rem" v-model="note.edit_props.title" />
                                    <p v-else class="h4 text-center pt-2 pb-0 my-0">
                                        {{note.title}}
                                    </p>

                                    <p class="h6 text-center text-dark pt-0 mt-0">
                                        <small>Created {{note.created_at}}</small>
                                    </p>

                                    <p v-if="note.edit_active" class="h6 text-center pt-0 mt-0">
                                        <span class="badge badge-danger">Currently Editing</span>
                                    </p>
                                </div>
                                <div class="text-right col-auto">
                                    <a href="#" v-on:click.prevent="confirmNoteRemoval(note.id)" class="badge badge-secondary px-1">
                                        <i class="fa text-danger fa-times fa-2x"></i>
                                    </a>
                                    <a href="#" v-on:click.prevent="editNote(note.id)" class="badge badge-secondary px-1">
                                        <i class="fa text-info fa-pencil-alt fa-2x"></i>
                                    </a>

                                </div>
                            </div>
                            <div class="card-body">
                                <textarea v-if="note.edit_active" required type="text" v-bind:class="{'is-invalid': note.edit_errors.has('body')}" class="form-control" resize="false" v-model="note.edit_props.body">{note.body}</textarea>

                                <p v-else>{{note.body}}</p>

                                <button v-if="note.edit_active" v-on:click="saveNoteChanges(note.id)" class="m-2 btn btn-submit">Save Changes</button>
                                <button v-if="note.edit_active" v-on:click="discardNoteChanges(note.id)" class="m-2 btn btn-danger">Cancel</button>

                                <div class="form-group row justify-content-center" v-if="note.edit_errors.any()">
                                    <div v-if="note.edit_errors.has('title')" class="alert bg-danger text-white p-2 m-2">
                                        {{ note.edit_errors.get('title') }}
                                    </div>
                                    <div v-if="note.edit_errors.has('body')" class="alert bg-danger text-white p-2 m-2">
                                        {{ note.edit_errors.get('body') }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { FormError, Note } from "../classes.js";

export default {
  mounted() {
    console.log("Notes application loaded.");
  },
  components: {},
  data() {
    return {
      new_note: {
        id: null,
        title: null,
        body: null,
        color: null
      },
      colors: [
        { color: "White", class: "text-dark bg-light" },
        { color: "Blue", class: "text-dark bg-primary" },
        { color: "Yellow", class: "text-dark bg-warning" },
        { color: "Green", class: "text-dark bg-success" }
      ],
      note_list: [],
      new_errors: new FormError()
    };
  },
  methods: {
    notecount() {
      if (this.note_list.length == 0) {
        return 1;
      }
      return this.note_list[this.note_list.length - 1].id + 1;
    },
    getNote(note_id) {
      return this.note_list[
        this.note_list.map(note => note.id).indexOf(note_id)
      ];
    },
    addNote() {
      this.new_errors.clear();
      var errors = {};
      ["title", "body", "color"].forEach(reqVal => {
        if (!this.new_note[reqVal]) {
          errors[reqVal] = ["A note " + reqVal + " is required."];
        }
      });

      this.new_errors.record(errors);

      if (this.new_errors.any()) {
        return false;
      }

      this.new_note.id = this.notecount();

      this.note_list.push(new Note(this.new_note));
      this.new_note = [];
    },
    confirmNoteRemoval(note_id) {
      this.$swal({
        title: "Confirm Note Removal",
        text:
          "Are you sure you want to remove note #" +
          note_id +
          "? This cannot be un-done!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "I'm sure, delete it!",
        cancelButtonText: "Never mind, keep it!"
      }).then(result => {
        if (result.value) {
          this.deleteNote(note_id);
          this.$swal("Deleted!", "Your note has been deleted.", "success");
        }
      });
    },
    deleteNote(note_id) {
      let i = this.note_list.map(note => note.id).indexOf(note_id); // find index of your object
      this.note_list.splice(i, 1); // remove it from array
    },
    editNote(note_id) {
      let note = this.getNote(note_id);
      note.edit_active = true;
    },
    saveNoteChanges(note_id) {
      let note = this.getNote(note_id);
      note.edit_errors.clear();

      var errors = {};
      ["title", "body"].forEach(reqVal => {
        if (!note.edit_props[reqVal]) {
          errors[reqVal] = ["A note " + reqVal + " is required."];
        }
      });

      note.edit_errors.record(errors);

      if (note.edit_errors.any()) {
        return false;
      }

      note.saveChanges();
    },
    discardNoteChanges(note_id) {
      let note = this.getNote(note_id);

      note.discardChanges();
    }
  }
};
</script>