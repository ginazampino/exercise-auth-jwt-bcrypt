import './scss/index.scss';

import App from './vue/App.vue';
import Vue from 'vue';
import Router from "./router.js";

new Vue ({
    components: { App },
    el: '#app',
    router: Router,
    template: '<App></App>'
});