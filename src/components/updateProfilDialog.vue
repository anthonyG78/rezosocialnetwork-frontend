<template>
  <v-dialog 
    :value="value" 
    :fullscreen="isXS || isSM" 
    persistent 
    :width="isXL ? 640 : 480">
    <v-card>
      <form @submit.prevent="formValidate(updateProfilForm.scope)">
        <v-card-title>
          <v-icon class="primary--text mr-2">{{ 'create' }}</v-icon>
          <span>{{ $t('message.updateProfil') }}</span>
        </v-card-title>
        <v-alert error :value="error" class="ma-3">{{ error }}</v-alert>
        <v-card-text class="text-xs-right">
          <v-text-field 
            v-model="updateProfilForm.fields.username" 
            data-vv-name="username"
            :data-vv-scope="updateProfilForm.scope"
            name="username"
            :label="$t('message.username')" 
            :hint="$t('message.fieldRequired')"
            :placeholder="$t('message.username')" 
            prepend-icon="account_circle" 
            :rules="updateProfilForm.rules.username" 
            ></v-text-field>
          <v-text-field 
            v-model="updateProfilForm.fields.firstName" 
            data-vv-name="firstName"
            :data-vv-scope="updateProfilForm.scope"
            name="firstName"
            :label="$t('message.firstName')" 
            :hint="$t('message.fieldRequired')"
            :placeholder="$t('message.firstName')" 
            prepend-icon="account_circle" 
            :rules="updateProfilForm.rules.firstName" 
            v-validate="'alpha'"></v-text-field>
          <v-text-field 
            v-model="updateProfilForm.fields.lastName" 
            data-vv-name="lastName"
            :data-vv-scope="updateProfilForm.scope"
            name="lastName"
            :label="$t('message.lastName')" 
            :hint="$t('message.fieldRequired')"
            :placeholder="$t('message.lastName')" 
            prepend-icon="account_circle" 
            :rules="updateProfilForm.rules.lastName" 
            v-validate="'alpha'"></v-text-field>
          <v-text-field 
            v-model="updateProfilForm.fields.email" 
            data-vv-name="email"
            :data-vv-scope="updateProfilForm.scope"
            name="email"
            :label="$t('message.email')" 
            :hint="$t('message.fieldRequired')"
            :placeholder="$t('message.email')" 
            prepend-icon="mail" 
            :rules="updateProfilForm.rules.email" 
            v-validate="'email'"
            type="email"></v-text-field>
          <v-text-field 
            v-model="updateProfilForm.fields.password" 
            data-vv-name="password"
            :data-vv-scope="updateProfilForm.scope"
            name="password"
            :label="$t('message.password')"
            :placeholder="$t('message.password')" 
            prepend-icon="lock" 
            :rules="updateProfilForm.rules.password" 
            type="password"></v-text-field>
          <v-text-field 
            v-model="updateProfilForm.fields.avatar" 
            data-vv-name="avatar"
            :data-vv-scope="updateProfilForm.scope"
            name="avatar"
            :label="$t('message.avatar')" 
            :placeholder="$t('message.avatar')" 
            prepend-icon="link" 
            :rules="updateProfilForm.rules.avatar" 
            v-validate="'url'"
            type="text"></v-text-field>
          <!-- <v-text-field 
            v-model="updateProfilForm.fields.background" 
            data-vv-name="background"
            :data-vv-scope="updateProfilForm.scope"
            name="background"
            :label="$t('message.background')" 
            :placeholder="$t('message.background')" 
            prepend-icon="link" 
            :rules="updateProfilForm.rules.background" 
            v-validate="'url'"
            type="text"></v-text-field> -->
        </v-card-text>
        <v-card-title actions class="pa-3">
          <v-btn primary dark flat @click.native="$emit('input', false)">{{ $t('message.cancel') }}</v-btn>
          <v-btn primary dark type="submit">{{ $t("message.update") }}</v-btn>
        </v-card-title>
      </form>
      <v-progress-linear v-show="loading" :indeterminate="true" class="ma-0"></v-progress-linear>
    </v-card>
  </v-dialog>
</template>

<script>
  import screenSizes from '@/mixins/screenSizes';
  import { mapState, mapActions } from 'vuex';

  export default {
    mixins: [screenSizes],
    name: 'updateProfilDialog',
    props: ['user', 'value'],
    data() {
      return {
        error: '',
        loading: false,
        updateProfilForm: {
          // action: 'formValidate',
          scope: 'updateProfil',
          fields: {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            avatar: '',
            // background: '',
          },
          rules: {
            username: [],
            firstName: [],
            lastName: [],
            email: [],
            password: [],
            avatar: [],
            // background: [],
          },
          valide: false,
        },
      };
    },
    computed: {
      ...mapState({
        dark: 'dark',
      }),
    },
    mounted() {
      this.mergeUserField();
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
          const form = this.updateProfilForm;
          Object.keys(form.rules).forEach((key) => {
            const scopedKey = `${form.scope}.${key}`;
            form.rules[key] = [
              () => (this.vErrors.has(scopedKey) ? this.vErrors.first(scopedKey) : true),
            ];
          });
        },
        deep: true,
      },
      user() {
        this.mergeUserField();
      },
    },
    methods: {
      ...mapActions([
        'updateProfil',
      ]),
      // ...mapMutations([
      //   // mutations
      // ]),
      mergeUserField() {
        const formFields = this.updateProfilForm.fields;
        Object.keys(this.user).forEach((field) => {
          if (field in formFields) {
            formFields[field] = this.user[field];
          }
        });
      },
      formValidate() {
        this.$validator.validateAll(this.updateProfilForm.scope)
          .then((validation) => {
            if (!validation) {
              const errors = this.vErrors.all(this.updateProfilForm.scope);
              if (errors.length) {
                const message = this.$tc('message.error', errors.length > 1 ? 0 : 1);
                this.error = `${errors.length} ${message}`;
              }
              return false;
            }

            this.loading = true;
            return this.updateProfil({ id: this.user._id, profil: this.updateProfilForm.fields })
              .then(() => {
                this.loading = false;
                this.$emit('input', false);
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
</style>