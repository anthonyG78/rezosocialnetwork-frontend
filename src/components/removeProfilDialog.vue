<template>
  <v-dialog :value="deleteProfilDialogToggle" persistent :width="480">
    <v-card>
      <v-card-title>
        <v-icon class="primary--text mr-2">delete</v-icon>
        <span>{{ $t('message.deleteProfil') }}</span>
      </v-card-title>
      <v-alert error :value="error" class="ma-3">{{ error }}</v-alert>
      <v-card-text>{{ $t('message.doURealyWantDeleteProfil') }}</v-card-text>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-btn class="primary--text" flat @click.native="setDeleteProfilDialogToggle(false)">{{ $t('message.cancel') }}</v-btn>
        <v-btn class="" primary dark @click.native="deleteDialogHandler">{{ $t('message.valid') }}</v-btn>
      </v-card-title>
      <v-progress-linear v-show="loading" v-bind:indeterminate="true" class="ma-0"></v-progress-linear>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex';

  export default {
    name: 'removeProfilDialog',
    data() {
      return {
        loading: false,
        error: '',
      };
    },
    computed: {
      ...mapState({
        deleteProfilDialogToggle: 'deleteProfilDialogToggle',
        loadingPage: 'loadingPage',
      }),
    },
    methods: {
      ...mapActions([
        'deleteProfil',
      ]),
      ...mapMutations([
        'setDeleteProfilDialogToggle',
        'setLoadingPage',
      ]),
      deleteDialogHandler() {
        this.setLoadingPage(1);
        return this.deleteProfil(this.$route.params.userId)
          .then(() => {
            this.setDeleteProfilDialogToggle(false);
            this.$store.commit('removeToken');
            this.$store.commit('setSelf', null);
            this.setLoadingPage(0);
            this.$router.push({ name: 'signin' });
          })
          .catch((err) => {
            this.setLoadingPage(0);
            this.error = err.response.data;
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