<template>
    <section>
        <nav>
            <ul>
                <router-link tag="li" to="/home" aria-label="Manage my pets">
                    <button class="pop blue">
                        <i class="fas fa-paw" alt=""></i> My pets
                    </button>
                </router-link>
                <router-link tag="li" to="/home" aria-label="Manage my events">
                    <button class="pop blue">
                        <i class="fas fa-star" alt=""></i> My events
                    </button>
                </router-link>
            </ul>
        </nav>
        <div class="currency" aria-label="My currency">
            <button class="flat yellow">
                <i class="fas fa-coins left" aria-label="Tokens"></i> {{ tokens }}
            </button>
            <button class="flat yellow">
                <i class="fas fa-ticket-alt left" aria-label="Tickets"></i> {{ tickets }}
            </button>
        </div>
    </section>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                sessionId: null,
                tokens: null,
                tickets: null
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
            
            const currency = await axios.get(`/api/get/user/${this.sessionId}/currency`)
                .then((result) => { 
                    return result; 
                }).catch((error) => {
                    throw error;
                });

            this.tickets = currency.data.tickets;
            this.tokens = currency.data.tokens;
      }
    };
</script>