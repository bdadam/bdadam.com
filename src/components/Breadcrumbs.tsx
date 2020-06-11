import Link from 'next/link';

const Breadcrumbs: React.FC<{}> = () => {
    return (
        <div className="">
            <Link href="/">
                <a>Home</a>
            </Link>
            &nbsp;{'>'}&nbsp;
            <Link href="/blog">
                <a>Articles</a>
            </Link>
        </div>
    );
};

export default Breadcrumbs;
