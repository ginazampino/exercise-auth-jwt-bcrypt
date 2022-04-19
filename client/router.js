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
            beforeEnter: guard,
            children: [
                {
                    path: '/login',
                    component: require('./vue/public/PortalLoginForm.vue').default,
                    name: 'login'
                },
                {
                    path: '/register',
                    component: require('./vue/public/PortalRegistrationForm.vue').default,
                    name: 'register'
                }
            ]
        },
        {
            path: '*',
            component: require('./vue/Error404.vue').default
        }
    ]
});