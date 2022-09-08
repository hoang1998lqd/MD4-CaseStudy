function loginCustomer(){
    let emailAddress = $('#input-email').val()
    let password = $('#input-password').val()

    let customer = {
        emailAddress: emailAddress,
        password: password,
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(customer),
        url: "http://localhost:8081/api/customers/login",
        success: function (data) {
            localStorage.setItem("idCustomer", data.id)
            localStorage.setItem("token", data.token);
            localStorage.setItem("type", data.type);
            localStorage.setItem("username", data.username);
            if (loginSuccess()){
                for (let i = 0; i < data.roles.length; i++) {
                    if (data.roles[i].authority === "USER") {
                        setTimeout(directShop, 1000)
                    } else
                        setTimeout(directAmin, 1000)
                }
            }

        },
        error: function (data) {
            if (data.status === 403 || data.status === 401) {
                setTimeout(500, loginFail())
            } else {
                setTimeout(500, loginFail())
            }
        }
    })
    event.preventDefault();
}

function directAmin(){
    location.href = "http://localhost:63342/test_case/templatemo_524_product_admin/products.html";
}

function directShop(){
    location.href = "http://localhost:63342/test_case/truemart/shop.html";
}

function loginSuccess(){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đăng nhập thành công',
        showConfirmButton: false,
        timer: 1500
    })
    return true;
}

function loginFail(){
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Đăng nhập thất bại',
        showConfirmButton: false,
        timer: 1500
    })
}