<template>
    <main>
        <form class="basic" @submit.prevent="handleSubmit">
            <div id="invalidAttempt" class="form-error hidden" role="alert">Please try again.</div>
            <input class="yellow" v-model="registerUsername" name="username" type="text" aria-label="Username" placeholder="Username" required />
            <input class="yellow" v-model="registerEmail" name="email" type="email" aria-label="Email address" placeholder="Email address" required />
            <input class="yellow" v-model="registerPassword" name="password" type="password" aria-label="Password" placeholder="Password" required />
            <input class="yellow" v-model="registerConfirm" name="confirm" type="password" aria-label="Confirm password" placeholder="Confirm password" required />
            <input class="yellow" v-model="registerCode" name="code" type="text" aria-label="Friend code" placeholder="Friend code" required />
            <button class="pop red" type="submit" aria-label="Register your new Petz Hub account">
                Sign up
            </button>
        </form>
        <aside>
            <p>
                Already have an account?
                <a href="/login" aria-label="Go to the Petz Hub sign-in page">
                    Sign in now
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
                registerUsername: null,
                registerEmail: null,
                registerPassword: null,
                registerConfirm: null,
                registerCode: null
            };
        },

        methods: {
            async handleSubmit() {
                await axios.post('/api/register', {
                    username: this.registerUsername,
                    email: this.registerEmail,
                    password: this.registerPassword,
                    confirm: this.registerConfirm,
                    code: this.registerCode
                }).then((result) => {
                    if (result) {
                        window.location.assign('/login');
                    } else {
                        window.location.assign('/register');
                    };
                }).catch((error) => {
                    document.getElementById('invalidAttempt').classList.remove('hidden');
                    throw error;
                });
            }
        }
    };
</script>