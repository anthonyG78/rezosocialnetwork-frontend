<template>
  <v-footer :class="{'secondary': !dark, 'primary': dark, 'white--text py-5 px-2': true}" >
    <span>{{ (new Date()).getFullYear() }}</span>
  </v-footer>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'footer',
    computed: {
      ...mapState({
        dark: 'dark',
      }),
    },
  };
</script>
