import React, { useState } from "react";
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";

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
