export type MarkdownResult = {
    html: string;
};

export type Article = {
    url: string;
    slug: string;
    title: string;
    meta: {
        description: string;
    };
    abstract: string;
    body: MarkdownResult;
};
