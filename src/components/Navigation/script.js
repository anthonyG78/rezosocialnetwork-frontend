import { mapState, mapActions, mapMutations } from 'vuex';
import checkNotifications from '@/mixins/checkNotifications';
import screenSizes from '@/mixins/screenSizes';

export default {
  mixins: [screenSizes, checkNotifications],
  data() {
    return {
      resizeWatcher: true,
      theme: this.dark,
    };
  },
  created() {
    this.startFetchNotifications();
    window.addEventListener('focus', this.startFetchNotifications);
    window.addEventListener('blur', this.stopFetchNotifications);
  },
  beforeDestroy() {
    this.stopFetchNotifications();
    window.removeEventListener('focus', this.startFetchNotifications);
    window.removeEventListener('blur', this.stopFetchNotifications);
  },
  computed: {
    ...mapState({
      drawer: 'drawer',
      dark: 'dark',
      items: 'menu',
      signoutDialogToggle: 'signoutDialogToggle',
      self () {
        return this.$store.getters.self;
      },
      user: 'user',
      notifications: 'notifications',
    }),
  },
  watch: {
    theme: function theme() {
      this.setDark(this.theme);
    },
  },
  methods: {
    ...mapActions([
      // 'getNotifications',
    ]),
    ...mapMutations([
      'setDrawer',
      'setDark',
      'setSignoutDialogToggle'
    ]),
    clickHandler(methodName) {
      if (methodName in this) {
        this[methodName]();
      }
    },
    signout() {
      if (this.isXS || this.isSM || this.isMD) {
        this.setDrawer(false);
      }
      this.setSignoutDialogToggle(true);
    },
  },
};
