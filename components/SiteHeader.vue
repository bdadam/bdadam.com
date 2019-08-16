<template>
    <header>
        <nav>
            <nuxt-link to="/" exact-active-class="selected">Home</nuxt-link>
            <nuxt-link to="/about.html" exact-active-class="selected" no-prefetch>About</nuxt-link>
        </nav>
    </header>
</template>

<style lang="less">
header {
    border-bottom: 1px solid #ddd;
    nav {
        display: flex;
        flex-direction: row;
        max-width: 1148px;
        margin: 0 auto;
    }
    a {
        padding: 16px 24px;
        display: block;
        position: relative;
        display: block;
        text-decoration: none;
        color: #333;

        &.selected {
            /* border: 1px solid red; */
            color: orange;
            &::after {
                content: '';
                display: block;
                position: absolute;
                bottom: -1px;
                width: calc(100% - 48px);
                left: 24px;
                border-bottom: 2px solid orange;
            }
        }
    }
}
</style>

