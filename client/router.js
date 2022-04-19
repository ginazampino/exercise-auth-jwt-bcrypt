import Vue from 'vue';
import Router from 'vue-router';

const {
    guard
} = require('./src');

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/portal',
            component: require('./vue/public/Portal.vue').default,
            beforeEnter: guard
        },
        {
            path: '*',
            component: require('./vue/Error404.vue').default
        }
    ]
});