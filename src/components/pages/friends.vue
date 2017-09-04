<template>
  <div>
    <v-slide-x-transition>
      <v-alert v-show="error" error :value="error">{{ error || $t('message.errorOccured') }}</v-alert>
    </v-slide-x-transition>
    <v-layout v-if="show" class="white pa-2 ma-0 mb-3">
      <v-flex xs12>
        <v-text-field 
          prepend-icon="search" 
          :label="$t('message.search') + '...'" 
          hide-details 
          single-line 
          @input="(value) => searchUserHandler(value)">
        </v-text-field>
      </v-flex>
    </v-layout>
    <!-- <v-alert v-if="error" :value="true" warning >{{ error }}</v-alert> -->
    <v-slide-x-transition>
      <v-layout row v-if="friends.length" v-show="show">
        <v-flex xs12>
          <users-list 
            :users="friends"
            :self="self"
            :actions=true
            v-on:addFriend="askFriendHandler"
            v-on:acceptFriend="acceptFriendHandler"
            v-on:refuseFriend="refuseFriendHandler"
            v-on:deleteFriend="deleteFriendHandler"
          ></users-list>
        </v-flex>
      </v-layout>
      <v-alert v-else v-show="show" v-bind:value="true" warning>Aucun ami</v-alert>
    </v-slide-x-transition>
    <!-- <v-slide-y-reverse-transition>
      <v-btn primary raised floating class="floatingActionBtn" v-show="show">
        <v-icon light>create</v-icon>
      </v-btn>
    </v-slide-y-reverse-transition> -->
    <v-snackbar
      :timeout="snack.timeout"
      :multi-line="isXS || isSM"
      bottom
      success
      v-model="snack.show">
      {{ $t('message.friendShipSended') }}
      <v-btn flat class="white--text" @click.native="snack.show = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import screenSizes from '@/mixins/screenSizes';
import UsersList from '@/components/UsersList';
import { mapActions, mapState, mapMutations } from 'vuex';
import checkNotifications from '@/mixins/checkNotifications';

export default {
  mixins: [screenSizes, checkNotifications],
  name: 'myFriends',
  data() {
    return {
      show: false,
      error: '',
      limit: 100,
      snack: {
        show: false,
        text: '',
        timeout: 3000,
      },
    };
  },
  components: {
    'users-list': UsersList,
  },
  mounted() {
    this.loadFriends();
  },
  watch: {
    '$route.params.userId': function routeParams() {
      this.loadFriends();
    },
    // 'notifications.friends': function notificationsFriends() {
    //   this.checkNotifications('friends');
    // },
  },
  computed: {
    ...mapState({
      self: 'self',
      user: 'user',
      friends: 'friends',
      loadingPage: 'loadingPage',
      searchedUsers: 'searchedUsers',
    }),
  },
  methods: {
    ...mapActions([
      'getFriends',
      'searchFriends',
      'addFriend',
      'acceptFriend',
      'refuseFriend',
      'deleteFriend',
      'searchUser',
    ]),
    ...mapMutations([
      'setLoadingPage',
    ]),
    loadFriends() {
      this.setLoadingPage(1);
      return this.getFriends(this.$route.params.userId)
        .then(() => {
          this.show = true;
          if (!this.$route.params.userId) {
            this.checkNotifications('friends');
          }
          this.setLoadingPage(0);
        })
        .catch((errs) => {
          this.error = errs.graphQLErrors.map(err => err.message).join(',');
          this.setLoadingPage(0);
        });
    },
    askFriendHandler(userId) {
      return this.addFriend(userId)
        .then(() => {
          this.snack.show = true;
          this.loadFriends();
        })
        .catch((err) => {
          this.error = err.response.data;
          setTimeout(() => { this.error = ''; }, 3000);
        });
    },
    acceptFriendHandler(userId) {
      this.acceptFriend(userId).then(() => {
        this.loadFriends();
      });
    },
    refuseFriendHandler(userId) {
      this.refuseFriend(userId).then(() => {
        this.loadFriends();
      });
    },
    deleteFriendHandler(userId) {
      this.deleteFriend({ userId: this.$route.params.userId, friendId: userId }).then(() => {
        this.loadFriends();
      });
    },
    searchUserHandler(term) {
      if (term) {
        this.setLoadingPage(1);
        this.searchFriends({ id: this.$route.params.userId, term, limit: 100 }).then(() => {
          this.setLoadingPage(0);
        });
      } else {
        this.loadFriends();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
