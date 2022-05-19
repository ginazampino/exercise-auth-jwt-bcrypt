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
        {
            path: '/',
            component: require('./vue/private/Game.vue').default,
            beforeEnter: guardBehindSession,
            redirect: '/news',
            children: [
                {
                    path: '/news',
                    component: require('./vue/private/GameHome.vue').default,
                    beforeEnter: guardBehindSession
                },
                {
                    path: '/code',
                    component: require('./vue/private/app/FriendCode.vue').default,
                    beforeEnter: guardBehindSession
                },
                {
                    path: '/user/edit',
                    component: require('./vue/private/app/UserEditor.vue').default,
                    beforeEnter: guardBehindSession
                },
                {
                    path: '/user/:id',
                    component: require('./vue/private/app/UserProfile.vue').default,
                    beforeEnter: guardBehindSession
                }
            ]
        },
        {
            path: '*',
            component: require('./vue/Error404.vue').default
        }
    ]
});