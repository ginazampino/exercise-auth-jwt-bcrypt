<template>
    <main>
        <form class="basic" @submit.prevent="handleSubmit">
            <div id="invalidAttempt" class="form-error hidden">Invalid email address and password.</div>
            <input class="yellow" v-model="loginEmail" name="email" type="email" placeholder="Email address" required />
            <input class="yellow" v-model="loginPassword" name="password" type="password" placeholder="Password" required />
            <button class="pop red" type="submit">
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
                    document.getElementById('invalidAttempt').classList.remove('hidden');
                    throw error;
                }); 
            }
        }
    };
</script>