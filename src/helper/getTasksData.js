import getToken from "./token";

export default async function getTasksData() {
  const authHeader = getToken();
  const apiUrl = "https://todoo.5xcamp.us/todos";
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: authHeader,
    });
    const data = await res.json(); //成功時是 todos，失敗時是 message
    console.log(data);
    return data;
  } catch (err) {
    return err;
  }
}
