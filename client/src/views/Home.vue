<template>
<div class="home">
  <img alt="Vue logo" src="../assets/logo.png">
  <user />
  <div class="musics">
    <search />
    <playlist />
  </div>
</div>
</template>

<script>
import Search from "@/components/search";
import Playlist from "@/components/playlist";
import User from "@/components/user";

export default {
  name: "home",
  components: {
    Search,
    Playlist,
    User
  },
};
</script>

<style>
.musics {
  display: flex;
}
</style>
