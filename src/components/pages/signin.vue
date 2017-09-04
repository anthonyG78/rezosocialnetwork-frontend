<template>
  <v-container fluid class="page-container">
    <v-layout row wrap :style="{ 'background-image': 'url('+materialBg+')' }">
      <v-flex xs10 sm8 md6 lg4 offset-xs1 offset-sm2 offset-md3 offset-lg4 class="signin text-xs-center pa-4">
        <div class="logo mb-4">
          <h1 class="white--text logo">
            <v-icon light>bubble_chart</v-icon>
            <span>REZO</span>
          </h1>
        </div>
        <v-card class="elevation-10 mb-4" white>
          <v-card-title primary-title class="primary--text">{{ $t("message.youMustSignInToContinue") }}</v-card-title>
          <v-alert error :value="error" class="ma-3">{{ error }}</v-alert>
          <v-tabs grow light>
            <v-tabs-bar slot="activators">
              <v-tabs-slider></v-tabs-slider>
              <v-tabs-item href="#signin-tab">
                {{ $t('message.signin') }}
              </v-tabs-item>
              <v-tabs-item href="#register-tab">
                {{ $t('message.register') }}
              </v-tabs-item>
            </v-tabs-bar>
            <v-tabs-content id="signin-tab">
              <form @submit.prevent="formValidate(forms.signin.scope)">
                <v-card-text class="text-xs-right">
                  <v-text-field 
                    v-model="forms.signin.fields.username" 
                    data-vv-name="username"
                    :data-vv-scope="forms.signin.scope"
                    name="username"
                    :label="$t('message.username')" 
                    :hint="$t('message.fieldRequired')"
                    :placeholder="$t('message.username')" 
                    prepend-icon="account_circle" 
                    :rules="forms.signin.rules.username" 
                    v-validate="'required'"></v-text-field>
                  <v-text-field 
                    v-model="forms.signin.fields.password" 
                    data-vv-name="password"
                    :data-vv-scope="forms.signin.scope"
                    name="password"
                    :label="$t('message.password')"
                    :hint="$t('message.fieldRequired')"
                    :placeholder="$t('message.password')" 
                    prepend-icon="lock" 
                    :rules="forms.signin.rules.password" 
                    v-validate="'required'"
                    type="password"></v-text-field>
                    <v-btn secondary light type="submit">{{ $t("message." + forms.signin.submitName) }}</v-btn>
                </v-card-text>
              </form>
            </v-tabs-content>
            <v-tabs-content id="register-tab">
              <form @submit.prevent="formValidate(forms.register.scope)">
                <v-card-text class="text-xs-right">
                  <v-text-field 
                    v-model="forms.register.fields.username" 
                    data-vv-name="username"
                    :data-vv-scope="forms.register.scope"
                    name="username"
                    :label="$t('message.username')" 
                    :hint="$t('message.fieldRequired')"
                    :placeholder="$t('message.username')" 
                    prepend-icon="account_circle" 
                    :rules="forms.register.rules.username" 
                    v-validate="'required'"></v-text-field>
                  <v-text-field 
                    v-model="forms.register.fields.firstName" 
                    data-vv-name="firstName"
                    :data-vv-scope="forms.register.scope"
                    name="firstName"
                    :label="$t('message.firstName')" 
                    :hint="$t('message.fieldRequired')"
                    :placeholder="$t('message.firstName')" 
                    prepend-icon="account_circle" 
                    :rules="forms.register.rules.firstName" 
                    v-validate="'required|alpha'"></v-text-field>
                  <v-text-field 
                    v-model="forms.register.fields.lastName" 
                    data-vv-name="lastName"
                    :data-vv-scope="forms.register.scope"
                    name="lastName"
                    :label="$t('message.lastName')" 
                    :hint="$t('message.fieldRequired')"
                    :placeholder="$t('message.lastName')" 
                    prepend-icon="account_circle" 
                    :rules="forms.register.rules.lastName" 
                    v-validate="'required|alpha'"></v-text-field>
                  <v-text-field 
                    v-model="forms.register.fields.email" 
                    data-vv-name="email"
                    :data-vv-scope="forms.register.scope"
                    name="email"
                    :label="$t('message.email')" 
                    :hint="$t('message.fieldRequired')"
                    :placeholder="$t('message.email')" 
                    prepend-icon="mail" 
                    :rules="forms.register.rules.email" 
                    v-validate="'required|email'"
                    type="email"></v-text-field>
                  <v-text-field 
                    v-model="forms.register.fields.password" 
                    data-vv-name="password"
                    :data-vv-scope="forms.register.scope"
                    name="password"
                    :label="$t('message.password')"
                    :hint="$t('message.fieldRequired')"
                    :placeholder="$t('message.password')" 
                    prepend-icon="lock" 
                    :rules="forms.register.rules.password" 
                    v-validate="'required'"
                    type="password"></v-text-field>
                  <v-select
                    :items="forms.register.fields.genders"
                    item-value="value"
                    item-text="text"
                    v-model="forms.register.fields.gender"
                    :label="$t('message.gender')"
                    v-validate="'required'"
                    data-vv-name="gender"
                    :data-vv-scope="forms.register.scope"
                    :hint="$t('message.fieldRequired')"
                    :rules="forms.register.rules.gender" 
                    prepend-icon="wc"
                    dark
                    single-line
                    auto
                  ></v-select>
                  <v-dialog persistent v-model="dialogDatePicker" lazy width="auto" style="width:100%">
                    <v-text-field
                      slot="activator"
                      v-model="forms.register.fields.age"
                      :label="$t('message.age')"
                      v-validate="'required'"
                      data-vv-name="age"
                      :data-vv-scope="forms.register.scope"
                      :hint="$t('message.fieldRequired')"
                      :rules="forms.register.rules.age" 
                      prepend-icon="cake"
                      readonly
                    ></v-text-field>
                    <v-date-picker v-model="forms.register.fields.age" scrollable :landscape="isLandscape">
                      <template scope="{ save, cancel }">
                        <v-card-row actions>
                          <v-btn flat primary @click.native="dialogDatePicker = false">{{ $t('message.cancel') }}</v-btn>
                        </v-card-row>
                      </template>
                    </v-date-picker>
                  </v-dialog>
                  <v-btn secondary light type="submit">{{ $t("message." + forms.register.submitName) }}</v-btn>
                </v-card-text>
              </form>
            </v-tabs-content>
          </v-tabs>
          <v-progress-linear v-show="loading" v-bind:indeterminate="true" class="ma-0" secondary></v-progress-linear>
        </v-card>
        <a href="/" class="white--text">{{ $t("message.forgottenPassword") }}</a>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import screenSizes from '@/mixins/screenSizes';

