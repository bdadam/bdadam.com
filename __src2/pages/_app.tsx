import { h } from 'preact';
import { AppProps } from 'next/app';

// import '../styles/tailwind.css';
// import '../styles/defaults.css';
import '../styles/globals.css';
import '../styles/prism.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp