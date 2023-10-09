<template>
  <!-- <Modal /> -->
  <Vitals />
</template>

<script>
import Modal from './components/Modal.vue'
import Vitals from './components/Vitals.vue'

export default {
  name: 'App',
  components: {
    Modal,
    Vitals
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
