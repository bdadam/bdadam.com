import Vue from 'vue';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEnvelope, faRss } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter, faXing, faLinkedin } from '@fortawesome/free-brands-svg-icons';

config.autoAddCss = false;

library.add(faEnvelope, faRss);
library.add(faGithub, faTwitter, faXing, faLinkedin);

Vue.component('font-awesome-icon', FontAwesomeIcon);
