<template>
    <div>
        <h1>Adam Beres-Deak</h1>

        <h2>Quotes I like</h2>
        <ul>
            <li v-for="quote in quotes" :key="quote.text">
                <cite>{{quote.text}}</cite>
                &mdash; {{quote.from}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            quotes: [
                {
                    text: 'The Web is the Platform',
                    from: 'Mozilla',
                },
                {
                    text: 'Everything should be made as simple as possible, but not simpler.',
                    from: 'Albert Einstein',
                },
                {
                    text: 'I have made this longer than usual because I have not had time to make it shorter.',
                    from: 'Blaise Pascal',
                },
                {
                    text:
                        'Simple can be harder than complex: You have to work hard to get your thinking clean to make it simple. But it’s worth it in the end because once you get there, you can move mountains.',
                    from: 'Steve Jobs',
                },
            ],
        };
    },
};
</script>