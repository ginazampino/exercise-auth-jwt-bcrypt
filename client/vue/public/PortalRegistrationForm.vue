<template>
    <main>
        <form @submit.prevent="handleSubmit">
            <input v-model="registerUsername" name="username" type="text" placeholder="Username" required />
            <input v-model="registerEmail" name="email" type="email" placeholder="Email address" required />
            <input v-model="registerPassword" name="password" type="password" placeholder="Password" required />
            <input v-model="registerConfirm" name="confirm" type="password" placeholder="Confirm password" required />
            <input v-model="registerCode" name="code" type="text" placeholder="Friend code" required />
            <button type="submit">
                Sign up
            </button>
        </form>
        <aside>
            <p>
                Already have an account?
                <a href="/login">Log in now</a>
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
                    throw error;
                });
            }
        }
    };
</script>