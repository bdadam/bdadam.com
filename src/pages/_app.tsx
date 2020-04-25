import { AppProps } from 'next/app';

import '../styles/tailwind.css';
import '../../node_modules/prismjs/themes/prism.css';

import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <div className="app flex flex-col min-h-screen">
            <SiteHeader />
            <div className="flex-grow">
                <Component {...pageProps} />
            </div>
            <SiteFooter />
        </div>
    );
};

export default App;
