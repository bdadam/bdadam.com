import { h } from 'preact';
// import Link from 'next/link';

const SiteHeader: React.FC<{}> = () => {
    return (
        <header className="site-header shadow">
            <div className="flex items-center flex-wrap bg-orange-200 border-b-4 border-orange-500">
                <nav className="w-full max-w-screen-xl mx-auto flex items-baseline px-3">
                    <a href="/" className="inline-block py-6 px-3 flex items-center hover:underline">
                        {/* <span className="font-bold text-xl">Adam Beres-Deak</span> */}
                        {/* <span className="font-bold text-2xl small-caps">bdadam.com</span> */}
                        <span className="font-bold text-lg uppercase">bdadam.com</span>
                    </a>
                    <a href="/" className="inline-block py-6 px-3 flex items-center hover:underline">
                        Home
                    </a>
                    {/* <Link href="/blog">
                        <a className="inline-block py-6 px-3 flex items-center hover:underline">Articles</a>
                    </Link>
                    <Link href="/snippets">
                        <a className="inline-block py-6 px-3 hover:underline">Code snippets</a>
                    </Link>
                    <Link href="/about.html">
                        <a className="inline-block py-6 px-3 hover:underline">About me</a>
                    </Link> */}
                </nav>
            </div>
        </header>
    );
};

export default SiteHeader;