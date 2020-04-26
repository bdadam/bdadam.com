import Link from 'next/link';

const SiteHeader: React.FC<{}> = () => {
    return (
        <header className="site-header shadow">
            <div className="flex items-center flex-wrap bg-orange-200">
                <nav className="w-full max-w-screen-xl mx-auto">
                    <Link href="/">
                        <a className="inline-block p-6">Home</a>
                    </Link>
                    <Link href="/about.html">
                        <a className="inline-block p-6">About me</a>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default SiteHeader;
