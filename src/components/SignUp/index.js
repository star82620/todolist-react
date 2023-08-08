import logo from "../../images/logo.png";
import Logo from "../Logo";
import cover from "../../images/cover-sm.png";
import TextInput from "../TextInput";
import { useState } from "react";

export default function SignUp() {
  const signUpData = {
    email: "",
    nickname: "",
    password: "",
  };
  //資料放在外面才能夠被更新

  const [signUpState, setSignUpState] = useState(signUpData);
  // const [nicknameState, setNicknameState] = useState("");
  // const [passwordState, setPasswordState] = useState("");
  // const [emailState, setEmailState] = useState("");

  // console.log("signUpState", signUpState);

  // function confirmPassword(e) {
  //   const  =
  //     e.target.value === signUpState.password ? null : alert("密碼錯誤");
  // }

  // //獲取表單資料
  function catchSignUpData(e) {
    // confirmPassword(e);
    signUpState[e.target.name] = e.target.value;
    setSignUpState(signUpState);
    console.log(Object.values(signUpState));
  }

  // //按下送出時進行表單驗證（如為空則跳警告、 return）
  // function postAPI(e) {
  //   console.log("POST", signUpState);
  //   const apiUrl = "https://todoo.5xcamp.us/users";
  //   // fetch(apiUrl, { methods: "POST", body: signUpState })
  //   //   .then((res) => res.json())
  //   //   .then((data) => console.log(data));
  // }

  return (
    <div className="w-full h-screen bg-primary-yellow flex flex-col justify-center items-center px-5">
      <div className="max-w-[800px] w-full flex justify-between ">
        <div className="flex flex-col items-center">
          <Logo width="313" height="48" />
          <div className="w-[386px] mt-4">
            <img src={cover} alt="cover" />
          </div>
        </div>
        <section className="w-[304px] flex flex-col justify-center">
          <h2 className=" text-[24px] font-bold">最實用的線上代辦事項服務</h2>
          <form className="flex flex-col items-center">
            <div className="w-full flex flex-col gap-y-4 py-6 self-start">
              <TextInput
                label="Email"
                placeholder="請輸入Email"
                name="email"
                changeFunc={catchSignUpData}
              />
              <TextInput
                label="您的暱稱"
                placeholder="請輸入您的暱稱"
                name="nickname"
                changeFunc={catchSignUpData}
              />
              <TextInput
                label="密碼"
                placeholder="請輸入密碼"
                name="password"
                changeFunc={catchSignUpData}
              />
              <TextInput
                label="再次輸入密碼"
                placeholder="請再次輸入密碼"
                name="rePassword"
                // changeFunc={confirmPassword}
              />
            </div>
            <button
              className="rounded-[10px] px-12 py-3 my-0 mx-auto bg-black text-white"
              type="button"
              // onClick={postAPI}
            >
              註冊帳號
            </button>
            <a className="mt-6 block">登入</a>
          </form>
        </section>
      </div>
    </div>
  );
}
