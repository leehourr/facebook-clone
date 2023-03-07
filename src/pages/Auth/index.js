import React, { useState } from "react";
// import { Navigate, redirect } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";
import Cookies from "js-cookie";
import { login } from "../../utils/api-call";

const Auth = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (Cookies.get("token")) {
    window.location.reload(false);
    return;
  }

  const openForm = () => {
    setIsOpen(true);
  };

  const closeForm = async () => {
    setIsOpen(false);
  };

  return (
    <div className="h-full">
      <LoginForm openForm={openForm} />
      <RegisterForm isOpen={isOpen} closeForm={closeForm} />
    </div>
  );
};

export default Auth;

export const action = async ({ request, navigate }) => {
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");
  const credential = { email: email, password: password };
  // console.log("credential", credential);
  const res = await login(credential);
  console.log(res);

  await Cookies.set("token", res.token, {
    sameSite: "None; Secure",
  });
  // console.log(res);
  //window.location.reload(false)
  window.location.reload(false);
  return true;
};
