<template>
    <main>
        <div class="content">
            <h1 class="red">
                <i class="fa-solid fa-address-card blue"></i>
                <span v-if="teamName != null">
                    {{ teamName }}
                </span>
                <span v-if="teamName == null">
                    {{ userName }}'s Team
                </span>
            </h1>
            <div class="divider yellow"></div>
        </div>
    </main>
</template>

<script>
    import axios from 'axios';

    export default {
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
                createdAt: null
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
                this.createdAt = (publicProfile.data.createdAt).substring(0, 10);
            }
        },

        mounted() {
            this.loadData();
        }
    };
</script>