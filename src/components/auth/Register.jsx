import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { auth, setAuth } = useAuth();

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/auth/register`,
        formData
      );
      if (response?.status === 201) {
        const { token, user } = response?.data;
        setAuth({
          ...auth,
          authToken: token?.accessToken,
          refreshToken: token?.refreshToken,
          user: user,
        });
        toast.success(`${formData?.firstName} has registered.`);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.warning(err?.message);
    }
  };

  return (
    <section className="container">
      <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            label={"First Name"}
            htmlFor={"firstName"}
            error={errors?.firstName}
          >
            <input
              {...register("firstName", {
                required: "First Name is required.",
              })}
              type="text"
              id="firstName"
              name="firstName"
              className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </Field>
          <Field
            label={"Last Name"}
            htmlFor={"lastName"}
            error={errors?.lastName}
          >
            <input
              {...register("lastName", { required: "Last Name is required." })}
              type="text"
              id="lastName"
              name="lastName"
              className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </Field>
          <Field label={"Email"} htmlFor={"email"} error={errors?.email}>
            <input
              {...register("email", { required: "Email is required." })}
              type="email"
              id="email"
              name="email"
              className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </Field>
          <Field
            label={"Password"}
            htmlFor={"password"}
            error={errors?.password}
          >
            <input
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 8,
                  message: "At least 8 characters.",
                },
              })}
              type="password"
              id="password"
              name="password"
              className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </Field>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
            >
              Create Account
            </button>
          </div>
          <p className="text-center">
            Already have account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
