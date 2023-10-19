<script setup lang="ts">
import Navbar from '../src/components/navbar/Navbar.vue';
import Jumbotron from './components/jumbotron/Jumbotron.vue';
import LogoSection from './components/logoSection/LogoSection.vue';
import Footer from '../src/components/footer/Footer.vue';
</script>

<template>
  <Navbar></Navbar>
  <Jumbotron></Jumbotron>
  <router-view></router-view>
  <LogoSection></LogoSection>
  <Footer></Footer>
</template>