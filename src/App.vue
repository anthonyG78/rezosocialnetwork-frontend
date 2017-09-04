<template>
  <v-app :class="[{'grey lighten-3': !dark}, $route.name+'-view']" 
    :dark="dark"
    :light="!dark">
    <router-view name="navigation"></router-view>
    <v-progress-linear 
      v-show="loadingPage > 0" 
      v-bind:indeterminate="true" 
      class="ma-0 view-loader" :secondary="$route.name == 'signin'"></v-progress-linear>
    <router-view name="toolbar"></router-view>
    <main>
      <router-view ></router-view>
      <router-view name="footer"></router-view>
    </main>
    <!-- Dialogs -->
    <signout-dialog></signout-dialog>
    <remove-profil-dialog></remove-profil-dialog>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import checkNotifications from '@/mixins/checkNotifications';
import signoutDialog from '@/components/signoutDialog';
import removeProfilDialog from '@/components/removeProfilDialog';

export default {
  mixins: [checkNotifications],
  name: 'app',
  components: {
    'signout-dialog': signoutDialog,
    'remove-profil-dialog': removeProfilDialog,
  },
  watch: {
    self: function watchSelf() {
      if (this.self) {
        this.startFetchNotifications();
        window.addEventListener('focus', this.startFetchNotifications);
        window.addEventListener('blur', this.stopFetchNotifications);
      } else {
        this.stopFetchNotifications();
        window.removeEventListener('focus', this.startFetchNotifications);
        window.removeEventListener('blur', this.stopFetchNotifications);
      }
    },
  },
  computed: {
    ...mapState({
      dark: 'dark',
      self: 'self',
      loadingPage: 'loadingPage',
    }),
  },
};
</script>

<style lang="stylus" src="./style/main.styl"></style>
<style lang="stylus">
  html
    padding-right: 0 !important;

  body
    height: auto;

  .page-container
    min-height: 100vh;

  .view-loader
    position: fixed;
    top: 0;
    right: 0;
    right: 0;
    z-index: 10;

  .avatar img + span {
    margin-left: 0.5em;
  }

  .card a {
    text-decoration: none;
    color: initial;
  }

  .dialog--fullscreen {
    overflow-x: hidden !important;
  }

  .logo
    .icon
      font-size: inherit;
      vertical-align: bottom;

  .floatingActionBtn{
    position: fixed;
    bottom: 1em;
    right: 1em;
    display: flex;
    flex-direction: column;
  }

  .actions-btn-list {
    display: inline-flex;
  }

</style>
