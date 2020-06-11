import Prism from 'prismjs';

import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-handlebars';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-shell-session';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-css-extras';
import 'prismjs/components/prism-js-extras';
import 'prismjs/components/prism-js-templates';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';
// import 'prismjs/components/prism-';
// import 'prismjs/plugins/show-language/prism-show-language';
// import 'prismjs/plugins/line-numbers/prism-line-numbers';

Prism.languages.sh = Prism.languages.bash;

export default Prism;

// // import hljs from 'highlight.js/lib/core';
// import hljs from 'highlight.js';
// // import javascript from 'highlight.js/lib/languages/javascript';
// // @ts-ignore
// import javascript from 'highlight.js/lib/languages/javascript';
// // @ts-ignore
// import javascript from 'highlight.js/lib/languages/';
// // @ts-ignore
// import shell from 'highlight.js/lib/languages/shell';
// // @ts-ignore
// import bash from 'highlight.js/lib/languages/bash';
// hljs.registerLanguage('javascript', javascript);
// hljs.registerLanguage('shell', shell);
// hljs.registerLanguage('bash', bash);

// export default { highlightAll: () => hljs.initHighlighting() };
