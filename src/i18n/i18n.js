import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

/** Scan the /locales directory and find all Json files */
const localesJson = require.context('./locales/', false, /.json$/);
const messages = {};

/** Load all Json file founded */
localesJson.keys().forEach((localePath) => {
  const lang = localePath.match(/(\w*).json/);

  if (lang) {
    messages[lang[1]] = localesJson(localePath);
  }
});

export default new VueI18n({
  locale: navigator.language,
  fallbackLocale: 'en',
  messages,
});
