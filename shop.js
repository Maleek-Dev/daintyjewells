let baseurl = "http://ecommerce.reworkstaging.name.ng/v2";
const merchant = JSON.parse(localStorage.getItem("merchant"));
let product_contain = document.getElementById("All_Products");

function getProducts() {
  let content = "";
  fetch(`${baseurl}/products?merchant_id=${merchant?.id || merchant?._id}`)
    .then((resp) => resp.json())
    .then((data) => {
      console.log("response:", data);

      if (data.data && Array.isArray(data.data)) {
        data.data.forEach((product) => {
          content += `
<a href="product.html?id=${product.id || product._id}">
  <div class="cursor-pointer  p-4 rounded-lg shadow-sm ">

    <div class="w-full h-100 overflow-hidden rounded">
      <img 
        src="${product.images?.[0]}" 
        alt="" 
        class="w-full h-100 object-cover"
      >
    </div>
    <div class="">
    <h5 class=" text-sm ">${product.title}</h5>
    <h4 class="text-lg   mt-5">₦${product.price}</h4>
          </div>
  </div>
</a>
          `;
        });

        product_contain.innerHTML = content;
      } else {
        product_contain.innerHTML = "<p>No products found</p>";
      }
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
}

getProducts();
