export default function getToken() {
  let token = localStorage.getItem("userToken") || "";
  console.log(token);

  return token;
}
