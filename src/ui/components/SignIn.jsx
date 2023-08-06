import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
      password: "foobar",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(loginUserThunk({ user: values }));
      navigate("/", { replace: true });
    },
  });


  return (
    <>
      <div className="w-[100%] h-[80vh] mx-auto  p-4  flex flex-col items-center">
        <h2>Log in</h2>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              sx={{ margin: "20px 0px 20px 0px", position: "relative" }}
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!formik.touched.email && Boolean(formik.errors.email)}
              helperText={!!formik.touched.email && formik.errors.email}
            />
            <TextField
              sx={{ margin: "20px 0px 20px 0px", position: "relative" }}
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                !!formik.touched.password && Boolean(formik.errors.password)
              }
              helperText={!!formik.touched.password && formik.errors.password}
            />
            <h3
              onClick={() => {
                dispatch(createGuest({ guest: true }));
                navigate("/", { replace: true });
              }}
              className="text-lg text-gray-400 hover:text-slate-600 mb-3"
            >
              Enter without accaunt
            </h3>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
