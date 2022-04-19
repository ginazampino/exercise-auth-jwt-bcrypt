<template>
    <main>
        <form @submit.prevent="handleSubmit">
            <input v-model="loginEmail" name="email" type="email" placeholder="Email address" required />
            <input v-model="loginPassword" name="password" type="password" placeholder="Password" required />
            <button type="submit">
                Sign in
            </button>
        </form>
        <aside>
            <p>
                Don't have an account?
                <a href="/register">Register now</a>
            </p>
        </aside>
    </main>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                loginEmail: null,
                loginPassword: null
            };
        },

        methods: {
            async handleSubmit() {
                await axios.post('/api/login', {
                    email: this.loginEmail,
                    password: this.loginPassword
                }).then((result) => {
                    if (result) {
                        window.location.assign('/');
                    } else {
                        window.location.assign('/login');
                    };
                }).catch((error) => {
                    throw error;
                    // document.getElementById('invalidAttempt').classList.remove('hide');
                }); 
            }
        }
    };
</script>