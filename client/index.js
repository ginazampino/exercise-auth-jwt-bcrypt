import './scss/index.scss';

import App from './vue/App.vue';
import Vue from 'vue';
import Router from './router.js';
import SmartTable from 'vuejs-smart-table';

Vue.use(SmartTable);

new Vue ({
    components: { App },
    el: '#app',
    router: Router,
    template: '<App></App>'
});