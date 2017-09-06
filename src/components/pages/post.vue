<template>
  <div>
    <v-slide-x-transition>
      <v-alert v-show="error" error :value="error">{{ error || $t('message.errorOccured') }}</v-alert>
    </v-slide-x-transition>
    <v-slide-y-transition>
      <img v-if="show && post.image" :src="post.image" style="width:100%">
    </v-slide-y-transition>
    <v-slide-x-transition>
      <v-card v-if="show" >
        <v-card-title>
          <router-link :to="{ name: 'profil_profil', params: { userId: post.fromUser.id }}">
            <v-chip>
              <v-avatar>
                <img :src="post.fromUser.avatar + '&s=64'" :alt="post.fromUser.firstName">
              </v-avatar>
              {{ post.fromUser.username }}
            </v-chip>
          </router-link>
          <template v-if="post.fromUser.id !== post.toUser.id">
            <v-icon class="grey--text text--lighten-1">keyboard_arrow_right</v-icon>
            <router-link :to="{ name: 'profil_profil', params: { userId: post.toUser.id }}">
              <v-chip>
                <v-avatar>
                  <img :src="post.toUser.avatar + '&s=64'" :alt="post.toUser.firstName">
                </v-avatar>
                {{ post.toUser.username }}
              </v-chip>
            </router-link>
          </template>
          <v-spacer></v-spacer>
          <v-menu bottom left origin="top right" v-if="self._id == post.fromUser.id || self._id == post.toUser.id || self.level < 2">
            <v-btn icon="icon" slot="activator">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile 
                v-for="item in actions" 
                :key="item.text" 
                v-if="!item.isSelf || (item.isSelf && self._id == post.fromUser.id) || self.level < 2" @click.native="item.action">
                <v-list-tile-avatar>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>{{ $t('message.' + item.text) }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-title>
          <h3 class="headline mb-0">{{ post.title }}</h3>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p class="grey--text text-xs-right">{{ post.date | formatDate }}</p>
          <p>{{ post.text }}</p>
        </v-card-text>
        <v-list class="grey lighten-4">
          <v-subheader v-text="post.comments.length + ' ' + $tc('message.comment', post.comments.length ? 0 : 1)"></v-subheader>
          <v-list-tile v-for="comment in post.comments" :key="comment.id" tag="div">
            <router-link :to="{ name: 'profil_profil', params: { userId: post.fromUser.id }}">
              <v-list-tile-avatar>
                <img :src="comment.user.avatar + '&s=64'"/>
              </v-list-tile-avatar>
            </router-link>
            <v-list-tile-content>
              <v-list-tile-title v-html="comment.user.username"></v-list-tile-title>
              <v-list-tile-sub-title v-html="comment.text"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-slide-x-transition>
    <v-slide-y-reverse-transition>
      <v-btn primary raised fab dark class="floatingActionBtn" v-show="show" @click.native="addCommentHandler">
        <v-icon dark>create</v-icon>
      </v-btn>
    </v-slide-y-reverse-transition>
    <add-post-dialog :id="post.id"></add-post-dialog>
    <add-post-comment-dialog :postId="post.id"></add-post-comment-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import screenSizes from '@/mixins/screenSizes';
import checkNotifications from '@/mixins/checkNotifications';
import addPostDialog from '@/components/addPostDialog';
import addPostCommentDialog from '@/components/addPostCommentDialog';

export default {
  mixins: [screenSizes, checkNotifications],
  name: 'post',
  data() {
    return {
      show: false,
      error: '',
      // isSelf: false,
      actions: [
        {
          icon: 'delete',
          text: 'delete',
          isSelf: false,
          action: this.deleteHandler,
        },
        {
          icon: 'create',
          text: 'modify',
          isSelf: true,
          action: this.modifyHandler,
        },
      ],
    };
  },
  components: {
    'add-post-dialog': addPostDialog,
    'add-post-comment-dialog': addPostCommentDialog,
  },
  mounted() {
    this.setLoadingPage(1);
    this.getPost(this.$route.params.id)
      .then(() => {
        // this.isSelf = this.post.fromUser.id === this.self._id;
        this.show = true;
        this.checkNotifications('posts', this.post.id);
        this.setLoadingPage(0);
      })
      .catch((errs) => {
        this.error = errs.graphQLErrors.map(err => err.message).join(',');
        this.setLoadingPage(0);
      });
  },
  computed: {
    ...mapState({
      self: 'self',
      post: 'post',
      loadingPage: 'loadingPage',
      addPostCommentDialogToggle: 'addPostCommentDialogToggle',
    }),
  },
  methods: {
    ...mapActions([
      'getPost',
      'deletePost',
    ]),
    ...mapMutations([
      'setLoadingPage',
      'setAddPostDialogToggle',
      'setAddPostCommentDialogToggle',
    ]),
    deleteHandler() {
      this.setLoadingPage(1);
      this.deletePost(this.post.id)
        .then(() => {
          this.show = false;
          this.setLoadingPage(0);
          this.$router.go(-1);
        })
        .catch((err) => {
          this.setLoadingPage(0);
          this.error = err.response.data;
          setTimeout(() => { this.error = ''; }, 3000);
        });
    },
    modifyHandler() {
      this.setAddPostDialogToggle(true);
    },
    addCommentHandler() {
      this.setAddPostCommentDialogToggle(true);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
</style>
