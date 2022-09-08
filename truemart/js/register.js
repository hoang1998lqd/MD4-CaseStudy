function createCustomer() {
    let name = $('#name').val()
    let emailAddress = $('#email').val()
    let password = $('#pwd').val()
    let rePassword = $('#pwd-confirm').val()
    let phoneNumber = $('#number').val()
    let address = $('#address').val()
    let customer = {
        emailAddress: emailAddress,
        password: password,
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        status: 1,
        role: [
            {
                id: 2
            }
        ]

    }
    if (password == rePassword){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(customer),
            url: "http://localhost:8081/api/customers/signup",
            success: function (data) {
                createCart(data.id)
                loginSuccess()
                setTimeout(directLogin, 1000)
            },
            error: function (data) {
                if (data.status === 403 || data.status === 401 || data.status === 500) {
                    setTimeout(500, loginFail())
                } else {
                    setTimeout(500, loginFail())
                }
            }
        })
    }else {
        failPassword()
    }

    event.preventDefault()
}

function directLogin(){
    location.href = "http://localhost:63342/test_case/truemart/login.html";
}

function loginSuccess(){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đăng ký thành công',
        showConfirmButton: false,
        timer: 1500
    })
    return true;
}

function loginFail(){
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Đăng ký thất bại',
        showConfirmButton: false,
        timer: 1500
    })
}
function failPassword(){
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Mật khẩu nhập lại không đúng',
        showConfirmButton: false,
        timer: 1500
    })
}



function createCart(idCustomer) {
    let cart ={
        customer:{
            id: idCustomer
        }
    };
    $.ajax({
        headers:{
            'Authorization': 'Bearer' + localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(cart),
        //tên API
        url: "http://localhost:8081/api/carts",
        //xử lý khi thành công
        success: function () {
        }
    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

// $.ajax({
//     type: "GET",
//     url: "http://localhost:8081/api/customers/id-new-customer",
//     success: function (idCustomer) {
//         localStorage.setItem("idNewCustomer",idCustomer);
//         $.ajax({
//             type:"GET",
//             url: "http://localhost:8081/api/customers/" + localStorage.getItem("idNewCustomer"),
//             success: function (data) {
//                 const ref = firebase.storage().ref();
//                 const file = document.querySelector('#photo').files[0];
//                 const metadata = {
//                     contentType: file.type
//                 }
//                 const name = file.name;
//                 const uploadIMG = ref.child(name).put(file, metadata);
//                 uploadIMG
//                     .then(snapshot => snapshot.ref.getDownloadURL())
//                     .then(url => {
//                         let id = localStorage.getItem("idNewCustomer")
//                         let name = data.name
//                         let emailAddress = data.emailAddress
//                         let password = data.password
//                         let phoneNumber = data.phoneNumber
//                         let address = data.address
//                         let customer = {
//                             id: id,
//                             emailAddress: emailAddress,
//                             password: password,
//                             name: name,
//                             phoneNumber: phoneNumber,
//                             address: address,
//                             image: url,
//                             status: 1,
//                             role: [
//                                 {
//                                     id: 2
//                                 }
//                             ]
//                         }
//                         $.ajax({
//                             headers: {
//                                 'Accept': 'application/json',
//                                 'Content-Type': 'application/json'
//                             },
//                             type: "PUT",
//                             data: JSON.stringify(customer),
//                             //tên API
//                             url: "http://localhost:8081/api/customers",
//                             //xử lý khi thành công
//                             success: function () {
//                                 localStorage.removeItem("idNewCustomer")
//                             }
//                         });
//                     })
//             }
//         })
//     }
// })



