<template>
    <section class="smart-table">
        <v-table :data="pets" :filters="filters">

            <thead slot="head">
                <v-th sortKey="id">
                    ID
                </v-th>
                <v-th sortKey="petName">
                    Name
                </v-th>
                 <v-th sortKey="speciesName">
                    Species
                </v-th>
                 <v-th sortKey="breedName">
                    Breed
                </v-th>
            </thead>

            <tbody slot="body" slot-scope="{ displayData }">
                <tr v-for="row in displayData" :key="row.id">

                    <td class="data-id">
                        <div>
                            PH{{ row.id }}
                        </div>
                    </td>

                    <td class="data-name">
                        <div>
                            {{ row.petName }}
                        </div>
                    </td>

                    <td class="data-species">
                        <div>
                            <i v-if="(row.petGender == 'Male') && (row.speciesName == 'Cat')" class="fa-solid fa-cat blue plain" title="Male Cat"></i>
                            <i v-if="(row.petGender == 'Female') && (row.speciesName == 'Cat')" class="fa-solid fa-cat pink plain" title="Female Cat"></i>
                            <i v-if="(row.petGender == 'Male') && (row.speciesName == 'Dog')" class="fa-solid fa-dog blue plain" title="Male Dog"></i>
                            <i v-if="(row.petGender == 'Female') && (row.speciesName == 'Dog')" class="fa-solid fa-dog pink plain" title="Female Dog"></i>
                            {{ row.speciesName }}
                        </div>
                    </td>

                    <td class="data-breed">
                        <div>
                            {{ row.breedName }}
                        </div>
                    </td>

                </tr>
            </tbody>

        </v-table>
    </section>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                pets: null,
                filters: {
                    name: {
                        value: '',
                        keys: ['petName']
                    },
                    gender: {
                        value: '',
                        keys: ['petGender'],
                        options: [
                            'Male',
                            'Female'
                        ],
                        extact: true
                    }
                }
            }
        },

        methods: {
            loadPets: async function () {
                const pets = await axios.get(`/api/get/user/${this.$route.params.id}/pets`).then((result) => { return result; });

                this.pets = pets.data;
            }
        },

        mounted() {
            this.loadPets();
        }
    };
</script>