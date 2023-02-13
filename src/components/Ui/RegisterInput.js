import { useField, ErrorMessage } from "formik";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function RegisterInput({ placeholder, ...props }) {
  const [isFocus, setIsFocus] = useState(false);
  const [field, meta] = useField(props);
  // console.log(field);
  const desktopView = useMediaQuery({
    query: "(min-width: 1170px)",
  });
  // console.log(desktopView);
  // console.log("isFocus", isFocus);
  const checkInputFocus = () => {
    if (meta.touched) {
      setIsFocus((prev) => {
        return !prev;
      });
    }
  };

  const fnameError = desktopView && field.name === "first_name";
  const lnameError = desktopView && field.name === "last_name";

  return (
    <div className="relative w-full flex flex-col items-center">
      <input
        onFocus={checkInputFocus}
        onBlurCapture={checkInputFocus}
        className={`${
          meta.touched &&
          meta.error &&
          !isFocus &&
          " border-[1px] border-red-600"
        } outline-none border-[1px] pl-[10px] bg-[#F5F6F7] border-[#CCD0D5] w-full h-[50px] text-[17px] rounded-[10px] mb-[10px]`}
        type={field.type}
        name={field.name}
        required
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <i className="error_icon absolute top-3 right-[0.5rem]"></i>
      )}

      {isFocus && meta.touched && meta.error && (
        <div
          className={`
          ${
            desktopView
              ? "absolute w-[300px] -left-[19.5rem] -top-[3px] py-[15px] bg-[#b94a48] text-white text-[13px] rounded-[5px] mb-[15px]"
              : "relative  py-[15px] px-[10px] bg-[#b94a48] w-full text-white text-[13px] rounded-[5px] mb-[15px]"
          } ${
            fnameError
              ? "left-[-79%] top-[1px] w-[139px]  text-center"
              : lnameError
              ? "left-0 top-[4.5rem] z-30 w-[139px] text-center px-0"
              : ""
          } `}
        >
          {isFocus && meta.touched && meta.error && (
            <ErrorMessage name={field.name} />
          )}
          {isFocus && meta.touched && meta.error && (
            <div
              className={
                desktopView && field.name !== "last_name"
                  ? "error_arrow_left"
                  : desktopView && field.name === "last_name"
                  ? "error_arrow_right"
                  : !desktopView && "error_arrow_bottom"
              }
            ></div>
          )}
        </div>
      )}
    </div>
  );
}
