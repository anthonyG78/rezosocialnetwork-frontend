<template>
  <v-tabs grow light icons class="mb-3">
    <v-tabs-bar slot="activators">
      <v-tabs-item 
        router 
        exact 
        v-for="item in menu" 
        v-if="item.menuTabs" 
        :key="item.title" 
        :to="item.route ? (isSelf ? { name: item.route } : { name: 'profil_'+item.route, params: { userId: user._id }}) : null">
        <span v-show="!isXS">{{ $t('message.' + item.title) }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-tabs-item>
    </v-tabs-bar>
  </v-tabs>
</template>

<script>
import screenSizes from '@/mixins/screenSizes';

export default {
  mixins: [screenSizes],
  name: 'pageHeaderTabs',
  props: ['menu', 'isSelf', 'user'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
