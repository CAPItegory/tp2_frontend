interface SearchEventResult {
    totalElements: number,
    totalPages: number,
    size: number,
    content: Event[],
    number: number,
    sort: {
        direction: string,
        nullHandling: string,
        ascending: boolean,
        property: string,
        ignoreCase: boolean
    }[]
    pageable: {
        offset: number,
        sort: {
            direction: string,
            nullHandling: string,
            ascending: boolean,
            property: string,
            ignoreCase: boolean
        }[],
        paged: boolean,
        pageNumber: number,
        pageSize: number,
        unpaged: boolean
    },
    first: boolean,
    last: boolean,
    numberOfElements: number,
    empty: boolean
}