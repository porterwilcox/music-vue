<template>
<div class="search">
    <form @submit.prevent="search">
        <input type="text" v-model="artist">
    </form>
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
</div>
</template>

<script>
export default {
  name: "search",
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
    playPreview(event) {
      // used the same function i made for music-is-fun project
      let previews = document.getElementsByTagName("audio");
      for (let i = 0; i < previews.length; i++) {
        const soundBite = previews[i];
        if (soundBite == event.target) {
          soundBite.play();
        } else {
          soundBite.pause();
        }
      }
    }
  }
};
</script>

<style>
</style>

