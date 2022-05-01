<template>
    <main>
        <form class="basic" @submit.prevent="handleSubmit">
            <div id="invalidAttempt" class="form-error hidden" role="alert">Invalid email address and password.</div>
            <input class="yellow" v-model="loginEmail" name="email" type="email" aria-label="Email address" placeholder="Email address" required />
            <input class="yellow" v-model="loginPassword" name="password" type="password" aria-label="Password" placeholder="Password" required />
            <button class="pop red" type="submit" aria-label="Sign in to your Petz Hub account">
                Sign in
            </button>
        </form>
        <aside>
            <p>
                Don't have an account?
                <a href="/register" aria-label="Go to the account registration page">
                    Register now
                </a>
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