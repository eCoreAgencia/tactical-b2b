class SearchMob {
    constructor() {
        this.openSearch();
    }

    openSearch() {
        $('.header__search-form .btn--search').on('click', function(e) {
            $('.js-search-form').toggleClass('active');
        });
    }
}

window.SearchMob = new SearchMob();