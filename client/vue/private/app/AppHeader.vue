<template>
    <section>
        <h1 class="red">
            {{ headingText }}
        </h1>
        <div class="divider yellow"></div>
    </section>
</template>

<script>
    export default {
        props: {
            headingText: String
        }
    };
</script>
