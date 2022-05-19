<template>
    <main>
        <div class="content">
            <section>
                <h1 class="red">
                    <i class="fas fa-cog blue"></i> Edit your profile
                </h1>
                <div class="divider yellow"></div>
            </section>
            <form class="editor" @submit.prevent="handleSubmit">
                <h2>
                    Account information
                </h2>
                <p>
                    We use <a href="https://en.wikipedia.org/wiki/Bcrypt" target="_blank" rel="noopener noreferrer">Bcrypt</a> to protect your password in our database.
                </p>
                <section>
                    <div>
                        <label>Email address</label>
                        <input class="background white" type="email" :placeholder="editorEmail" title="You can't change your email address." disabled/>
                    </div>
                    <div>
                        <label>Username</label>
                        <input class="background white" type="text" :placeholder="editorUsername" title="You can't change your username." disabled/>
                    </div>
                </section>
                <section>
                    <div>
                        <label>New password</label>
                        <input v-model="editorPassword" class="background white" type="password" placeholder=""/>
                    </div>
                    <div>
                        <label>Confirm password</label>
                        <input v-model="editorConfirm" class="background white" type="password" placeholder=""/>
                    </div>
                </section>
                <div class="divider yellow"></div>
                <h2>
                    Team information
                </h2>
                <p>
                    You must choose a team name and set a prefix before you can enter events!
                </p>
                <section>
                    <div>
                        <label>Team name</label>
                        <input v-model="editorTeam" class="background white" type="text" placeholder="e.g. Petz Hub"/>
                    </div>
                    <div>
                        <label>Team prefix</label>
                        <input v-model="editorPrefix" class="background white" type="text" placeholder="e.g. PH"/>
                    </div>
                </section>
                <section>
                        <div>
                            <label>Team description</label>
                            <textarea v-model="editorDescription" class="background white" type="text" placeholder="Type here..."/>
                        </div>
                </section>
                <div class="divider yellow"></div>
                <h2>
                    Contact information
                </h2>
                <p>
                    Link to your website, or to your PUGS, Flea Market, PKC, or forum account!
                </p>
                <section>
                    <div>
                        <label>Website name</label>
                        <input v-model="editorWebsite" class="background white" type="text" placeholder="e.g. Petz Hub" />
                    </div>
                    <div>
                        <label>Website URL</label>
                        <input v-model="editorUrl" class="background white" type="text" placeholder="e.g. https//www.petzhub.com"/>
                    </div>
                </section>
                <div class="divider yellow"></div>
                <section>
                    <router-link :to="'/user/' + sessionId">
                        <button class="pop yellow">View my profile</button>
                    </router-link>
                    <button class="pop red" @click.prevent="handleCancel()">Cancel</button>
                    <button class="pop blue" type="submit">Save</button>
               </section>
            </form>
        </div>
    </main>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                sessionId: null,
                editorEmail: null,
                editorUsername: null,
                editorPassword: null,
                editorConfirm: null,
                editorTeam: null,
                editorPrefix: null,
                editorDescription: null,
                editorWebsite: null,
                editorUrl: null
            }
        },

        methods: {
            loadData: async function () {
                const session = await axios.get('/api/get/cookie').then((result) => { return result; });
                this.sessionId = session.data;

                const profile = await axios.get(`/api/get/user/${this.sessionId}/private`).then((result) => { return result; });
                this.editorEmail = profile.data.userEmail;
                this.editorUsername = profile.data.userName;
                this.editorTeam = profile.data.teamName;
                this.editorPrefix = profile.data.teamPrefix;
                this.editorDescription = profile.data.teamDescription;
                this.editorWebsite = profile.data.websiteName;
                this.editorUrl = profile.data.websiteUrl;
            },

            async handleSubmit() {
                await axios.post(`/api/update/user/${this.sessionId}`, {
                    password: this.editorPassword,
                    confirm: this.editorConfirm,
                    team: this.editorTeam,
                    prefix: this.editorPrefix,
                    description: this.editorDescription,
                    website: this.editorWebsite,
                    url: this.editorUrl
                }).then(() => {
                    this.$router.go();
                }).catch((error) => { throw error; });
            },

            async handleCancel() {
                this.$router.go();
            }
        },

        mounted() {
            this.loadData();
        }
    }
</script>
