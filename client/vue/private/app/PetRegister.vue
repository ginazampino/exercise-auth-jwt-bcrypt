<template>
    <main>
        <div class="content">
            <AppHeader headingText="Register a pet" />
            <form class="editor" @submit.prevent="handleSubmit">
                <h2>
                    Event information
                </h2>
                <section>
                    <div>
                        <label>Pet name <i class="fa-solid fa-asterisk red plain"></i></label>
                        <input v-model="petName" class="background white" type="text" placeholder="i.e. Spot"/>
                    </div>
                     <div>
                        <label>Show name <i class="fa-solid fa-asterisk red plain"></i></label>
                        <input v-model="showName" class="background white" type="text" placeholder="i.e. Frisbee Fan"/>
                    </div>
                </section>
                <section>
                    <div>
                        <label>Original owner</label>
                        <input v-model="originalOwner" class="background white" type="text" placeholder="i.e. Petz Hub"/>
                    </div>
                     <div>
                        <label>Original prefix</label>
                        <input v-model="originalPrefix" class="background white" type="text" placeholder="i.e. PH (or Petz Hub)"/>
                    </div>
                </section>

                <div class="divider yellow"></div>

                <h2>
                    Game information
                </h2>
                <section>
                    <AppDropdown labelText="Game version" :optionList="versionOptions" :valueText="petVersion" v-on:changeValueText="updatePetVersion($event)"/>
                    <AppDropdown labelText="Pet species" :optionList="speciesOptions" :valueText="petSpecies" v-on:changeValueText="updatePetSpecies($event)"/>
                     
                </section>
                <section v-if="(petVersion == 'Petz 3') || (petVersion == 'Petz 4')">
                    <AppDropdown v-if="(petSpecies =='Cat')" labelText="Pet breed" :optionList="pfmCatOptions" :valueText="petBreed" v-on:changeValueText="updatePetBreed($event)" />
                    <AppDropdown v-if="(petSpecies =='Dog')" labelText="Pet breed" :optionList="pfmDogOptions" :valueText="petBreed" v-on:changeValueText="updatePetBreed($event)" />
                </section>
                <section v-if="petVersion == 'Petz 5'">
                    <AppDropdown v-if="(petSpecies =='Cat')" labelText="Pet breed" :optionList="ubiCatOptions" :valueText="petBreed" v-on:changeValueText="updatePetBreed($event)" />
                    <AppDropdown v-if="(petSpecies =='Dog')" labelText="Pet breed" :optionList="ubiDogOptions" :valueText="petBreed" v-on:changeValueText="updatePetBreed($event)" />
                </section>

                <div class="divider yellow"></div>

                <h2>
                    File information
                </h2>
                <section>
                    <AppDropdown labelText="Pet gender" :optionList="genderOptions" :valueText="petGender" v-on:changeValueText="updatePetGender($event)"/>
                     <div>
                        <label>Pet generation</label>
                        <input v-model="petGeneration" class="background white" type="number" placeholder="i.e. 2"/>
                    </div>
                </section>
                <section>
                    <AppDropdown labelText="Pet ancestry" :optionList="ancestryOptions" :valueText="petAncestry" v-on:changeValueText="updatePetAncestry($event)"/>
                    <AppDropdown labelText="Pet pedigree" :optionList="pedigreeOptions" :valueText="petPedigree" v-on:changeValueText="updatePetPedigree($event)"/>
                     <AppDropdown labelText="File history" :optionList="modificationOptions" :valueText="petModification" v-on:changeValueText="updatePetModification($event)"/>
                </section>

                <div class="divider yellow"></div>

                   <section>
                    <router-link :to="'/user/' + sessionId">
                        <button class="pop yellow" aria-label="Click to go to your pet manager">View my pets</button>
                    </router-link>
                    <button class="pop red" @click.prevent="handleCancel()"  aria-label="Click to reset the form data">Cancel</button>
                    <button class="pop blue" type="submit"  aria-label="Click to register a new pet">Register</button>
               </section>
            </form>
        </div>
    </main>
</template>

