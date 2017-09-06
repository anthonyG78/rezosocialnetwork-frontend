import Vue from 'vue';
import moment from 'moment';
import i18n from '../i18n/i18n';

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

Vue.filter('ligneBreak', value => value.replace(/(?:\r\n|\r|\n)/g, '<br/>'));
