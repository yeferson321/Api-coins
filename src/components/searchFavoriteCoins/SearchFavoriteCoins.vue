<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { Ref, watchEffect } from "vue";
import { DataInterface, CoinInterface } from "../../interfaces/DataInterface";
import { getSearchFavoritesCoins } from "../../services/CoinService";

const inputRef: Ref<HTMLInputElement | null> = ref(null);
const showClear: Ref<boolean> = ref(false);
let timeoutId: NodeJS.Timeout | undefined;
const localCoinStorage: Ref<string[]> = ref(JSON.parse(localStorage.getItem('favorites') || '[]'));

const emits = defineEmits<{
    (event: "emitsCoins", value: CoinInterface[]): void;
    (event: "emitsIsLoading", value: boolean): void;
    (event: "emitsNoFound", value: boolean): void;
    (event: "emitsError", value: boolean): void;
    (event: "emitsOffset", value: number): void;
}>();

const searchCoins = async () => {
    const elementosCoincidentes = localCoinStorage.value.filter(item => item.includes(inputRef.value?.value?.toLowerCase() ?? ""));

    if (elementosCoincidentes.length > 0) {
        try {
            const data = await getSearchFavoritesCoins(0, elementosCoincidentes);

            emits("emitsCoins", data.coins);
            emits("emitsNoFound", false);
            emits("emitsIsLoading", false);

        } catch (error) {
            //console.error(err)
            emits("emitsCoins", []);
            emits("emitsError", true);
        }
    } else {
        // No hay elementos coincidentes
        emits("emitsCoins", []);
        emits("emitsNoFound", true);
        emits("emitsIsLoading", false);
    }
};


const inputSearch = () => {
    showClear.value = inputRef.value?.value !== "";
    emits("emitsIsLoading", true);
    timeoutId !== undefined && clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        searchCoins();
    }, 500);
};

const clearSearch = () => {
    if (inputRef.value?.value) {
        inputRef.value.value = '';
        showClear.value = false;
        emits("emitsNoFound", false);
        emits("emitsOffset", -0);
    };
};

watchEffect(() => {
    // const numberOfElements: number = props.localCoinStorage.length;
    // indicatorCount.value = numberOfElements;
});
</script>

<template>
    <div class="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between pb-8">
            <div class="grow max-w-lg">
                <label for="search" class="sr-only">Search</label>
                <div class="relative mr-4">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" width="20px" height="20px">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <input type="text" id="search" ref="inputRef" class="placeholder:italic block w-full py-1.5 pl-12 pr-6 min-[435px]:pr-11 bg-transparent rounded-full border border-gray-400 text-white focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        @input="inputSearch" aria-autocomplete="both" aria-labelledby=":r1:-label" autoComplete="off" autoCorrect="off" autoCapitalize="off" enterKeyHint="search" spellCheck="false" placeholder="Buscar en Coinsver..." required>
                    <button v-if="showClear" type="button" class="max-[435px]:hidden absolute inset-y-0 right-0 flex items-center pr-3" @click="clearSearch()">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 stroke-neutral-400 hover:stroke-neutral-300 stroke-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            <a href="/" class="sm:inline-flex sm:items-center sm:text-white p-1 sm:px-4 sm:py-1.5 sm:rounded-lg sm:bg-blue-600 sm:hover:bg-blue-700 sm:transition sm:duration-450 sm:ease-in-out">
                <span class="hidden sm:block">All coins</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 sm:w-6 h-7 sm:h-6 sm:ml-2 stroke-white stroke-2" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M6 6h8a3 3 0 0 1 0 6a3 3 0 0 1 0 6h-8"></path>
                    <path d="M8 6l0 12"></path>
                    <path d="M8 12l6 0"></path>
                    <path d="M9 3l0 3"></path>
                    <path d="M13 3l0 3"></path>
                    <path d="M9 18l0 3"></path>
                    <path d="M13 18l0 3"></path>
                </svg>
            </a>
        </div>
    </div>
</template>