<template>
  <div>
    <v-slide-x-transition>
      <v-alert v-show="error" error :value="error">{{ error || $t('message.errorOccured') }}</v-alert>
    </v-slide-x-transition>
    <v-slide-y-transition>
      <v-card class="mb-3" v-if="show">
        <v-card-title>
          <router-link v-for="user in discussion.users" :to="{ name: 'profil_profil', params: { userId: user.id }}" :key="user.id">
            <v-chip>
              <v-avatar>
                <img :src="user.avatar + '&s=64'" :alt="user.firstName">
              </v-avatar>
              {{ user.username }}
            </v-chip>
          </router-link>
          <v-spacer></v-spacer>
              <v-menu bottom left origin="top right">
                <v-btn icon="icon" slot="activator">
                  <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile v-for="item in actions" :key="item.text">
                    <v-list-tile @click.native="item.action">
                      <v-list-tile-avatar>
                        <v-icon>{{ item.icon }}</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-title>{{ $t('message.' + item.text) }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list-tile>
                </v-list>
              </v-menu>
        </v-card-title>
        <v-divider></v-divider>
        <v-subheader v-text="discussion.subject"></v-subheader>
      </v-card>
    </v-slide-y-transition>
    <v-slide-x-transition>
      <v-layout row wrap v-if="show">
        <template v-for="message in discussion.messages">
          <template v-if="message.user.id == self._id">
            <v-flex xs10 :key="message.id" class="mb-2">
              <v-card class="grey lighten-4 pa-3">
                <v-card-title>
                  {{ message.text }}
                </v-card-title>
              </v-card>
              <small class="grey--text">{{ message.date | formatDate }}</small>
            </v-flex>
            <v-flex xs2 class="mb-2">
              <router-link :to="{ name: 'profil_profil', params: { userId: message.user.id }}">
                <v-list-tile-avatar>
                  <img :src="message.user.avatar + '&s=64'"/>
                </v-list-tile-avatar>
              </router-link>
            </v-flex>
          </template>
          <template v-else>
            <v-flex xs2 class="mb-2">
              <router-link :to="{ name: 'profil_profil', params: { userId: message.user.id }}">
                <v-list-tile-avatar>
                  <img :src="message.user.avatar + '&s=64'"/>
                </v-list-tile-avatar>
              </router-link>
            </v-flex>
            <v-flex xs10 :key="message.id" class="mb-2">
              <v-card class="white pa-3">
                <v-card-title>
                  {{ message.text }}
                </v-card-title>
              </v-card>
              <small class="grey--text">{{ message.date | formatDate }}</small>
            </v-flex>
          </template>
        </template>
      </v-layout>
    </v-slide-x-transition>
    <v-slide-y-reverse-transition>
      <v-btn primary raised fab dark class="floatingActionBtn" v-show="show" @click.native="addMessageHandler">
        <v-icon dark>create</v-icon>
      </v-btn>
    </v-slide-y-reverse-transition>
    <!-- Add discussion Button -->
    <add-discussion-message-dialog 
      :discussionId="discussion.id" 
      v-model=addMessageDialog
      @messageAdded="scrollToBottom"
    ></add-discussion-message-dialog>
    <!-- Snack new message -->
    <v-snackbar
      :timeout="snack.timeout"
      :multi-line="isXS || isSM"
      bottom
      error
      v-model="snack.show">
      {{ $t('message.newMessage') }}
      <v-btn flat class="white--text" @click.native="snackNewMessageHandler()">{{ $t('message.see') }}</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import screenSizes from '@/mixins/screenSizes';
import checkNotifications from '@/mixins/checkNotifications';
import addDiscussionMessageDialog from '@/components/addDiscussionMessageDialog';

export default {
  mixins: [screenSizes, checkNotifications],
  name: 'discussion',
  data() {
    return {
      show: false,
      truc: false,
      error: '',
      actions: [
        {
          icon: 'delete',
          text: 'delete',
          action: this.deleteHandler,
        },
      ],
      addMessageDialog: false,
      interval: null,
      delay: 10000,
      snack: {
        timeout: 0,
        show: false,
      },
      container: null,
    };
  },
  components: {
    'add-discussion-message-dialog': addDiscussionMessageDialog,
  },
  mounted() {
    this.setLoadingPage(1);
    this.getDiscussion(this.$route.params.discussionId)
      .then(() => {
        this.show = true;
        this.checkNotifications('discussions', this.discussion.id);
        this.setLoadingPage(0);
        this.$nextTick(this.scrollToBottom);
      })
      .catch((errs) => {
        this.error = errs.graphQLErrors.map(err => err.message).join(',');
        this.setLoadingPage(0);
      });
    window.addEventListener('scroll', this.handleScroll.bind(this));
  },
  beforeDestroy() {
    clearInterval(this.interval);
    this.interval = null;
  },
  watch: {
    'notifications.discussions': function discussionChanged() {
      const hasMessage = this.notifications.discussions.indexOf(this.discussion.id) !== -1;
      if (hasMessage) {
        const isOnBottom = this.isOnBottom();
        this.getDiscussion(this.$route.params.discussionId).then(() => {
          if (!isOnBottom) {
            this.snack.show = true;
          } else {
            this.scrollToBottom();
          }
        });
        this.checkNotifications('discussions', this.discussion.id);
      }
    },
  },
  computed: {
    ...mapState({
      self: 'self',
      discussion: 'discussion',
      loadingPage: 'loadingPage',
      notifications: 'notifications',
    }),
  },
  methods: {
    ...mapActions([
      'getDiscussion',
      'deleteDiscussion',
    ]),
    ...mapMutations([
      'setLoadingPage',
      'setAddDiscussionMessageDialogToggle',
    ]),
    deleteHandler(e) {
      e.preventDefault();
      this.setLoadingPage(1);
      this.deleteDiscussion(this.discussion.id)
        .then(() => {
          this.setLoadingPage(0);
          this.$router.go(-1);
        })
        .catch((err) => {
          this.error = err.response.data;
          this.setLoadingPage(0);
          setTimeout(() => { this.error = ''; }, 3000);
        });
    },
    addMessageHandler() {
      this.addMessageDialog = true;
    },
    scrollToBottom() {
      window.scrollTo(0, document.body.scrollHeight);
    },
    snackNewMessageHandler() {
      this.snack.show = false;
      this.scrollToBottom();
    },
    handleScroll() {
      if (this.isOnBottom()) {
        this.snack.show = false;
      }
    },
    isOnBottom() {
      return Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
</style>
