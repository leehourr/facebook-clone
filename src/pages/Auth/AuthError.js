import React, { useState } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import LoginInput from "../../components/Ui/LoginInput";
import Button from "../../components/Ui/Button";
import Footer from "../../components/Ui/Footer";
import { login as loginUser } from "../../utils/api-call";
import Cookies from "js-cookie";

const loginInfos = {
  email: "",
  password: "",
};

const AuthError = () => {
  const err = useRouteError();
  const navigate = useNavigate();
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  // const navigate = useNavigate();
  console.log(err);
  if (err.status === 404) {
    window.location.reload(false);
    navigate("/", { replace: true });
  }
  // const errMessage = err.data.message;
  // const [errMessage, setErrMessage] = useState("");

  // useEffect

  const inputHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  // console.log("error", err);

  const loginValidation = yup.object({
    email: yup
      .string()
      .required("Email address is required.")
      .email("Must be a valid email")
      .max(100),
    password: yup.string().required("Password is required"),
  });

  const submitHandler = async (e) => {
    const data = { email, password };
    const res = await loginUser(data);
    // console.log(res);
    if (res.token) {
      Cookies.set("token", res.token, {
        sameSite: "None; Secure",
      });

      window.location.reload(false);
    }
  };

  return (
    <div className="bg-[#f0f2f5] z-0 w-full h-full">
      <div className="h-[582px] lg:max-w-[1000px] pt-10 lg:mx-auto ">
        <div className="w-[300px] my-0 mx-auto  ">
          <img className="" src="../../icons/facebook.svg" alt="" />
        </div>
        <div className="text-center">
          <div className="flex  flex-col z-0 lg:w-[400px] items-center gap-[1rem] shadow-sm shadow-black/20 select-none bg-white p-[1rem] pb-[2rem] w-[350px] h-[369px] my-[1rem] mx-auto rounded-[10px]">
            <p className="font-[600] text-lg text-black/80 font-sanserif">
              Log Into Facebook
            </p>
            <p className=" text-s py-[10px] mx-10 w-[19.9rem] bg-red-100 border-[1px] border-red-600 text-[13px] rounded-[5px]">
              <span className="w-full font-semibold text-[1rem] block">
                Wrong Credentials
              </span>
              <span className="w-full block">Invalid username or password</span>
            </p>
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
              to="/forgot"
              className="text-[#1876f2] texxt-[14px] cursor-pointer"
            >
              Forgotten password ?
            </Link>
          </div>
        </div>
      </div>
      <footer className="h-[231px] w-full p-[1.5rem] bg-white">
        <Footer />
      </footer>
    </div>
  );
};

export default AuthError;
