<template>
  <v-toolbar 
    :fixed="!isXL"
    :class="{'secondary': !dark, 'primary': dark}" 
    light>
    <v-toolbar-side-icon class="hidden-md-and-up" light @click.native.stop="setDrawer(!drawer)"></v-toolbar-side-icon>
    <v-toolbar-title>
      <v-icon light>bubble_chart</v-icon>
      <span>REZO</span>
    </v-toolbar-title>
    <search class="hidden-xs-only"></search>
  </v-toolbar>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import Search from '@/components/Search';
  import screenSizes from '../mixins/screenSizes';

  export default {
    mixins: [screenSizes],
    data() {
      return {
        selectedLang: null,
        inputSearchFocus: false,
        loading: false,
        searchLimit: 5,
      };
    },
    components: {
      Search,
    },
    computed: {
      ...mapState({
        dark: 'dark',
        drawer: 'drawer',
      }),
    },
    methods: {
      ...mapMutations([
        'setDrawer',
      ]),
    },
  };
</script>

<style lang="stylus">
  #logo{
    height: 32px;
    vertical-align: middle;
  }
</style>
