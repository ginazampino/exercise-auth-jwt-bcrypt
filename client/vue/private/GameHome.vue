<template>
    <main>
        <div class="content">
            <AppHeader heading-text="Welcome" />
            <section>
                <h2>A heading for news</h2>
                <p>
                    A paragraph of news about virtual pet shows!
                </p>
            </section>
            <section>
                    <div class="divider yellow"></div>
                    <footer>
                        Discord | Help
                    </footer>
            </section>
        </div>
    </main>
</template>

<script>
    import AppHeader from './app/AppHeader.vue';

    export default {
        components: {
            AppHeader
        }
    };
</script>
