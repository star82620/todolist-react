import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cover from "../Cover";
import SignUpForm from "./SignUpForm";
import getToken from "../../helper/token";
import checkLogin from "../../helper/checkLogin";

import { useState } from "react";

export default function SignUp() {
  const signUpData = {
    email: "",
    nickname: "",
    password: "",
  };
  //資料放在外面才能夠被更新

  const [signUpState, setSignUpState] = useState(signUpData);
  const navigate = useNavigate();

  useEffect(() => {
    // 如果沒有 token 就留在這一頁，有 token 就檢查有沒有權限，
    // 有權限就轉到 tasks，沒權限就留在這一頁
    const auth = getToken();
    const token = auth.Authorization;
    if (token !== "") {
      const isAccess = checkLogin();
      if (isAccess) {
        navigate("/tasks");
      }
    }
  }, []);

  return (
    <div className="w-full h-screen bg-primary-yellow flex flex-col justify-center items-center px-5">
      <div className="max-w-[800px] w-full flex justify-between ">
        <Cover />
        <section className="w-[304px] flex flex-col justify-center">
          <h2 className=" text-[24px] font-bold">最實用的線上代辦事項服務</h2>
          <SignUpForm
            signUpState={signUpState}
            setSignUpState={setSignUpState}
          />
        </section>
      </div>
    </div>
  );
}
