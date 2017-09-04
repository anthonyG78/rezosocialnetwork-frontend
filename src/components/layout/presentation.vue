<template>
  <div class="page-container">
    <v-container fluid class="grey lighten-2 presentation-header">
      <v-btn primary v-on:click.native="goBack()">
        <v-icon light>arrow_back</v-icon>
      </v-btn>
    </v-container>
    <v-container fluid>
      <v-layout row>
        <v-flex xs12 sm8 lg6 offset-sm2 offset-lg3>
          <router-view ></router-view>
        </v-flex>
      </v-layout>
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
      materialBg: '/static/material-bg-03.svg',
    };
  },
  components: {
    'page-header-user': pageHeaderUser,
    'page-header-tabs': pageHeaderTabs,
  },
  // created() {
  // },
  computed: {
    ...mapState({
      menu: 'menu',
      self() {
        return this.$store.getters.self;
      },
    }),
  },
  methods: {
    goBack: function goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*.presentation-header {
    padding: 4em;
    margin-bottom: -4em;
  }*/
</style>
