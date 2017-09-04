<template>
  <div>
   <!-- <div class="primary pa-4"></div>  -->
   <v-footer 
    :class="{'secondary': !dark, 'primary': dark, 'py-5 px-2': true}" 
    >
      <span>{{ (new Date()).getFullYear() }}</span>
    </v-footer>
  </div>
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
