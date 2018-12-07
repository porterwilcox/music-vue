<template>
<div class="playlist" v-if="songs.length">
    <h2 class="title">Your playlist</h2>
    <div v-for="(song, i) in songs" :key="song._id">
        <div class="d-flex">
          <h1 class="m-0">{{song.name}}</h1>
          <div>
            <button style="transform: rotateX(180deg)" @click="song.vote++; updateSong(song, i) ">&#x26DB;</button>
            <span class="vote">{{song.vote}}</span>
            <button @click="song.vote--; updateSong(song, i)">&#x26DB;</button>
          </div>
        </div>
        <br>
        <img :src="song.albumArt" />
        <h2>{{song.artist}}</h2>
        <h2>{{song.album}}</h2>
        <audio :src="song.audioPreview" controls v-on:play="playPreview($event)"></audio>
        <button class="btn-outline-danger" @click="removeFromPlaylist(song._id)">remove from playlist</button>
        <hr>
    </div>
</div>
</template>

<script>
export default {
  name: "playlist",
  data(){
    return {
      title: true,
      newTitle: ''
    }
  },
  computed: {
    songs() {
      return this.$store.state.songs.sort((a,b) => b.vote - a.vote)
    }
  },
  methods: {
    //removeFromPlaylist
    updateSong(song, i) {
      let payload = {
        song,
        i
      }
      this.$store.dispatch('updateSong', payload)
    },
    playPreview(e) {
      Array.from(document.getElementsByTagName("audio")).forEach(a => a == e.target ? a.play() : a.pause())
    },
    modifyVote(obj) {
      this.$store.dispatch("modifyVote", obj);
    }
  }
};
</script>

<style>
.playlist {
  position: absolute;
  right: 5vw;
}
.vote {
  font-size: 2rem;
  margin: 0 .5rem;
}
.playlist h2:first-child {
  cursor: pointer;
}
.title {
  padding: 3vh 0 1vh;
  border-bottom: 2px solid black;
  font-size: 1.5rem;
}
.playlist div {
  margin: 5vh 0 0;
}
h2 button {
  margin-left: 3rem;
  background-color: transparent;
  font-size: 1.2rem;
}
</style>

