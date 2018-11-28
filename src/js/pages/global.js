import { isMobile } from '../utils';

function userActive() {
	const stateUser = localStorage.getItem("userEcore");
	console.log(stateUser);
	if(stateUser == "true") {
		console.log('e true')
		$('.user-logged').css('display', 'block');
		$('.user-off').css('display', 'none');
	} else {
		console.log('e false')
		$('.user-logged').css('display', 'none');
		$('.user-off').css('display', 'block');
	}
}

$(document).ready(() => {
	userActive();

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
	};
	
	$(".footer__column .footer__title").on('click', function(e) {
		$(this).next().toggleClass('active');
	});
})
