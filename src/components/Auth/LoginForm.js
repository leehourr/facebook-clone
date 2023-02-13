import React, { useRef } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import LoginInput from "../Ui/LoginInput";
import Button from "../Ui/Button";
import Footer from "../Ui/Footer";

const LoginForm = ({ openForm }) => {
  const inputEmail = useRef();
  const inputPassword = useRef();
  // console.log(login);

  const inputHandler = (e) => {
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    console.log(email, password);
  };
  const loginValidation = yup.object({
    email: yup
      .string()
      .required("Email address is required.")
      .email("Must be a valid email")
      .max(100),
    password: yup.string().required("Password is required"),
  });

  return (
    <div className="bg-[#f0f2f5] w-full h-full">
      <div className="h-[720px] lg:flex lg:items-center lg:pr-2 lg:max-w-[1000px] lg:my-0 lg:mx-auto ">
        <div className="w-[300px] my-0 mx-auto lg:flex lg:flex-col lg:w-1/2 lg:mb-[15vh] ">
          <img
            className="lg:w-[300px] lg:ml-[-1.7rem]"
            src="../../icons/facebook.svg"
            alt=""
          />
          <span className="text-[20px] lg:text-[28px]">
            Facebook helps you connect and share with the people in your life.
          </span>
        </div>
        <div className="text-center">
          <div className="flex flex-col lg:w-[400px] items-center gap-[1rem] shadow-sm shadow-black/20 select-none bg-white p-[1rem] pb-[2rem] w-[350px] h-fit my-[1rem] mx-auto rounded-[10px]">
            <Formik
              onSubmit={inputHandler}
              enableReinitialize
              initialValues={{
                inputEmail,
                inputPassword,
              }}
              validationSchema={loginValidation}
            >
              {(formik) => (
                <Form>
                  <LoginInput
                    ref={inputEmail}
                    type="text"
                    name="email"
                    placeholder="Email address or phone number"
                    // onChange={inputHandler}
                  />
                  <LoginInput
                    ref={inputPassword}
                    type="password"
                    name="password"
                    placeholder="Password"
                    //onChange={inputHandler}
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
              to="/forgot"
              className="text-[#1876f2] texxt-[14px] cursor-pointer"
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
