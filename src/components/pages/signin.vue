<template>
  <v-container fluid class="page-container">
    <v-layout row wrap :style="{ 'background-image': 'url('+materialBg+')', 'background-size': 'cover' }">
      <v-flex xs10 sm8 md6 lg4 offset-xs1 offset-sm2 offset-md3 offset-lg4 class="signin pa-4">
        <div class="logo mb-4 text-xs-center">
          <h1 class="white--text logo">
            <v-icon dark>bubble_chart</v-icon>
            <span>REZO</span>
          </h1>
        </div>
        <v-card class="elevation-10 mb-4" white>
          <v-card-title primary-title>
            <h5 class="primary--text">{{ $t("message.youMustSignInToContinue") }}</h5>
          </v-card-title>
          <v-card-text>
            <v-alert error :value="error">{{ error }}</v-alert>
          </v-card-text>
          <v-tabs grow dark>
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
                    v-model="forms.signin.fields.email" 
                    data-vv-name="email"
                    :data-vv-scope="forms.signin.scope"
                    name="email"
                    :label="$t('message.email')" 
                    :hint="$t('message.fieldRequired')"
                    :placeholder="$t('message.email')" 
                    prepend-icon="account_circle" 
                    :rules="forms.signin.rules.email" 
                    v-validate="'required|email'"
                    type="email">></v-text-field>
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
                    <v-btn secondary dark type="submit">{{ $t("message." + forms.signin.submitName) }}</v-btn>
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
                    light
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
                    <v-date-picker 
                      v-model="datepickerAge" 
                      scrollable 
                      :landscape="isLandscape" 
                      :locale="$i18n.locale"
                      :allowed-dates="allowedDates"
                      :date-format="dateFormat">
                      <template scope="{ save, cancel }">
                        <v-card-actions>
                          <v-btn flat primary @click.native="dialogDatePicker = false">{{ $t('message.valid') }}</v-btn>
                        </v-card-actions>
                      </template>
                    </v-date-picker>
                  </v-dialog>
                  <v-btn secondary dark type="submit">{{ $t("message." + forms.register.submitName) }}</v-btn>
                </v-card-text>
              </form>
            </v-tabs-content>
          </v-tabs>
          <v-progress-linear v-show="loading" v-bind:indeterminate="true" class="ma-0" secondary></v-progress-linear>
        </v-card>
        <div class="text-xs-center">
          <router-link to="/" class="white--text">{{ $t("message.forgottenPassword") }}</router-link> | 
          <router-link :to="{ name: 'about' }" class="white--text">{{ $t("message.about") }}</router-link>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment';
import { mapActions, mapMutations } from 'vuex';
import screenSizes from '@/mixins/screenSizes';

export default {
  mixins: [screenSizes],
  name: 'signin',
  data() {
    return {
      allowedDates: {
        min: null,
        max: null,
      },
      datepickerAge: null,
      dialogDatePicker: false,
      tabId: 'mobile-tabs',
      forms: {
        signin: {
          action: 'signin',
          scope: 'signin',
          submitName: 'signin',
          fields: {
            email: '',
            password: '',
          },
          rules: {
            email: [],
            password: [],
          },
          valide: false,
        },
        register: {
          action: 'register',
          scope: 'register',
          submitName: 'register',
          fields: {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            genders: [
              { text: this.$t('message.mal'), value: 'mal' },
              { text: this.$t('message.femal'), value: 'femal' },
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
    // Datepicker Age
    const now = new Date();
    const d = new Date();
    d.setFullYear(now.getFullYear() - 18);
    this.allowedDates.max = d;
    this.datepickerAge = moment(d);
    // Background
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
            const form = scope === 'register' ?
              Object.assign(currentForm.fields, { age: this.datepickerAge }) :
              currentForm.fields;
            return this[currentForm.action](form)
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
    dateFormat(value) {
      this.forms.register.fields.age = moment(value).format('LL');
    },
  },
};
</script>

<style lang="stylus" scoped>
  .container
    padding: 0;

  .layout 
    min-height: 100vmax;
</style>
