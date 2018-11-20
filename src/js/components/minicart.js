class Minicart {
	constructor() {
		$(window).on('orderFormUpdated.vtex', (evt, orderForm) => {
			this.update(orderForm);
		});
		vtexjs.checkout.getOrderForm();
	}
	renderItem(item, i) {
		let { quantity } = item;
		return `
		 <li class="minicart-product" data-item-id="${item.id}">
		 	<div class="minicart-product__wrapper">
				<div class="minicart-product__image"><img src="${item.imageUrl}"></div>
				<div class="minicart-product__wrapper-flex">
					<div class="minicart-product__info">
						<h4 class="minicart-product__name">${item.name}</h4>
						<strong class="minicart-product__price">R$ ${(item.price / 100).formatMoney()}</strong>
					</div>
					<button class="minicart-product__remove" type="button" onclick="Minicart.removeItem.apply(null, [${i}])" title="Remover ${item.name} do carrinho"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="10" viewBox="0 0 10 10"><defs><path id="dmqka" d="M1685 451.047c0 .21-.084.421-.236.573l-1.144 1.144a.816.816 0 0 1-1.145 0L1680 450.29l-2.475 2.474a.816.816 0 0 1-1.145 0l-1.144-1.144a.816.816 0 0 1 0-1.145l2.474-2.475-2.474-2.475a.816.816 0 0 1 0-1.145l1.144-1.144a.816.816 0 0 1 1.145 0l2.475 2.474 2.475-2.474a.816.816 0 0 1 1.145 0l1.144 1.144a.816.816 0 0 1 0 1.145L1682.29 448l2.474 2.475a.816.816 0 0 1 .236.572z"/></defs><g><g transform="translate(-1675 -443)"><use fill="#e75300" xlink:href="#dmqka"/></g></g></svg> Remover</button>
				</div>
			</div>
         </li>
       `;
	}

	renderItems() {
		return this.orderForm.items.map(this.renderItem, this).join('');
	}

	render() {
		let qty = this.getQuantity();
		return `
         <div class="minicart ${qty > 0 ? 'is-not-empty' : ''}">
            <button class="minicart__handle" title="sacola">
				<span class="minicart__count">
					<i class="icon-cart"></i>
                    <span class="minicart__count-value">${this.printQuantity(qty)}</span>
				</span>
            </button>
            <div class="minicart__overlay"></div>
            <div class="minicart__container">
                <div class="minicart__header">
                    <button class="minicart__handle" title="sacola">
                        <i class="minicart__icon"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="16" viewBox="0 0 10 16"><defs><path id="ic9la" d="M1557.914 33.18l1.536 1.544a.59.59 0 0 1 0 .838l-4.942 4.943 4.942 4.942a.59.59 0 0 1 0 .838l-1.536 1.545a.601.601 0 0 1-.847 0l-6.897-6.907a.59.59 0 0 1 0-.837l6.897-6.907a.601.601 0 0 1 .847 0z"/></defs><g><g transform="translate(-1550 -33)"><use fill="#e75300" xlink:href="#ic9la"/></g></g></svg></i>
                        <span class="minicart__title">Continuar Comprando</span>
					</button>
				</div>
				<div class="minicart__review">
					<div class="minicart__review-header">
						<span class="minicart__item-counter">MEU CARRINHO</span>
						<span class="minicart__item-qty"> (${this.printQuantity(qty)} ITENS)</span>
					</div>
					<div class="minicart__dsp-total">
						<span class="minicart__dsp-txt">Subtotal do Carrinho:</span>
						<span class="minicart__dsp-number">${this.getTotal()}</span>
					</div>
				</div>
				<a class="minicart__checkout" href="/Site/Carrinho.aspx">IR PARA O CARRINHO</a>
                <div class="minicart__content">
                    <ul class="minicart__products">
                        ${this.renderItems()}
                    </ul>
                </div>
                <div class="minicart__footer">
                    <a class="minicart__checkout" href="/Site/Carrinho.aspx">IR PARA O CARRINHO</a>
                </div>
            </div>
         </div>
       `;
	}

	removeItem(index) {
		vtexjs.checkout.removeItems([
			{
				index
			}
		]);
	}

	updateItem(obj) {
		let { index, qty, calc } = obj;
		let quantity = qty + +calc;
		if (quantity) {
			vtexjs.checkout.updateItems(
				[
					{
						index,
						quantity
					}
				],
				null,
				false
			);
		}
	}

	getTotal() {
		const itemsTotal = this.orderForm.totalizers.find(item => item.id === 'Items');
		const total = itemsTotal ? itemsTotal.value / 100 : 0;
		return `R$ ${total.formatMoney()}`;
	}

	getQuantity() {
		const qty = this.orderForm.items.reduce((prev, next) => prev + next.quantity, 0);
		return qty;
	}

	printQuantity(qty) {
		return `${qty}`;
	}

	update(orderForm) {
		this.orderForm = orderForm;
		this.mount();
	}

	mount() {
		$('.js-minicart').html(this.render());
	}
}

$(document).ready(function() {
	window.Minicart = new Minicart();

	$('body').on('click', '.minicart__handle', function() {
		$('.minicart').toggleClass('active');
	});
});
