<template>
    <div id="portal">
        <div class="container">
            <div class="content">
                <portal-header></portal-header>
                <router-view></router-view>
                <portal-footer></portal-footer>
            </div>
        </div>
    </div>
</template>

<script>
    import header from './PortalHeader.vue';
    import footer from './PortalFooter.vue';

    export default {
        components: {
            'portal-header': header,
            'portal-footer': footer
        }
    };
</script>