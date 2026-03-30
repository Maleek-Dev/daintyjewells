let total_products =document.getElementById("total_products")
const merchant = JSON.parse(localStorage.getItem("merchant"));
let baseurl = "http://ecommerce.reworkstaging.name.ng/v2";

function getproducts(){
      fetch(`${baseurl}/products?merchant_id=${merchant?.id}`)
   .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      total_products.innerHTML = data.data.length;
    })
    .catch((err) => {
      console.log(err);
    });

}
getproducts()
 
function viewProducts() {
    let dashboard_container = document.getElementById("dashboard_container")
  let content = "";
  fetch(`${baseurl}/products?merchant_id=${merchant?.id || merchant?._id}`)
    .then((resp) => resp.json())
    .then((data) => {
      console.log("response:", data);

      if (data.data && Array.isArray(data.data)) {
        data.data.forEach((product) => {
          content += `
            <tr>
            
                <td class="border border-gray-200 p-2">${product.title}</td>
                <td class="border border-gray-200 p-2">₦${product.price}</td>
                <td class="border border-gray-200 p-2">${product.descp}</td>

                <td class="border border-gray-200 p-2">
                    <img src="${product.images?.[0]}" alt="Food" class="w-20" />
                </td>
            </tr>
          `;
        });

      dashboard_container.innerHTML = content;
      } else {
        dashboard_container.innerHTML = "<p>No products found</p>";
      }
    })
    .catch((err) => {
      console.log("Error:", err);
    });
}
viewProducts()

let total_users = document.getElementById("total_users");


function getUsersCount() {
  fetch(`${baseurl}/users`)
    .then((resp) => resp.json())
    .then((data) => {
      console.log("USERS RESPONSE:", data);

      let users = Object.values(data);

      total_users.innerHTML = users.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

getUsersCount();

function updateCartTotal() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];


  let total = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  let Newtotal = document.getElementById("total_cart");
  if (Newtotal) Newtotal.innerText = total;
}

updateCartTotal();