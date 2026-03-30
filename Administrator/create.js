let title_input = document.getElementById("title");
let brand_input = document.getElementById("brand");
let image_input = document.getElementById("image");
let price_input = document.getElementById("price");
let descp_input = document.getElementById("descp");
let quantity_input = document.getElementById("quantity");
let create_btn = document.getElementById("create_btn");

const merchant = JSON.parse(localStorage.getItem("merchant"));
function createNewProduct() {
  let product_obj = {
    title: title_input.value,
    brand: brand_input.value,
    images: [image_input.value],
    price: Number(price_input.value),
    quantity: Number(quantity_input.value),
    currency: "NGN",
    descp: descp_input.value,
    category_id: '69c52e551595cbe810455bd9',
    merchant_id: merchant.id
  };
  console.log("Sending:", product_obj);
  fetch("http://ecommerce.reworkstaging.name.ng/v2/products", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product_obj),
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      alert("product created successfully");
      console.log(data);

      title_input.value = "";
      brand_input.value = ""; 
      image_input.value = "";
      price_input.value = "";
      quantity_input.value = "";
      descp_input.value = "";
    })
    .catch((err) => {
      console.log(err);
      alert("Sorry, error occurred");
    });
}

create_btn.addEventListener("click", (e) => {
  e.preventDefault();
  createNewProduct();
});
