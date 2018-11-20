class Account {
    constructor() {
        this.getUser();
    }

    getUser() {
        vtexjs.checkout.getOrderForm().done(function(orderForm) {
            const data = orderForm;
            let name   = data.clientProfileData.firstName;
            let email  = data.clientProfileData.email;

            if(name) {
                $('.section__account__box__tlt').text('Olá '+name);
            } else {
                $('.section__account__box__tlt').text('Olá '+email);
            }
        });
    }
}

$(document).ready(function() {
    if($('body').hasClass('account')) {
        window.Account = new Account();
    }
})