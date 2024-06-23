import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../context/UserContext";
import { Helmet } from "react-helmet";

export default function NewPassword() {
  const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();
  const { setToken } = useContext(userContext);
  let id;
  let validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .email("this email is not valid"),
    newPassword: Yup.string()
      .required("New Password is Required")
      .matches(
        /^[A-Z][A-Za-z0-9]{5,25}/,
        "password should start with uppercase"
      ),
  });
  async function sendDataToLogin(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };
      id = toast.loading("Waiting...");
      const { data } = await axios.request(options);
      toast.dismiss(id);
      toast.success("user loggedin successfly");

      setTimeout(() => {
        if (data.token) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          navigate("/");
        }
      }, 2000);
    } catch (error) {
      setErrMsg(error.response.data.message);
      toast.dismiss(id);
      toast.error(error.response.data.message);
    }
  }
  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: sendDataToLogin,
  });
  return (
    <>
      <Helmet>
        <title>New Password</title>
      </Helmet>
      <section>
        <h2 className=" text-2xl font-semibold text-main capitalize mb-4">
          <i className="fa-solid fa-user"></i>
          <span> Enter New Password ! </span>
        </h2>
        <form className="flex flex-col gap-4 " onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="email"
              className="form-control w-full "
              placeholder="Email.."
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className=" bg-red-100 text-red-600 border-red-600 border-2 py-2 px-2 my-2 rounded">
                * {formik.errors.email}
              </div>
            ) : (
              ""
            )}
            {errMsg ? (
              <div className=" bg-red-100 text-red-600 border-red-600 border-2 py-2 px-2 my-2 rounded">
                * {errMsg}
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            <input
              type="password"
              className="form-control w-full "
              placeholder="New Password..."
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <div className=" bg-red-100 text-red-600 border-red-600 border-2 py-2 px-2 my-2 rounded">
                * {formik.errors.newPassword}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center justify-between">

            <button type="submit" className="btn block ms-auto">
              login
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
