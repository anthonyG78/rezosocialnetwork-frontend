<template>
  <div>
    <v-slide-x-transition>
      <post-list :posts="posts" :self="self" v-if="posts.length" v-show="show"></post-list>
      <v-alert v-else v-show="show" v-bind:value="true" warning>Aucun post</v-alert>
    </v-slide-x-transition>
    <v-slide-y-reverse-transition>
      <v-btn 
        primary 
        raised 
        fab
        dark 
        class="floatingActionBtn" 
        v-show="show"
        @click.native="setAddPostDialogToggle(true)">
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-slide-y-reverse-transition>
    <add-post-dialog></add-post-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import postList from '@/components/PostList';
import addPostDialog from '@/components/addPostDialog';

export default {
  name: 'communityPosts',
  data() {
    return {
      show: false,
    };
  },
  components: {
    'post-list': postList,
    'add-post-dialog': addPostDialog,
  },
  mounted() {
    this.setLoadingPage(1);
    this.$store.commit('setPosts', []);
    this.getCommunityPosts(this.$route.params.userId).then(() => {
      this.show = true;
      this.setLoadingPage(0);
    });
  },
  computed: {
    ...mapState({
      self: 'self',
      posts: 'posts',
      loadingPage: 'loadingPage',
      addPostDialogToggle: 'addPostDialogToggle',
    }),
  },
  methods: {
    ...mapActions([
      'getSelfPosts',
      'getCommunityPosts',
      'getUserPosts',
    ]),
    ...mapMutations([
      'setLoadingPage',
      'setAddPostDialogToggle',
    ]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
</style>
