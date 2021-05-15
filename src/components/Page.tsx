import { FunctionComponent, h } from 'preact';

import MetaTags from './MetaTags';
import { PageMetaData } from '../types';

const Page: FunctionComponent<{ meta: PageMetaData; styles?: string }> = ({ meta, children, styles }) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <MetaTags {...meta} />
                {/* <link rel="stylesheet" href="/static/styles.css"></link> */}
                {styles && <style>{styles}</style>}
            </head>
            <body>
                <div id="app">{children}</div>
                <script
                    src="https://instant.page/5.1.0"
                    type="module"
                    integrity="sha384-by67kQnR+pyfy8yWP4kPO12fHKRLHZPfEsiSXR8u2IKcTdxD805MGUXBzVPnkLHw"
                ></script>
            </body>
        </html>
    );
};

export default Page;
