import logo from "../../images/logo.png";
import Logo from "../Logo";
import cover from "../../images/cover-sm.png";
import TextInput from "../TextInput";

export default function SignUp() {
  return (
    <div className="w-full h-screen bg-primary-yellow flex flex-col justify-center items-center px-5">
      <div className="max-w-[800px] w-full flex justify-between ">
        <div className="flex flex-col items-start">
          <Logo width="313" height="48" />
          <div className="w-[386px] mt-4">
            <img src={cover} />
          </div>
        </div>
        <section className="w-[304px] flex flex-col justify-center">
          <h2 className=" text-[24px] font-bold">最實用的線上代辦事項服務</h2>
          <form className="flex flex-col items-center">
            <div className="w-full flex flex-col gap-y-4 py-6 self-start">
              <TextInput label="Email" placeholder="請輸入Email" />
              <TextInput label="您的暱稱" placeholder="請輸入您的暱稱" />
              <TextInput label="密碼" placeholder="請輸入密碼" />
              <TextInput label="密碼" placeholder="請輸入密碼" />
            </div>
            <button
              className="rounded-[10px] px-12 py-3 my-0 mx-auto bg-black text-white"
              type="button"
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
