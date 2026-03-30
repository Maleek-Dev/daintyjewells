const BASE_URL = "http://ecommerce.reworkstaging.name.ng/v2";

async function apiRequest(endpoint, method = "GET", body = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  const data = await response.json();


  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}