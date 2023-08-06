import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { auth, createUserDocument } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  createGuest,
  signUpThunk,
  updateUserThunk,
} from "../../redux/slices/userSlice";
import { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length"),
  name: yup
    .string("write your name")
    .matches(/^[A-Z]/, "Must be uppercased")
    .required("Name is required"),
  surname: yup
    .string("write your surname")
    .matches(/^[A-Z]/, "Must be uppercased")
    .required("Surname is required"),
  job: yup.string("write your job").required("Job is required"),
});

const SignUp = ({ edit }) => {
  const dispatch = useDispatch();
  const [isAuth, setAuth] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      surname: "",
      job: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (isAuth) {
        dispatch(updateUserThunk({ user: values }));
      } else {
        dispatch(signUpThunk({ user: values }));
      }
      setTimeout(()=>{
        navigate("/", { replace: true });
      },1000)
    },
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setAuth(user);
      formik.setValues(user);
    }
  }, []);

  return (
    <>
      <div className="w-[100%] h-[80vh] mx-auto  p-4  flex flex-col items-center">
        <h2>{edit ? "Edit profile" : "Sign Up"}</h2>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              sx={{ margin: "20px 0px 20px 0px", position: "relative" }}
              fullWidth
              id="emailUp"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!formik.touched.email && Boolean(formik.errors.email)}
              helperText={(formik.touched.email && formik.errors.email) || ""}
            />
            {!edit && (
              <TextField
                sx={{ margin: "20px 0px 20px 0px", position: "relative" }}
                fullWidth
                id="passwordUp"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  !!formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={
                  (formik.touched.password && formik.errors.password) || ""
                }
              />
            )}

            <TextField
              sx={{ margin: "20px 0px 20px 0px", position: "relative" }}
              fullWidth
              id="surname"
              name="surname"
              label="Surname"
              type="text"
              value={formik.values.surname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!formik.touched.surname && Boolean(formik.errors.surname)}
              helperText={
                (formik.touched.surname && formik.errors.surname) || ""
              }
            />
            <TextField
              sx={{ margin: "20px 0px 20px 0px", position: "relative" }}
              fullWidth
              id="name"
              name="name"
              label="Name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!formik.touched.name && Boolean(formik.errors.name)}
              helperText={(formik.touched.name && formik.errors.name) || ""}
            />
            <TextField
              sx={{ margin: "20px 0px 20px 0px", position: "relative" }}
              fullWidth
              id="job"
              name="job"
              label="Job"
              type="text"
              value={formik.values.job}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!formik.touched.job && Boolean(formik.errors.job)}
              helperText={(!!formik.touched.job && formik.errors.job) || ""}
            />
            {!edit && (
              <div className="flex flex-col px-3 pb-2 items-end">
                <Link to="/signIn">
                  <h3 className="text-lg text-gray-400 hover:text-slate-600 ">
                    {" "}
                    I have accounnt{" "}
                  </h3>
                </Link>
                <h3
                  onClick={() => {
                    dispatch(createGuest({ guest: true }));
                    navigate("/", { replace: true });
                  }}
                  className="text-lg text-gray-400 hover:text-slate-600 "
                >
                  Enter without accaunt
                </h3>
              </div>
            )}

            <Button color="primary" variant="contained" fullWidth type="submit">
              {edit ? "Edit" : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
