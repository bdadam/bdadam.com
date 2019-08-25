<template>
    <h1>Hello {{slug}}</h1>
</template>

<script>
export default {
    data() {
        return { slug: '' };
    },
    async asyncData(ctx) {
        return { slug: ctx.route.params.slug };
    },
};
</script>