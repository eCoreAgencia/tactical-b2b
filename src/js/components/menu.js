class MenuMobile {
    constructor(){

    }
    openMenu(element){
        element.addClass('is-open');
    }
    closeMenu(element){
        element.removeClass('is-open');
        $('.menu--level').removeClass('is-open');
    }

    openSubmenu(element) {
        const submenu = element.data('submenu');

        $(`.${submenu}`).addClass('is-open');
    }
    closeSubmenu(element) {
       $(element).removeClass('is-open');
    }
}


$(document).ready(function(){
    const menuMobile = new MenuMobile();
    const headerMenu = $('.header__menu');
    $('.btn--menu').on('click', () => {
        menuMobile.openMenu(headerMenu)
    });
   $('.btn--close').on('click', () => {
        menuMobile.closeMenu(headerMenu)
   });

   $('.menu__item--dropdown').on('click', function(e){
        e.preventDefault();
        menuMobile.openSubmenu($('.menu__link', this));
   })

   $('.menu__item--dropup').on('click', function(e){
        e.preventDefault();
        menuMobile.closeSubmenu($(this).parent());
    })
})