import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Geocode from "react-geocode"; // Import react-geocode
import axios from "axios";

export default function AddressForm() {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const validationSchema = Yup.object({
    address: Yup.string()
      .required("Address is required")
      .min(4, "name must be at least 3 charechters"),

    email: Yup.string().email("email is not valid"),
  });

  async function getGeoLocation(values) {
    try {
      const options = {
        url: `https://api.opencagedata.com/geocode/v1/json?q=${
          values.address
        }&key=${import.meta.env.VITE__OPEN_CAGED_API_KEY}`,
        method: "GET",
      };

      const { data } = await axios.request(options);

      console.log(data.results[0].geometry);

      setLat(data.results[0].geometry.lat);
      setLng(data.results[0].geometry.lng);
    } catch (error) {
      console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      address: "",
      email: "",
    },

    validationSchema,

    onSubmit: getGeoLocation,
  });

  return (
    <>
      <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <div className="relative">
            <input
              type="text"
              id="address"
              className="custom-input border-1 peer"
              placeholder=" "
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="Address" className="custom-label">
              Address
            </label>
            {formik.errors.address && formik.touched.address ? (
              <div className="text-red-600 font-semibold mt-2">
                * {formik.errors.address}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="mb-5">
          <div className="relative">
            <input
              type="text"
              id="email"
              className="custom-input border-1 peer"
              placeholder=" "
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="Email Address" className="custom-label">
              Email Address
            </label>

            {formik.errors.email && formik.touched.email ? (
              <div className="text-red-600 font-semibold mt-2">
                * {formik.errors.email}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>

      <h2 className="text-slate-100 text-xl text-center py-6">
        {lat ? `Geolocation: ${lat}, ${lng}` : ""}
      </h2>
    </>
  );
}
