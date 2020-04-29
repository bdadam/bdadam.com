import { useEffect, createRef, useRef, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';

const IframePage: NextPage = () => {
    const [htmlContent, setHtmlContent] = useState('');
    const [resultHidden, setResultHidden] = useState(false);
    const [sourceHidden, setSourceHidden] = useState(false);

    const [viewSource, setViewSource] = useState(false);

    const encodedHtml = htmlContent.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
        return '&#' + i.charCodeAt(0) + ';';
    });

    useEffect(() => {
        const demoFile = new URLSearchParams(location.search).get('demo');

        const fetchCodePromise = fetch(`/demo/${demoFile}`)
            .then((r) => r.text())
            .then((html) => {
                setHtmlContent(html);
            });

        const importPrismPromise = import('../services/prism');

        Promise.all([fetchCodePromise, importPrismPromise]).then(() => {
            importPrismPromise.then((Prism) => Prism.default.highlightAll());
        });
    }, []);

    return (
        <div className="h-screen">
            <div className="flex" style={{ height: '48px' }}>
                <button onClick={() => setSourceHidden(!sourceHidden)} className="border-b-2 border-blue-400">
                    Source
                </button>
                <button onClick={() => setResultHidden(!resultHidden)}>Result</button>
            </div>
            <div className="flex" style={{ height: 'calc(100vh - 48px)' }}>
                <div className="w-full h-full overflow-auto" hidden={resultHidden} x-style={{ maxWidth: '50%' }}>
                    <iframe className="flex-grow w-full h-full" frameBorder="0" srcDoc={htmlContent} />
                </div>

                <div
                    className="w-full h-full max-h-full overflow-auto"
                    hidden={sourceHidden}
                    dangerouslySetInnerHTML={{
                        __html: `<pre class="language-html" style="margin: 0!important; max-height: 100%;"><code class="language-html">${encodedHtml}</code></pre>`,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default IframePage;

export const getStaticProps: GetStaticProps = async () => {
    return { props: {} };
};
