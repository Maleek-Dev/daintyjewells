const merchant = JSON.parse(localStorage.getItem("merchant"));

if (!merchant || !merchant.id) {
  alert("Please login first");
  window.location.href = "login.html";
}
document.getElementById("categoryForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const merchant = JSON.parse(localStorage.getItem("merchant"));

  const name = document.getElementById("cat_name").value;
  const image = document.getElementById("cat_image").value;

  try {
    const res = await fetch("http://ecommerce.reworkstaging.name.ng/v2/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merchant_id: merchant.id,
        name: name,
        image: image
      })
    });

    const data = await res.json();

    console.log(data);

    localStorage.setItem("category_id", data.id);

    alert("Category created successfully!");

  } catch (err) {
    console.error(err);
    alert("Error creating category");
  }
});