<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useFavorites } from './useFavorites';
import SearchFavoriteCoins from '../searchFavoriteCoins/SearchFavoriteCoins.vue';
import Table from '../table/Table.vue';
import LoadMoreHidden from '../loadMore/LoadMoreHidden.vue';
import LoadMoreScroll from '../loadMore/LoadMoreScroll.vue';
import NoFound from '../noFound/NoFound.vue';
import NoFavorites from '../noFavorites/NoFavorites.vue';
import Error from '../error/Error.vue';

const { searchFavorite, noFound, noFavorites, error, favoriteCoin, 
    showMoreHidden, showMoreScroll, fetchSearchResults, removeCoinFavorite } = useFavorites();

// The `onMounted` function is responsible for fetching when the component is mounted.
onMounted(() => fetchSearchResults(favoriteCoin.value));

// The `watch` function is responsible for monitoring changes to the `searchFavorite` variable.
watch(() => searchFavorite.value, () => fetchSearchResults(searchFavorite.value));
</script>

<template>
    <SearchFavoriteCoins></SearchFavoriteCoins>
    <section class="mx-auto max-w-7xl px-1 fold:px-2.5 sm:px-6 lg:px-8">
        <Table :toggleFavoriteCoin="removeCoinFavorite" :totalCoins="favoriteCoin.length"></Table>
        <LoadMoreHidden v-if="showMoreHidden()"></LoadMoreHidden>
        <LoadMoreScroll v-if="showMoreScroll()"></LoadMoreScroll>
        <NoFound v-if="noFound"></NoFound>
        <NoFavorites v-if="noFavorites"></NoFavorites>
        <Error v-if="error"></Error>
    </section>
</template>