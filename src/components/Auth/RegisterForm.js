import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../Ui/RegisterInput";
import ReactDOM from "react-dom";
import { Backdrop } from "../Ui/Backdrop";
import * as yup from "yup";
import Button from "../Ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { register } from "../../utils/api-call";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const initialInput = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  bYear: new Date().getFullYear(),
  bMonth: new Date().getMonth() + 1,
  bDay: new Date().getDate(),
  gender: "",
};

export default function RegisterForm({ isOpen, closeForm }) {
  const [user, setUser] = useState(initialInput);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  // console.log(user);

  const yearTemp = new Date().getFullYear();

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index); //+1 cuz month starts from index 0
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index); // same as month

  const registerValidation = yup.object({
    first_name: yup
      .string()
      .required("What's your name ?")
      .min(2, "Fisrt name must be between 2 and 16 characters.")
      .max(16, "Fisrt name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
    last_name: yup
      .string()
      .required("What's your name ?")
      .min(2, "Last name must be between 2 and 16 characters.")
      .max(16, "Last name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
    email: yup
      .string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: yup
      .string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
  });

  // console.log(errorMessage);

  const submitHandler = async () => {
    setIsLoading(true);
    let current_date = new Date();
    let picked_date = new Date(user.bYear, user.bMonth - 1, user.bDay);
    let atleast14 = new Date(1970 + 14, 0, 1);
    let noMoreThan70 = new Date(1970 + 70, 0, 1);

    if (current_date - picked_date < atleast14) {
      setIsLoading(false);
      setErrorMessage(
        "It looks like you've enetered the wrong info. Please make sure that you use your real date of birth."
      );
      return;
    }
    if (current_date - picked_date > noMoreThan70) {
      setIsLoading(false);
      setErrorMessage(
        "It looks like you've enetered the wrong info.Please make sure that you use your real date of birth."
      );
      return;
    }
    if (user.gender === "") {
      setIsLoading(false);
      setErrorMessage(
        "Please choose a gender. You can change who can see this later."
      );
      return;
    }

    setErrorMessage("");
    const res = await register(user);
    dispatch(userActions.login(res));
    Cookies.set("user", JSON.stringify(res), { sameSite: "None; Secure" });
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, [1000]);
  };

  return (
    <>
      {ReactDOM.createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, zIndex: 50 }}
              animate={{ opacity: 1, zIndex: 50 }}
              exit={{ opacity: 0, zIndex: 50 }}
              transition={{ duration: 0.2, ease: "linear" }}
            >
              <Backdrop
                isOpen={isOpen}
                className=" bg-white/75 left-0 flex items-center justify-center"
              >
                <div
                  className={` z-50 w-[420px] sm:w-[432px] ${
                    errorMessage ? "h-[640px]" : "h-[580px]"
                  } bg-white shadow-sm shadow-black/20 rounded-[10px] py-[5px] px-[15px] pb-[1rem]`}
                >
                  <div className="relative flex flex-col pb-[10px] border-b-[1px] border-b-[#e4e6eb]">
                    <i
                      onClick={closeForm}
                      className="exit_icon absolute right-0 top-3 cursor-pointer"
                    ></i>
                    <span className="font-[700] text-[32px]">Sign Up</span>
                    <span className="text-[15px] text-[#65676b] ">
                      it's quick and easy
                    </span>
                  </div>
                  {errorMessage && (
                    <p className="p-2 w-full text-[#b94a48] font-semibold">
                      {errorMessage}
                    </p>
                  )}
                  <Formik
                    onSubmit={submitHandler}
                    enableReinitialize
                    initialValues={{
                      first_name,
                      last_name,
                      email,
                      password,
                      bYear,
                      bMonth,
                      bDay,
                      gender,
                    }}
                    validationSchema={registerValidation}
                  >
                    {(formik) => (
                      <Form className="w-full flex flex-col">
                        <div className="pt-[15px] pb-0  flex justify-around gap-[13px] ">
                          <RegisterInput
                            type="text"
                            placeholder="First name"
                            name="first_name"
                            onChange={handleRegisterChange}
                          />
                          <RegisterInput
                            type="text"
                            placeholder="Surname"
                            name="last_name"
                            onChange={handleRegisterChange}
                          />
                        </div>
                        <div className="w-full">
                          <RegisterInput
                            type="text"
                            placeholder="Mobile number or email address"
                            name="email"
                            onChange={handleRegisterChange}
                          />
                        </div>
                        <div className="w-full">
                          <RegisterInput
                            type="password"
                            placeholder="New password"
                            name="password"
                            onChange={handleRegisterChange}
                          />
                        </div>
                        <div className="relative w-full self-start mt-[4px] ">
                          <div className="flex items-center gap-[2px] text-[13px] text-[#65676b]">
                            Birthday{" "}
                            <i className="info_icon mt-[2px] ml-[2px]"></i>
                          </div>
                          <div className="w-full h-[35px] mt-[2px] grid gap-[10px] grid-cols-3 child:w-[full] child:text-[16px] child:rounded-[5px] child:bg-white child:border-[1px] child:pl-2 child:border-[#CCD0D5]">
                            <select
                              name="bDay"
                              value={bDay}
                              onChange={handleRegisterChange}
                            >
                              {days.map((day, i) => (
                                <option key={i} value={day}>
                                  {day}
                                </option>
                              ))}
                            </select>
                            <select
                              name="bMonth"
                              value={bMonth}
                              onChange={handleRegisterChange}
                            >
                              {months.map((month, i) => (
                                <option value={month} key={i}>
                                  {month}
                                </option>
                              ))}
                            </select>
                            <select
                              name="bYear"
                              value={bYear}
                              onChange={handleRegisterChange}
                            >
                              {years.map((year, i) => (
                                <option value={year} key={i}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="relative w-full self-start mt-[8px]">
                          <div className="flex items-center gap-[2px] text-[13px] text-[#65676b]">
                            Gender <i className="info_icon  ml-[2px]"></i>
                          </div>
                          <div className="w-full h-[35px] mt-[2px] grid gap-[10px] grid-cols-3 child:w-full child:flex child:items-center child:justify-between child:text-[16px] child:rounded-[5px] child:py-0 child:px-2 child:border-[1px] child:border-[#CCD0D5]">
                            <label htmlFor="male">
                              Male
                              <input
                                type="radio"
                                name="gender"
                                id="male"
                                value="male"
                                onChange={handleRegisterChange}
                              />
                            </label>
                            <label htmlFor="female">
                              Female
                              <input
                                type="radio"
                                name="gender"
                                id="female"
                                value="female"
                                onChange={handleRegisterChange}
                              />
                            </label>
                            <label htmlFor="custom">
                              Custom
                              <input
                                type="radio"
                                name="gender"
                                id="custom"
                                value="custom"
                                onChange={handleRegisterChange}
                              />
                            </label>
                          </div>
                        </div>
                        <div className="text-[11px] mt-[10px] text-[#65676b] child:text-[#1876f2]">
                          People who use our service may have uploaded your
                          contact information to Facebook.
                          <span> Learn more.</span>
                        </div>
                        <div className="text-[11px] mt-[10px] text-[#65676b] child:text-[#1876f2]">
                          By clicking Sign Up, you agree to our
                          <span> Terms, Data Policy &nbsp;</span>
                          and <span> Cookie Policy.</span> You may receive SMS
                          notifications from us and can opt out at any time.
                        </div>
                        <div className="w-full flex items-center justify-center mx-0 mt-[4px] mb-[10px]">
                          <Button
                            type="submit"
                            className={`${
                              isLoading && "opacity-50"
                            } px-16  py-1 font-[600] text-lg mt-[1rem] bg-[#42b72a] `}
                            btnName="Sign up"
                          />
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Backdrop>
            </motion.div>
          )}
        </AnimatePresence>,
        document.getElementById("backdrop")
      )}
      {/* {ReactDOM.createPortal(
,
        document.getElementById("overlay")
      )} */}
    </>
  );
}