<script>
    import axios from 'axios';
    import AppHeader from './AppHeader.vue';
    import AppDropdown from './AppDropdown.vue';

    export default {
        components: {
            AppHeader,
            AppDropdown
        },

        data() {
            return {
                // Session data:
                sessionId: null,
                petName: null,
                showName: null,
                petGender: null,
                petVersion: null,
                petSpecies: null,
                petBreed: null,
                petGeneration: null,
                originalOwner: null,
                originalPrefix: null,
                petAncestry: null,
                petPedigree: null,
                petModification: null,
                ancestryOptions: ['Inbred', 'Noninbred'],
                pedigreeOptions: ['Mixed Breed', 'Purebred'],
                modificationOptions: ['Modified', 'Unmodified'],
                speciesOptions: ['Cat', 'Dog'],
                genderOptions: ['Male', 'Female'],
                versionOptions: ['Petz 3', 'Petz 4', 'Petz 5'],
                pfmDogOptions: ['Bulldog', 'Chihuahua', 'Dachshund', 'Dalmatian', 'Great Dane', 'Labrador', 'Mutt', 'Poodle', 'Scottie', 'Sheepdog'],
                ubiDogOptions: ['Bulldog', 'Chihuahua', 'Dachshund', 'Dalmatian', 'German Shepherd', 'Golden Retriever', 'Great Dane', 'Jack Russel', 'Labrador', 'Mutt', 'Papillion', 'Poodle', 'Pug', 'Scottie', 'Sheepdog'],
                pfmCatOptions: ['Alley Cat', 'B&W Shorthair', 'Calico', 'Chinchilla Persian', 'Maine Coon', 'Orange Shorthair', 'Persian', 'Russian Blue', 'Siamese', 'Tabby'],
                ubiCatOptions: ['Alley Cat', 'B&W Shorthair', 'Calico', 'Chinchilla Persian', 'Desert Lynx', 'Egyptian Mau', 'Honeybear', 'Japanese Bobtail', 'Maine Coon', 'Orange Shorthair', 'Persian', 'Russian Blue', 'Scottish Fold', 'Siamese', 'Tabby']
            }
        },

        methods: {
            updatePetGender: function (event) { this.petGender = event; },
            updatePetVersion: function (event) { this.updatePetBreed(null); this.petVersion = event; },
            updatePetSpecies: function (event) { this.updatePetBreed(null); this.petSpecies = event; },
            updatePetBreed: function (event) { this.petBreed = event; },
            updatePetAncestry: function (event) { this.petAncestry = event; },
            updatePetPedigree: function (event) { this.petPedigree = event; },
            updatePetModification: function (event) { this.petModification = event; },

            checkValues: function () {
                const valueArray = [
                    this.petName,
                    this.showName,
                    this.petVersion,
                    this.petBreed,
                    this.petGender,
                    this.petAncestry,
                    this.petPedigree,
                    this.petModification
                ];

                const checkResult = valueArray.some((value) => {
                    return value == null;
                });

                if (checkResult == true) {
                    alert('Fill out all required fields.')
                    return false;
                } else {
                    return true;
                };
            },

            async loadData() {
                const session = await axios.get('/api/get/cookie').then((result) => { return result.data; });
                this.sessionId = session;
            },

            async handleSubmit() {
                const valid = this.checkValues();
                
                if (valid) {
                    await axios.post(`/api/register/${this.sessionId}/pet`, {
                        petName: this.petName,
                        showName: this.showName,
                        originalOwner: this.originalOwner,
                        originalPrefix: this.originalPrefix,
                        petVersion: this.petVersion,
                        petSpecies: this.petSpecies,
                        petBreed: this.petBreed,
                        petGender: this.petGender,
                        petGeneration: this.petGeneration,
                        petAncestry: this.petAncestry,
                        petPedigree: this.petPedigree,
                        petModification: this.petModification
                    }).then((result) => {
                        if (result) {
                            window.location.assign('/pet/manager');
                        } else {
                            window.location.assign('/pet/register');
                        };
                    }).catch((error) => {
                        throw error;
                    });
                } else {
                    console.log('[DEBUG] Some or all required fields contained invalid data.')
                    return;
                };
            },

            async handleCancel() {
                this.$router.go();
            },
        },

         mounted() {
            this.loadData();
        }
    };
</script>