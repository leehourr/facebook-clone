import React, { useState } from "react";
import { redirect } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";
import { login } from "../../utils/api-call";

const Auth = () => {
  const [isOpen, setIsOpen] = useState(false);

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

export const action = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");
  const credential = { email: email, password: password };
  // console.log(credential);
  const res = await login(credential);
  console.log(res);
  return redirect("/");
};
