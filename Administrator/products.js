let baseurl = "http://ecommerce.reworkstaging.name.ng/v2";
const merchant = JSON.parse(localStorage.getItem("merchant"));
let product_contain = document.getElementById("product_contain");

function getProducts() {
  let content = "";
  fetch(`${baseurl}/products?merchant_id=${merchant?.id || merchant?._id}`)
    .then((resp) => resp.json())
    .then((data) => {
      console.log("response:", data);

      if (data.data && Array.isArray(data.data)) {
        data.data.forEach((product) => {
          content += `
            <div class="border border-gray-500/20 p-3">
  <div class="h-40 overflow-hidden">
    <img class="w-full h-full object-cover" src="${product.images?.[0]}" alt="">
  </div>

  <div>
    <h4 class="text-lg font-semibold mt-2">${product.title}</h4>
    <p class="text-md">₦${product.price}</p>
    <p class="text-sm">${product.descp || "No description"}</p>

    <div class="flex gap-2 mt-2">
      <button class="edit_btn bg-blue-500 text-white px-3 py-1 w-[20%] cursor-pointer" data-id="${product.id || product._id}">
        Edit
      </button> 
      <button class="delete_btn bg-red-500 text-white px-3 py-1 w-[20%] cursor-pointer" data-id="${product.id || product._id}">
        Delete
      </button>
    </div>
  </div>
</div>
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

function deleteProduct(id) {
  let confirmDelete = confirm("Are you sure you want to delete this product?");
  if (!confirmDelete) return;

  fetch(`${baseurl}/products/${id}`, {
    method: "DELETE",
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log("DELETE RESPONSE:", data);
      alert("Product deleted successfully");
      getProducts(); 
    })
    .catch((err) => {
      console.log(err);
    });
}

function editProduct(id) {
  fetch(`${baseurl}/products/${id}`)
    .then((resp) => resp.json())
    .then((data) => {
        
      let product = data.data;

      let title_input = document.getElementById("title");
      let brand_input = document.getElementById("brand");
      let image_input = document.getElementById("image");
      let price_input = document.getElementById("price");
      let descp_input = document.getElementById("descp");
      let quantity_input = document.getElementById("quantity");

      if (!product) return;

      title_input.value = product.title;
      brand_input.value = product.brand;
      image_input.value = product.images?.[0];
      price_input.value = product.price;
      quantity_input.value = product.quantity;
      descp_input.value = product.descp;

      localStorage.setItem("editProductId", id);
    })
    .catch((err) => {
      console.log(err);
    });
}
product_contain.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete_btn")) {
    deleteProduct(e.target.dataset.id);
  }

  if (e.target.classList.contains("edit_btn")) {
      console.log("EDIT CLICKED");
    editProduct(e.target.dataset.id);
  }
});
getProducts();


