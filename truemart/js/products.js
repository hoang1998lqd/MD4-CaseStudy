getProducts()

function loadCategories() {
    $.ajax({
        headers:{
            'Authorization': 'Bearer' + localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8081/api/categories",
        success: function (data) {
            let content = ""
            content += ' <option >' + "---" +
                '</option>'
            for (let i = 0; i < data.length; i++) {
                content += ' <option value="' + data[i].id + '">' + data[i].name +
                    '</option>'
            }
            document.getElementById("select-category").innerHTML = content;
        }
    })
}


function getProducts() {
    $.ajax({
        headers:{
            'Authorization': 'Bearer' + localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8081/api/products",
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                localStorage.setItem(data[i].product.id, data[i].imageURLS[1])
            }
            loadTable(data)
            pagination(data)
        }
    })
}

let perPage = 6;
let currenPage = 1;
let start = 0;
let end = perPage;
let totalPage = 5;

function pagination(list) {
    let content = ""
    content += "<li><a onclick='previousPage()' class='btn-previous'><i class='fa fa-angle-left'></i></a></li>"
    for (let i = 1; i <= Math.ceil((list.length)/perPage); i++) {
        content += "<li><a onclick='nextNumber(" + i + ")' >" + i + "</a></li>"
    }
    content += " <li><a onclick='nextPage()' class='btn-next'><i class='fa fa-angle-right'></i></a></li>"
    document.getElementById("pagination").innerHTML = content
    infoPage(currenPage)
}

function infoPage(text) {
    document.getElementById("infoPage").innerHTML = "<span class=\'grid-item-list\'>" + "Trang " + text + "(Tổng: " + totalPage + " trang) " + " </span>"
    // "Trang" + text + "(Tổng: " + totalPage + " trang)"
}

nextNumber(1)
function nextNumber(number) {
    currenPage = number;
    start = (currenPage - 1) * perPage
    end = currenPage * perPage
    getProducts()
    infoPage(number)

}
function nextPage() {
    currenPage++;
    if (currenPage > totalPage) {
        currenPage = totalPage
    }
    start = (currenPage - 1) * perPage
    end = currenPage * perPage
    getProducts()
    infoPage(currenPage)
}

function previousPage() {
    currenPage--;
    if (currenPage <= 1) {
        currenPage = 1
    }
    start = (currenPage - 1) * perPage
    end = currenPage * perPage
    getProducts()
    infoPage(currenPage)
}




function loadTable(list)    {
    let idCustomer = localStorage.getItem("idCustomer");
    let content = "";
    for (let i = start; i < end; i++) {
        content += ""
        content += " <div class='col-lg-4 col-md-4 col-sm-6 col-6'>\n"
        content += "                                            <div class=\'single-product\'>"
        content +=        "                                                <div class=\'pro-img\'>"
        content +=      "                                                    <a href=\'product.html\'> "
        content +=     "                                                        <img class=\'primary-img\' src=\'" + list[i].imageURLS[0] + "'  onclick='detailProduct("+ list[i].product.id  +")' alt=\'single-product\'>"
        content +=      "                                                        <img class=\"secondary-img\" src=\'" + list[i].imageURLS[1] + "' onclick='detailProduct("+ list[i].product.id  +")' alt=\'single-product\'>"
        content +=      "                                                    </a>"
        content +=       "                                                    <a href=\"#\" class=\"quick_view\" data-toggle=\"modal\" data-target=\"#myModal\" title=\"Quick View\"><i class=\"lnr lnr-magnifier\"></i></a>"
        content +=       "                                                </div>"
        content +=      "                                                <div class=\"pro-content\">"
        content +=        "                                                    <div class=\"pro-info\">"
        content +=        "                                                        <h4><a href=\"product.html\">" + list[i].product.name + "</a></h4>"
        content +=        "                                                        <p><span class=\"price\">" + changePrice(list[i].product.price)  + "</span></p>"
        if (list[i].product.discount > 0){
            content +=        "                                                        <div class=\"label-product l_sale\">" + list[i].product.discount+ "<span class=\"symbol-percent\">%</span></div>"
        }
        content +=        "                                                    </div>"
        content +=        "                                                    <div class=\"pro-actions\">"

        content +=         "                                                        <div class=\"actions-primary\">"
        if (list[i].product.amount > 0){
            content +=        "                                                           <a onclick='createItem("+ list[i].product.id  +")' title=\"\" data-original-title=\"Add to Cart\"> + Thêm vào giỏ</a> "
        }else {
            content +=        "                                                           <a onclick= title=\"\" data-original-title=\"Add to Cart\"> + Tạm thời hết hàng</a> "
        }
        content +=         "                                                        </div>"
        content +=        "                                                        <div class=\"actions-secondary\">"
        content +=        "                                                            <a href=\"compare.html\" title=\"Compare\"><i class=\"lnr lnr-sync\"></i> <span>Add To Compare</span></a>"
        content +=        "                                                            <a href=\"wishlist.html\" title=\"WishList\"><i class=\"lnr lnr-heart\"></i> <span>Add to WishList</span></a>"
        content +=        "                                                        </div>"
        content +=        "                                                    </div>"
        content +=       "                                                </div> "
        content +=        "                                                </div> "
        content +=       "                                                </div> "
    }
    document.getElementById("products-page").innerHTML = content;
}


