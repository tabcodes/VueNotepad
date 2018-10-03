window.Vue = require('vue');

Vue.component('registration-form', require('./components/Registration.vue'));

const app = new Vue({
    el: '#register-form'
});
