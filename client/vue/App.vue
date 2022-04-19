<template>
    <div>
        <h2>App.vue</h2>
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