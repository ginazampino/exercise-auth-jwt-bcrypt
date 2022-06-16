<template>
    <div id="sidebar">
        <sidebar-header></sidebar-header>
        <sidebar-nav></sidebar-nav>
        <sidebar-footer></sidebar-footer>
        <sidebar-controls></sidebar-controls>
    </div>
</template>

<script>
    import header from './SidebarHeader.vue';
    import nav from './SidebarNav.vue';
    import footer from './SidebarFooter.vue';
    import controls from './SidebarControls.vue';

    export default {
        components: {
            'sidebar-header': header,
            'sidebar-nav': nav,
            'sidebar-footer': footer,
            'sidebar-controls': controls
        }
    };
</script>