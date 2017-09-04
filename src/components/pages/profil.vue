<template>
  <div>
    <v-slide-x-transition>
      <v-alert v-show="error" error :value="error">{{ error || $t('message.errorOccured') }}</v-alert>
    </v-slide-x-transition>
    <v-slide-x-transition>
      <div v-if="show" class="profil-content">
        <v-alert error icon="verified_user" :value="user.level < 2">
          {{ $t('message.admin') }}
        </v-alert>
        <v-alert primary icon="people" :value="user.accepted == 1">
          {{ $t('message.waitingFriendship') }}
            <div class="actions-btn-list">
              <v-btn icon class="white--text" @click.native="(e) => acceptFriendHandler(user._id)">
                <v-icon>done</v-icon>
              </v-btn>
              <v-btn icon class="white--text" @click.native="(e) => refuseFriendHandler(user._id)">
                <v-icon>clear</v-icon>
              </v-btn>
            </div>
        </v-alert>
        <v-list class="white" >
          <v-list-item>
            <v-list-tile tag="div" :class="{'pink lighten-1': user.gender == 'femal', 'blue': user.gender == 'mal'}">
              <v-list-tile-action>
                <v-icon class="white--text">wc</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="white--text">{{ $t('message.' + user.gender) }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile tag="div">
              <v-list-tile-action>
                <v-icon class="primary--text">account_box</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ user.username }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ user.firstName }} {{ user.lastName }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile tag="div" v-if="(user.accepted == 2 || user.accepted == -1) && user.email">
              <v-list-tile-action>
                <v-icon class="primary--text">mail</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ user.email }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile tag="div">
              <v-list-tile-action>
                <v-icon class="primary--text">cake</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>age</v-list-tile-title>
                <v-list-tile-sub-title>{{ user.age | formatDate }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile tag="div">
              <v-list-tile-action>
                <v-icon class="primary--text">date_range</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ $t('message.memberSince') }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ user.date | formatDate }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile tag="div">
              <v-list-tile-action>
                <v-icon :class="{'green--text': user.connected, 'grey--text': !user.connected}">fiber_manual_record</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ user.connected ? $t('message.online') : $t('message.offline') }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </div>
    </v-slide-x-transition>
    <v-slide-y-reverse-transition>
      <div class="floatingActionBtn" v-show="show">
        <template v-if="$store.getters.isAuthorized">
          <v-btn primary raised floating @click.native="updateProfilHandler">
            <v-icon light>create</v-icon>
          </v-btn>
          <v-btn error raised floating @click.native="$store.commit('setDeleteProfilDialogToggle', true)">
            <v-icon light>delete</v-icon>
          </v-btn>
        </template>
        <template v-if="user.accepted == -1 && user._id !== self._id">
          <v-btn primary raised floating @click.native="askFriendHandler">
            <v-icon light>add</v-icon>
          </v-btn>
        </template>
        <template v-else-if="user.accepted < 2 && user._id !== self._id">
          <v-btn primary raised floating disabled>
            <v-icon light>add</v-icon>
          </v-btn>
        </template>
        <template v-if="user.accepted == 2">
          <v-btn error raised floating @click.native="deleteFriendHandler(user._id)">
            <v-icon light>clear</v-icon>
          </v-btn>
        </template>
      </div>
    </v-slide-y-reverse-transition>
    <v-snackbar
      :timeout="snack.timeout"
      :multi-line="isXS || isSM"
      bottom
      success
      v-model="snack.show">
      {{ $t('message.friendShipSended') }}
      <v-btn flat class="white--text" @click.native="snack.show = false">Close</v-btn>
    </v-snackbar>
    <update-profil-dialog 
      :user="user"
      v-model="updateDialog.show"
    ></update-profil-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import screenSizes from '@/mixins/screenSizes';
import checkNotifications from '@/mixins/checkNotifications';
import updateProfilDialog from '@/components/updateProfilDialog';

export default {
  mixins: [screenSizes, checkNotifications],
  name: 'profil',
  data() {
    return {
      show: false,
      snack: {
        show: false,
        text: '',
        timeout: 3000,
      },
      updateDialog: {
        show: false,
      },
      error: '',
    };
  },
  components: {
    'update-profil-dialog': updateProfilDialog,
  },
  mounted() {
    this.loadUser();
  },
  watch: {
    '$route.params.userId': function routeParams() {
      this.loadUser();
    },
  },
  computed: {
    ...mapState({
      self: 'self',
      user: 'user',
      loadingPage: 'loadingPage',
    }),
  },
  methods: {
    ...mapActions([
      'getUser',
      'addFriend',
      'acceptFriend',
      'refuseFriend',
      'deleteFriend',
      'setLoadingPage',
    ]),
    ...mapMutations([
      'setLoadingPage',
    ]),
    // watch: {
    //   user: function userChanged() {
    //     this.currentUser = 'userId' in this.$route.params ? this.user : this.self;
    //   },
    // },
    loadUser() {
      this.setLoadingPage(1);
      return this.getUser(this.$route.params.userId).then(() => {
        this.show = true;
        this.checkNotifications('friends', this.user.id);
        this.setLoadingPage(0);
        this.error = false;
      })
        .catch((errs) => {
          this.setLoadingPage(0);
          this.error = errs.graphQLErrors.map(err => err.message).join(',');
        });
    },
    askFriendHandler() {
      return this.addFriend(this.user._id).then(() => {
        this.snack.show = true;
        this.$store.commit('setUser', Object.assign({}, this.user, { accepted: 1 }));
      });
    },
    acceptFriendHandler(userId) {
      return this.acceptFriend(userId).then(() => {
        this.$store.commit('setUser', Object.assign({}, this.user, { accepted: 2 }));
      });
    },
    refuseFriendHandler(userId) {
      return this.refuseFriend(userId).then(() => {
        this.$store.commit('setUser', Object.assign({}, this.user, { accepted: -1 }));
      });
    },
    deleteFriendHandler(userId) {
      return this.deleteFriend(userId).then(() => {
        this.$store.commit('setUser', Object.assign({}, this.user, { accepted: -1 }));
      });
    },
    updateProfilHandler() {
      this.updateDialog.show = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .profil-content {
    .card__row--actions {
      font-size: 2em;
      background: rgba(0, 0, 0, .25)
    }

    .card__title img {
      margin-bottom: -2em;
    }
  }

  .actions-btn-list {
    display: flex;
    flex: 1 1 50%;
    justify-content: flex-end;
  }
</style>
