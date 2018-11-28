class Login {
    constructor() {
        this.loginUser();
        //this.insertMensager(mensager, classname, inject);
        this.buttonActions();
    }

    insertMensager(mensager, classname, inject) {
        let alertLogin  =  "<div class='"+classname+"'><p>"+mensager+"</p></div>";
        $('"'+inject+'"').append(alertLogin);
    }

    loginUser() {
        $('.main-login').on('click', function(e) {
            e.preventDefault();
            let cnpj    = $('#login-cnpj').val();
            let senha   = $('#senha').val();
            console.log(cnpj)
            $.ajax({
                "async": true,
                "crossDomain": true,
                "url": "http://api.vtexcrm.com.br/tactical/dataentities/LG/search?_where=cnpj="+cnpj+" AND senha="+senha+"&_fields=ativo,id",
                "type": "GET",
                "contentType": "application/json",
            }).done(function (data) {
                const result = data;

                if(result.length == 0) {
                    let alertLogin  =  "<div class='not-regitered--red'><p>Usuario não encontrado </p></div>";
                    $('.contentForm').append(alertLogin);
                    setTimeout(function() {
                        $('.not-regitered--red').remove();
                    }, 5000);
                } else {
                    if(result[0].ativo) {
                        console.log('entro')
                        localStorage.setItem("userEcore", true);
                        localStorage.setItem("idUserEcore", result[0].id);

                        window.location = "/";
                    } else {
                        let alertLogin = "\
                        <div class='not-regitered--red'>\
                            <p>Você já esta cadastro, agora e só esperar a ativação do seu cadastro!</p>\
                        </div>";

                        $('.contentForm').append(alertLogin);
                        setTimeout(function() {
                            $('.not-regitered--red').remove();
                        }, 5000);
                    }
                }
            });
        });
    }

    buttonActions() {
        $('.createaccount').on('click', function(e) {
            e.preventDefault();
            $(this).parents('.modalLogin__box--item').css('display','none');
            $('#searchCnpj').fadeIn();
        })

        $('.backOption').on('click', function(e) {
            e.preventDefault();
            $(this).parents('.modalLogin__box--item').css('display','none');
            $('#optionAcess').fadeIn();
        })

        $('.hasaccount').on('click', function(e) {
            e.preventDefault();
            $(this).parents('.modalLogin__box--item').css('display','none');
            $('#login').fadeIn();
        })
    }
}

window.Login = new Login();