<template>
  <v-dialog 
    :value="value" 
    :fullscreen="isXS || isSM" 
    persistent 
    :width="isXL ? 640 : 480">
    <v-card>
      <form @submit.prevent="formValidate(addDiscussionMessageForm.scope)">
        <v-card-row>
          <v-card-title>
            <v-icon class="primary--text mr-2">add</v-icon>
            <span>{{ $t('message.addMessage') }}</span>
          </v-card-title>
        </v-card-row>
        <v-alert error :value="error" class="ma-3">{{ error }}</v-alert>
        <v-card-row>
          <v-card-text>
              <v-card-text class="text-xs-right">
                <v-text-field 
                  :light="dark"
                  multi-line
                  v-model="addDiscussionMessageForm.fields.message" 
                  data-vv-name="message"
                  :data-vv-scope="addDiscussionMessageForm.scope"
                  name="message"
                  :label="$tc('message.message', 1)" 
                  :hint="$t('message.fieldRequired')"
                  :placeholder="$tc('message.message', 1)" 
                  prepend-icon="create" 
                  :rules="addDiscussionMessageForm.rules.message" 
                  v-validate="'required'"></v-text-field>
              </v-card-text>
          </v-card-text>
        </v-card-row>
        <v-card-row actions class="pa-3">
          <v-btn primary light flat="flat" @click.native="$emit('input', false)">{{ $t('message.cancel') }}</v-btn>
          <v-btn primary light type="submit">{{ $t("message.add") }}</v-btn>
        </v-card-row>
      </form>
      <v-progress-linear v-show="loading" :indeterminate="true" class="ma-0"></v-progress-linear>
    </v-card>
  </v-dialog>
</template>

<script>
  import screenSizes from '@/mixins/screenSizes';
  import { mapState, mapActions, mapMutations } from 'vuex';

  export default {
    mixins: [screenSizes],
    name: 'addDiscussionMessageDialog',
    props: ['discussionId', 'value'],
    data() {
      return {
        error: '',
        loading: false,
        addDiscussionMessageForm: {
          scope: 'addDiscussionMessage',
          fields: {
            message: '',
          },
          rules: {
            message: [],
          },
          valide: false,
        },
      };
    },
    computed: {
      ...mapState({
        dark: 'dark',
        self: 'self',
        discussion: 'discussion',
        loadingPage: 'loadingPage',
      }),
    },
    watch: {
      vErrors: {
        /**
         * On vee-validate vError chaged, 
         * apply error messages text fields rules.
         * @return {void}
         */
        // validator.getErrors()
        handler() {
          const form = this.addDiscussionMessageForm;
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
        'addDiscussionMessage',
      ]),
      ...mapMutations([
        'setLoadingPage',
        'setPost',
      ]),
      formValidate() {
        this.$validator.validateAll(this.addDiscussionMessageForm.scope)
          .then((validation) => {
            if (!validation) {
              const errors = this.vErrors.all(this.addDiscussionMessageForm.scope);
              if (errors.length) {
                const message = this.$tc('message.error', errors.length > 1 ? 0 : 1);
                this.error = `${errors.length} ${message}`;
              }
              return false;
            }

            this.loading = true;
            const fields = this.addDiscussionMessageForm.fields;

            return this.addDiscussionMessage({ discussionId: this.discussionId, message: fields })
              .then(() => {
                this.loading = false;
                this.$emit('input', false);
                this.$emit('messageAdded', fields.message);
                this.$store.dispatch('getDiscussion', this.discussionId);

                this.addDiscussionMessageForm.fields = {
                  message: '',
                };
                // this.$validator.clean();
                // this.vErrors.clear();
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

<style scoped>
</style>