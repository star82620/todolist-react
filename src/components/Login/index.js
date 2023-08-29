import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../TextInput";
import Cover from "../Cover";
import getToken from "../../helper/token";
import checkLogin from "../../helper/checkLogin";

export default function Login() {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState({ email: "", password: "" });

  useEffect(() => {
    checkToken();
  }, []);

  async function checkToken() {
    // 如果沒有 token 就留在這一頁，有 token 就檢查有沒有權限，
    // 有權限就轉到 tasks，沒權限就留在這一頁
    const auth = await getToken();
    const token = await auth.Authorization; //null => false
    const isChecked = await checkLogin(); //promise???
    console.log(token);
    console.log("checkLogin()", isChecked);
    if (token && isChecked) {
      console.log("go");
      navigate("/tasks");
    }
  }

  function catchLoginData(e) {
    loginState[e.target.name] = e.target.value;
    setLoginState(loginState);
  }

  async function submitLoginData() {
    const postData = {
      user: loginState,
    };
    const apiUrl = "https://todoo.5xcamp.us/users/sign_in";
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    try {
      if (res.ok) {
        const headers = res.headers;
        const token = headers.get("authorization");
        localStorage.setItem("userToken", token);
        navigate("/tasks");
      } else {
        alert("登入失敗，請重試");
      }
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-full h-screen bg-primary-yellow flex flex-col justify-center items-center px-5">
      <div className="max-w-[800px] w-full flex justify-between ">
        <Cover />
        <section className="w-[304px] flex flex-col justify-center">
          <h2 className=" text-[24px] font-bold">最實用的線上代辦事項服務</h2>
          <form className="flex flex-col items-center">
            <div className="w-full flex flex-col gap-y-4 py-6 self-start">
              <TextInput
                name="email"
                label="Email"
                placeholder="請輸入Email"
                changeFunc={catchLoginData}
              />
              <TextInput
                name="password"
                label="密碼"
                placeholder="請輸入密碼"
                changeFunc={catchLoginData}
              />
            </div>
            <button
              className="rounded-[10px] px-12 py-3 my-0 mx-auto bg-black text-white"
              type="button"
              onClick={submitLoginData}
            >
              登入
            </button>

            <Link to="/signup" className="mt-6 block">
              註冊帳號
            </Link>
          </form>
        </section>
      </div>
    </div>
  );
}
