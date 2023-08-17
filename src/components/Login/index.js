import { useState } from "react";
import { Link } from "react-router-dom";
import TextInput from "../TextInput";
import Cover from "../Cover";
import getToken from "../../helper/token";

export default function Login() {
  const [loginState, setLoginState] = useState({ email: "", password: "" });
  const postData = {
    user: loginState,
  };

  function catchLoginData(e) {
    loginState[e.target.name] = e.target.value;
    setLoginState(loginState);
  }

  async function submitLoginData() {
    console.log(postData);
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
      } else {
        alert("登入失敗，請重試");
      }

      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  console.log("loginState", loginState);
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
