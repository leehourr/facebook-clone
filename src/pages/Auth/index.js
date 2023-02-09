import React from "react";
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";
import Footer from "../../components/Ui/Footer";

const Auth = () => {
  return (
    <>
      <LoginForm />
      <RegisterForm />
      <Footer />
    </>
  );
};

export default Auth;