//Detail Product
function detailProduct(idProduct) {


}


function changePrice(n){
    const formatter = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'VND',
        // minimumFractionDigits: 2
    })
    return  formatter.format(n);
}

//Create Item
// Đã check theo Item trùng
function createItem(idProduct) {
    console.log(idProduct)
    let idCustomer = localStorage.getItem("idCustomer")
    $.ajax({
        headers:{
            'Authorization': 'Bearer' + localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8081/api/carts/item/" + idCustomer,
        success: function (data) {
            let flag = false;
            for (let i = 0; i < data.length; i++) {
                if (data[i].product.id == idProduct){
                    flag = true;
                    let quantity = data[i].quantity + 1;
                    if (quantity > data[i].product.amount){
                        quantity = data[i].product.amount
                    }
                    let item = {
                        id : data[i].id,
                        quantity : quantity,
                        cart:{
                            id: idCustomer
                        },
                        product:{
                            id: idProduct
                        }
                    }
                    $.ajax({
                        headers:{
                            'Authorization': 'Bearer' + localStorage.getItem("token"),
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        // headers: {
                        //     'Accept': 'application/json',
                        //     'Content-Type': 'application/json'
                        // },
                        type: "PUT",
                        data: JSON.stringify(item),
                        //tên API
                        url: "http://localhost:8081/api/carts/item/",
                        //xử lý khi thành công
                        success: function () {
                            addItemSuccess()
                            getItemByCustomerId()
                        }
                    });
                }
            }
            if (!flag){
                let quantity = 1;
                let item = {
                    quantity : quantity,
                    cart:{
                        id: idCustomer
                    },
                    product:{
                        id: idProduct
                    }
                }
                $.ajax({
                    headers:{
                        'Authorization': 'Bearer' + localStorage.getItem("token"),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    type: "POST",
                    data: JSON.stringify(item),
                    //tên API
                    url: "http://localhost:8081/api/carts/item",
                    //xử lý khi thành công
                    success: function () {
                        addItemSuccess()
                        getItemByCustomerId()
                    }
                });
            }
        }
    })

    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function addItemSuccess() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đã thêm sản phẩm vào giỏ hàng vào giỏ hàng',
        showConfirmButton: false,
        timer: 1500
    })
}

function logOut() {
    localStorage.removeItem("idCustomer")
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("countItem")
    window.location.replace("http://localhost:63342/test_case/truemart/shop.html")
}

// Create Cart
function createCart(idCustomer) {
    idCustomer = localStorage.getItem("idCustomer")
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

// TÌm kiếm Item theo ID người dùng
getItemByCustomerId()
function getItemByCustomerId() {
    let idCustomer = localStorage.getItem("idCustomer")
    $.ajax({
        headers:{
            'Authorization': 'Bearer' + localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8081/api/carts/item/" + idCustomer,
        success: function (data) {
            displayItem(data);
            displayItemInCart(data)
        }
    })
}



function displayItem(items) {
    let countItem = 0;
    let subtotal = 0;
    let content = "";
    for (let i = 0; i < items.length; i++) {
        content += "<div class=\"single-cart-box\">\n" +
            "       <div class=\"cart-img\">\n" +
            "       <a href=\"#\"><img src=" + localStorage.getItem(items[i].product.id )+ " alt=\"cart-image\"></a>\n" +
            "           <span class=\"pro-quantity\">" + items[i].quantity + "</span>\n" +
            "         </div>\n" +
            "         <div class=\"cart-content\">\n" +
            "          <h6><a href=\"product.html\">  " + items[i].product.name + "   </a></h6>\n" +
            "             <span class=\"cart-price\"> " + changePrice(items[i].product.price ) + " </span>\n" +
            // "             <span>Size: S</span>\n" +
            "            <span> " + items[i].product.color + "</span>\n" +
            "             </div>\n" +
            "                <a class=\"del-icone\" href=\"#\"><i class=\"ion-close\" onclick='deleteItem("+items[i].id +")'></i></a>\n" +
            "           </div>"
    }
    for (let i = 0; i < items.length; i++) {
        let totalItem = (items[i].product.price - (items[i].product.price * items[i].product.discount)/100 )* items[i].quantity;
        subtotal += totalItem
        countItem ++;
    }
    localStorage.setItem("count-item", countItem)
    let discount = 0;
    let ship = 0;
    content += "<div class=\"cart-footer\">\n" +
        "         <ul class=\"price-content\">\n" +
        "           <li>Thành tiền <span>"+ changePrice(subtotal) +"</span></li>\n" +
        // "       <li>Khuyến mãi <span>"+ discount+"</span></li>\n" +
        "              <li>Phí Ship <span>"+ ship+"</span></li>\n" +
        "          <li>Thanh toán <span>"+ changePrice(subtotal - discount - ship) +"</span></li>\n" +
        "         </ul>\n" +
        "            <div class=\"cart-actions text-center\">\n" +
        "        <a class=\"cart-checkout\" href=\"cart.html\">Thanh toán</a>\n" +
        "       </div>\n" +
        "         </div>"
    document.getElementById('display-item-shop').innerHTML = content
    document.getElementById('count-item').innerHTML = localStorage.getItem("count-item")
}


// Xóa Item khỏi Cart khi người dùng không muốn mua nó nữa
function deleteItem(idItem) {
    Swal.fire({
        title: 'Bạn có chắc muốn xóa ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Xóa!',
                'Sản phẩm đã được xóa khỏi giỏ hàng.',
                'success',
                $.ajax({
                    headers:{
                        'Authorization': 'Bearer' + localStorage.getItem("token"),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    type: "DELETE",
                    url: "http://localhost:8081/api/carts/item/" + idItem,
                    success: function () {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Xóa thành công',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        getItemByCustomerId()
                    }

                })
            )
        }
    })
}

function checkOutDone() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Đặt hàng thành công',
        showConfirmButton: false,
        timer: 1500
    })
}

