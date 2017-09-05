<template>
  <v-dialog :value="signoutDialogToggle" @input="value => setSignoutDialogToggle(value)" persistent :width="480">
    <v-card>
      <v-card-title>
        <v-icon class="primary--text mr-2">exit_to_app</v-icon>
        <span>{{ $t('message.signout') }}</span>
      </v-card-title>
      <v-card-text>{{ $t('message.doURlyWant2SignOut') }}</v-card-text>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-btn primary dark flat="flat" @click.native="setSignoutDialogToggle(false)">{{ $t('message.cancel') }}</v-btn>
        <v-btn primary dark @click.native="signoutConfirmed()">{{ $t('message.signout') }}</v-btn>
      </v-card-title>
      <v-progress-linear v-show="loading" v-bind:indeterminate="true" class="ma-0"></v-progress-linear>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex';

  export default {
    name: 'signOutDialog',
    data() {
      return {
        loading: false,
      };
    },
    computed: {
      ...mapState({
        signoutDialogToggle: 'signoutDialogToggle',
        loadingPage: 'loadingPage',
      }),
    },
    methods: {
      ...mapActions([
        'signout',
      ]),
      ...mapMutations([
        'setSignoutDialogToggle',
        'setLoadingPage',
      ]),
      signoutConfirmed() {
        this.loading = true;
        this.setLoadingPage(1);
        return this.signout()
          .then(() => {
            this.loading = false;
            this.setLoadingPage(-1);
            this.setSignoutDialogToggle(false);
            this.$router.push({ name: 'signin' });
          });
      },
    },
  };
</script>

<style scoped>
  .dialog__container {
    display: initial;
  }
</style>