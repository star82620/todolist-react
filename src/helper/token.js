export default function getToken() {
  // const token = localStorage.getItem("userToken") || "";
  const token =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0OTY4Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjkyMDcwMjc0LCJleHAiOjE2OTMzNjYyNzQsImp0aSI6ImRiZGU5NmFkLTE2MjUtNGZjYS05ZmIxLWVkN2Y3MzM1NTYyNyJ9.dosUNllnBTXf8OPb0Oe0WuFpc4RECKclyoMnkngjE7E";

  const authHeader = {
    Authorization: token,
    "Content-Type": "application/json",
  };

  return authHeader;
}