// Hiển thị Item ở trên trang giỏ hàng

function displayItemInCart(items) {
    let idCustomer = localStorage.getItem("idCustomer");
    let subtotal = 0;
    let content = "";
    for (let i = 0; i <items.length ; i++) {
        content += " <tr>"
        content += " <td class=\"product-thumbnail\">\n" +
            "    <a href=\"#\"><img src=" + localStorage.getItem(items[i].product.id )+ " alt=\"cart-image\" /></a>\n" +
            "      </td>\n" +
            "  <td class=\"product-name\"><a href=\"#\">"+ items[i].product.name +"</a></td>\n" +
            "    <td class=\"product-price\"><span class=\"amount\">"+ changePrice(items[i].product.price) +"</span></td>\n" +
            "  <td class=\"product-quantity\"><input type=\"number\" id='quantity-"+ items[i].id +"' value="+ items[i].quantity +" /></td>\n" +
            "    <td class=\"product-subtotal\">"+ changePrice(items[i].product.price * items[i].quantity) +"</td>\n" +
            "   <td class=\"product-remove\"> <a href=\"#\"><i class=\"fa fa-times\" aria-hidden=\"true\" onclick='deleteItem("+items[i].id +")'></i></a></td>"
        content += "</tr>"
    }
    for (let i = 0; i < items.length; i++) {
        let totalItem = (items[i].product.price - (items[i].product.price * items[i].product.discount)/100 )* items[i].quantity;
        subtotal += totalItem
    }
    let result = "";
    result += "<div class=\"cart_totals float-md-right text-md-right\">\n" +
        "                                        <h2>Tổng tiền giỏ hàng</h2>\n" +
        "                                        <br />\n" +
        "                                        <table class=\"float-md-right\">\n" +
        "                                            <tbody>\n" +
        "                                                <tr class=\"cart-subtotal\">\n" +
        "                                                    <th>Thành tiền</th>\n" +
        "                                                    <td><span class=\"amount\">"+ changePrice(subtotal) +"</span></td>\n" +
        "                                                </tr>\n" +
        "                                                <tr class=\"order-total\">\n" +
        "                                                    <th>Tổng tiền</th>\n" +
        "                                                    <td>\n" +
        "                                                        <strong><span class=\"amount\">"+ changePrice(subtotal) +"</span></strong>\n" +
        "                                                    </td>\n" +
        "                                                </tr>\n" +
        "                                            </tbody>\n" +
        "                                        </table>\n" +
        "                                        <div class=\"wc-proceed-to-checkout\">\n" +
        "                                           <a onclick='createOrder("+ idCustomer+")'>Tiến hành thanh toán</a>\n" +
        "                                        </div>\n" +
        "                                    </div>"
    document.getElementById('display-item-cart').innerHTML = content
    document.getElementById('checkout-item').innerHTML = result
}
// Thanh toán đơn hàng


