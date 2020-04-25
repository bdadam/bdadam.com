import readAllArticles from '../../src/helpers/readAllArticles';

export default ({ app }, inject) => {
    app.fetchAllArticles = readAllArticles;
};
