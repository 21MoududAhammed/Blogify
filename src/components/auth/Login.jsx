import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Field from "../common/Field";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = formData =>{
    console.log(formData);
  }

  return (
    <section className="container">
      {/* Login Form into a box center of the page */}
      <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("password", { required: "password is required." })}
              type="password"
              id="password"
              name="password"
              className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </Field>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
            >
              Login
            </button>
          </div>
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
