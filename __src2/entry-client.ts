import './styles/reset.css';
import './styles/defaults.css';
import './styles/article.scss';
import './styles/site-header.scss';
import './styles/site-footer.scss';
import 'prismjs/themes/prism-tomorrow.css';

// import Prism from '../src/services/prism';

// import('../src/services/prism').then((Prism) => Prism.default.highlightAll());

const preloadLink = (e: MouseEvent | TouchEvent) => {
    const link = e?.target && (e.target as HTMLElement).closest('a');

    if (!link) {
        return;
    }

    const rawHref = link.getAttribute('href') ?? '';

    if (rawHref.startsWith('/')) {
        const l = document.createElement('link');
        l.rel = 'prefetch';
        l.href = rawHref;

        document.head.appendChild(l);
    }
};

window.addEventListener('mouseover', preloadLink);
window.addEventListener('touchstart', preloadLink);

// Prism.highlightAll();
