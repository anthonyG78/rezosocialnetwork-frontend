<template>
  <div class="page-container">
    <v-container fluid class="about-header primary white--text">
      <v-layout row>
        <v-flex xs12 sm8 lg6 offset-sm2 offset-lg3>
          <div class="logo mb-4">
            <h1 class="white--text logo">
              <v-icon light>bubble_chart</v-icon>
              <span>REZO</span>
            </h1>
          </div>
          <h3 class="teal--text text--lighten-4"><strong>Re</strong>stez dans la <strong>zo</strong>ne de vos proches !</h3>
          <p>Loin de vouloir concurrencer Facebook, Google +, Twitter... REZO vous permet de rester connecté avec vos amis et de partager des posts avec eux, d'y ajouter des commentaires et de communiquer facilement grâce à sa messagerie.</p>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid class="grey lighten-2">
      <v-layout row>
        <v-flex xs12 sm8 lg6 offset-sm2 offset-lg3> 
          <p>
            <h4>Les posts</h4>
            <ul>
              <li>Regarder vos posts et ceux de vos amis</li>
              <li>Ajouter vos propres posts</li>
              <li>Supprimer les posts qui vous concernent</li>
              <li>Commenter vos posts et ceux de vos amis</li>
            </ul>
          </p>
          <p>
            <h4>Les amis</h4>
            <ul>
              <li>Regarder le profil de tous les membre</li>
              <li>Découvrir et rechercher de nouveaux membres</li>
              <li>Ajouter des amis</li>
              <li>Supprimer des amis</li>
              <li>Refuser une amitié</li>
            </ul>
          </p>
          <p>
            <h4>Les discussions</h4>
            <ul>
              <li>Commencer une discussion avec un ou plusieurs amis</li>
              <li>Supprimer une discussion</li>
            </ul>
          </p>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid class="">
      <v-layout row>
        <v-flex xs12 sm8 lg6 offset-sm2 offset-lg3>
          <v-card>
            <v-card-row img="https://media.licdn.com/mpr/mpr/shrink_300_300/AAEAAQAAAAAAAAh5AAAAJGIxMzVmYjZjLTFmMzItNDFjMS05Y2JiLWM2MWVkZDIxOWRlZQ.jpg" height="300px">
              <v-card-text class="white--text pa-0">
                <v-card-title>Anthony G.</v-card-title>
              </v-card-text>
            </v-card-row>
            <v-card-text>
              <p>Je suis tombé dans le développement en 2009, j'ai d'abord travaillé avec les technologies web "classiques" telles que Apache, PHP, HTML, CSS... pour me tourner ensuite vers des technologies plus avancée telles que NodeJs, ExpressJs, MongoDb, VueJs, SCSS...</p>
              <p>Aujourd'hui, j'ai effectué un virage dans ma carrière grâce à une formation en JavaScript Full Stack au centre Ifocop. <strong>REZO</strong> en est le projet final.</p>
              <p>Venez Rédiger vos avis dans la Zone !</p>
            </v-card-text>
            <v-card-row actions>
              <v-btn 
                large
                block
                primary 
                class="white--text"
                @click.native="zoneEnterHandler"
              >{{ $t('message.enterTheZone') }}</v-btn>
            </v-card-row>
          </v-card>
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
