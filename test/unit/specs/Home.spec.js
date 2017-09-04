import Vue from 'vue';
import i18n from '@/i18n/i18n';
import config from '@/plugins/config';
import Home from '@/components/Home';

Vue.use(config, process.env);

describe('Home.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      i18n,
      render: h => h(Home),
    }).$mount();

    expect(vm.$el.querySelector('h1').textContent)
      .to.equal(vm.$t('message.helloWorld'));
  });
});
