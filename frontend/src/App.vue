<template>
  <div id="app">
    <h1>
      Shopping list app
    </h1>
    <div class="logo-container">
      <img class="logo" alt="logo" src="./assets/logo.png" />
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  margin: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14pt;
  input[type="text"] {
    border: none;
    border-bottom: 1px solid #748291;
    text-align: center;
    font-size: 14pt;
    margin-bottom: 10px;
    padding: 10px;
  }
  span.remove::after {
    content: "[x]";
    font-size: 12pt;
    margin-left: 20px;
    color: #9c2323;
    cursor: pointer;
  }
  button {
    border: none;
    font-size: 14pt;
    background-color: #ffffff;
    color: #2c3e50;
    cursor: pointer;
  }
  div.logo-container {
    height: 100px;
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
}
</style>
