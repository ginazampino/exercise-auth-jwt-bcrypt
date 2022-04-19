<template>
    <div>
        <portal-header></portal-header>
        <main>
            <router-view></router-view>
        </main>
        <portal-footer></portal-footer>
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