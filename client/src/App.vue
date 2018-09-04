<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
body {
  background-image: url("./assets/stereo.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  overflow-x: hidden;
}
input {
  background-color: transparent;
  outline: none;
  border: none;
  box-shadow: none;
}
button {
  cursor: pointer;
}
span {
  margin: 0 .25rem 0 1rem
}
</style>
