import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import { useState } from "react";

export default function VerfiyCode() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState(null);
  let id;
  let validationSchema = Yup.object({
    resetCode: Yup.string().required("Code is Required"),
  });
  async function sendDataToVerfiy(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };
      id = toast.loading("Waiting...");
      const { data } = await axios.request(options);
      console.log(data);
      if (data.status === "Success") {
        toast.dismiss(id);
        toast.success("Code Verfied Successfly");
        setTimeout(() => {
          navigate("/newpass");
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
      resetCode: "",
    },
    validationSchema,
    onSubmit: sendDataToVerfiy,
  });
  return (
    <>
      <Helmet>
        <title>Verfiy Code</title>
      </Helmet>
      <section>
        <h2 className=" text-2xl font-semibold text-main capitalize mb-4">
          <i className="fa-solid fa-user"></i>
          <span> Please Enter Your Verfiy Code </span>
        </h2>
        <form className="flex flex-col gap-4 " onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="text"
              className="form-control w-full "
              placeholder="Code.."
              name="resetCode"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.resetCode && formik.touched.resetCode ? (
              <div className=" bg-red-100 text-red-600 border-red-600 border-2 py-2 px-2 my-2 rounded">
                * {formik.errors.resetCode}
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
