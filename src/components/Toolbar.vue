<template>
  <v-toolbar 
    :fixed="!isXL"
    :class="{'secondary': !dark, 'primary': dark}" 
    dark>
    <v-toolbar-side-icon v-if="self && (isXS || isSM)" class="hidden-sm-and-up" dark @click.stop="setDrawer(!drawer)"></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link to="/">
        <v-icon dark>bubble_chart</v-icon>
        <span class="white--text">REZO</span>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <search v-if="self" class="hidden-xs-only"></search>
    <v-select
      v-bind:items="langs"
      item-text="text"
      item-value="value"
      v-model="selectedLang"
      label="langue"
      single-line
      dark
      prepend-icon="language"
      hide-details
      width="100"
    ></v-select>
    <v-icon v-if="notifications.discussions.length || notifications.posts.length || notifications.friends.length" class="ml-3" dark>notifications</v-icon>
  </v-toolbar>
</template>

<script>
  import moment from 'moment';
  import { mapState, mapMutations } from 'vuex';
  import Search from '@/components/Search';
  import screenSizes from '../mixins/screenSizes';

  export default {
    mixins: [screenSizes],
    data() {
      return {
        langs: [],
        selectedLang: this.$i18n.locale,
        inputSearchFocus: false,
        loading: false,
        searchLimit: 5,
      };
    },
    created() {
      this.changeLang();
    },
    components: {
      Search,
    },
    watch: {
      selectedLang: function selectedLangChanged() {
        this.changeLang();
      },
    },
    computed: {
      ...mapState({
        self: 'self',
        dark: 'dark',
        drawer: 'drawer',
        notifications: 'notifications',
      }),
    },
    methods: {
      ...mapMutations([
        'setDrawer',
      ]),
      changeLang() {
        this.$i18n.locale = this.selectedLang;
        moment.locale(this.$i18n.locale);
        this.langs = this.$langs.map((lang) => {
          const _lang = { text: this.$t(`message.${lang}`), value: lang };
          return _lang;
        });
      },
    },
  };
</script>

<style lang="stylus">
  #logo{
    height: 32px;
    vertical-align: middle;
  }
  .toolbar__title a {
    text-decoration: none;
  }
</style>
