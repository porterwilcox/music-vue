<template>
<div class="playlist" v-if="playlist._id">
    <h2 class="title" v-if="title" @click="showForm">{{playlist.name}}</h2>
    <form v-else @submit.prevent="titleChange(playlist._id, playlist.userId)">
      <input class="title" v-model="newTitle" type="text" placeholder="new playlist name here" />
    </form>
    <div
    v-for="(song, index) in playlist.songs"
    :key="song.id"
    >
        <h1>{{song.name}}</h1>
        <button style="transform: rotateX(180deg)" @click="song.vote++, modifyVote({song, index, playlistId: playlist._id})">&#x26DB;</button>
        <span class="vote">{{song.vote}}</span>
        <button @click="song.vote--, modifyVote({song, index, playlistId: playlist._id})">&#x26DB;</button>
        <br>
        <img :src="song.albumArt" />
        <h2>{{song.artist}}</h2>
        <h2>{{song.album}}</h2>
        <audio :src="song.audioPreview" controls v-on:play="playPreview($event)"></audio>
        <button v-if="playlist.songs" @click="removeFromPlaylist(index, playlist._id)">remove from playlist</button>
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
    },
    showForm(){
      this.title= false
    },
    titleChange(playlistId, userId){
      let obj = {
        playlistId,
        userId,
        newTitle: this.newTitle
      }
      this.$store.dispatch('playlistTitleChange', obj)
      this.title = true
      this.newTitle = ''
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

