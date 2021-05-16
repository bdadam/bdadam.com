import './styles/reset.css';
import './styles/defaults.css';
import './styles/site-header.scss';

import('../src/services/prism').then((Prism) => Prism.default.highlightAll());
export {};

console.log('hahaha');
