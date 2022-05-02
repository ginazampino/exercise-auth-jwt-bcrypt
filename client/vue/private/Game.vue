<template>
    <div id="game">
        <div class="container">
            <game-sidebar></game-sidebar>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    import sidebar from './Sidebar.vue';

    export default {
        components: {
            'game-sidebar': sidebar
        }

    };
</script>
