<template>
  <div>
    <v-slide-x-transition>
      <v-alert v-show="error" error :value="error">{{ error || $t('message.errorOccured') }}</v-alert>
    </v-slide-x-transition>
    <v-slide-x-transition>
      <post-list :posts="posts" :self='self' v-if="posts.length" v-show="show"></post-list>
      <v-alert v-else v-show="show" v-bind:value="true" warning>Aucun post</v-alert>
    </v-slide-x-transition>
    <v-slide-y-reverse-transition>
      <v-btn 
        primary 
        raised 
        floating 
        class="floatingActionBtn" 
        v-show="show"
        @click.native="setAddPostDialogToggle(true)">
        <v-icon light>add</v-icon>
      </v-btn>
    </v-slide-y-reverse-transition>
    <add-post-dialog></add-post-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import checkNotifications from '@/mixins/checkNotifications';
import postList from '@/components/PostList';
import addPostDialog from '@/components/addPostDialog';

export default {
  mixins: [checkNotifications],
  name: 'myPosts',
  data() {
    return {
      show: false,
      error: '',
    };
  },
  mounted() {
    this.loadPosts();
  },
  // watch: {
  //   'notifications.posts': function notificationsPosts() {
  //     this.checkNotifications('posts');
  //   },
  // },
  components: {
    'post-list': postList,
    'add-post-dialog': addPostDialog,
  },
  watch: {
    '$route.params.userId': function routeParams() {
      this.loadPosts();
    },
  },
  computed: {
    ...mapState({
      posts: 'posts',
      self: 'self',
      loadingPage: 'loadingPage',
      addPostDialogToggle: 'addPostDialogToggle',
    }),
  },
  methods: {
    ...mapActions([
      'getPosts',
    ]),
    ...mapMutations([
      'setLoadingPage',
      'setAddPostDialogToggle',
    ]),
    loadPosts() {
      this.setLoadingPage(1);
      this.$store.commit('setPosts', []);
      this.getPosts(this.$route.params.userId)
        .then(() => {
          this.show = true;
          this.checkNotifications('posts');
          this.setLoadingPage(0);
        })
        .catch((errs) => {
          this.error = errs.graphQLErrors.map(err => err.message).join(',');
          this.setLoadingPage(0);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
</style>
