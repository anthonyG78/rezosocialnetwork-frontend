<template>
  <div>
    <v-slide-x-transition>
      <v-alert v-show="error" error :value="error">{{ error || $t('message.errorOccured') }}</v-alert>
    </v-slide-x-transition>
    <v-slide-x-transition>
      <v-layout row v-if="discussionsCopy.length" v-show="show">
        <v-flex xs12>
          <v-list class="white mt-0" three-line>
            <template v-for="(discussion, index) in discussionsCopy">
              <v-divider v-if="index > 0"></v-divider>
              <v-list-tile avatar router :to="{ name: 'discussion', params: { discussionId: discussion.id }}" :key="discussion.id">
                <v-list-tile-avatar>
                  <img :src="discussion.firstUser.avatar + '&s=64'"/>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="discussion.firstUser.username"></v-list-tile-title>
                  <v-list-tile-sub-title v-if="discussion.usersLength > 1" v-html="(discussion.usersLength - 1) + ' ' + $tc('message.other', discussion.usersLength ? 1 : 0)"></v-list-tile-sub-title>
                  <v-list-tile-sub-title v-html="discussion.subject"></v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>{{ discussion.dateMaj | formatDate }}</v-list-tile-action-text>
                  <div class="actions-btn-list" v-if="$store.getters.isAuthorized">
                    <template v-if="notifications.discussions.indexOf(discussion.id) !== -1">
                      <v-chip small class="red white--text">{{ discussion.messages.length }}</v-chip>
                    </template>
                    <template v-else>
                      <v-chip small class="grey white--text">{{ discussion.messages.length }}</v-chip>
                    </template>
                    <v-btn icon class="error--text" @click.native.stop="(e) => deleteDiscussionHandler(e, discussion.id)">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </div>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list>
        </v-flex>
      </v-layout>
      <v-alert v-else :value="true" warning v-show="show">Aucune discussion</v-alert>
    </v-slide-x-transition>
    <v-slide-y-reverse-transition>
      <v-btn primary raised fab dark 
        class="floatingActionBtn" 
        v-show="show"
        @click.native="setAddDiscussionDialogToggle(true)">
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-slide-y-reverse-transition>
    <add-discussion-dialog :selectedUsersId="selectedUsersId"></add-discussion-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import addDiscussionDialog from '@/components/addDiscussionDialog';
import checkNotifications from '@/mixins/checkNotifications';

export default {
  mixins: [checkNotifications],
  name: 'discussions',
  data() {
    return {
      show: false,
      discussionsCopy: [],
      error: '',
      selectedUsersId: [],
    };
  },
  components: {
    'add-discussion-dialog': addDiscussionDialog,
  },
  created() {
    if (this.user._id !== this.self._id) {
      this.selectedUsersId.push(this.user._id);
    }
  },
  mounted() {
    this.loadMessages();
  },
  watch: {
    '$route.params.userId': function routeParams() {
      if (this.user._id !== this.self._id) {
        this.selectedUsersId.push(this.user._id);
      } else {
        this.selectedUsersId = [];
      }
      this.loadMessages();
    },
    'notifications.discussions': function notificationsDiscussions() {
      if (this.notifications.discussions.length) {
        this.loadMessages();
      }
    },
    discussions: function watchDiscussions() {
      const selfId = this.$route.params.userId ? this.user._id : this.self._id;
      const discussionsCopy = [];
      this.discussions.forEach((discussion, i) => {
        const filteredUsers = discussion.users.filter(user => user._id !== selfId);
        const newDiscussion = Object.assign({
          usersLength: filteredUsers.length,
          firstUser: filteredUsers[0],
        }, discussion);
        discussionsCopy[i] = newDiscussion;
      });
      this.discussionsCopy = discussionsCopy;
    },
  },
  computed: {
    ...mapState({
      self: 'self',
      user: 'user',
      discussions: 'discussions',
      loadingPage: 'loadingPage',
      addDiscussionDialogToggle: 'addDiscussionDialogToggle',
    }),
  },
  methods: {
    ...mapActions([
      'getDiscussions',
      'deleteDiscussion',
    ]),
    ...mapMutations([
      'setLoadingPage',
      'setAddDiscussionDialogToggle',
    ]),
    loadMessages() {
      this.setLoadingPage(1);
      return this.getDiscussions(this.$route.params.userId)
        .then(() => {
          this.show = true;
          // this.checkNotifications('discussions');
          this.setLoadingPage(0);
          this.error = '';
        })
        .catch((errs) => {
          this.error = errs.graphQLErrors.map(err => err.message).join(',');
          this.setLoadingPage(0);
        });
    },
    deleteDiscussionHandler(e, discussionId) {
      e.preventDefault();
      this.deleteDiscussion(discussionId).then(() => {
        this.loadMessages();
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
