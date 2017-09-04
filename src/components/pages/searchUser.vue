<template>
  <div>
    <v-layout secondary class="pa-2 ma-0 mb-3">
      <v-flex xs12>
        <v-text-field 
          :value="searchTerm"
          prepend-icon="search" 
          :label="$t('message.search') + '...'" 
          hide-details 
          single-line 
          light
          @input="value => setSearchTerm(value)">
        </v-text-field>
      </v-flex>
    </v-layout>
    <!-- <v-alert v-if="!show || !searchTerm.length" info :value=true class="ma-3">aucune recherche</v-alert> -->
    <v-alert v-if="!searchedUsers.length" warning :value=true class="ma-3">aucun utilisateur</v-alert>
    <v-slide-y-transition>
      <div v-if="show && searchedUsers.length">
        <users-list 
          :users="searchedUsers"
          :self="self"
          :actions=true
          v-on:addFriend="askFriendHandler"
            v-on:acceptFriend="acceptFriendHandler"
            v-on:refuseFriend="refuseFriendHandler"
            v-on:deleteFriend="deleteFriendHandler"
        ></users-list>
      </div>
    </v-slide-y-transition>
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
import { mapActions, mapState, mapMutations } from 'vuex';
import UsersList from '@/components/UsersList';
import Search from '@/components/Search';

export default {
  mixins: [screenSizes],
  name: 'searchUser',
  data() {
    return {
      show: false,
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
    Search,
  },
  mounted() {
    if (this.$route.query.s !== this.searchTerm) {
      this.$store.commit('setSearchTerm', this.$route.query.s);
    }

    this.loadUsers();
  },
  watch: {
    searchTerm() {
      this.$router.push({ name: 'searchUser', query: { s: this.searchTerm } });
    },
    '$route.query.s': function queryChanged() {
      this.$store.commit('setSearchTerm', this.$route.query.s);
      this.loadUsers();
    },
  },
  computed: {
    ...mapState({
      self: 'self',
      loadingPage: 'loadingPage',
      searchTerm: 'searchTerm',
      searchedUsers: 'searchedUsers',
    }),
  },
  methods: {
    ...mapActions([
      'searchUser',
      'acceptFriend',
      'refuseFriend',
      'addFriend',
      'deleteFriend',
    ]),
    ...mapMutations([
      'setLoadingPage',
      'setSearchTerm',
    ]),
    loadUsers() {
      this.setLoadingPage(1);
      this.searchUser({ term: this.searchTerm, limit: this.limit }).then(() => {
        console.log({ term: this.searchTerm, limit: this.limit });
        this.show = true;
        this.setLoadingPage(0);
      });
    },
    askFriendHandler(userId) {
      return this.addFriend(userId)
        .then(() => {
          this.snack.show = true;
          this.loadUsers();
        })
        .catch((err) => {
          this.error = err.response.data;
          setTimeout(() => { this.error = ''; }, 3000);
        });
    },
    acceptFriendHandler(userId) {
      this.acceptFriend(userId).then(() => {
        this.loadUsers();
      });
    },
    refuseFriendHandler(userId) {
      this.refuseFriend(userId).then(() => {
        this.loadUsers();
      });
    },
    deleteFriendHandler(userId) {
      this.deleteFriend({ userId: this.$route.params.userId, friendId: userId }).then(() => {
        this.loadUsers();
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
</style>
