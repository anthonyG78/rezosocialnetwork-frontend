<template>
  <v-layout row wrap class="post-list">
    <v-flex xs12 sm6 md4 lg3 v-for="(post, index) in postCopy" :key="post.id">
    <v-scale-transition>
      <v-card :key="post.id" :class="{'white': !cardIsOver, 'mb-3': true, 'grey lighten-4': cardIsOver && postIdOver == post.id}" v-show="post.show">
          <v-card-row class="pa-3">
            <router-link :to="{ name: 'profil_profil', params: { userId: post.fromUser.id }}">
              <v-list-tile-avatar>
                <img :src="post.fromUser.avatar + '&s=64'">
                <span class="primary--text">{{ post.fromUser.username }}</span>
              </v-list-tile-avatar>
            </router-link>
            <router-link v-if="post.fromUser.id !== post.toUser.id" :to="{ name: 'profil_profil', params: { userId: post.toUser.id }}">
              <v-icon class="grey--text text--lighten-1">keyboard_arrow_right</v-icon>
              <span class="primary--text">{{ post.toUser.username }}</span>
            </router-link>
          </v-card-row>
        <router-link :to="{ name: 'post', params: { id: post.id }}" @mouseover.native="cardOver(true, post.id)"  @mouseout.native="cardOver(false, post.id)">
          <template v-if="post.image">
              <v-card-row class="card__img" :img="post.image"></v-card-row>
          </template>
          <template v-else>
            <v-card-row class="card__img card__img_default" img="/static/background/material-bg-default.svg"></v-card-row>
          </template>
          <v-card-text>
            <p class="grey--text text-xs-right"><small>{{ post.date | formatDate }}</small></p>
            <p>{{ post.text }}</p>
          </v-card-text>
        </router-link>
        <v-card-row class="grey lighten-4" actions>
          <div v-if="post.comments.length > 0">
            <v-icon class="primary--text">mode_comment</v-icon>
            <span class="primary--text">{{ post.comments.length }}</span>
          </div>
          <div v-else>
            <v-icon class="grey--text">mode_comment</v-icon>
            <span class="grey--text">0</span>
          </div>
        </v-card-row>
      </v-card>
    </v-scale-transition>
    </v-flex>
  </v-layout>
</template>

<script>
import screenSizes from '@/mixins/screenSizes';

export default {
  mixins: [screenSizes],
  name: 'postList',
  props: ['self', 'posts'],
  data() {
    return {
      cardIsOver: false,
      postIdOver: null,
      postCopy: [],
    };
  },
  mounted() {
    if (!this.posts.length) {
      return false;
    }
    this.postCopy = [];
    return this.posts.forEach((value, key) => {
      const entry = Object.assign({ show: false }, this.posts[key]);
      setTimeout(() => {
        entry.show = true;
      }, 100 * key);
      this.postCopy.push(entry);
    });
  },
  methods: {
    cardOver: function cardOver(state, postId) {
      this.cardIsOver = state;
      this.postIdOver = postId;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../node_modules/vuetify/src/stylus/settings/_variables'

  .post-list {
    .card__img {
      height: calc(100vw / 2) !important;
      &.card__img_default {
        opacity: 0.2;
      }
    }

    .card__text {
      position: relative;
      overflow: hidden;
      height:  calc(100vw / 3) !important;

      &:after {
        content: "";
        width: 100%;
        height: 33%;
        position: absolute;
        bottom: 0;
        left: 0;
        background: -moz-linear-gradient(top, rgba(255,255,255,0)0%, rgba(255,255,255,1) 100%);
        background: -webkit-linear-gradient(top, rgba(255,255,255,0)0%,rgba(255,255,255,1) 100%);
        background: linear-gradient(to bottom, rgba(255,255,255,0)0%,rgba(255,255,255,1) 100%);
      }
    }

    @media screen and (min-width: $grid-breakpoints.lg){
      .card__img {
        height: calc(100vw / 10) !important;
      }
      .card__text {
        height: calc(100vw / 14) !important;
      }
    }

    @media screen and (min-width: $grid-breakpoints.md) and (max-width: $grid-breakpoints.lg) {
      .card__img {
        height: calc(100vw / 8) !important;
      }
      .card__text {
        height: calc(100vw / 9) !important;
      }
    }

    @media screen and (min-width: $grid-breakpoints.sm) and (max-width: $grid-breakpoints.md)  {
      .card__img {
        height: calc(100vw / 4) !important;
      }
      .card__text {
        height: calc(100vw / 6) !important;
      }
    }
  }
</style>
