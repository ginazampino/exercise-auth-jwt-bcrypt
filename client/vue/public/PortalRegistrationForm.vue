<template>
    <form @submit.prevent="handleSubmit">
        <input v-model="registerUsername" name="username" type="text" placeholder="Username" required />
        <button type="submit">
            Sign up
        </button>
    </form>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                registerUsername: null
            }
        },

        methods: {
            handleSubmit() {
                console.log("Submitted")
            }
        }
    }
</script>