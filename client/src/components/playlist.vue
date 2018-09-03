<template>
<div class="playlist">
    <div v-if="playlist.songs"
    v-for="(song, index) in playlist.songs"
    :key="song.id"
    >
        <h2>{{playlist.name}}</h2>
        <h1>{{song.name}}</h1>
        <img :src="song.albumArt" />
        <h2>{{song.artist}}</h2>
        <h2>{{song.album}}</h2>
        <audio :src="song.audioPreview" controls v-on:play="playPreview($event)"></audio>
        <button style="transform: rotateX(180deg)" @click="song.vote++, modifyVote({song, index, playlistId: playlist._id})">&#x26DB;</button>
        <span>{{song.vote}}</span>
        <button @click="song.vote--, modifyVote({song, index, playlistId: playlist._id})">&#x26DB;</button>
        <button v-if="playlist.songs" @click="removeFromPlaylist(index, playlist._id)">remove from playlist</button>
    </div>
</div>
</template>

<script>
export default {
  name: "playlist",
  computed: {
    playlist() {
      return this.$store.state.playlist;
    }
  },
  methods: {
    removeFromPlaylist(index, playlistId) {
      let obj = {
        index,
        playlistId
      };
      this.$store.dispatch("removeFromPlaylist", obj);
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
    },
    modifyVote(obj) {
      this.$store.dispatch("modifyVote", obj);
    }
  }
};
</script>

<style>
</style>

