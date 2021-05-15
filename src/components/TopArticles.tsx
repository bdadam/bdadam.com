import { h } from 'preact';

type Props = {
    articles: Array<{
        title: string;
        url: string;
        intro: string;
    }>;
};

const TopArticles: React.FC<Props> = ({ articles }) => {
    return (
        <ul>
            {articles.map((article) => {
                return (
                    <li className="mb-6" key={`top-article-${article.url}`}>
                        <a href={article.url} className="block mb-1">
                            <p className="font-bold hover:underline text-gray-800">{article.title}</p>
                        </a>
                        <div
                            className="mb-1 text-sm text-gray-700"
                            dangerouslySetInnerHTML={{ __html: article.intro }}
                        />
                        <a href={article.url} className="text-purple-700 hover:underline">
                            Read more
                        </a>
                    </li>
                );
            })}
        </ul>
    );
};

export default TopArticles;
