class Login {
    constructor() {
        this.loginUser();
        this.insertMensager(mensager, classname, inject);
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
                    this.insertMensager("Usuario não encontrado !", "not-regitered--red", ".contentForm");
                } else {
                    if(result[0].ativo) {

                    } else {
                        alertLogin = "\
                        <div class='not-regitered'>\
                            <p>Usuario não encontrado !</p>\
                        </div>";

                        $('.contentForm').append(alertLogin);
                    }
                }
            });
        });
    }
}

window.Login = new Login();