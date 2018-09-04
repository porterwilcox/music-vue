<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
:root{
--dark-purple: #2a1b3d;
--purple: #44318d;
--light-purple: #8265a7;
--grey: #a4b3b6;
--pink: #d83f87;
}
body {
  height: 100vh;
  background: linear-gradient(180deg, var(--dark-purple), var(--purple), var(--light-purple));
  overflow: hidden; 
}
</style>
