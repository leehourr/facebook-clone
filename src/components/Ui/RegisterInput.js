import { useField, ErrorMessage } from "formik";
import { useMediaQuery } from "react-responsive";

export default function RegisterInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);
  const desktopView = useMediaQuery({
    query: "(min-width: 850px)",
  });
  console.log(desktopView);
  return (
    <div className="relative w-[320px] flex flex-col items-center">
      {meta.touched && meta.error && !bottom && (
        <div
          className={`
            ${
              desktopView
                ? "absolute w-[300px] -left-[19.5rem] -top-[3px]"
                : "relative py-[15px] px-[10px] bg-[#b94a48] w-full text-white text-[13px] rounded-[5px] mb-[15px]"
            }`}
          style={{ transform: "translateY(3px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={desktopView ? "error_arrow_left" : "error_arrow_top"}
            ></div>
          )}
        </div>
      )}
      <input
        className={`${
          meta.touched && meta.error && " border-[1px] border-red-600"
        } outline-none border-[1px] border-[#e4e6eb] w-full h-[50px] text-[17px] rounded-[10px] pl-[5px] mb-[px]`}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom && (
        <div
          className={`
          ${
            desktopView
              ? "absolute w-[300px] -left-[19.5rem] -top-[3px]"
              : "relative py-[15px] px-[10px] bg-[#b94a48] w-full text-white text-[13px] rounded-[5px] mb-[15px]"
          }`}
          style={{ transform: "translateY(2px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                desktopView ? "error_arrow_left" : "error_arrow_bottom"
              }
            ></div>
          )}
        </div>
      )}

      {meta.touched && meta.error && (
        <i
          className="error_icon"
          style={{ top: `${!bottom && !desktopView ? "63%" : "15px"}` }}
        ></i>
      )}
    </div>
  );
}
