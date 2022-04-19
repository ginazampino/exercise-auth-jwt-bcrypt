<template>
    <div>
        <h2>App.vue</h2>
        <ul>
            <router-link to='/login' tag='li'>Login</router-link>
            <router-link to='/register' tag='li'>Register</router-link>
        </ul>
        <button v-on:click="handleButton()">Click me</button>
        <router-view></router-view>
    </div>
</template>

<script>
    import axios from 'axios';
    
    export default {
        data() {
            return {
                test: null
            }
        },

        methods: {
            async handleButton() {
                await axios.get('/api/test')
                    .then((result) => {
                        console.log(result.data)
                    }).catch((error) => {
                        throw error;
                    });
            }
        },

        mounted() {
            console.log('App.vue is now mounted.')
        }
    };
</script>