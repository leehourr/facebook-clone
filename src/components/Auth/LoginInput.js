import { useField } from "formik";

export default function LoginInput({ placeholder, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="relative w-[320px] flex flex-col items-center">
      <input
        className="outline-none border-2 border-[#e4e6eb] w-full h-[50px] text-[17px] rounded-[10px] pl-[10px] mb-[10px]"
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
    </div>
  );
}
