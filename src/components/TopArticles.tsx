import Link from 'next/link';

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
                        <Link href="/blog/[slug]" as={article.url}>
                            <a className="block mb-1">
                                <p className="font-bold hover:underline text-gray-800">{article.title}</p>
                            </a>
                        </Link>
                        <div
                            className="mb-1 text-sm text-gray-700"
                            dangerouslySetInnerHTML={{ __html: article.intro }}
                        />
                        <Link href="/blog/[slug]" as={article.url}>
                            <a className="text-purple-700 hover:underline">Read more</a>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default TopArticles;
