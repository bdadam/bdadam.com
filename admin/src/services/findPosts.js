const { promisify } = require('util');

const glob = require('glob');
const find = promisify(glob);
const sortBy = require('lodash/sortBy');
const reverse = require('lodash/reverse');

const findPost = require('./findPost');

module.exports = async () => {
    const paths = await find('*.md', { cwd: 'content/blog' });
    const posts = await Promise.all(paths.map(findPost));
    const sortedPosts = reverse(sortBy(posts, p => new Date(p.date)));

    return sortedPosts;
};