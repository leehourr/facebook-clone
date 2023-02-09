import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../Ui/RegisterInput";
import ReactDOM from "react-dom";
import { Backdrop } from "../Ui/Backdrop";
import Button from "../Ui/Button";

const userInfos = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  bYear: "",
  bMonth: "",
  bDay: "",
  gender: "",
};

export default function RegisterForm() {
  const [user, setUser] = useState(userInfos);
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("backdrop"))}
      {ReactDOM.createPortal(
        <div className="absolute z-30 w-[350px] h-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-sm shadow-black/20 rounded-[10px] p-[15px] pb-[1rem]">
          <div className="relative flex flex-col gap-[10px] pb-[10px] border-b-[1px] border-b-[#e4e6eb]">
            <i className="exit_icon absolute right-0  cursor-pointer"></i>
            <span className="font-[700] text-[32px]">Sign Up</span>
            <span className="text-[15px] text-[#65676b] ">
              it's quick and easy
            </span>
          </div>
          <Formik>
            {(formik) => (
              <Form className="w-full flex flex-col items-center">
                <div className="py-[7px] px-0 flex flex-col gap-[10px]">
                  <RegisterInput
                    type="text"
                    placeholder="First name"
                    name="first_name"
                    onChange={handleRegisterChange}
                  />
                  <RegisterInput
                    type="text"
                    placeholder="Surname"
                    name="last_name"
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="py-[7px] px-0 flex flex-col gap-[10px]">
                  <RegisterInput
                    type="text"
                    placeholder="Mobile number or email address"
                    name="email"
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="py-[7px] px-0 flex flex-col gap-[10px]">
                  <RegisterInput
                    type="password"
                    placeholder="New password"
                    name="password"
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="relative self-start mt-[10px] py-0 px-[10px]">
                  <div className="flex items-center gap-[2px] text-[13px] text-[#65676b]">
                    Date of birth <i className="info_icon mt-[3px]"></i>
                  </div>
                  <div className="w-full h-[35px] mt-[5px] grid gap-[10px] grid-cols-3 child:w-[90px] child:text-[16px] child:rounded-[5px] child:bg-white">
                    <select name="bDay">
                      <option>15</option>
                    </select>
                    <select name="bMonth">
                      <option>15</option>
                    </select>
                    <select name="bYear">
                      <option>15</option>
                    </select>
                  </div>
                </div>
                <div className="relative self-start mt-[10px] py-0 px-[10px]">
                  <div className="flex items-center gap-[2px] text-[13px] text-[#65676b]">
                    Gender <i className="info_icon mt-[3px]"></i>
                  </div>
                  <div className="w-full h-[35px] mt-[5px] grid gap-[10px] grid-cols-3 child:w-[90px] child:flex child:items-center child:justify-between child:text-[16px] child:rounded-[5px] child:py-0 child:px-[10px] child:border-[1px] child:border-[#65676b]">
                    <label htmlFor="male">
                      Male
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                        onChange={handleRegisterChange}
                      />
                    </label>
                    <label htmlFor="female">
                      Female
                      <input
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                        onChange={handleRegisterChange}
                      />
                    </label>
                    <label htmlFor="custom">
                      Custom
                      <input
                        type="radio"
                        name="gender"
                        id="custom"
                        value="custom"
                        onChange={handleRegisterChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="text-[11px] mt-[10px] text-[#65676b] child:text-[#1876f2]">
                  By clicking Sign Up, you agree to our{" "}
                  <span>Terms, Data Policy &nbsp;</span>
                  and <span>Cookie Policy.</span> You may receive SMS
                  notifications from us and can opt out at any time.
                </div>
                <div className="w-full flex items-center justify-center mx-0 mt-[20px] mb-[10px]">
                  <Button
                    type="submit"
                    className="w-[70%] font-[600] text-[17px] mt-[1rem] bg-[#42b72a] px-12 "
                    btnName="Sign up"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>,
        document.getElementById("overlay")
      )}
    </>
  );
}
