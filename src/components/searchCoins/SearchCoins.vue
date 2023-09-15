<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { Ref } from "vue";
import { Coin } from "../../interfaces/Data";
import { getSearchCoinsCurrencies } from "../../services/CoinService";

const inputRef: Ref<HTMLInputElement | null> = ref(null);
const showClear: Ref<boolean> = ref(false);
let timeoutId: NodeJS.Timeout | undefined;

const emits = defineEmits<{
    (event: "emitsCoins", value: Coin[]): void;
    (event: "emitsIsLoading", value: boolean): void;
    (event: "emitsNoFound", value: boolean): void;
    (event: "emitsOffsef", value: number): void;
    
}>();

const handleSearch = async () => {
    try {

        const data = await getSearchCoinsCurrencies(inputRef.value?.value);

        if (data.coins.length) {

            emits("emitsIsLoading", true);

            emits("emitsNoFound", false);

            await emits("emitsCoins", data.coins);

        } else {

            emits("emitsCoins", []);

            emits("emitsNoFound", true);

            emits("emitsIsLoading", true);

        };

    } catch (err: unknown) {

    }
}

const handleInputSearch = () => {
    showClear.value = inputRef.value?.value !== "";

    emits("emitsIsLoading", false);

    if (timeoutId !== undefined) { clearTimeout(timeoutId); }

    timeoutId = setTimeout(() => {
        handleSearch();
    }, 500);
};

const handleSearchClear = () => {
    if (inputRef.value?.value) {
        inputRef.value.value = '';
        showClear.value = false;
        emits('emitsOffsef', -0);
        emits("emitsNoFound", false);
    };
};

</script>

<template>
    <div class="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8">

        <div class="flex items-center justify-between pb-8">

            <div class="w-[128px] grow max-w-lg">
                <div class="relative mr-4">
                    <span class="sr-only">Search</span>
                    <span class="absolute inset-y-0 left-0 flex items-center pl-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}
                            stroke="white" width="20px" height="20px">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </span>
                    <input type="text" name="search" id="search" ref="inputRef" @input="handleInputSearch" class="placeholder:italic block w-full 
                    py-1.5 pl-12 pr-6 min-[435px]:pr-11 bg-transparent rounded-full border border-gray-400 text-white focus:outline-none focus:ring-0
                    ring-zinc-700 [&amp;::-webkit-search-cancel-button]:hidden [&amp;::-webkit-search-decoration]:hidden
                    [&amp;::-webkit-search-results-button]:hidden [&amp;::-webkit-search-results-decoration]:hidden"
                        aria-autocomplete="both" aria-labelledby=":r1:-label" autoComplete="off" autoCorrect="off"
                        autoCapitalize="off" enterKeyHint="search" spellCheck="false" placeholder="Buscar en Coinsver..." />
                    <span v-if="showClear" class="max-[435px]:hidden absolute inset-y-0 right-0 flex items-center pr-3">
                        <button type="button" @click="handleSearchClear()"
                            class="rounded-full bg-neutral-500 hover:bg-neutral-400 p-[2px]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.0"
                                stroke="currentColor" class="w-3 h-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </span>
                </div>
            </div>

            <div>
                <a href="/favorites"
                    class="hidden sm:inline-flex items-center text-white px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-450 ease-in-out">
                    Favorites
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="w-6 h-6 ml-2 fill-white">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                </a>
                <a href="/favorites" class="block sm:hidden p-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="w-6 h-6 fill-white hover:fill-red-600">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                </a>
            </div>

        </div>

    </div>
</template>