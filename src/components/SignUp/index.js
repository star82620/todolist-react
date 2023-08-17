import { Link } from "react-router-dom";
import Cover from "../Cover";
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

  console.log("signUpState", signUpState);

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
