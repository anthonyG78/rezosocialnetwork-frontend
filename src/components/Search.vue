<template>
  <div class="search-result">
    <v-text-field 
      :value="searchTerm"
      prepend-icon="search" 
      :label="$t('message.search') + '...'" 
      hide-details 
      single-line 
      @focus="inputFocusHandler(true)"
      @blur="inputFocusHandler(false)"
      @keyup.native.enter="keyupEnterHandler"
      @input="value => setSearchTerm(value)"
      light>
    </v-text-field>
    <v-slide-y-reverse-transition>
      <div v-show="searchTerm !== '' && inputSearchFocus">
        <v-list class="white" v-if="loading">
          <v-list-item>
            <v-list-tile tag="div">
              <v-list-tile-avatar>
                <v-progress-circular indeterminate v-bind:size="32" class="primary--text"></v-progress-circular>
              </v-list-tile-avatar>
              <span class="grey--text">{{ $t('message.loading') }}</span>
            </v-list-tile>
          </v-list-item>
        </v-list>
        <v-list class="white" v-else-if="!searchedUsersPreview.length">
          <v-list-item>
            <v-list-tile tag="div">
              <v-list-tile-avatar>
                <v-icon large class="grey--text">error</v-icon>
              </v-list-tile-avatar>
              aucun utilisateur
            </v-list-tile>
          </v-list-item>
        </v-list>
        <users-list v-else :users="searchedUsersPreview"></users-list>
      </div>
    </v-slide-y-reverse-transition>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import UsersList from '@/components/UsersList';

export default {
  name: 'search',
  data() {
    return {
      inputSearchFocus: false,
      loading: false,
      searchLimit: 5,
    };
  },
  components: {
    'users-list': UsersList,
  },
  watch: {
    searchTerm: function searchTerm() {
      if (this.searchTerm) {
        this.loading = true;
        this.searchUserPreview({ term: this.searchTerm, limit: this.searchLimit }).then(() => {
          this.loading = false;
        });
      }
    },
  },
  computed: {
    ...mapState({
      // dark: 'dark',
      // drawer: 'drawer',
      searchTerm: 'searchTerm',
      searchedUsersPreview: 'searchedUsersPreview',
    }),
  },
  methods: {
    ...mapMutations([
      // 'setDrawer',
      'setSearchTerm',
    ]),
    ...mapActions([
      'searchUserPreview',
    ]),
    inputFocusHandler(state) {
      this.inputSearchFocus = state;
    },
    keyupEnterHandler() {
      this.inputFocusHandler(false);
      this.$router.push({ name: 'searchUser', query: { s: this.searchTerm } });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .toolbar {
    /*position: relative;*/
    .search-result {
      position: relative;

      ul {
        position: absolute;
        width: 100%;
        top: calc(100% + 5px);
      }
    }
  }
</style>
