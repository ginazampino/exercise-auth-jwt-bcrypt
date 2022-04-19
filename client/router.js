import Vue from 'vue';
import Router from 'vue-router';

const {
    findExistingSession,
    guardBehindSession
} = require('./src');

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [

        /* ========================================

            Public routes */
        
            {
                path: '/portal',
                component: require('./vue/public/Portal.vue').default,
                beforeEnter: findExistingSession,
                redirect: '/login',
                children: [
                    {
                        path: '/login',
                        component: require('./vue/public/PortalLoginForm.vue').default,
                        name: 'login',
                        beforeEnter: findExistingSession
                    },
                    {
                        path: '/register',
                        component: require('./vue/public/PortalRegistrationForm.vue').default,
                        name: 'register',
                        beforeEnter: findExistingSession
                    }
                ]
            },

        /* ========================================

            Authenticated routes */

            {
                path: '/',
                component: require('./vue/private/home.vue').default,
                beforeEnter: guardBehindSession
            },

        /* ========================================

            Error routes */

            {
                path: '*',
                component: require('./vue/Error404.vue').default
            }
    ]
});