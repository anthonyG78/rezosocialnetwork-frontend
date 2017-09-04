<template>
  <div class="page-container" v-if="this.user !== null">
    <page-header-user :user="user"></page-header-user>
    <page-header-tabs :isSelf="isSelf" :user="user" :menu="menu"></page-header-tabs>
    <v-container fluid>
      <router-view ></router-view>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import pageHeaderUser from '@/components/pageHeaderUser';
import pageHeaderTabs from '@/components/pageHeaderTabs';

export default {
  name: 'indexLayout',
  data() {
    return {
      show: false,
    };
  },
  components: {
    'page-header-user': pageHeaderUser,
    'page-header-tabs': pageHeaderTabs,
  },
  watch: {
    '$route.params.userId': function routeChanged() {
      if (!this.$route.params.userId) {
        this.$store.commit('setUser', this.self);
      }
    },
  },
  computed: {
    ...mapState({
      menu: 'menu',
      self() {
        return this.$store.getters.self;
      },
      user() {
        return this.$store.getters.user;
      },
    }),
    isSelf() {
      return !('userId' in this.$route.params);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
