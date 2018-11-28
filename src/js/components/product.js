import {
	getProductWithVariations
} from '../modules/vtexRequest';
import {
	isMobile,
	slugify
} from '../utils';
class Product {
	constructor() {
		const productId = $('#___rc-p-id').val();
		let self = this;
		const productWithVariations = getProductWithVariations(productId);
		productWithVariations.then(product => {
			if (product.available) {
				self.renderSkuSelectors(product);
			} else {
				self.renderFormNotifyMe(product);
			}
        })
        
        $('.button--plus').on('click', () => {
            self.changeQuantity(1);
        })

        $('.button--minus').on('click', () => {
            self.changeQuantity(-1);
        })
    }
    
    changeQuantity(val) {
        let currentVal = $('.product__qtd-value').val()
        let newVal = +currentVal + +val
        if (newVal) {
            $('.product__qtd-value').val(newVal)
        }
    }

	renderSkuSelectors(product) {
		console.log(product);
		const select = `
            <div class = "product__skus--size product__skus--select">
                <span class="product__skus-title">Tamanho</span>
                <select name="sku-size">
                    ${this.createSkuSelect(product.dimensionsMap.Tamanho)}
                </select>
            </div>`;
		const list = `
            <div class="product__skus--color product__skus--thumb">
                <span class="product__skus-title">Cor</span>
                <ul>
                    ${this.createSkuThumb(product.dimensionsMap.Cor)}
                </ul>
            </div>`;
		const skus = `<div class="product__skus-inner">
                ${list}
                ${select}
        </div>`
		$('.product__skus').html(skus);
		$(window).trigger('skuSelectorCreated');
	}

	createSkuSelect(dimensions) {
		return dimensions.map(dimension => `<option value="${dimension}">${dimension}</option>`).join('');
	}

	createSkuThumb(dimensions) {
		return dimensions.map(dimension => `<li><label for="${slugify(dimension)}">${dimension}</label><input type="radio" id="${slugify(dimension)}" name="sku-color" value="${dimension}"></li>`).join('');
	}

	renderFormNotifyMe() {
		const html = `<div class="product__unavailable">
			<span class="product__unavailable-title"> PRODUTO INDISPONÍVEL</span>
			<p class="product__unavailable-text">
				Preencha os dados e clique no botão abaixo para ser avisado quando houver disponibilidade.
			</p>

			<form class="form" id="form-notifyme" action="/no-cache/AviseMe.aspx">
				<div class="form-control">
					<input class="input" type="text" placeholder="Insira seu nome" name="notifymeClientName" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Insira seu nome...'" />
				</div>
				<div class="form-control">
					<input class="input" type="email" placeholder="Insira seu e-mail" name="notifymeClientEmail" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Insira seu nome...'" />
				</div>
				<button class="btn btn--primary">Avise-Me</button>
			</form>
		</div>`;

		$('.product__action').hide();

		$('.product__skus').html(html);
    }
    buyProduct() {
       
    }
}

