import { Link } from "react-router-dom";
import TextInput from "../TextInput";

export default function SignUpForm({ signUpState, setSignUpState }) {
  const postData = { user: signUpState };
  const apiUrl = "https://todoo.5xcamp.us/users";

  //獲取表單資料
  function catchSignUpData(e) {
    signUpState[e.target.name] = e.target.value;
    setSignUpState(signUpState);
  }

  function submitSignUp() {
    console.log(postData);
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    })
      .then((res) => {
        let headers = res.headers;
        let token = headers.get("authorization");

        localStorage.setItem("userToken", token);

        return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  const formAry = [
    {
      label: "Email",
      placeholder: "請輸入Email",
      name: "email",
      changeFunc: catchSignUpData,
    },
    {
      label: "您的暱稱",
      placeholder: "請輸入您的暱稱",
      name: "nickname",
      changeFunc: catchSignUpData,
    },
    {
      label: "密碼",
      placeholder: "請輸入密碼",
      name: "password",
      changeFunc: catchSignUpData,
    },
    {
      label: "再次輸入密碼",
      placeholder: "請再次輸入密碼",
      name: "rePassword",
      changeFunc: catchSignUpData,
    },
  ];

  return (
    <form className="flex flex-col items-center">
      <div className="w-full flex flex-col gap-y-4 py-6 self-start">
        {formAry.map((item) => (
          <TextInput
            key={item.name}
            label={item.label}
            placeholder={item.placeholder}
            name={item.name}
            changeFunc={item.changeFunc}
          />
        ))}
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
