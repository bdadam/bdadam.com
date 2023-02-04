import { z, defineCollection } from 'astro:content';

export const collections = {
    blog: defineCollection({
        schema: z.object({
            title: z.string(),
            description: z.string().optional().nullable(),
            abstract: z.string().nullable().optional(),
            date: z.date().or(z.string()),
            tags: z.array(z.string()).optional(),
            published: z.boolean().optional(),
        }),
    }),
};
