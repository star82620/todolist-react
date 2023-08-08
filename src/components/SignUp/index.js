import logo from "../../images/logo.png";
import Logo from "../Logo";
import cover from "../../images/cover-sm.png";
import SignUpForm from "./SignUpForm";

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

  console.log("signUpState", signUpState);

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
          <SignUpForm
            signUpState={signUpState}
            setSignUpState={setSignUpState}
          />
        </section>
      </div>
    </div>
  );
}
