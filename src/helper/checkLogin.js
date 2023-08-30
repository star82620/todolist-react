import getToken from "./token";

async function checkLogin() {
  const authHeader = await getToken();
  const apiUrl = "https://todoo.5xcamp.us/check";
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: authHeader,
    });
    const data = await res.json();
    if (await res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

export default checkLogin;
