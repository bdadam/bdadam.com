import { useEffect, useState, useRef } from 'react';
import { GetStaticProps, NextPage } from 'next';

const IframePage: NextPage = () => {
    const [htmlContent, setHtmlContent] = useState('');
    const [viewSource, setViewSource] = useState(false);

    const iframeRef = useRef<HTMLIFrameElement>(null);

    // const encodedHtml = htmlContent.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
    //     return '&#' + i.charCodeAt(0) + ';';
    // });

    const encodedHtml = htmlContent.replace(/[<>\&]/gim, function (i) {
        return '&#' + i.charCodeAt(0) + ';';
    });

    const innerHtmlSourceCode = `<pre class="language-html" style="margin: 0!important; max-height: 100%;"><code class="language-html">${encodedHtml}</code></pre>`;

    useEffect(() => {
        const demoFile = new URLSearchParams(location.search).get('demo');

        const fetchCodePromise = fetch(`/demo/${demoFile}`)
            .then((r) => r.text())
            .then((html) => {
                // setHtmlContent(html + `<script>console.log(document.body.scrollHeight)</script>`);
                const ifrbody = iframeRef.current!.contentWindow!.document.body;
                // let config = { attributes: true, childList: true }
                // Create a callback
                // let callback = function (mutationsList) { /* callback actions */ })

                const observer = new MutationObserver(() => {
                    console.log('MUTATION');
                });

                console.log(ifrbody);

                observer.observe(ifrbody, { attributes: true, childList: true, subtree: true });

                setHtmlContent(html);
            });

        const importPrismPromise = import('../services/prism');

        Promise.all([fetchCodePromise, importPrismPromise]).then(() => {
            importPrismPromise.then((Prism) => Prism.default.highlightAll());
        });
    }, []);

    return (
        <div className="h-screen">
            {/* <div className="flex bg-gray-300 py-4" style={{ height: '48px' }}>
                {!viewSource && <button onClick={() => setViewSource(true)}>View source</button>}
                {viewSource && <button onClick={() => setViewSource(false)}>See result</button>}
            </div> */}
            <div className="flex" style={{ height: 'calc(100vh - 48px)' }}>
                <div
                    className="w-full h-full"
                    // hidden={viewSource}
                >
                    <iframe
                        ref={iframeRef}
                        className="flex-grow w-full h-full"
                        style={{ maxHeight: '70vh' }}
                        frameBorder="0"
                        srcDoc={htmlContent}
                    />
                </div>

                <div
                    className="w-full h-full max-h-full overflow-auto"
                    // hidden={!viewSource}
                    dangerouslySetInnerHTML={{
                        __html: innerHtmlSourceCode,
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
