export default function TextInput({ label, placeholder }) {
  return (
    <label>
      <p className="text-[14px] font-bold">{label}</p>
      <input
        className="w-full rounded-[10px] px-4 py-3 focus:outline-0 mt-1"
        type="text"
        placeholder={placeholder}
      />
    </label>
  );
}
