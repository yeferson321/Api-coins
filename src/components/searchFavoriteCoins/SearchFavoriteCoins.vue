<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { Ref, toRefs } from "vue";
import { DataInterface, CoinInterface } from "../../interfaces/DataInterface";
import { getSearchFavoritesCoins } from "../../services/CoinService";
import { useOffsetStore } from '../../stores/offsetStore'
import { useCoinStorageStore } from '../../stores/coinStorage'

const { offset, updateOffset } = toRefs(useOffsetStore());
const coinStorage = useCoinStorageStore();
const inputRef: Ref<HTMLInputElement | null> = ref(null);
const showClear: Ref<boolean> = ref(false);
let timeoutId: NodeJS.Timeout | undefined;

const emits = defineEmits<{
    (event: "emitsCoins", value: CoinInterface[]): void;
    (event: "emitsIsLoading", value: boolean): void;
    (event: "emitsNoFound", value: boolean): void;
    (event: "emitsError", value: boolean): void;
}>();

const searchCoins = async () => {

    const matchingElements = coinStorage.coinStorage.filter(item => item.includes(inputRef.value?.value?.toLowerCase() ?? ""));
    
    if (matchingElements.length) {
        emits("emitsIsLoading", true);
        try {
            const data: DataInterface = await getSearchFavoritesCoins(offset.value, matchingElements);
            emits("emitsCoins", data.coins);
            emits("emitsNoFound", false);
            emits("emitsIsLoading", false);
        } catch (error) {
            //console.error(err)
            emits("emitsCoins", []);
            emits("emitsIsLoading", false);
            emits("emitsError", true);
        }
    } else {
        // No hay elementos coincidentes
        emits("emitsCoins", []);
        emits("emitsNoFound", true);
    }
};

const inputSearch = () => {
    showClear.value = inputRef.value?.value !== "";
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
        updateOffset.value(0)
    };
};
</script>

<template>
    <div class="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between pb-8">
            <div class="grow max-w-lg">
                <label for="search" class="sr-only">Search</label>
                <div class="relative mr-4">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 stroke-neutral-400">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <input type="text" id="search" ref="inputRef" class="block w-full py-1.5 pl-12 pr-6 min-[435px]:pr-11 bg-transparent rounded-full border border-gray-400 text-white focus:outline-none"
                        @input="inputSearch" aria-autocomplete="both" aria-labelledby=":r1:-label" autoComplete="off" autoCorrect="off" autoCapitalize="off" enterKeyHint="search" spellCheck="false" placeholder="Buscar en Coinsver..." required>
                    <button v-if="showClear" type="button" class="max-[435px]:hidden absolute inset-y-0 right-0 flex items-center pr-3" @click="clearSearch()">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 stroke-neutral-400 hover:stroke-neutral-300 stroke-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            <a href="/" class="sm:inline-flex sm:items-center sm:text-white p-1 sm:px-4 sm:py-1.5 sm:rounded-lg sm:bg-blue-600 sm:hover:bg-blue-700 sm:transition sm:duration-450 sm:ease-in-out">
                <span class="hidden sm:block">All coins</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 sm:w-6 h-7 sm:h-6 sm:ml-2 fill-white">
                    <path fill-rule="evenodd" d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm10-6a1 1 0 1 0-2 0v1H8a1 1 0 0 0 0 2h1v6H8a1 1 0 1 0 0 2h1v1a1 1 0 1 0 2 0v-1h1v1a1 1 0 1 0 2 0v-1c.493 0 1.211-.14 1.834-.588C16.51 15.925 17 15.126 17 14c0-.851-.281-1.516-.71-2 .429-.484.71-1.149.71-2 0-1.126-.491-1.926-1.166-2.412A3.233 3.233 0 0 0 14 7V6a1 1 0 1 0-2 0v1h-1V6zm0 5V9h3c.173 0 .456.06.666.212.159.114.334.314.334.788 0 .474-.175.674-.334.789A1.25 1.25 0 0 1 14 11h-3zm0 2h3c.173 0 .456.06.666.211.159.115.334.315.334.789 0 .474-.175.674-.334.789A1.25 1.25 0 0 1 14 15h-3v-2z" clip-rule="evenodd"></path>
                </svg>                
            </a>
        </div>
    </div>
</template>