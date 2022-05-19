<template>
    <header>
        <router-link to="/" aria-label="Return home">
            <img src="../../img/ph-logo.png" alt="Petz Hub logo">
        </router-link>
        <div class="ribbon">
            <router-link tag="div" to="/user/edit" aria-label="Edit account information">
                <span>
                    {{ sessionUser }}
                </span>
                <i class="fa-solid fa-gear"></i>
            </router-link>
        </div>
    </header>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                sessionId: null,
                sessionUser: null
            }
        },

        async mounted() {
            const session = await axios.get('/api/get/cookie')
                .then((result) => {
                    return result;
                }).catch((error) => {
                    throw error;
                });
            
            this.sessionId = session.data;
            
            const profile = await axios.get(`/api/get/user/${this.sessionId}/public`)
                .then((result) => {
                    return result;
                }).catch((error) => {
                    throw error;
                });

            this.sessionUser = profile.data.userName;
      }
    };
</script>