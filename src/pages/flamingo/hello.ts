import type { APIRoute } from 'astro';

export const POST: APIRoute = async function () {
    return new Response('', {
        status: 204,
    });
};
