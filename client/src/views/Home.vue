<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h3>{{artist}}</h3>
    <form @submit.prevent="search">
      <input type="text" v-model="artist">
    </form>
    <div 
    v-for="song in songs"
    :key="song.tempId"
    >
    <h1>{{song.name}}</h1>
    <img :src="song.albumArt" />
    <h2>{{song.artist}}</h2>
    <h2>{{song.album}}</h2>
    <audio :src="song.audioPreview" controls></audio>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      artist: ''
    }
  },
  computed: {
    songs(){
      return this.$store.state.songs
    }
  },
  // mounted(){
  //   if(!this.songs){
  //     this.$store.dispatch('getSongs')
  //   }
  // },
  methods: {
    search(event){
      this.$store.dispatch('search', this.artist)
    }
  }
}
</script>
