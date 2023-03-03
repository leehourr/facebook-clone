import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link, useFetcher } from "react-router-dom";
import * as yup from "yup";
import LoginInput from "../Ui/LoginInput";
import Button from "../Ui/Button";
import Footer from "../Ui/Footer";

const loginInfos = {
  email: "",
  password: "",
};

const LoginForm = ({ openForm }) => {
  // const inputEmail = useRef();
  // const inputPassword = useRef();
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  //uconsole.log(login);
  const fetch = useFetcher();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation = yup.object({
    email: yup
      .string()
      .required("Email address is required.")
      .email("Must be a valid email")
      .max(100),
    password: yup.string().required("Password is required"),
  });

  const submitHandler = () => {
    // console.log(email, password);
    fetch.submit({ email, password }, { method: "post", action: "/" });
  };

  return (
    <div className="bg-[#f0f2f5] z-0 w-full h-full">
      <div className="h-[720px] lg:flex lg:items-center lg:pr-2 lg:max-w-[1000px] lg:my-0 lg:mx-auto ">
        <div className="w-[300px] my-0 mx-auto lg:flex lg:flex-col lg:w-1/2 lg:mb-[15vh] ">
          <img
            className="lg:w-[300px] lg:ml-[-1.7rem]"
            src="../../icons/facebook.svg"
            alt=""
          />
          <span className="text-[20px] lg:text-[28px]">
            Connect with friends and the world around you on Facebook.
          </span>
        </div>
        <div className="text-center">
          <div className="flex flex-col z-0 lg:w-[370px] items-center gap-[1rem] shadow-sm shadow-black/20 select-none bg-white p-[1rem] pb-[2rem] w-[350px] h-fit my-[1rem] mx-auto rounded-[10px]">
            <Formik
              onSubmit={submitHandler}
              enableReinitialize
              initialValues={{
                email,
                password,
              }}
              validationSchema={loginValidation}
            >
              {(formik) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="email"
                    placeholder="Email address or phone number"
                    onChange={inputHandler}
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={inputHandler}
                    bottom
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
              to="/recover/findaccount"
              className="text-[#1876f2] hover:underline texxt-[14px] cursor-pointer"
            >
              Forgotten password ?
            </Link>
            <div className="w-full h-[1px] bg-[#e4e6eb]"></div>
            <Button
              onClick={openForm}
              className=" bg-[#42b72a] w-[192px] font-[600] h-[48px] text-[17px] mt-[1rem]"
              btnName="Create new account"
            />
          </div>
          <Link to="/" className="text-[15px]">
            <b className="no-underline hover:underline">Create a Page </b>
            for a celebrity, brand or business.
          </Link>
        </div>
      </div>
      <footer className="h-[231px] w-full p-[1.5rem] bg-white">
        <Footer />
      </footer>
    </div>
  );
};

export default LoginForm;