export default {
  mixins: [screenSizes],
  name: 'signin',
  data() {
    return {
      dialogDatePicker: false,
      tabId: 'mobile-tabs',
      forms: {
        signin: {
          action: 'signin',
          scope: 'signin',
          submitName: 'signin',
          fields: {
            username: 'toto',
            password: '123',
          },
          rules: {
            username: [],
            password: [],
          },
          valide: false,
        },
        register: {
          action: 'register',
          scope: 'register',
          submitName: 'register',
          fields: {
            username: 'Doudou28',
            firstName: 'Lulu',
            lastName: 'Malin',
            email: 'lulu@mail.com',
            password: '123',
            genders: [
              { text: this.$t('message.mal'), value: 'homme' },
              { text: this.$t('message.femal'), value: 'femme' },
            ],
            gender: '',
            age: '',
          },
          rules: {
            username: [],
            firstName: [],
            lastName: [],
            email: [],
            password: [],
            gender: [],
            age: [],
          },
          valide: false,
        },
      },
      error: '',
      loading: false,
      materialBg: '',
    };
  },
  mounted() {
    const randomized = Math.floor(Math.random() * 27) + 1;
    this.materialBg = `./static/background/material-bg-${randomized}.svg`;
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
        Object.keys(this.forms).forEach((key) => {
          const form = this.forms[key];
          Object.keys(form.rules).forEach((key2) => {
            const scopedKey = `${form.scope}.${key2}`;
            form.rules[key2] = [
              () => (this.vErrors.has(scopedKey) ? this.vErrors.first(scopedKey) : true),
            ];
          });
        });
      },
      deep: true,
    },
  },
  // computed: {
  //   ...mapState({
  //     // loadingPage: 'loadingPage',
  //   }),
  // },
  methods: {
    ...mapActions([
      'signin',
      'register',
    ]),
    ...mapMutations([
      // 'setLoadingPage',
    ]),
    /**
     * Launch vee-validate form validator.
     * If validation is ok, call the signin api method.
     * @return {void}
     */
    formValidate(scope) {
      this.error = '';
      return this.$validator.validateAll(scope)
        .then((validation) => {
          if (validation) {
            const currentForm = this.forms[scope];
            this.loading = true;
            return this[currentForm.action](currentForm.fields)
              .then(() => {
                this.loading = false;
                this.$router.push('/');
              });
          }
          const errors = this.vErrors.all(scope);
          if (errors.length) {
            const message = this.$tc('message.error', errors.length ? 0 : 1);
            this.error = `${errors.length} ${message}`;
          }
          return false;
        })
        .catch((err) => {
          this.loading = false;
          this.error = err.response.data;
        });
    },
  },
};
</script>

<style lang="stylus">
  @import '../../style/theme'

  /*.application
    &.signin-view
      background: $theme.primary !important;
      @media (max-width: 780px) and (orientation: landscape)
        height: initial !important;*/
</style>
<style lang="stylus" scoped>
  .container
    padding: 0;

  .layout 
    min-height: 100vmax;

  .logo
    .icon
      font-size: inherit;
      vertical-align: bottom;

  /*@import '../../style/theme'

  .layout
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    background-size: cover;
    background-position: center;

  .signin
    height: 100%;

  @media (max-width: 780px) and (orientation: landscape)
    .page-container
      padding: 0;
    .layout
      position: initial;

  .logo
    .icon
      font-size: inherit;
      vertical-align: bottom;*/
</style>
