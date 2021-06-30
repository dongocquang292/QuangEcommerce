const paginationInfo = () => {
    const pageCount = Math.ceil(itemCount / pageSize); // lam tron
    if (currentPage > pageCount) {
        return {
            currentPage,
            pageSize,
            itemCount,
            visibleCount: 0,
            pageCount: 0,
            visiblePages: []
        };
    }

    //visiblePages
    const visiblePages = [];
    const visibleCount = _visibleCount % 2 === 0 ? _visibleCount + 1 : _visibleCount;
    const pivot = Math.floor(visibleCount / 2);
}