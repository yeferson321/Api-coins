<script setup lang="ts">
import Navbar from '../src/components/navbar/Navbar.vue';
import Footer from '../src/components/footer/Footer.vue';
import Jumbotron from './components/jumbotron/Jumbotron.vue';
</script>

<template>
  <Navbar></Navbar>
  <Jumbotron></Jumbotron>
  <router-view></router-view>
  <Footer></Footer>
</template>