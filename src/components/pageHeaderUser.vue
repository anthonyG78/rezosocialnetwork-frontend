<template>
  <div style="position: relative">
    <v-parallax :src="user.background" :height="!isXS ? 270 : 238" class="backgroundImage"></v-parallax>
    <div class="user-infos">
      <v-card class="elevation-0">
        <v-card-title class="pa-4">
          <v-slide-y-reverse-transition>
            <img :src="user.avatar + '&s=' + (isXS ? '96' : '128')" class="elevation-5" v-if="show" v-show="show"/>
          </v-slide-y-reverse-transition>
        </v-card-title>
        <v-card-row actions class="white--text pa-4">
          <v-icon :class="{'green--text': user.connected, 'grey--text': !user.connected}">fiber_manual_record</v-icon>
          {{ user.username }}
        </v-card-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import screenSizes from '@/mixins/screenSizes';

export default {
  mixins: [screenSizes],
  name: 'pageHeaderUser',
  props: ['user'],
  data: () => ({
    show: false,
    previousUser: null,
  }),
  mounted() {
    this.previousUser = this.user;
    this.show = true;
  },
  watch: {
    user() {
      if (this.previousUser._id !== this.user._id) {
        this.show = false;
        setTimeout(() => { this.show = true; }, 200);
        this.previousUser = this.user;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .user-infos {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .card {
    background: none;
    height: 100% !important;
    
    img {
      margin-bottom: -2em;
    }
  }

  .card__row--actions {
    font-size: 2em;
    background: rgba(0, 0, 0, .25)
  }
</style>
