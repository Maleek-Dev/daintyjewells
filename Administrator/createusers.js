let first_name = document.getElementById("first_name");
let last_name = document.getElementById("last_name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let password = document.getElementById("password");
const user = document.getElementById("UserSignup");
let baseurl = "http://ecommerce.reworkstaging.name.ng/v2";

user.addEventListener("submit", async function (e) {
  e.preventDefault();

  const user_info = {
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
    phone: phone.value,
    password: password.value,
  };
  console.log(user_info);
  fetch(`${baseurl}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user_info),
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      alert("Account created successfully");
      console.log(data);

      first_name.value = "";
      last_name.value = "";
      email.value = "";
      phone.value = "";
      password.value = "";
    })
    .catch((err) => {
      console.log(err);
      alert("Sorry, error occurred");
    });
});
