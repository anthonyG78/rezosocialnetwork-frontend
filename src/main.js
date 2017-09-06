// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Promise from 'bluebird';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate';
// import VueApollo from 'vue-apollo';
// import Vuex from 'vuex';
import App from './App';
import router from './router';
import i18n from './i18n/i18n';
import config from './plugins/config';
import langs from './plugins/langs';
// import api from './plugins/api';
// import authenticate from './plugins/authenticate';
// import commonStore from './store/common';
// import apolloClient from './graphql/';
import store from './store/';
import filters from './plugins/filters';

Vue.config.productionTip = false;

Vue.use(langs, Object.keys(i18n.messages));
/** Get available langs keys */
const localesJs = require.context('vee-validate/dist/locale/', false, /.js$/);
/** Load lang file founded */
localesJs.keys().forEach((localePath) => {
  const lang = localePath.match(/(\w*).js/);

  if (lang && Vue.$langs.indexOf(lang[1]) !== -1) {
    VeeValidate.Validator.addLocale(localesJs(localePath));
  }
});

Promise.config({
  cancellation: true,
});

global.Promise = Promise;

Vue.use(Vuetify);
Vue.use(config, process.env);
// Vue.use(api, Vue.$config.API);
// Vue.use(authenticate);
Vue.use(VeeValidate, {
  errorBagName: 'vErrors',
  locale: i18n.locale,
});
// Vue.use(VueApollo);
// Vue.use(Vuex);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  mounted() {
    const body = document.body;
    body.classList.remove('site-loading');
    body.getElementsByClassName('spinner')[0].style.display = 'none';
  },
  store,
  router,
  i18n,
  filters,
  // apolloProvider,
  // data: commonStore,
  template: '<App/>',
  components: { App },
});
