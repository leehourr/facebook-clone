import React, { useState } from "react";
import { redirect } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";
import Cookies from "js-cookie";
import { login } from "../../utils/api-call";
import { userActions } from "../../store/user-slice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import store from "../../store";

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
  createAsyncThunk();
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");
  const credential = { email: email, password: password };
  // console.log("credential", credential);
  const res = await login(credential);
  console.log(res);

  //using dispatch outsite component function which is action function in this one
  await store.dispatch(userActions.login(res));
  await Cookies.set("user", JSON.stringify(res), { sameSite: "None; Secure" });
  // console.log(res);
  return redirect("/");
};
