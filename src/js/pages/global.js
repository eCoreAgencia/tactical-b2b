import { isMobile } from '../utils';

$(document).ready(() => {
	const headerFixed = () => {
		const distancePageTop = 100;
		const pageScroll = window.pageYOffset || document.documentElement.scrollTop;

		if (pageScroll >= distancePageTop) {
			$('.header').addClass('header--fixed');
		} else {
			$('.header').removeClass('header--fixed');
		}
	};

	console.log(isMobile.Android());

	if (!isMobile.any()) {
		headerFixed();

		$(window).scroll(() => {
			headerFixed();
		})
	}
	
	$(".footer__column .footer__title").on('click', function(e) {
		$(this).next().toggleClass('active');
	})
    


})
