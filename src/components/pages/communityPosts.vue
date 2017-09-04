<template>
  <div>
    <v-slide-x-transition>
      <post-list :posts="posts" :self="self" v-if="posts.length" v-show="show"></post-list>
      <v-alert v-else v-show="show" v-bind:value="true" warning>Aucun post</v-alert>
    </v-slide-x-transition>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import postList from '@/components/PostList';

export default {
  name: 'communityPosts',
  data() {
    return {
      show: false,
    };
  },
  components: {
    'post-list': postList,
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
    ]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
</style>
