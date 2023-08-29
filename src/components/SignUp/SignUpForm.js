import { Link, useNavigate } from "react-router-dom";
import TextInput from "../TextInput";
import { useState } from "react";

export default function SignUpForm({ signUpState, setSignUpState }) {
  const navigate = useNavigate();
  // 個別 input 的錯誤訊息，有錯誤的時候才填入
  const [formErrors, setFormErrors] = useState({
    email: "",
    nickname: "",
    password: "",
    repassword: "",
  });

  //獲取表單資料
  function catchSignUpData(e) {
    const { name, value } = e.target;
    setSignUpState({ ...signUpState, [name]: value });
  }

  function validateForm() {
    let errors = {};
    const emailVerify = /^(\w|\.)+[@](\w|\.).*$/;
    const passwordVerify = /^\w{6,}$/;

    if (!emailVerify.test(signUpState.email)) {
      errors.email = "電子信箱格式有誤";
    }

    if (!signUpState.nickname) {
      errors.nickname = "暱稱不得為空";
    }

    if (!passwordVerify.test(signUpState.password)) {
      errors.password = "密碼至少需要 6 個字";
    }
    const confirmPassword = signUpState.rePassword === signUpState.password;

    if (!signUpState.rePassword) {
      errors.repassword = "密碼不得為空";
    } else if (!confirmPassword) {
      errors.repassword = "與前一次密碼不同，請再確認";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function submitSignUp() {
    if (!validateForm()) return;
    const postData = { user: signUpState };
    const apiUrl = "https://todoo.5xcamp.us/users";

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      const data = await res.json();
      const headers = await res.headers;
      const token = await headers.get("authorization");
      const userName = data.nickname;
      localStorage.setItem("userToken", await token);
      localStorage.setItem("userName", userName);
      if (data && res.ok) {
        alert("註冊成功，將跳轉至任務頁面");
        navigate("/tasks");
      }
      if (
        (await data.message) === "註冊發生錯誤" &&
        (await data.error[0]) === "電子信箱 已被使用"
      ) {
        setFormErrors({ ...formErrors, email: data.error });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const formAry = [
    {
      label: "Email",
      placeholder: "請輸入Email",
      name: "email",
      errMsg: formErrors.email,
    },
    {
      label: "您的暱稱",
      placeholder: "請輸入您的暱稱",
      name: "nickname",
      errMsg: formErrors.nickname,
    },
    {
      label: "密碼",
      placeholder: "請輸入密碼",
      name: "password",
      errMsg: formErrors.password,
    },
    {
      label: "再次輸入密碼",
      placeholder: "請再次輸入密碼",
      name: "rePassword",
      errMsg: formErrors.repassword,
    },
  ];

  return (
    <form className="flex flex-col items-center">
      <div className="w-full flex flex-col gap-y-4 py-6 self-start">
        {formAry.map((item) => {
          return (
            <TextInput
              key={item.name}
              label={item.label}
              placeholder={item.placeholder}
              name={item.name}
              changeFunc={catchSignUpData}
              errMsg={item.errMsg}
            />
          );
        })}
      </div>
      <button
        className="rounded-[10px] px-12 py-3 my-0 mx-auto bg-black text-white"
        type="button"
        onClick={submitSignUp}
      >
        註冊帳號
      </button>
      <Link to="/" className="mt-6 block">
        登入
      </Link>
    </form>
  );
}
