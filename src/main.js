// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Promise from 'bluebird';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate';
import moment from 'moment';
// import VueApollo from 'vue-apollo';
// import Vuex from 'vuex';
import App from './App';
import router from './router';
import i18n from './i18n/i18n';
import config from './plugins/config';
// import api from './plugins/api';
// import authenticate from './plugins/authenticate';
// import commonStore from './store/common';
// import apolloClient from './graphql/';
import store from './store/';

Vue.config.productionTip = false;

/** Get available langs keys */
const langs = Object.keys(i18n.messages);
const localesJs = require.context('vee-validate/dist/locale/', false, /.js$/);
/** Load lang file founded */
localesJs.keys().forEach((localePath) => {
  const lang = localePath.match(/(\w*).js/);

  if (lang && langs.indexOf(lang[1]) !== -1) {
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
moment.locale(i18n.locale);
Vue.filter('formatDate', (value) => {
  if (value) {
    const momentValue = moment(String(value));
    const now = moment();
    const diff = now.diff(momentValue);
    const diffDuration = moment.duration(diff);
    const diffDays = diffDuration.asDays();
    return diffDays > 7 ? momentValue.format('LL') : momentValue.fromNow();
  }
  return value;
});

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
  // apolloProvider,
  // data: commonStore,
  template: '<App/>',
  components: { App },
});
