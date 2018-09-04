<template>
<div class="search">
    <form @submit.prevent="search" autocomplete="off">
        <input id="search-by-artist" type="text" v-model="artist" placeholder="find more songs" @focus="placeholderChange" @focusout="placeholderRevert">
    </form>
    <div class="search-results-modal" v-if="songs" @click="closeModal($event)">
      <div class="search-content-modal">
          <div
          v-for="song in songs"
          :key="song.tempId"
          >
              <h1>{{song.name}}</h1>
              <img :src="song.albumArt" />
              <h2>{{song.artist}}</h2>
              <h2>{{song.album}}</h2>
              <audio :src="song.audioPreview" controls v-on:play="playPreview($event)"></audio>
              <button @click="addToPlaylist(song, user._id, playlist._id)">add to playlist</button>
          </div>
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
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    search(event) {
      this.$store.dispatch("search", this.artist);
      document.querySelector(".search-results-modal").style.display = "flex";
    },
    addToPlaylist(song, userId, playlistId) {
      let obj = {
        song,
        userId,
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
    },
    placeholderChange() {
      document
        .getElementById("search-by-artist")
        .setAttribute("placeholder", "search by artist");
    },
    placeholderRevert() {
      document
        .getElementById("search-by-artist")
        .setAttribute("placeholder", "find more songs");
    },
    closeModal(event) {
      if (event.target == document.querySelector(".search-results-modal")) {
        document.querySelector(".search-results-modal").style.display = "none";
        document.getElementById("search-by-artist").value = "";
        // .setAttribute("placeholder", "find more songs");
      }
    }
  }
};
</script>

<style scoped>
form {
  position: fixed;
  left: 10vh;
  top: 10vh;
}
form input {
  width: 30vw;
  height: 10vh;
  font-size: 2rem;
  cursor: pointer;
}
.search-results-modal {
  display: none;
  z-index: 2;
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  justify-content: flex-end;
}
.search-content-modal {
  width: 45vw;
  height: fit-content;
  background-color: #a4b3b6;
}
.search-content-modal div {
  display: flex;
  flex-flow: wrap column;
  justify-content: center;
}
</style>

