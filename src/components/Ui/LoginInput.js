import React, { forwardRef } from "react";
import { ErrorMessage, useField } from "formik";

const LoginInput = forwardRef(({ placeholder, bottom, ...props }, ref) => {
  const [field, meta] = useField(props);
  // console.log(field.name);
  // console.log(meta.error);
  // console.log(meta.touched);

  return (
    <div className=" w-[320px] flex flex-col items-center">
      {meta.touched && meta.error && !bottom && (
        <div
          className="text-s py-[15px] px-[10px] w-full bg-red-100 border-[1px] border-red-600 text-[13px] rounded-[5px] mb-[15px]"
          style={{ transform: "translateY(3px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div className="error_arrow_top"></div>
          )}
        </div>
      )}
      <div className="w-full">
        <input
          ref={ref}
          className={`${
            meta.touched && meta.error && " border-[1px] border-red-600"
          } outline-none z-0 border-[1px] border-[#e4e6eb] w-full h-[50px] text-[17px] rounded-[10px] pl-[10px] mb-[10px]`}
          type={field.type}
          name={field.name}
          required
          placeholder={placeholder}
          {...field}
          {...props}
        />
        {/* {meta.touched && meta.error && (
          <i className="error_icon fixed mt-3 right-[12%] z-10"></i>
        )} */}
      </div>

      {meta.touched && meta.error && bottom && (
        <div
          className=" text-s py-[15px] px-[10px] w-full bg-red-100 border-[1px] border-red-600 text-[13px] rounded-[5px] mb-[15px]"
          style={{ transform: "translateY(2px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div className="error_arrow_bottom"></div>
          )}
        </div>
      )}
    </div>
  );
});

export default LoginInput;
