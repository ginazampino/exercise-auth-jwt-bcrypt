<template>
    <footer>
        <img src="../../img/ph-mutt.png" alt="Mutt puppy" title="Pre-alpha v0.0.1 Mutt">
        <form @submit.prevent="handleLogout">
            <button class="flat yellow alt" type="submit" aria-label="Sign out of Petz Hub">
                Sign out <i class="fas fa-sign-out-alt right"></i>
            </button>
        </form>
    </footer>
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
    }
</script>
