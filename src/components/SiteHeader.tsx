import React from 'react';

const SiteHeader: React.FC<{}> = () => {
    return (
        <header className="site-header">
            <nav className="page-width">
                <a href="/" className="small-caps">
                    bdadam.com
                </a>
                <a href="/about.html">About me</a>
                {/* <a href="/blog">Articles</a> */}
                {/* <a href="/" className="inline-block py-6 px-3 flex items-center hover:underline">
                    Home
                </a> */}
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
        </header>
    );
};

export default SiteHeader;
