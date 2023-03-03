import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { findUser, sendPassResetCode } from "../../../utils/api-call";

const ResetPass = () => {
  const param = useParams();
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    // console.log(firstRender);
    const getUser = async () => {
      const { data } = await findUser({ email: param.email });
      // console.log(data);
      setName(`${data.first_name} ${data.last_name}`);
      setEmail(data.email);
      setProfile(data.picture);
    };
    getUser().catch((err) => {
      // console.log(err.response);
      if (err.Status === 400) {
        navigate("/recover/*", "/");
      }
    });
  }, [param.email, navigate]);

  const sendEmailHandler = async () => {
    try {
      await sendPassResetCode({ email });
    } catch (err) {
      console.log(err.response.data);
    }
    navigate(`/recover/code/${email}`);
  };
  return (
    <div className="w-[31.3rem] py-3 rounded-lg shadow-md shadow-black/10 bg-white">
      <div className="text-[#162643] pb-4 pl-4 border-b-[1px] border-b-black/10 text-[21px] font-semibold">
        Reset your password
      </div>
      <div className="text-[17px] pl-4 border-b-[1px] flex items-center  border-b-black/10 pb-5">
        <div className="w-[55%] flex flex-col items-center justify-around">
          <p className="my-3">
            How do you want to get the code to reset your password?
          </p>
          <label className="w-full flex space-x-4" htmlFor="male">
            <input
              // ref={email}
              className="w-5"
              // value={user.email}
              type="radio"
              name="gender"
              defaultChecked={true}
              id="male"
              // onChange={handleRegisterChange}
            />
            <div className="flex flex-col">
              <span className="text-[17px] text-black/80">
                Send code via email
              </span>
            </div>
          </label>
          <span className="ml-9 self-start text-[15px] text-black/70">
            {email}
          </span>
        </div>
        <div className="flex mx-auto flex-col mt-4 items-center justify-center">
          <img
            className="bg-black/20 w-12 h-12 rounded-full"
            src={profile}
            alt=""
          />
          <h1>{name}</h1>
          <h2 className="text-[15px] text-black/60">Facebook user</h2>
        </div>
      </div>
      <div className="flex items-center justify-end mt-3 mr-5 space-x-2">
        <Link
          to="/recover/findaccount"
          className="rounded-lg p-2 px-4 font-bold bg-black/10 text-black/60"
        >
          Not you?
        </Link>
        <button
          onClick={sendEmailHandler}
          className="font-bold text-white bg-[#1A6ED8] rounded-lg p-2 px-4"
        >
          Continure
        </button>
      </div>
    </div>
  );
};

export default ResetPass;
