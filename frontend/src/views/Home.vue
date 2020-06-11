<template>
  <div class="Home">
    <div class="logo-container">
      <img class="logo" alt="logo" src="../assets/logo.png" />
    </div>
    <HelloWorld />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import HelloWorld from "../components/HelloWorld.vue";

@Component({
  name: 'Home',
  components: {
    HelloWorld
  }
})


export default class Home extends Vue {
  
}
</script>

<style scoped lang="scss">
div.Home {

  div.logo-container {

    height: 100px;
    
    img.logo {
      height: 100%;
    }
  
  }

}
</style>