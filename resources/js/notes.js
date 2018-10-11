window.Vue = require('vue');

Vue.component('notes-application', require('./components/NotesSPA.vue'));

const app = new Vue({
    el: '#notes-container'
});
