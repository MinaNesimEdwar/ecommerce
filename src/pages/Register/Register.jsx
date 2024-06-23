import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();
  let id;
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is Required")
      .min(3, "name should at least  3 charecters")
      .max(15, "name should at most  15 charecters"),
    email: Yup.string()
      .required("Email is Required")
      .email("this email is not valid"),
    password: Yup.string()
      .required("Password is Required")
      .matches(
        /^[A-Z][A-Za-z0-9]{5,25}/,
        "password should start with uppercase"
      ),
    rePassword: Yup.string()
      .required("Repassword is Required")
      .oneOf([Yup.ref("password")], "password and repassword should match"),
    phone: Yup.string()
      .required("Phone is Required")
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        "phone number is not valid"
      ),
  });
  async function sendDataToRgister(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      id = toast.loading("Waiting...");
      const { data } = await axios.request(options);
      toast.dismiss(id);
      toast.success("user created successfly");
      if (data.message === "success") {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setErrMsg(error.response.data.message);
      toast.dismiss(id);
      toast.error(error.response.data.message);
    }
  }
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: sendDataToRgister,
  });
  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <section>
        <h2 className=" text-2xl font-semibold text-main capitalize mb-4">
          <i className="fa-solid fa-user"></i>
          <span> register now ! </span>
        </h2>
        <form className="flex flex-col gap-4 " onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="text"
              className="form-control w-full "
              placeholder="Name.."
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <div className=" bg-red-100 text-red-600 border-red-600 border-2 py-2 px-2 my-2 rounded">
                * {formik.errors.name}
              </div>
            ) : (
              ""
            )}
          </div>
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
              placeholder="Password.."
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className=" bg-red-100 text-red-600 border-red-600 border-2 py-2 px-2 my-2 rounded">
                * {formik.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            <input
              type="password"
              className="form-control w-full "
              placeholder="Repassword.."
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className=" bg-red-100 text-red-600 border-red-600 border-2 py-2 px-2 my-2 rounded">
                * {formik.errors.rePassword}
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            <input
              type="tel"
              className="form-control w-full "
              placeholder="Phone.."
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className=" bg-red-100 text-red-600 border-red-600 border-2 py-2 px-2 my-2 rounded">
                * {formik.errors.phone}
              </div>
            ) : (
              ""
            )}
          </div>
          <button type="submit" className="btn block ms-auto">
            Register
          </button>
        </form>
      </section>
    </>
  );
}
