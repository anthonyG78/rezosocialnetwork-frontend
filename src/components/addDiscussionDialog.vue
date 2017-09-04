<template>
  <v-dialog 
    :value="addDiscussionDialogToggle" 
    :fullscreen="isXS || isSM" 
    persistent 
    :width="isXL ? 640 : 480">
    <v-card>
      <form @submit.prevent="formValidate(addDiscussionForm.scope)">
        <v-card-row>
          <v-card-title>
            <v-icon class="primary--text mr-2">add</v-icon>
            <span>{{ $t('message.addDiscussion') }}</span>
          </v-card-title>
        </v-card-row>
        <v-alert error :value="error" class="ma-3">{{ error }}</v-alert>
        <v-card-row>
            <v-card-text class="text-xs-right">
              <v-select
                :label="$t('message.friends')"
                v-bind:items="friends"
                v-model="addDiscussionForm.fields.usersId"
                item-text="username"
                item-value="_id"
                prepend-icon="people"
                multiple
                chips
                dark
                max-height="auto"
                autocomplete
                data-vv-name="friends"
                :data-vv-scope="addDiscussionForm.scope"
                :rules="addDiscussionForm.rules.usersId" 
                v-validate="'required'"
              >
                <template slot="selection" scope="data">
                  <v-chip
                    close
                    @input="data.parent.selectItem(data.item)"
                    @click.native.stop
                    class="chip--select-multi"
                    :key="data.item._id"
                  >
                    <v-avatar>
                      <img :src="data.item.avatar">
                    </v-avatar>
                    {{ data.item.username }}
                  </v-chip>
                </template>
                <template slot="item" scope="data">
                  <v-list-tile-avatar>
                    <img v-bind:src="data.item.avatar"/>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.username"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="data.item.firstName + ' ' + data.item.lastName"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
              </v-select>
              <v-text-field 
                :light="dark"
                v-model="addDiscussionForm.fields.subject" 
                data-vv-name="subject"
                :data-vv-scope="addDiscussionForm.scope"
                name="subject"
                :label="$tc('message.subject', 1)" 
                :hint="$t('message.fieldRequired')"
                :placeholder="$tc('message.subject', 1)" 
                prepend-icon="create" 
                :rules="addDiscussionForm.rules.subject" 
                v-validate="'required'"></v-text-field>
              <v-text-field 
                :light="dark"
                multi-line
                v-model="addDiscussionForm.fields.message" 
                data-vv-name="message"
                :data-vv-scope="addDiscussionForm.scope"
                name="message"
                :label="$tc('message.message', 1)" 
                :hint="$t('message.fieldRequired')"
                :placeholder="$tc('message.message', 1)" 
                prepend-icon="create" 
                :rules="addDiscussionForm.rules.message" 
                v-validate="'required'"></v-text-field>
            </v-card-text>
        </v-card-row>
        <v-card-row actions class="pa-3">
          <v-btn primary light flat="flat" @click.native="setAddDiscussionDialogToggle(false)">{{ $t('message.cancel') }}</v-btn>
          <v-btn primary light type="submit">{{ $t("message.add") }}</v-btn>
        </v-card-row>
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
    name: 'addDiscussionDialog',
    props: ['selectedUsersId'],
    data() {
      return {
        error: '',
        loading: false,
        // selectedFriends: [],
        addDiscussionForm: {
          scope: 'addDiscussion',
          fields: {
            usersId: [],
            subject: '',
            message: '',
          },
          rules: {
            usersId: [],
            subject: [],
            message: [],
          },
          valide: false,
        },
      };
    },
    mounted() {
      this.checkSelectedUserId();
      this.getFriends();
    },
    computed: {
      ...mapState({
        dark: 'dark',
        self: 'self',
        friends: 'friends',
        addDiscussionDialogToggle: 'addDiscussionDialogToggle',
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
          const form = this.addDiscussionForm;
          Object.keys(form.rules).forEach((key) => {
            const scopedKey = `${form.scope}.${key}`;
            form.rules[key] = [
              () => (this.vErrors.has(scopedKey) ? this.vErrors.first(scopedKey) : true),
            ];
          });
        },
        deep: true,
      },
      selectedUsersId: function selectedUsersId() { this.checkSelectedUserId(); },
    },
    methods: {
      ...mapActions([
        'getFriends',
        'addDiscussion',
      ]),
      ...mapMutations([
        'setAddDiscussionDialogToggle',
        'setLoadingPage',
      ]),
      formValidate() {
        this.$validator.validateAll(this.addDiscussionForm.scope)
          .then((validation) => {
            if (!validation) {
              const errors = this.vErrors.all(this.addDiscussionForm.scope);
              if (errors.length) {
                const message = this.$tc('message.error', errors.length > 1 ? 0 : 1);
                this.error = `${errors.length} ${message}`;
              }
              return false;
            }

            this.loading = true;
            const fields = this.addDiscussionForm.fields;

            return this.addDiscussion(fields)
              .then((discussion) => {
                this.loading = false;
                this.setAddDiscussionDialogToggle(false);
                this.$router.push({ name: 'discussion', params: { discussionId: discussion._id } });
              })
              .catch((err) => {
                this.loading = false;
                this.error = err.response.data;
              });
          });
      },
      checkSelectedUserId() {
        if (this.selectedUsersId.length) {
          this.addDiscussionForm.fields.usersId = this.selectedUsersId;
        } else {
          this.addDiscussionForm.fields.usersId = [];
        }
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