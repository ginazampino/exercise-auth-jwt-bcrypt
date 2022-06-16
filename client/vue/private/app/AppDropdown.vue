<template>
    <div class="dropdown">
        <span class="label">{{ labelText }} <i class="fa-solid fa-asterisk red plain"></i></span> 
        <div class="value white" v-on:click="handleValue($event)">
            <span>{{ valueText }}</span>
        </div>
        <ul class="options scrollbar-white-dk hidden">
            <li v-for="option in optionList" :key="option" v-on:click="handleSelect(option, $event)">
                {{ option }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            labelText: String,
            valueText: String,
            optionList: Array
        },

        methods: {
            clearMenus: function (menu) {
                const otherMenus = document.querySelectorAll('.options');

                otherMenus.forEach((ul) => {
                    if (ul != menu) {
                        ul.classList.add('hidden');
                    };
                });

            },

            handleValue: function (event) {
                const targetMenu = event.target.nextElementSibling;
                
                this.clearMenus(targetMenu);
                targetMenu.classList.toggle('hidden');
            },

            handleSelect: function (option, event) {
                const targetParent = event.target.parentElement;

                targetParent.classList.add('hidden');
                this.$emit('changeValueText', option);
            }
        }
    };
</script>