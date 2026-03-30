let users_container = document.getElementById("user_container");

console.log("Container:", users_container);

function getUsers() {
  fetch("http://ecommerce.reworkstaging.name.ng/v2/users")
    .then((resp) => resp.json())
    .then((data) => {
      console.log("DATA:", data);


      let users = Object.values(data);

      if (!users.length) {
        users_container.innerHTML = `
          <tr>
            <td colspan="6" class="text-center p-3">No data</td>
          </tr>
        `;
        return;
      }

      let content = "";

      users.forEach((user) => {
        content += `
          <tr class="hover:bg-green-200">
            <td class="border border-black/20 p-2">${user.name || user.first_name || "N/A"}</td>
            <td class="border border-black/20 p-2">${user.last_name || "-"}</td>
            <td class="border border-black/20 p-2">${user.email || "-"}</td>
            <td class="border border-black/20 p-2">${user.phone || "-"}</td>
            
            <td class="border border-black/20 p-2 text-blue-500"><a href="#" ">Edit</a></td>
            <td class="border border-black/20 p-2 text-red-500">Delete</td>
          </tr>
        `;
      });

      users_container.innerHTML = content;
    })
    .catch((err) => console.log(err));
}

getUsers();