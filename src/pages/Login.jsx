import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { RxCross2 } from "react-icons/rx";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

function Login() {
  {
    /* ---------------- Usestates ----------------   */
  }

  const [infoUpdate, setInfoUpdate] = useState(0);
  const [skill, setSkill] = useState("");
  const [demoArray, setDemoArray] = useState([]);
  const [passwordHideShow, setPasswordHideShow] = useState(false);

  {
    /* ---------------- validation ----------------   */
  }
  const signupValidation = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        "Password must include uppercase, lowercase, number, and special character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    agree: yup
      .boolean()
      .required("This is required")
      .oneOf([true], "You must accept terms"),
  });

  const skillsValidation = yup.object().shape({
    skills: yup.string(),
  });

  const personalValidation = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    fatherName: yup.string().required("Father name is required"),
    age: yup
      .number()
      .typeError("Age must be a number")
      .required("Age is required")
      .positive("Age must be positive")
      .integer("Age must be an integer")
      .min(18, "You must be at least 18")
      .max(60, "You must be under 60"),
    phoneNo: yup
      .string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number must only contain digits")
      .length(11, "Phone number must be 11 digits"),
    address: yup.string(),
  });

  {
    /* ---------------- Skill function ----------------   */
  }

  const addSkillFunction = () => {
    if (skill.trim() !== "" && !demoArray.includes(skill)) {
      setDemoArray([...demoArray, skill]);
      setSkill(""); // clear input after adding
    } else {
      alert(`${skill} is content in this skills section`);
    }
  };
  return (
    <div className="relative">
      <Navbar />
      <div className="w-full min-h-screen">
        {/* ---------------- sign-up information ----------------   */}

        <div
          className={`bg-gray-400 py-3 mx-auto mt-[10%] w-[50%] rounded-md shadow-xl ${
            infoUpdate == 0 ? "block" : "hidden"
          } `}
        >
          <h2 className="text-center text-2xl font-semibold">
            Sign-up Information
          </h2>
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              agree: false,
            }}
            validationSchema={signupValidation}
            validateOnBlur={true}
            onSubmit={(values, { resetForm }) => {
              if (values.agree) {
                setInfoUpdate(1);
                resetForm();
              } else {
                alert("You must accept terms");
              }
            }}
          >
            <Form className="mt-5 px-5 flex flex-col gap-3">
              {/* ----------- email -----------  */}
              <div>
                <label htmlFor="email" className="text-lg">
                  E-mail <span className="text-red-600 text-xl">*</span>
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter Your E-mail "
                  className="w-full text-md p-2 rounded-lg border-none outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              {/* ----------- password -----------  */}
              <div>
                <label htmlFor="password" className="text-lg">
                  Password <span className="text-red-600 text-xl">*</span>
                </label>
                <div className="relative">
                  <Field
                    type={passwordHideShow ? "text" : "password"}
                    name="password"
                    placeholder="Enter Your Password "
                    className="w-full text-md p-2 rounded-lg border-none outline-none"
                  />
                  <div
                    className="absolute top-2 end-3 hover:cursor-pointer"
                    onClick={() => setPasswordHideShow(!passwordHideShow)}
                  >
                    {passwordHideShow ? (
                      <IoIosEyeOff className="text-2xl" />
                    ) : (
                      <IoIosEye className="text-2xl" />
                    )}
                  </div>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              {/* ----------- confirm password -----------  */}
              <div>
                <label htmlFor="confirmPassword" className="text-lg">
                  Confirm-Password
                  <span className="text-red-600 text-xl">*</span>
                </label>
                <div className="relative">
                  <Field
                    type={passwordHideShow ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Enter Your confirm-Password"
                    className="w-full text-md p-2 rounded-lg border-none outline-none"
                  />
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              {/* ----------- remember -----------  */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3">
                  <Field type="checkbox" name="agree" />I agree to the terms
                </label>
                <div className="text-end">
                  <Link
                    to="/blank"
                    className=" hover:underline hover:text-red-600"
                  >
                    Forget Password?
                  </Link>
                </div>
              </div>
              <div className="text-end">
                <button
                  type="submit"
                  className="px-10 py-2 bg-blue-500 text-white rounded-md"
                >
                  Next
                </button>
              </div>
            </Form>
          </Formik>
        </div>

        {/* ---------------- basic information ----------------   */}

        <div
          className={`bg-gray-400 py-3 mx-auto mt-[5%] w-[50%] rounded-md shadow-xl ${
            infoUpdate == 1 ? "block" : "hidden"
          } `}
        >
          <h2 className="text-center text-2xl font-semibold">
            Personal Information
          </h2>
          <Formik
            initialValues={{
              fullName: "",
              fatherName: "",
              age: "",
              phoneNo: "",
              address: "",
            }}
            validationSchema={personalValidation}
            validateOnBlur={true}
            onSubmit={(values, { resetForm }) => {
              setInfoUpdate(2);
              resetForm();
            }}
          >
            <Form className="mt-5 px-5 flex flex-col gap-3">
              <div>
                <label htmlFor="full-name" className="text-lg">
                  Full Name <span className="text-red-600 text-xl">*</span>
                </label>
                <Field
                  type="text"
                  name="fullName"
                  placeholder="Enter Your Full Name"
                  className="w-full text-md p-2 rounded-lg border-none outline-none "
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div>
                <label htmlFor="full-name" className="text-lg">
                  Father Name <span className="text-red-600 text-xl">*</span>
                </label>
                <Field
                  type="text"
                  name="fatherName"
                  placeholder="Enter Your Father Name"
                  className="w-full text-md p-2 rounded-lg border-none outline-none "
                />
                <ErrorMessage
                  name="fatherName"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div>
                <label htmlFor="full-name" className="text-lg">
                  Age <span className="text-red-600 text-xl">*</span>
                </label>
                <Field
                  type="number"
                  name="age"
                  placeholder="Enter Your Age"
                  className="w-full text-md p-2 rounded-lg border-none outline-none "
                />
              </div>
              <ErrorMessage
                name="age"
                component="div"
                className="text-red-600 text-sm"
              />
              <div>
                <label htmlFor="full-name" className="text-lg">
                  Phone No <span className="text-red-600 text-xl">*</span>
                </label>
                <Field
                  type="text"
                  name="phoneNo"
                  placeholder="e.g 03204698158"
                  className="w-full text-md p-2 rounded-lg border-none outline-none "
                />
                <ErrorMessage
                  name="phoneNo"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div>
                <label htmlFor="full-name" className="text-lg">
                  Address
                </label>
                <Field
                  type="text"
                  name="address"
                  placeholder="Enter Your Address"
                  className="w-full text-md p-2 rounded-lg border-none outline-none "
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div className="text-end">
                <button
                  type="submit"
                  className="px-10 py-2 bg-blue-500 text-white rounded-md"
                >
                  Next
                </button>
              </div>
            </Form>
          </Formik>
        </div>

        {/* ---------------- Skills information ----------------   */}

        <div
          className={`bg-gray-400 py-3 mx-auto mt-[10%] w-[50%] rounded-md shadow-xl ${
            infoUpdate == 2 ? "block" : "hidden"
          } `}
        >
          <h2 className="text-center text-2xl font-semibold">
            Skills Information
          </h2>
          <Formik
            initialValues={{ skills: "" }}
            validationSchema={skillsValidation}
            validateOnBlur={true}
            onSubmit={(values, { resetForm }) => {
              if (demoArray.length >= 3) {
                setInfoUpdate(3);
                resetForm();
                alert("you are successfully sign-up");
              } else {
                alert("You add skill min 3");
              }
            }}
          >
            <Form className="mt-5 px-5 flex flex-col gap-3">
              <div>
                <label htmlFor="full-name" className="text-lg">
                  Skills <span className="text-red-600 text-xl">*</span>
                </label>
                <div className="flex">
                  <Field
                    type="text"
                    name="skills"
                    placeholder="Enter Your skills "
                    className="w-[80%] text-md p-2 rounded-lg border-none outline-none"
                    value={skill}
                    onChange={(e) => {
                      setSkill(e.target.value);
                    }}
                  />
                  <button
                    type="button"
                    className="w-[19%] ms-auto rounded-md py-2 bg-blue-500 text-white"
                    onClick={addSkillFunction}
                  >
                    Add Skill
                  </button>
                </div>
                <ErrorMessage
                  name="skills"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="w-full bg-white py-3 px-3 rounded-md min-h-[100px] flex flex-wrap gap-2">
                {demoArray.map((items, index) => {
                  return (
                    <div
                      key={index}
                      className="px-3 text-white h-[25px] bg-blue-500 flex items-center gap-2 rounded"
                    >
                      <span>{items}</span>
                      <RxCross2
                        className="cursor-pointer hover:text-red-300"
                        onClick={() =>
                          setDemoArray(demoArray.filter((_, i) => i !== index))
                        }
                      />
                    </div>
                  );
                })}
              </div>
              <div className="text-end">
                <button
                  type="submit"
                  className="px-10 py-2 bg-blue-500 text-white rounded-md"
                >
                  Next
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
