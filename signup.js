
const CreateMarchant = document.getElementById("signup");

CreateMarchant.addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = {
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
    store_name: store.value,
    descp: descp.value,
    phones: phone.value,
    password: password.value,
  };

  try {
    const res = await apiRequest("/merchants", "POST", data);

    alert("Merchant account created!");
    window.location.href = "login.html";

  } catch (err) {
    console.error(err);
    alert("Signup failed");
  }
});