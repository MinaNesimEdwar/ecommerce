import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { Helmet } from "react-helmet";
import { useState } from "react";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState(null);

  let id;
  let validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .email("this email is not valid"),
  });
  async function sendDataToForget(values) {
try {
      const options = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      method: "POST",
      data: values,
    };
    id = toast.loading("Waiting...");
    const { data } = await axios.request(options);
    console.log(data);
    if (data.statusMsg === "success") {
      toast.dismiss(id);
      toast.success("Email Verfied Successfly");
      setTimeout(() => {
        navigate("/verfiy");
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
      email: "",
    },
    validationSchema,
    onSubmit: sendDataToForget,
  });
  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <section>
        <h2 className=" text-2xl font-semibold text-main capitalize mb-4">
          <i className="fa-solid fa-user"></i>
          <span> Please Enter Your Email </span>
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

          <button type="submit" className="btn block ms-auto">
            verfiy
          </button>
        </form>
      </section>
    </>
  );
}
