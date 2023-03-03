import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RedAlert from "../../../svg/RedAlert";
import { validatePassResetCode } from "../../../utils/api-call";

export const EnterCode = () => {
  const { email } = useParams();
  const inputCode = useRef();
  const [errMessage, setErrMessage] = useState("");
  const [hasErr, setHasErr] = useState(false);
  const navigate = useNavigate();
  const validateCode = async () => {
    const code = inputCode.current.value;
    // console.log(code);
    try {
      const validation = await validatePassResetCode({ email, code });
      if (validation.message === "ok") {
        navigate(`/recover/newpassword/${email}`, { replace: true });
      }
    } catch (err) {
      // console.log("err.status", err.response.status);
      if (err.response.status === 403) {
        setHasErr(true);
        setErrMessage(err.response.data.message);
      }
    }
  };
  return (
    <div className="w-[31.3rem] py-3 rounded-lg shadow-md shadow-black/10 bg-white">
      <div className="text-[#162643] pb-4 pl-4 border-b-[1px] border-b-black/10 text-[21px] font-semibold">
        Enter security code{" "}
      </div>
      <div className="text-[17px] px-4 border-b-[1px]  border-b-black/10 pb-5">
        {hasErr && (
          <div className="text-[14.5px] relative py-2 mt-4 font-medium w-[100%] border-[1px] border-[#FA3E3E]">
            <div className="absolute pl-2 pt-3 top-0 h-full left-0 bg-[#FA3E3E] w-9">
              <RedAlert />
            </div>
            <p className="ml-11 leading-5">{errMessage}</p>
          </div>
        )}

        <div className="w-full flex flex-col items-center justify-around">
          <p className="my-3 ">
            Please check your email for message with your code. Your code is 8
            numbers long.
          </p>

          <div className="w-full flex items-start space-x-5">
            <input
              ref={inputCode}
              className="border-[1px] outline-none p-3 pl-4 rounded-lg border-black/20 w-1/2"
              type="text"
              placeholder="Enter code"
            />
            <div className="flex flex-col">
              <span className="text-[15px] text-black/80">
                We sent your code to
              </span>
              <span className="text-[14px] text-black/70">{email}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end mt-3 mr-5 space-x-2">
        <Link
          to="/"
          className="rounded-lg p-2 px-4 font-bold bg-black/10 text-black/60"
        >
          Cancel
        </Link>
        <button
          onClick={validateCode}
          className="font-bold text-white bg-[#1A6ED8] rounded-lg p-2 px-4"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
