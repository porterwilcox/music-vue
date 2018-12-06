<template>
<div class="home">
  <auth />
  <div class="musics">
    <search />
    <playlist />
  </div>
</div>
</template>

<script>
import Search from "@/components/search";
import Playlist from "@/components/playlist";
import Auth from "@/components/auth";

export default {
  name: "home",
  components: {
    Search,
    Playlist,
    Auth
  }
};
</script>

<style>
.musics {
  display: flex;
}
</style>
