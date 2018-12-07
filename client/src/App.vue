<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
body {
  background-image: url("https://github.com/porterwilcox/Music-Is-Fun/blob/master/assets/images/tape.jpg?raw=true");
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
button, .action {
  cursor: pointer;
}
span {
  margin: 0 .25rem 0 1rem
}
</style>
