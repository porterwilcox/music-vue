<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <form @submit.prevent="search">
      <input type="text" v-model="artist">
    </form>
    <div class="musics">
      <div class="search-results" v-if="songs">
        <div
        v-for="song in songs"
        :key="song.tempId"
        >
        <h1>{{song.name}}</h1>
        <img :src="song.albumArt" />
        <h2>{{song.artist}}</h2>
        <h2>{{song.album}}</h2>
        <audio :src="song.audioPreview" controls></audio>
        <button v-if="playlist.songs" @click="addToPlaylist(song, playlist._id)">add to playlist</button>
        <button v-else @click="addToPlaylist(song)">add to playlist</button>
        </div>
      </div>
        <div v-if="playlist.songs"
        v-for="s in playlist.songs"
        :key="s.id"
        >
        <h2>{{playlist.name}}</h2>
        <h1>{{s.name}}</h1>
        <img :src="s.albumArt" />
        <h2>{{s.artist}}</h2>
        <h2>{{s.album}}</h2>
        <audio :src="s.audioPreview" controls></audio>
        </div>
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
    },
    playlist(){
      return this.$store.state.playlist
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
    },
    addToPlaylist(song, playlistId){
      let obj = {
        song,
        playlistId
      }
      this.$store.dispatch('addToPlaylist', obj)
    }
  }
}
</script>

<style>
.musics {
  display: flex;
}
.search-results{
  display: flex;
  flex-flow: wrap column;
}
</style>
