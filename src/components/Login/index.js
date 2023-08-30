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
    if (token && isChecked) {
      navigate("/tasks");
    }
  }

  // -----------------
  const [formErrors, setFormErrors] = useState({});

  function validateForm() {
    let errors = {};

    if (!loginState.email) {
      errors.email = "此欄位不可為空";
    }
    if (!loginState.password) {
      errors.password = "此欄位不可為空";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function catchLoginData(e) {
    const { name, value } = e.target;
    setLoginState({ ...loginState, [name]: value });
  }

  async function submitLoginData() {
    if (!validateForm()) return;

    const postData = {
      user: loginState,
    };
    const apiUrl = "https://todoo.5xcamp.us/users/sign_in";
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      const data = await res.json();
      if (await !res.ok) {
        alert("登入失敗，請重試");
        setLoginState({ email: "", password: "" });
        return;
      }

      const headers = res.headers;
      const token = headers.get("authorization");
      const userName = data.nickname;
      localStorage.setItem("userToken", token);
      localStorage.setItem("userName", userName);
      navigate("/tasks");
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
                value={loginState.email}
                placeholder="請輸入Email"
                changeFunc={catchLoginData}
                errMsg={formErrors.email}
              />
              <TextInput
                name="password"
                label="密碼"
                value={loginState.password}
                placeholder="請輸入密碼"
                changeFunc={catchLoginData}
                errMsg={formErrors.password}
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
