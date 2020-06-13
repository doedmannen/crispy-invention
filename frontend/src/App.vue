<template>
  <div id="app">
    <h1>
      Shopping list app
    </h1>
    <div class="logo-container">
      <router-link to="/">
        <img class="logo" alt="logo" src="./assets/logo.png" />
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  mounted(): void {
    this.$router.push({ path: "/" });
  }
}
</script>

<style lang="scss">
#app {
  margin: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14pt;
  input[type="text"],
  input[type="number"],
  select {
    border: 1px solid #748291;
    text-align: center;
    font-size: 14pt;
    margin-bottom: 20px;
    padding: 10px;
    min-width: 200px;
    width: 200px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  span.edit::after,
  span.remove::after {
    font-size: 12pt;
    margin-left: 20px;
    cursor: pointer;
  }
  span.edit::after {
    content: "[edit]";
    color: #5b5c15;
  }
  span.remove::after {
    content: "[x]";
    color: #9c2323;
  }
  button {
    border: none;
    font-size: 14pt;
    background-color: #ffffff;
    color: #2c3e50;
    cursor: pointer;
    margin: 10px;
  }
  div.logo-container {
    height: 100px;
    margin-bottom: 20px;
    img.logo {
      height: 100%;
    }
  }
  a {
    color: #2c3e50;
    text-decoration: none;
    &:hover {
      color: #88939e;
    }
  }
  ul {
    padding-top: 0;
    padding-left: 0;
    li {
      list-style: none;
      margin: 20px 0;
      font-size: 16pt;
    }
  }
  div.error {
    margin-top: -10px;
    color: #9c2323;
    font-size: 8pt;
    margin-bottom: 10px;
  }
  div.error:empty {
    display: none;
  }
}
</style>
