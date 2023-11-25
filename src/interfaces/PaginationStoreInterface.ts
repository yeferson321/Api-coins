// Defining an interface.
export interface PaginationStoreInterface {
    offset: number;
    items: number;
    halfItem: number;
    pagesToShow: number[];
    MIN_PAGES: number;
    MAX_PAGES: number;
    CENTER_PAGES: number;
};