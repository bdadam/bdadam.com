import Prism from 'prismjs';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-handlebars';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-bash';

Prism.languages.sh = Prism.languages.bash;

export default Prism;
