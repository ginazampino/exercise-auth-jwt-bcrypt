<template>
    <main>
        <div class="content">
            <AppHeader heading-text="Invite a friend" />
            <section>
                <div class="code-container" v-on:click="copyText" aria-label="Click to add to clipboard">
                    <h2>
                        Your friend code
                    </h2>
                    <code>
                        {{ friendCode }} <i class="fa-solid fa-floppy-disk" alt="Floppy disk icon"></i>
                    </code>
                </div>
            </section>
            <section>
                    <div class="divider yellow"></div>
                    <footer>
                        I have no idea what I'm doing.
                    </footer>
            </section>
        </div>
    </main>
</template>

<script>
    import axios from 'axios';
    import AppHeader from './AppHeader.vue';

    export default {
        components: {
            AppHeader
        },

        data() {
            return {
                friendCode: null
            };
        },

        methods: {
            copyText() {
                navigator.clipboard.writeText(this.friendCode);
            }
        },

        async mounted() {
            const session = await axios.get('/api/get/cookie')
                .then((result) => { return result; })
                .catch((error) => { throw error; });
                
            const profile = await axios.get(`/api/get/user/${session.data}/private`)
                .then((result) => { return result; })
                .catch((error) => { throw error; });

            this.friendCode = profile.data.friendCode;
        }
    };
</script>