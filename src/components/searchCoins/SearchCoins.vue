<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { Ref } from "vue";
import { DataInterface, CoinInterface } from "../../interfaces/DataInterface";
import { getSearchCoins } from "../../services/CoinService";
import { useOffsetStore } from '../../stores/offsetStore'
import { useCoinStorageStore } from '../../stores/coinStorage'

const { updateOffset } = useOffsetStore();
const coinStorage = useCoinStorageStore();
const inputRef: Ref<HTMLInputElement | null> = ref(null);
const showClear: Ref<boolean> = ref(false);
const timeoutId: Ref<NodeJS.Timeout | undefined> = ref(undefined);

const emits = defineEmits<{
    (event: "emitsCoins", value: CoinInterface[]): void;
    (event: "emitsIsLoading", value: boolean): void;
    (event: "emitsNoFound", value: boolean): void;
    (event: "emitsError", value: boolean): void;
}>();

const searchCoins = async () => {
    emits("emitsIsLoading", true);
    try {
        const data: DataInterface = await getSearchCoins(inputRef.value?.value);       
        if (data.coins.length) {
            emits("emitsCoins", data.coins);
            emits("emitsNoFound", false);
            emits("emitsIsLoading", false);
        } else {
            emits("emitsCoins", []);
            emits("emitsNoFound", true);
            emits("emitsIsLoading", false);
        };
    } catch (err: unknown) {
        //console.error(err)
        emits("emitsCoins", []);
        emits("emitsError", true);
    }
};

const inputSearch = () => {
    showClear.value = inputRef.value?.value !== "";
    timeoutId.value !== undefined && clearTimeout(timeoutId.value);
    timeoutId.value = setTimeout(() => {
        searchCoins();
    }, 500);
};

const clearSearch = () => {
    if (inputRef.value?.value) {
        inputRef.value.value = '';
        showClear.value = false;
        emits("emitsNoFound", false);
        updateOffset(0)
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 stroke-neutral-400 hover:stroke-neutral-300 stroke-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            <a href="/favorites" class="relative sm:inline-flex sm:items-center sm:text-white p-1 sm:px-4 sm:py-1.5 sm:rounded-lg sm:bg-blue-600 sm:hover:bg-blue-700 sm:transition sm:duration-450 sm:ease-in-out">
                <span class="hidden sm:block">Favorites</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 sm:w-6 h-7 sm:h-6 sm:ml-2 fill-white">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                <div v-if="coinStorage.coinStorage.length" class="absolute inline-flex items-center justify-center w-5 sm:w-6 h-5 sm:h-6 text-xs font-bold text-white bg-blue-600 border-2 rounded-full bottom-1 sm:-top-2 -right-1 sm:-right-2 border-gray-900">
                    {{ coinStorage.coinStorage.length }}
                </div>
            </a>
        </div>
    </div>
</template>