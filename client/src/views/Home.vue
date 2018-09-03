<template>
<div class="home">
  <img alt="Vue logo" src="../assets/logo.png">
  <div class="musics">
    <search />
    <playlist />
  </div>
</div>
</template>

<script>
import Search from "@/components/search";
import Playlist from "@/components/playlist";

export default {
  name: "home",
  computed: {
    songs() {
      return this.$store.state.songs;
    },
    playlist() {
      return this.$store.state.playlist;
    }
  },
  components: {
    Search,
    Playlist
  },
};
</script>

<style>
.musics {
  display: flex;
}
</style>
