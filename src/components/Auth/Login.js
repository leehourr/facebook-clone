import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "./LoginInput";
import Button from "../Ui/Button";

const loginInfos = {
  email: "",
  password: "",
};

const Login = () => {
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  console.log(login);
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  return (
    <div className="bg-[#f0f2f5] w-full">
      <div className="h-[70vh] ">
        <div className="w-[300px] my-0 mx-auto">
          <img src="../../icons/facebook.svg" alt="" />
          <span className="text-[20px]">
            Facebook helps you connect and share with the people in your life.
          </span>
        </div>
        <div className="text-center">
          <div className="flex flex-col items-center gap-[1rem] shadow-sm shadow-black/70 select-none bg-white p-[1rem] pb-[2rem] w-[350px] h-fit my-[1rem] mx-auto rounded-[10px]">
            <Formik
              enableReinitialize
              initialValues={{
                email,
                password,
              }}
            >
              {(formik) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="email"
                    placeholder="Email address or phone number"
                    onChange={handleLoginChange}
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleLoginChange}
                  />
                  <Button
                    type="submit"
                    className=" w-full h-[50px] text-[17px] font-[700]"
                    btnName="Log in"
                  />
                </Form>
              )}
            </Formik>
            <Link
              to="/forgot"
              className="text-[#1876f2] texxt-[14px] cursor-pointer"
            >
              Forgotten password ?
            </Link>
            <div className="w-full h-[1px] bg-[#e4e6eb]"></div>
            <Button
              className=" bg-[#42b72a] w-[70%] font-[600] text-[17px] mt-[1rem]"
              btnName="Create Account"
            />
          </div>
          <Link to="/" className="text-[15px]">
            <b>Create a Page </b>
            for a celebrity, brand or business.
          </Link>
        </div>
      </div>
      <div className="register"></div>
    </div>
  );
};

export default Login;
