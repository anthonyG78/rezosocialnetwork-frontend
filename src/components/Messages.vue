<template>
  <v-layout row wrap>
    <template v-for="message in messages">
      <template v-if="message.user.id == self._id">
        <v-flex xs10 :key="message.id" class="mb-2">
          <v-card class="grey lighten-4 pa-3">
            <v-card-title>
              <span v-html="$options.filters.ligneBreak(message.text)"></span>
            </v-card-title>
          </v-card>
          <small class="grey--text">{{ message.date | formatDate }}</small>
        </v-flex>
        <v-flex xs2 class="mb-2">
          <router-link :to="{ name: 'profil_profil', params: { userId: message.user.id }}">
            <v-list-tile-avatar>
              <img :src="message.user.avatar + '&s=64'"/>
            </v-list-tile-avatar>
          </router-link>
        </v-flex>
      </template>
      <template v-else>
        <v-flex xs2 class="mb-2">
          <router-link :to="{ name: 'profil_profil', params: { userId: message.user.id }}">
            <v-list-tile-avatar>
              <img :src="message.user.avatar + '&s=64'"/>
            </v-list-tile-avatar>
          </router-link>
        </v-flex>
        <v-flex xs10 :key="message.id" class="mb-2">
          <v-card class="white pa-3">
            <v-card-title>
              <span v-html="$options.filters.ligneBreak(message.text)"></span>
            </v-card-title>
          </v-card>
          <small class="grey--text">{{ message.date | formatDate }}</small>
        </v-flex>
      </template>
    </template>
  </v-layout>
</template>

<script>
export default {
  name: 'messages',
  props: ['messages', 'self'],
};
</script>
