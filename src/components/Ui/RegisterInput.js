import { useField, ErrorMessage } from "formik";
import { useMediaQuery } from "react-responsive";

export default function RegisterInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);

  const view1 = useMediaQuery({
    query: "(min-width: 539px)",
  });
  const view2 = useMediaQuery({
    query: "(min-width: 850px)",
  });
  const view3 = useMediaQuery({
    query: "(min-width: 1170px)",
  });
  // console.log(desktopView);

  const test1 = view3 && field.name === "first_name";
  const test2 = view3 && field.name === "last_name";
  return (
    <div className="relative w-full flex flex-col items-center">
      <input
        className={`${
          meta.touched && meta.error && " border-[1px] border-red-600"
        } outline-none border-[1px] pl-[10px] bg-[#F5F6F7]  border-[#CCD0D5] bg-white/20 w-full h-[50px] text-[17px] rounded-[10px] mb-[10px]`}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div
          className={`
          ${
            view3
              ? "absolute w-[300px] -left-[19.5rem] -top-[3px]"
              : "relative  py-[15px] px-[10px] bg-[#b94a48] w-full text-white text-[13px] rounded-[5px] mb-[15px]"
          } ${
            test1 ? "left-[-107%]" : test2 ? "left-[107%]" : ""
          } translate-y-[2px] `}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                view3 && field.name !== "last_name"
                  ? "error_arrow_left"
                  : view3 && field.name === "last_name"
                  ? "error_arrow_right"
                  : !view3 && "error_arrow_bottom"
              }
            ></div>
          )}
        </div>
      )}

      {meta.touched && meta.error && <i className="error_icon"></i>}
    </div>
  );
}
