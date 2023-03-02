import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { resetPass } from "../../../utils/api-call";

const FindAccount = () => {
  const inputEmail = useRef();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const findAccHandler = async (e) => {
    e.preventDefault();
    const email = inputEmail.current.value;
    // console.log("email", { email });
    try {
      const foundAcc = await resetPass({ email });
      console.log(foundAcc);
      setError("");
      setMessage("");
    } catch (err) {
      // console.log(err.response.data.message);
      setError(err.response.data.message);
      setMessage(
        "Your search did not return any results. Please try again with other information."
      );
    }
  };
  return (
    <form
      onSubmit={findAccHandler}
      className="w-[31.3rem] py-3 rounded-lg shadow-md shadow-black/10 bg-white"
    >
      <div className="text-[#162643] pb-4 pl-4 border-b-[1px] border-b-black/10 text-[21px] font-semibold">
        Find your account
      </div>
      <div className="text-[17px] pl-4 border-b-[1px]  border-b-black/10 pb-5">
        <div
          className={`${
            !error && "hidden"
          } w-[96%] bg-[#FFEBE8] border-[1px] mt-3 border-red-400 p-3`}
        >
          <h1 className="text-[15px] font-bold">{error}</h1>
          <p className="text-[14px] leading-4 pt-1">{message}</p>
        </div>
        <span className="block mx-auto my-3 ">
          Please enter your email or mobile number to search for your account.
        </span>
        <input
          ref={inputEmail}
          className="border-[1px] outline-none p-3 pl-4 rounded-lg border-black/20 w-[95%] mx-auto"
          type="text"
          placeholder="Email or mobile number"
        />
      </div>
      <div className="flex items-center justify-end mt-3 mr-5 space-x-2">
        <Link
          to="/"
          className="rounded-lg p-2 px-4 font-bold bg-black/10 text-black/60"
        >
          Cancel
        </Link>
        <button
          type="submit"
          onClick={findAccHandler}
          className="font-bold text-white bg-[#1A6ED8] rounded-lg p-2 px-4"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default FindAccount;
