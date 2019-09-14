import path from 'path';

import fs from 'fs-extra';
import matter from 'gray-matter';
import { format } from 'date-fns';

import parseMarkdown from './parseMarkdown';

export default file => {
    const filecontent = fs.readFileSync(file, 'utf-8');
    const x = matter(filecontent);

    if (x.data.published === false) {
        return;
    }

    const slug = path.basename(file, '.md');
    const date = new Date(x.data.date);

    const review = x.data.reviewedAt
        ? {
              reviewedAt: new Date(x.data.reviewedAt),
              reviewedAtFormatted: format(new Date(x.data.reviewedAt), 'do MMMM yyyy'),
          }
        : {};

    return {
        url: `/blog/${slug}/`,
        title: x.data.title,
        description: x.data.description,
        abstract: parseMarkdown(x.data.abstract || ''),
        content: parseMarkdown(x.content),
        deprecation: parseMarkdown(x.data.deprecation || ''),
        date,
        dateFormatted: format(date, 'do MMMM yyyy'),
        ...review,
        tags: x.data.tags || [],
    };
};