$(document).ready(() => {
	if ($('body').hasClass('product')) {
        window.productChoice = {};
        window.Product = new Product();
        
        const shelf__prev = `<button type='button' class='slick-prev shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="43" height="43" viewBox="0 0 43 43"><defs><path id="vcuya" d="M1460 1326.21l21.21-21.21 21.21 21.21-21.21 21.21z"/><path id="vcuyc" d="M1481.5 1318.5l-7.52 7.52"/><path id="vcuyd" d="M1481.5 1333.02l-7.52-7.52"/><clipPath id="vcuyb"><use fill="#fff" xlink:href="#vcuya"/></clipPath></defs><g><g transform="matrix(-1 0 0 1 1503 -1305)"><g><use fill="#fff" fill-opacity="0" stroke="#000" stroke-miterlimit="50" stroke-width="4" clip-path="url(&quot;#vcuyb&quot;)" xlink:href="#vcuya"/></g><g><g><use fill="#fff" fill-opacity="0" stroke="#000" stroke-linecap="square" stroke-miterlimit="50" stroke-width="2" xlink:href="#vcuyc"/></g><g><use fill="#fff" fill-opacity="0" stroke="#000" stroke-linecap="square" stroke-miterlimit="50" stroke-width="2" xlink:href="#vcuyd"/></g></g></g></g></svg></button>`
        const shelf__next = `<button type='button' class='slick-next shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="43" height="43" viewBox="0 0 43 43"><defs><path id="vcuya" d="M1460 1326.21l21.21-21.21 21.21 21.21-21.21 21.21z"/><path id="vcuyc" d="M1481.5 1318.5l-7.52 7.52"/><path id="vcuyd" d="M1481.5 1333.02l-7.52-7.52"/><clipPath id="vcuyb"><use fill="#fff" xlink:href="#vcuya"/></clipPath></defs><g><g transform="matrix(-1 0 0 1 1503 -1305)"><g><use fill="#fff" fill-opacity="0" stroke="#000" stroke-miterlimit="50" stroke-width="4" clip-path="url(&quot;#vcuyb&quot;)" xlink:href="#vcuya"/></g><g><g><use fill="#fff" fill-opacity="0" stroke="#000" stroke-linecap="square" stroke-miterlimit="50" stroke-width="2" xlink:href="#vcuyc"/></g><g><use fill="#fff" fill-opacity="0" stroke="#000" stroke-linecap="square" stroke-miterlimit="50" stroke-width="2" xlink:href="#vcuyd"/></g></g></g></g></svg></button>`
    
		$('.shelf__carousel--full ul').slick({
			arrows: true,
			slidesToShow: 2,
			slidesToScroll: 1,
			infinite: true,
			prevArrow: shelf__prev,
			nextArrow: shelf__next,
			responsive: [
				{
					breakpoint: 800,
					settings: 'unslick'
				}
			]
		});
		if (isMobile.any()) {
			$('.thumbs').slick({
				arrows: false,
				dots: true
			});
        }
        
        const positionFixed = () => {
            const distancePageTop = 100;
            const footerPosition = $('footer').offset().top;
            const windowHeight = $(window).height();
            const pageScroll = window.pageYOffset || document.documentElement.scrollTop;
    
            if (pageScroll >= distancePageTop) {
                $('.product__main .product__info').addClass('product__info--fixed');
                if (footerPosition - windowHeight) { 
                    $('.product__main .product__info--fixed').addClass('product__info--opacity');
                } else {
                    $('.product__main .product__info--fixed').addClass('product__info--opacity');
                }
            } else {
                $('.product__main .product__info').removeClass('product__info--fixed');
			}
			// var nav = $('.product__info');
 
			// $(window).scroll(function () {
			// 	if ($(document).scrollTop() > 115) {
			// 		if ($(this).scrollTop() >= $('main .container').first().height() - 550) {
			// 			nav.removeClass("product__info--fixed");
			// 		} else {
			// 			console.log('teste')
			// 			nav.addClass("product__info--fixed");
			// 		}
			// 	} else {
			// 		nav.removeClass("product__info--fixed");
			// 	}
			// });
        }
        
        if (!isMobile.any()) {
            positionFixed();
    
            $(window).scroll(() => {
                positionFixed();
            })
        }



		$(window).on('skuSelectorCreated', () => {
			$('select').each(function () {
				var $this = $(this),
					numberOfOptions = $(this).children('option').length;

				$this.addClass('select-hidden');
				$this.wrap('<div class="select"></div>');
				$this.after('<div class="select-styled"></div>');

				var $styledSelect = $this.next('div.select-styled');
                $styledSelect.text($this.children('option').eq(0).text());
                $styledSelect.append('<i class="icon-arrow-right"></i>');

				var $list = $('<ul />', {
					'class': 'select-options'
				}).insertAfter($styledSelect);

				for (var i = 0; i < numberOfOptions; i++) {
					$('<li />', {
						text: $this.children('option').eq(i).text(),
						rel: $this.children('option').eq(i).val()
					}).appendTo($list);
				}

				var $listItems = $list.children('li');

				$styledSelect.click(function (e) {
					e.stopPropagation();
					$('div.select-styled.active').not(this).each(function () {
						$(this).removeClass('active').next('ul.select-options').hide();
					});
					$(this).toggleClass('active').next('ul.select-options').toggle();
				});

				$listItems.click(function (e) {
					e.stopPropagation();
                    $styledSelect.text($(this).text()).removeClass('active');
                    $styledSelect.append('<i class="icon-arrow-right"></i>');
					$this.val($(this).attr('rel'));
					$list.hide();
				});

				$(document).click(function () {
					$styledSelect.removeClass('active');
					$list.hide();
                });
                



			});
		});
	}

})
