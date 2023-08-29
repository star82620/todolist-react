import { Link, useNavigate } from "react-router-dom";
import TextInput from "../TextInput";

export default function SignUpForm({ signUpState, setSignUpState }) {
  const navigate = useNavigate();
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

  //獲取表單資料
  function catchSignUpData(e) {
    signUpState[e.target.name] = e.target.value;
    setSignUpState(signUpState);
  }

  async function submitSignUp() {
    //驗證後才敲 API
    const postData = { user: signUpState };
    const apiUrl = "https://todoo.5xcamp.us/users";
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      const headers = await res.headers;
      const token = await headers.get("authorization");
      localStorage.setItem("userToken", await token);
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        alert("註冊成功，將跳轉至任務頁面");
        navigate("/tasks");
      } else {
        const errMsg = data.error;
        console.log(errMsg);
      }
    } catch (err) {
      console.log(err);
    }
  }

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
            errMsg={item.errMsg}
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
