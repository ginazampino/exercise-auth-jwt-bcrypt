<template>
    <div>
        Homepage
        <form @submit.prevent="handleLogout">
            <button class="flat yellow" type="submit">
                Sign out <i class="fas fa-sign-out-alt right"></i>
            </button>
        </form>
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
