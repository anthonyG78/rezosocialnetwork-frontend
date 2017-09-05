<template>
  <v-dialog 
    :value="addPostDialogToggle" 
    :fullscreen="isXS || isSM" 
    persistent 
    :width="isXL ? 640 : 480"
    @input="value => setAddPostDialogToggle(value)">
    <v-card>
      <form @submit.prevent="formValidate(addPostForm.scope)">
        <v-card-title>
          <v-icon class="primary--text mr-2">{{ id ? 'create' : 'add' }}</v-icon>
          <span>{{ id ? $t('message.updatePost') : $t('message.addPost') }}</span>
        </v-card-title>
        <v-alert error :value="error" class="ma-3">{{ error }}</v-alert>
        <v-card-text class="text-xs-right">
          <v-text-field 
            :light="dark"
            v-model="addPostForm.fields.title" 
            data-vv-name="title"
            :data-vv-scope="addPostForm.scope"
            name="title"
            :label="$t('message.title')" 
            :hint="$t('message.fieldRequired')"
            :placeholder="$t('message.title')" 
            prepend-icon="create" 
            :rules="addPostForm.rules.title" 
            v-validate="'required'"></v-text-field>
          <v-text-field 
            :light="dark"
            multi-line
            v-model="addPostForm.fields.text" 
            data-vv-name="text"
            :data-vv-scope="addPostForm.scope"
            name="text"
            :label="$t('message.text')" 
            :hint="$t('message.fieldRequired')"
            :placeholder="$t('message.text')" 
            prepend-icon="create" 
            :rules="addPostForm.rules.text" 
            v-validate="'required'"></v-text-field>
          <v-text-field 
            :light="dark"
            v-model="addPostForm.fields.image" 
            data-vv-name="image"
            :data-vv-scope="addPostForm.scope"
            name="image"
            :label="$t('message.image')"
            :placeholder="$t('message.image')" 
            prepend-icon="insert_link" 
            :rules="addPostForm.rules.image" 
            v-validate="'url'"
            type="text"></v-text-field>
          <div class="img-preview">
            <img v-if="(/\.(gif|jpg|jpeg|tiff|png)$/i).test(addPostForm.fields.image)" :src="addPostForm.fields.image" />
          </div>
        </v-card-text>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn primary dark flat="flat" @click.native="setAddPostDialogToggle(false)">{{ $t('message.cancel') }}</v-btn>
          <v-btn primary dark type="submit">{{ $t("message." + (id ? 'update' : 'add')) }}</v-btn>
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
    name: 'addPostDialog',
    props: ['id'],
    data() {
      return {
        error: '',
        loading: false,
        addPostForm: {
          action: 'addPostConfirm',
          scope: 'addPost',
          fields: {
            title: '',
            text: '',
            image: '',
            toUserId: null,
          },
          rules: {
            title: [],
            text: [],
            image: [],
            toUserId: [],
          },
          valide: false,
        },
      };
    },
    computed: {
      ...mapState({
        dark: 'dark',
        self: 'self',
        user: 'user',
        post: 'post',
        addPostDialogToggle: 'addPostDialogToggle',
        loadingPage: 'loadingPage',
      }),
    },
    mounted() {
      if (this.id) {
        this.addPostForm.fields = Object.assign({}, this.post);
      }
    },
    watch: {
      id() {
        this.addPostForm.fields = Object.assign({}, this.post);
      },
      vErrors: {
        /**
         * On vee-validate vError chaged, 
         * apply error messages text fields rules.
         * @return {void}
         */
        // validator.getErrors()
        handler() {
          const form = this.addPostForm;
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
        'addPost',
        'updatePost',
        'getPost',
      ]),
      ...mapMutations([
        'setAddPostDialogToggle',
        'setLoadingPage',
        'setPost',
      ]),
      formValidate() {
        this.$validator.validateAll(this.addPostForm.scope)
          .then((validation) => {
            if (!validation) {
              const errors = this.vErrors.all(this.addPostForm.scope);
              if (errors.length) {
                const message = this.$tc('message.error', errors.length > 1 ? 0 : 1);
                this.error = `${errors.length} ${message}`;
              }
              return false;
            }

            this.loading = true;
            const fields = this.addPostForm.fields;
            fields.toUserId = this.$route.params.userId ? this.user._id : this.self._id;

            return this[this.id ? 'updatePost' : 'addPost'](fields)
              .then((post) => {
                this.loading = false;
                this.setAddPostDialogToggle(false);

                if (this.id) {
                  this.$store.commit('setPost', this.addPostForm.fields);
                } else {
                  this.$router.push({ name: 'post', params: { id: post._id } });
                }
              })
              .catch((err) => {
                this.loading = false;
                this.error = err.response.data;
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