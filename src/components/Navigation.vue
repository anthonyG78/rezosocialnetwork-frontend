<template>
  <v-navigation-drawer class="pb-0"
    :temporary="isXS || isSM" 
    :persistent="isMD || isLG || isXL"
    :clipped="isLG"
    :enable-resize-watcher="resizeWatcher"
    :dark="dark"
    :light="!dark"
    :value="drawer"
    v-if="self !== null"
    @input="value => setDrawer(value)"
    >
    <div :class="{'py-4 px-3 navigation-header white--text': true, 'primary': !dark, 'grey darken-4': dark}">
      <v-list-tile-avatar>
        <img :src="self.avatar + '&s=64'">
      </v-list-tile-avatar>
      <v-list-tile-content class="mt-3">
        <span v-html="self.username"></span>
        <span><small v-html="self.email"></small></span>
      </v-list-tile-content>
    </div>
    <v-list :dense="isXS || isSM" class="mt-0">
      <v-list-item v-for="item in items" :key="item.title">
        <v-subheader 
          :dark="!dark"
          :light="dark"
          v-if="item.header" 
          v-text="$t('message.'+item.header)">
        </v-subheader>
        <v-divider
          :dark="dark"
          v-else-if="item.divider"
          class="my-2"
        ></v-divider>
        <v-list-tile 
          v-else 
          ripple 
          router 
          :exact="item.exact" 
          :to="item.route ? { name: item.route } : null"
          @click.native="item.click ? clickHandler(item.click) : null">
          <v-list-tile-action>
            <v-icon :dark="!dark">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ $t('message.'+item.title) }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action v-if="notifications[item.title] && notifications[item.title].length">
            <v-icon class="red--text">fiber_new</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-item>
    </v-list>
    <v-divider
      :dark="dark"
    ></v-divider>

    <v-list :dense="isXS || isSM" class="mt-0">
      <v-list-item>
        <v-list-tile>
          <v-list-tile-action>
            <v-switch v-model="theme" dark hide-details></v-switch>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ $t('message.darkMode') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-item>
    </v-list>

    <footer class="px-3 mt-4 grey--text">
      <small>
        {{ (new Date()).getFullYear() }}
      </small>
    </footer>
  </v-navigation-drawer>
</template>

<script>
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
      self() {
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
      'setSignoutDialogToggle',
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
</script>
<style lang="scss" scoped>
    .navigation-drawer {
        border-right: 0;
    }

    .navigation-header {
        .avatar {
            justify-content: left;

            img {
                width: 64px;
                height: 64px;
            }
        }
    }
</style>
