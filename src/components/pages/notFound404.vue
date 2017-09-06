<template>
  <div class="page-container">
    <v-container fluid class="about-header primary white--text">
      <v-layout row>
        <v-flex xs12 sm8 lg6 offset-sm2 offset-lg3>
          <h1>404</h1>
          <h3 class="white--text">Oups ! la page demandée n'existe pas</h3>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid class="grey lighten-2">
      <v-layout row>
        <v-flex xs12 sm8 lg6 offset-sm2 offset-lg3> 
          <h4>Ne paniquez pas</h4>
          <p>Respirez et restez tout de même dans la zone :)</p>
          <v-btn 
            large
            block
            primary 
            class="white--text"
            @click.native="zoneEnterHandler"
          ><v-icon dark class="mr-2">bubble_chart</v-icon>{{ $t('message.stayInTheZone') }}</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'about',
  data() {
    return {
      // ...
    };
  },
  components: {
    // ...
  },
  mounted() {
    console.log('mounted');
  },
  methods: {
    zoneEnterHandler() {
      this.$router.push('/');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .about-header {
    h3 {
      strong {
        color: white;
      }
    }
    
    p {
      font-size: 1.2em;
    }
  }
</style>
