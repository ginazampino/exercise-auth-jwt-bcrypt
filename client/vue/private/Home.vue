<template>
    <div>
        Homepage
        <form @submit.prevent="handleLogout">
            <button type="submit" aria-label="Sign out of Petz Hub">
                Sign out
            </button>
        </form>
        <router-view></router-view>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        methods: {
            async handleLogout() {
                await axios.post('/api/logout')
                    .then(() => {
                        window.location.assign('/login');
                    }).catch((error) => {
                        throw error;
                    });
            }
        }
    };
</script>
