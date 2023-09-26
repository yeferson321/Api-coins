<script setup lang="ts">
import Navbar from '../src/components/navbar/Navbar.vue';
import Footer from '../src/components/footer/Footer.vue';
</script>

<template>
  <Navbar></Navbar>
  <router-view></router-view>
  <Footer></Footer>
</template>