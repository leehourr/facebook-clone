import Cookies from "js-cookie";
import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { changePassword } from "../../../utils/api-call";

const ChooseNewPass = () => {
  const [textVisability, setTextVisability] = useState(false);
  const inputPassword = useRef();
  const navigate = useNavigate();
  const { email } = useParams();

  const toggleText = () => {
    setTextVisability((prev) => !prev);
  };

  const changePassHandler = async () => {
    const password = inputPassword.current.value;
    try {
      const res = await changePassword({ email, password });
      await Cookies.set("token", res.token, {
        sameSite: "None; Secure",
      });
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-[31.3rem] py-3 rounded-lg shadow-md shadow-black/10 bg-white">
      <div className="text-[#162643] pb-4 pl-4 border-b-[1px] border-b-black/10 text-[21px] font-semibold">
        Choose a new password
      </div>
      <div className="text-[17px] px-4 border-b-[1px]  border-b-black/10 pb-5">
        <div className="w-full flex flex-col items-center justify-around">
          <p className="my-3 leading-5">
            Create a new password that is at least 6 characters long. A strong
            password is combination of letters, numbers, and punctuation marks.
          </p>
          <div className="w-full flex items-start space-x-2">
            <div className="flex-grow relative">
              <input
                ref={inputPassword}
                className="border-[1px] outline-none p-3 pl-4 rounded-lg border-black/20 w-full"
                type={textVisability ? "text" : "password"}
                placeholder="New password"
              />
              <span
                onClick={toggleText}
                className="absolute right-0 pt-3 select-none cursor-pointer px-3 rounded-lg hover:bg-black/10 h-full text-[#1A6ED8] font-bold"
              >
                {!textVisability ? "Show" : "Hide"}
              </span>
            </div>
            <button className="bg-black/10 w-11 h-[3.2rem] rounded-lg text-black/70 font-bold text-lg">
              ?
            </button>
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
          onClick={changePassHandler}
          className="font-bold text-white bg-[#1A6ED8] rounded-lg p-2 px-4"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ChooseNewPass;
