export type MarkdownResult = {
    raw: string;
    html: string;
};

export type Article = {
    url: string;
    slug: string;
    title: string;
    date: Date;
    dateFormatted: string;
    meta: {
        description: string;
    };
    intro: MarkdownResult;
    body: MarkdownResult;
    tags: string[];
};

type OgType =
    | { type: 'website' }
    | {
          type: 'article';
          article?: {
              authors?: string[];
              section?: string;
              tags?: string[];
          };
      };

export type PageMetaData = {
    lang?: string;
    canonical: string;
    title: string;
    description: string;
    og?: OgType & {
        url?: string;
        title?: string;
        description?: string;
        audio?: string;
        locale?: string;
        site_name?: string;
        image?: {
            url: string;
            width?: number;
            height?: number;
            type?: string;
        };
    };
    twitter?: {
        title?: string;
        description?: string;
        image?: {
            url: string;
            alt?: string;
        };
        site: string;
        card: 'summary' | 'summary_large_image';
    };
};
