export default function getToken() {
  const token = localStorage.getItem("userToken") || "";

  const authHeader = {
    Authorization: token,
    "Content-Type": "application/json",
  };

  console.log("auth", authHeader);
  return authHeader;
}
