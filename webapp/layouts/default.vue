<template>
    <div id="app">
        <SiteHeader />
        <div class="page-container">
            <nuxt />
        </div>
        <SiteFooter />
    </div>
</template>

<script>
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
export default {
    components: {
        SiteHeader,
        SiteFooter,
    },
};
</script>