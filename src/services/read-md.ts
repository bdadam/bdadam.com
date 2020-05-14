import fs from 'fs';

import matter from 'gray-matter';

// export default <T extends { [key: string]: any }>(dir: string, filename: string) => {
export default <T>(dir: string) => {
    const filenames = fs.readdirSync(dir);

    const parsedFiles = filenames.map((filename) => {
        const content = fs.readFileSync(`${dir}/${filename}`, 'utf-8');
        const mt = matter(content);

        return { name: filename, rawContent: content, data: mt.data as Partial<T> };
    });

    return parsedFiles;

    // const x = { name: filename, content: fs.readFileSync(`${dir}/${filename}`, 'utf-8') };

    // const data: Partial<T> = mt.data;
    // data.date = new Date(data.date ?? '0000-00-00');

    // const slug = `${speakingurl(data.title ?? '', { lang: 'en' })}.html`;

    // return { slug, data, content: mt.content };

    //
};
