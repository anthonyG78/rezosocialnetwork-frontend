import { mapActions, mapState } from 'vuex';

export default {
  data: () => ({
    fetchNotificationsInterval: null,
    fetchNotificationsDelay: 10000,
  }),
  computed: {
    ...mapState({
      notifications: 'notifications',
    }),
  },
  methods: {
    ...mapActions([
      'getNotifications',
      'deleteNotification',
    ]),
    startFetchNotifications() {
      if (this.fetchNotificationsInterval === null) {
        this.getNotifications();
        this.fetchNotificationsInterval = setInterval(
          this.getNotifications,
          this.fetchNotificationsDelay,
        );
      }
    },
    stopFetchNotifications() {
      clearInterval(this.fetchNotificationsInterval);
      this.fetchNotificationsInterval = null;
    },
    checkNotifications(key, value) {
      if (key in this.notifications && this.notifications[key].length) {
        let val;
        if (value && this.notifications[key].indexOf(value) !== -1) {
          val = value;
        }
        this.deleteNotification({ key, value: val });
      }
    },
  },
};