function createOrder(idCustomer) {
    idCustomer = localStorage.getItem("idCustomer");
    let orders ={
        status_exist: 1,
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
        data: JSON.stringify(orders),
        //tên API
        url: "http://localhost:8081/api/orders",
        //xử lý khi thành công
        success: function () {
            $.ajax({
                headers:{
                    'Authorization': 'Bearer' + localStorage.getItem("token"),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "GET",
                //tên API
                url: "http://localhost:8081/api/orders/id-new-order",
                //xử lý khi thành công
                success: function (data) {
                    localStorage.setItem("idNewOrder", data)
                    $.ajax({
                        headers:{
                            'Authorization': 'Bearer' + localStorage.getItem("token"),
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        type: "GET",
                        url: "http://localhost:8081/api/carts/item/" + idCustomer,
                        success: function (data) {
                            for (let i = 0; i < data.length; i++) {
                                let order_detail ={
                                    quantity : data[i].quantity,
                                    orders:{
                                        id:localStorage.getItem("idNewOrder")
                                    },
                                    product:{
                                        id:data[i].product.id
                                    }
                                }
                                $.ajax({

                                    headers:{
                                        'Authorization': 'Bearer' + localStorage.getItem("token"),
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    type: "POST",
                                    data: JSON.stringify(order_detail),
                                    //tên API
                                    url: "http://localhost:8081/api/orders/order-detail",
                                    success: function () {
                                            let name = data[i].product.name;
                                            let price = data[i].product.price;
                                            let amount = data[i].product.amount - data[i].quantity;
                                            let color = data[i].product.color;
                                            let description = data[i].product.description;
                                            let discount = data[i].product.discount;
                                            let category_id = data[i].product.category.id;
                                            let brand_id = data[i].product.brand.id;
                                            let id = data[i].product.id;
                                            let status = 1
                                            let Product = {
                                                id: id,
                                                name: name,
                                                price: price,
                                                amount: amount,
                                                color: color,
                                                description: description,
                                                status : status,
                                                discount: discount,
                                                brand: {
                                                    id: brand_id
                                                },
                                                category: {
                                                    id: category_id
                                                }
                                            };

                                            $.ajax({
                                                headers:{
                                                    'Authorization': 'Bearer' + localStorage.getItem("token"),
                                                    'Accept': 'application/json',
                                                    'Content-Type': 'application/json'
                                                },
                                                type: "PUT",
                                                data: JSON.stringify(Product),
                                                //tên API
                                                url: "http://localhost:8081/api/products",
                                                //xử lý khi thành công
                                                success: function () {
                                                    $.ajax({
                                                        headers:{
                                                            'Authorization': 'Bearer' + localStorage.getItem("token"),
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        type: "DELETE",
                                                        url: "http://localhost:8081/api/carts/item/" + data[i].id,
                                                        success: function () {
                                                        }
                                                    })
                                                }
                                            });
                                            //chặn sự kiện mặc định của thẻ
                                            event.preventDefault();
                                    }
                                })
                            }

                            setTimeout(checkOutDone, 3000)
                           setTimeout(reloadPageHome,5000)

                        }
                    })
                }
            });

        }
    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}
let name = localStorage.getItem("phone")
document.getElementById('phone').value = name
console.log(name)
function reloadPageHome() {
    window.location.replace("http://localhost:63342/truemart/shop.html?_ijt=7eqjqfcihh7o2rq1gr91ff9jm0&_ij_reload=RELOAD_ON_SAVE")

}

//Phần hiển thị bên trang Check-out
displayCheckOut()
function displayCheckOut() {
    let idCustomer = localStorage.getItem("idCustomer")
    console.log(idCustomer)
    $.ajax({
        headers:{
            'Authorization': 'Bearer' + localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8081/api/carts/item/" + idCustomer,
        success: function (data) {
          let content =  ""
            for (let i = 0; i < data.length; i++) {
              content += `
               <tr class="cart_item">
                                        <td class="product-name">
                                             `+ data[i].product.name +` <span class="product-quantity"> × `+ data[i].quantity +`</span>
                                        </td>
                                        <td class="product-total">
                                            <span class="amount"> `+ changePrice((data[i].product.price * data[i].quantity)) +`</span>
                                        </td>
                                    </tr>`
            }
            let total = 0;
            for (let i = 0; i < data.length; i++) {
                total += data[i].product.price * data[i].quantity
            }
            let result = ""
            result += `   <th>Số tiền cần thanh toán</th>
                                            <td><span class=" total amount">`+ changePrice(total) +`</span>
                                            </td>`
            document.getElementById('total-money-checkout').innerHTML = result
            document.getElementById('check-out').innerHTML = content
        }
    })
    
}


function updateQuantityToCart(idCustomer) {
    idCustomer = localStorage.getItem("idCustomer")
    // console.log(document.getElementById('quantity-39').value)
    $.ajax({
        headers:{
            'Authorization': 'Bearer' + localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8081/api/carts/item/",
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                let newQuantity = document.getElementById('quantity-'+data[i].id).value
                let item = {
                    id : data[i].id,
                    quantity : newQuantity,
                    cart:{
                        id: idCustomer
                    },
                    product:{
                        id: data[i].product.id
                    }
                }
                $.ajax({
                    headers:{
                        'Authorization': 'Bearer' + localStorage.getItem("token"),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    type: "PUT",
                    data: JSON.stringify(item),
                    //tên API
                    url: "http://localhost:8081/api/carts/item/",
                    //xử lý khi thành công
                    success: function () {
                        updateToCartDone()
                        setTimeout(updateCart,2000)
                    }
                });
            }
        }
    })
}

// Thanh toán đơn hàng
function updateCart() {
    window.location.replace("http://localhost:63342/truemart/cart.html?_ijt=sqdjj1tr44ku23egefqh6hpv0o&_ij_reload=RELOAD_ON_SAVE")
}
function updateToCartDone() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cập nhật giỏ hàng thành công',
        showConfirmButton: false,
        timer: 1500
    })
}