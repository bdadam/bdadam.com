import Link from 'next/link';

const SiteHeader: React.FC<{}> = () => {
    return (
        <header className="site-header shadow">
            <div className="flex items-center flex-wrap bg-orange-200 border-b-4 border-orange-500">
                <nav className="w-full max-w-screen-xl mx-auto flex items-center px-3">
                    <Link href="/">
                        <a className="inline-block py-6 px-3 flex items-center hover:underline">
                            <div
                                style={{ backgroundImage: 'url(/face.jpg)' }}
                                className="rounded-full bg-contain w-12 h-12 mr-3"
                            ></div>
                            <span style={{ fontVariant: 'small-caps' }}>bdadam.com</span>
                        </a>
                    </Link>
                    <Link href="/">
                        <a className="inline-block py-6 px-3 flex items-center hover:underline">Home</a>
                    </Link>
                    {/* <Link href="/blog">
                        <a className="inline-block py-6 px-3 flex items-center hover:underline">Articles</a>
                    </Link> */}
                    <Link href="/about.html">
                        <a className="inline-block py-6 px-3 hover:underline">About me</a>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default SiteHeader;
