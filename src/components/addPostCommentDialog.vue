<template>
  <v-dialog 
    :value="addPostCommentDialogToggle" 
    :fullscreen="isXS || isSM" 
    persistent 
    :width="isXL ? 640 : 480"
    @input="value => setAddPostCommentDialogToggle(value)">
    <v-card>
      <form @submit.prevent="formValidate(addPostCommentForm.scope)">
        <v-card-title>
          <v-icon class="primary--text mr-2">add</v-icon>
          <span>{{ $t('message.addComment') }}</span>
        </v-card-title>
        <v-alert error :value="error" class="ma-3">{{ error }}</v-alert>
        <v-card-text class="text-xs-right">
          <v-text-field 
            :light="dark"
            multi-line
            v-model="addPostCommentForm.fields.comment" 
            data-vv-name="comment"
            :data-vv-scope="addPostCommentForm.scope"
            name="comment"
            :label="$tc('message.comment', 1)" 
            :hint="$t('message.fieldRequired')"
            :placeholder="$tc('message.comment', 1)" 
            prepend-icon="create" 
            :rules="addPostCommentForm.rules.comment" 
            v-validate="'required'"></v-text-field>
        </v-card-text>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn primary dark flat="flat" @click.native="setAddPostCommentDialogToggle(false)">{{ $t('message.cancel') }}</v-btn>
          <v-btn primary dark type="submit">{{ $t("message.add") }}</v-btn>
        </v-card-title>
      </form>
      <v-progress-linear v-show="loading" v-bind:indeterminate="true" class="ma-0"></v-progress-linear>
    </v-card>
  </v-dialog>
</template>

<script>
  import screenSizes from '@/mixins/screenSizes';
  import { mapState, mapActions, mapMutations } from 'vuex';

  export default {
    mixins: [screenSizes],
    name: 'addPostCommentDialog',
    props: ['postId'],
    data() {
      return {
        error: '',
        loading: false,
        addPostCommentForm: {
          // action: 'addPostConfirm',
          scope: 'addPostComment',
          fields: {
            comment: '',
          },
          rules: {
            comment: [],
          },
          valide: false,
        },
      };
    },
    computed: {
      ...mapState({
        dark: 'dark',
        self: 'self',
        post: 'post',
        addPostCommentDialogToggle: 'addPostCommentDialogToggle',
        loadingPage: 'loadingPage',
      }),
    },
    // mounted() {
    //   if (this.id) {
    //     this.addPostCommentForm.fields = Object.assign({}, this.post);
    //   }
    // },
    watch: {
      // id() {
      //   this.addPostCommentForm.fields = Object.assign({}, this.post);
      // },
      vErrors: {
        /**
         * On vee-validate vError chaged, 
         * apply error messages text fields rules.
         * @return {void}
         */
        // validator.getErrors()
        handler() {
          const form = this.addPostCommentForm;
          Object.keys(form.rules).forEach((key) => {
            const scopedKey = `${form.scope}.${key}`;
            form.rules[key] = [
              () => (this.vErrors.has(scopedKey) ? this.vErrors.first(scopedKey) : true),
            ];
          });
        },
        deep: true,
      },
    },
    methods: {
      ...mapActions([
        'getPost',
        'addPostComment',
      ]),
      ...mapMutations([
        'setAddPostCommentDialogToggle',
        'setLoadingPage',
        'setPost',
      ]),
      formValidate() {
        this.$validator.validateAll(this.addPostCommentForm.scope)
          .then((validation) => {
            if (!validation) {
              const errors = this.vErrors.all(this.addPostCommentForm.scope);
              if (errors.length) {
                const message = this.$tc('message.error', errors.length > 1 ? 0 : 1);
                this.error = `${errors.length} ${message}`;
              }
              return false;
            }

            this.loading = true;
            const fields = this.addPostCommentForm.fields;

            return this.addPostComment({ postId: this.postId, comment: fields })
              .then(() => {
                this.loading = false;
                this.setAddPostCommentDialogToggle(false);

                // console.log(this.post, post);
                this.$store.dispatch('getPost', this.postId);
                // this.$store.commit('setPost', Object.assign({}, this.post, post));
              })
              .catch((err) => {
                this.loading = false;
                this.error = err.response.data;
                setTimeout(() => { this.error = ''; }, 3000);
              });
          });
      },
    },
  };
</script>

<style lang="stylus" scoped>
  /*.dialog__container {
    display: initial;
  }*/
  .img-preview {
    text-align: center;

    img {
      width: 50%;

    }
  }
</style>