<template>
  <v-list class="white mt-0">
    <template v-for="(user, index) in users">
      <v-divider v-if="index > 0"></v-divider>
      <v-list-tile avatar router :to="{ name: 'profil_profil', params: { userId: user._id }}" :key="user._id">
        <v-list-tile-avatar>
          <img :src="user.avatar + '&s=64'"/>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="user.username"></v-list-tile-title>
          <v-list-tile-sub-title v-html="user.firstName + ' ' + user.lastName"></v-list-tile-sub-title>
        </v-list-tile-content>
        <template v-if="actions">
          <v-list-tile-action>
            <div class="actions-btn-list">
              <template v-if="user.accepted == 1">
                <v-btn icon class="success--text" @click.native.stop="(e) => acceptFriendShip(e, user._id)">
                  <v-icon>done</v-icon>
                </v-btn>
                <v-btn icon class="error--text" @click.native.stop="(e) => refuseFriendShip(e, user._id)">
                  <v-icon>clear</v-icon>
                </v-btn>
              </template>
              <v-icon v-else-if="user.accepted == 0" class="grey--text pa-2">call_made</v-icon>
              <template v-if="user._id !== self._id">
                <v-btn v-if="user.accepted == -1" icon class="success--text" @click.native.stop="(e) => addFriendShip(e, user._id)">
                  <v-icon>add_circle_outline</v-icon>
                </v-btn>
                <v-btn v-else-if="user.accepted == 2 || self.level < 2" icon class="error--text" @click.native.stop="(e) => deleteFriend(e, user._id)">
                  <v-icon>highlight_off</v-icon>
                </v-btn>
              </template>
            </div>
          </v-list-tile-action>
        </template>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'usersList',
  props: ['users', 'self', 'actions'],
  methods: {
    addFriendShip(e, userId) {
      e.preventDefault();
      this.$emit('addFriend', userId);
    },
    acceptFriendShip(e, userId) {
      e.preventDefault();
      this.$emit('acceptFriend', userId);
    },
    refuseFriendShip(e, userId) {
      e.preventDefault();
      this.$emit('refuseFriend', userId);
    },
    deleteFriend(e, userId) {
      e.preventDefault();
      this.$emit('deleteFriend', userId);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
