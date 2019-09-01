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

    return {
        url: `/blog/${slug}/`,
        title: x.data.title,
        description: x.data.description,
        abstract: parseMarkdown(x.data.abstract || ''),
        content: parseMarkdown(x.content),
        date,
        dateFormatted: format(date, 'do MMMM yyyy'),
        tags: x.data.tags || [],
    };
};
