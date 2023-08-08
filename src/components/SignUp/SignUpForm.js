import TextInput from "../TextInput";

export default function SignUpForm({ signUpState, setSignUpState }) {
  //獲取表單資料
  function catchSignUpData(e) {
    signUpState[e.target.name] = e.target.value;
    setSignUpState(signUpState);
    console.log(Object.values(signUpState));
  }

  function submitSignUp() {
    const postData = { user: signUpState };
    const apiUrl = "https://todoo.5xcamp.us/users";
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    })
      .then((res) => {
        let headers = res.headers;
        let token = headers.get("authorization");
        token = token.replace("Bearer ", "");
        localStorage.setItem("userToken", token);

        return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  return (
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
        onClick={submitSignUp}
      >
        註冊帳號
      </button>
      <a className="mt-6 block">登入</a>
    </form>
  );
}
