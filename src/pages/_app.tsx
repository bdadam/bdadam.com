import { AppProps } from 'next/app';

import '../styles/tailwind.css';
import '../styles/defaults.css';
import '../styles/prism.css';

const App = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
};

export default App;
