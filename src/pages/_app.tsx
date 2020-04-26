import { AppProps } from 'next/app';

import '../styles/tailwind.css';
import '../styles/defaults.css';
import '../styles/prism.css';

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
