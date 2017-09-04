// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

const locale = require('../../../src/i18n/locales/locale.en.json');

module.exports = {
  'default e2e tests': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.container')
      .assert.containsText('h1', locale.message.helloWorld)
      .end();
  },
};
