<template>
    <code>
        {{ friendCode }}
    </code>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                friendCode: null
            };
        },

        async mounted() {
            const session = await axios.get('/api/get/cookie').then((result) => { return result; }).catch((error) => { throw error; });
            const profile = await axios.get(`/api/get/user/${session.data}/private`).then((result) => { return result; }).catch((error) => { throw error; });
            this.friendCode = profile.data.friendCode;
        }
    };
</script>