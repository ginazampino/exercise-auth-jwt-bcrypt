<template>
    <main>
        <div class="content">
            <AppHeader :heading-text="headerText" />
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
                userId: null,
                userName: null,
                roleName: null,
                teamName: null,
                teamPrefix: null,
                teamDescription: null,
                teamSize: null,
                websiteName: null,
                websiteUrl: null,
                createdAt: null,
                headerText: null
            }
        },

        methods: {
            loadData: async function () {
                const publicProfile = await axios.get(`/api/get/user/${this.$route.params.id}/public`).then((result) => { return result; });
                this.userId = publicProfile.data.id;
                this.userName = publicProfile.data.userName;
                this.teamName = publicProfile.data.teamName;
                this.teamPrefix = publicProfile.data.teamPrefix;
                this.teamDescription = publicProfile.data.teamDescription;
                this.teamSize = publicProfile.data.teamSize;
                this.websiteName = publicProfile.data.websiteName;
                this.websiteUrl = publicProfile.data.websiteUrl;

                if (!publicProfile.data.createdAt) {
                    this.createdAt = null;
                } else {
                    this.createdAt = (publicProfile.data.createdAt).substring(0, 10);
                };

                if (this.teamName != null) {
                    this.headerText = this.teamName;
                } else {
                    this.headerText = this.userName;
                };
            }
        },

        mounted() {
            this.loadData();
        }
    };
</script>