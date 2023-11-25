// paginationLogic.ts
import { Ref, ref, toRefs, computed } from 'vue';
import { useSearchCoinStore } from '../../stores/searchCoinStore';
import { usePaginationCoinStore } from '../../stores/paginationCoinStore';

export const usePagination = () => {
    const { stats } = toRefs(useSearchCoinStore());
    const paginationStore = usePaginationCoinStore();
    const { currentPage, items, MIN_PAGES, MAX_PAGES, CENTER_PAGES } = toRefs(paginationStore);

    const pagesToShow: Ref<number[]> = ref([])
    const totalPages: Ref<number> = ref(0);

    const leftButton = computed(() => currentPage.value > 1);
    const rightButton = computed(() => currentPage.value <= totalPages.value - 1);
    const leftSeparator = computed(() => currentPage.value > MIN_PAGES.value);
    const rightSeparator = computed(() => currentPage.value <= totalPages.value - MIN_PAGES.value);

    const calculatePageRange = (totalPages: number, currentPage: number) => {
        if (totalPages <= MAX_PAGES.value) return { startPage: 1, endPage: totalPages };

        if (currentPage <= MIN_PAGES.value) return { startPage: 1, endPage: MAX_PAGES.value };

        if (currentPage > totalPages - MIN_PAGES.value) return { startPage: totalPages - MIN_PAGES.value, endPage: totalPages };

        return { startPage: currentPage - CENTER_PAGES.value, endPage: currentPage + CENTER_PAGES.value };
    };

    const calculatePageNumbers = () => {
        totalPages.value = Math.ceil((parseInt(stats.value.total) || 1) / items.value);

        const { startPage, endPage } = calculatePageRange(totalPages.value, currentPage.value);

        pagesToShow.value = Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage)
    };

    return {
        items, pagesToShow, totalPages, currentPage, leftSeparator, rightSeparator, leftButton, rightButton,
        paginationStore, calculatePageNumbers
    };
};