import React from "react";
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";
import Footer from "../../components/Ui/Footer";

const Auth = () => {
  return (
    <div className="h-full">
      <LoginForm />
      {/* <RegisterForm /> */}
    </div>
  );
};

export default Auth;
