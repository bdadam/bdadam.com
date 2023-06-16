import type { APIRoute } from 'astro';

export const post: APIRoute = async function () {
    return {
        status: 204,
        body: '',
    };
};
