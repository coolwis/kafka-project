<template>
  <div id="app">
    <!-- <img src="./assets/connect-platform.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}



/* HomeComponent's private CSS styles */
.items {
  margin: 0 0 2em 0;
}
.item-line {
  cursor: pointer;
  background-color: #EEE;
  margin: .5em;
  padding: .3em 0;
  height: 1.6em;
  border-radius: 4px;
}

.item-line:hover {
  color: #607D8B;
  background-color: #DDD;
  left: .1em;
}

.item-id {
  display: inline-block;
  font-size: small;
  font-weight: bold;
  color: #039be5;
  margin: .5em;
  padding: .3em 0;
  height: 1.6em;
  text-align: left;

  border-radius: 4px 0 0 4px;
}
</style>

</style>
