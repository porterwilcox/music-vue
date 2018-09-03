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
        <audio :src="song.audioPreview" controls v-on:play="playPreview($event)"></audio>
        <button v-if="playlist.songs" @click="addToPlaylist(song, playlist._id)">add to playlist</button>
        <button v-else @click="addToPlaylist(song)">add to playlist</button>
        </div>
      </div>
      <div class="playlist">
        <div v-if="playlist.songs"
        v-for="(s, index) in playlist.songs"
        :key="s.id"
        >
        <h2>{{playlist.name}}</h2>
        <h1>{{s.name}}</h1>
        <img :src="s.albumArt" />
        <h2>{{s.artist}}</h2>
        <h2>{{s.album}}</h2>
        <audio :src="s.audioPreview" controls v-on:play="playPreview($event)"></audio>
        <button style="transform: rotateX(180deg)" @click="s.vote++, modifyVote({song: s, index, playlistId: playlist._id})">&#x26DB;</button>
        <span>{{s.vote}}</span>
        <button @click="s.vote--, modifyVote({song: s, index, playlistId: playlist._id})">&#x26DB;</button>
        <button v-if="playlist.songs" @click="removeFromPlaylist(index, playlist._id)">remove from playlist</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      artist: ""
    };
  },
  computed: {
    songs() {
      return this.$store.state.songs;
    },
    playlist() {
      return this.$store.state.playlist;
    }
  },
  // mounted(){
  //   if(!this.songs){
  //     this.$store.dispatch('getSongs')
  //   }
  // },
  methods: {
    search(event) {
      this.$store.dispatch("search", this.artist);
    },
    addToPlaylist(song, playlistId) {
      let obj = {
        song,
        playlistId
      };
      this.$store.dispatch("addToPlaylist", obj);
    },
    removeFromPlaylist(index, playlistId) {
      let obj = {
        index,
        playlistId
      };
      this.$store.dispatch("removeFromPlaylist", obj);
    },
    playPreview(event) { // used the same function i made for music-is-fun project
      let previews = document.getElementsByTagName("audio");
      for (let i = 0; i < previews.length; i++) {
        const soundBite = previews[i];
        if (soundBite == event.target) {
          soundBite.play();
        } else {
          soundBite.pause();
        }
      }
    },
    modifyVote(obj){
      this.$store.dispatch('modifyVote', obj)
    },
    test(event){
      console.log(event)
    }
  }
};
</script>

<style>
.musics {
  display: flex;
}
.search-results {
  display: flex;
  flex-flow: wrap column;
}
.playlist {
  display: flex;
  flex-flow: wrap column;
}

</style>
