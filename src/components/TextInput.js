import { useState } from "react";

export default function TextInput({
  label,
  placeholder,
  name,
  changeFunc,
  value,
  errMsg,
}) {
  return (
    <label>
      <p className="text-[14px] font-bold">{label}</p>
      <input
        className="w-full rounded-[10px] px-4 py-3 focus:outline-0 mt-1"
        type="text"
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={changeFunc}
      />
      {errMsg && (
        <p>
          <span className="mt-1 font-bold text-[14px] text-warning-red">
            {errMsg}
          </span>
        </p>
      )}
    </label>
  );
}
