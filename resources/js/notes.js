window.Vue = require('vue');
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2);

Vue.component('notes-application', require('./components/NotesSPA.vue'));

const app = new Vue({
    el: '#notes-container'
});

