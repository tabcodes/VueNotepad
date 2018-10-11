
<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8 vld-parent">
                <loading :active.sync="this.form.form_loading" :can-cancel="false" :is-full-page="false"> </loading>
                <div class="card">
                    <div class="card-header  text-white bg-secondary">User Registration</div>

                    <div class="card-body">

                        <form method="POST" action="register" @submit.prevent="onSubmit">

                            <div class="form-group row">
                                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                                <div class="col-md-6">
                                    <input id="name" v-model="form.name" type="text" v-bind:class="{'is-invalid': form.errors.has('name')}" class="form-control" name="name" autofocus>
                                </div>
                            </div>
                            <div class="form-group row justify-content-center" style="height:20px">

                                <transition name="custom-classes-transition" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutDown">
                                    <span class="text-danger" v-if="form.errors.has('name')">
                                        {{ form.errors.get("name") }}
                                    </span>
                                </transition>
                            </div>

                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                <div class="col-md-6">
                                    <input id="email" v-model="form.email" v-bind:class="{'is-invalid': form.errors.has('email')}" type="email" class="form-control" name="email">
                                </div>
                            </div>
                            <div class="form-group row justify-content-center" style="height:20px">

                                <transition name="custom-classes-transition" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutDown">

                                    <span class="text-danger" v-if="form.errors.has('email')">
                                        {{ form.errors.get("email") }}
                                    </span>

                                </transition>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                                <div class="col-md-6">
                                    <input id="password" v-model="form.password" class="form-control" v-bind:class="{'is-invalid': form.errors.has('password')}" type="password" name="password">
                                </div>

                            </div>
                            <div class="form-group row">
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm Password</label>

                                <div class="col-md-6">
                                    <input id="password-confirm" v-model="form.password_confirmation" v-bind:class="{'is-invalid': form.errors.has('password')}" type="password" class="form-control" name="password_confirmation">
                                </div>
                            </div>
                            <div class="form-group row justify-content-center" style="height:20px">
                                <transition name="custom-classes-transition" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutDown">
                                    <span class="text-danger" v-if="form.errors.has('password')">
                                        {{ form.errors.get("password") }}
                                    </span>
                                </transition>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Loading from "vue-loading-overlay";
import { Form, FormError } from "../classes.js";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  mounted() {
    console.log("Component mounted.");
  },
  components: {
    Loading
  },
  data() {
    return {
      form: new Form({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        form_success: false,
        form_loading: false
      })
    };
  },
  methods: {
    onSubmit() {
      this.form.submit("post", "/register");
    }
  }
};
</script>