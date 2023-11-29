<script setup lang="ts">
import { watchEffect } from 'vue';
import { useCoins } from './useCoins';
import SearchCoins from '../searchCoins/SearchCoins.vue';
import Table from '../table/Table.vue';
import NoFound from '../noFound/NoFound.vue';
import Error from '../error/Error.vue';
import Pagination from '../pagination/Pagination.vue';

// Destructures and gets reactive data and methods from the 'useCoins' composable.
const { stats, searchInput, noFound, error, offset, 
    fetchSearchResults, toggleFavoriteCoin } = useCoins();

watchEffect(() => fetchSearchResults(offset.value, searchInput.value));
</script>

<template>
    <SearchCoins></SearchCoins>
    <section class="mx-auto max-w-7xl px-1 fold:px-2.5 sm:px-6 lg:px-8">
        <Table :toggleFavoriteCoin="toggleFavoriteCoin" :totalCoins="parseInt(stats.total)"></Table>
        <NoFound v-show="noFound"></NoFound>
        <Error v-show="error"></Error>
    </section>
    <Pagination></Pagination>
</template>