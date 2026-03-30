const login = document.getElementById("login");
let email = document.getElementById("email");
let password = document.getElementById("password");

login.addEventListener("submit", async function(e) {
  e.preventDefault();
  const data = {
    email: email.value,
    password: password.value,
  };

  try {
    const res = await apiRequest("/merchants/login", "POST", data);

    localStorage.setItem("merchant", JSON.stringify(res));

    alert(`Hello ${email.value} you have successfully Logged in!`);
    
    window.location.href = "Administrator/dashboard.html";

  } catch (err) {
    console.error(err);
    alert("Login failed");
  }
});