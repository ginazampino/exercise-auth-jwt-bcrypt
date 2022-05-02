<template>
    <footer>
        <div class="clock">{{ time }} UTC</div>
        <img src="../../img/ph-mutt.png" alt="Mutt puppy" title="Pre-alpha v0.0.1 Mutt">
        <form @submit.prevent="handleLogout">
            <button class="flat yellow" type="submit" aria-label="Sign out of Petz Hub">
                Sign out <i class="fas fa-sign-out-alt right"></i>
            </button>
        </form>
    </footer>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                interval: null,
                time: null
            }
        },

        methods: {
            async handleLogout() {
                await axios.post('/api/logout')
                    .then(() => {
                        window.location.assign('/login');
                    }).catch((error) => {
                        throw error;
                    });
            }
        },

        beforeDestroy() {
            clearInterval(this.interval);
        },

        created() {
            this.time = new Date().toISOString().slice(11, 19);

            function leadingZeroes(value) {
                if (value < 10) {
                    return '0' + value;
                } else return value;
            };

            this.interval = setInterval(() => {
                let hours = leadingZeroes(new Date().getUTCHours());
                let minutes = leadingZeroes(new Date().getUTCMinutes());
                let seconds = leadingZeroes(new Date().getUTCSeconds());

                this.time = `${hours}:${minutes}:${seconds}`
            }, 1000);
        }
    }
</script>
