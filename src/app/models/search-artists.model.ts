interface SearchArtistResult {
    totalElements: number,
    totalPages: number,
    size: number,
    content: Artist[],
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