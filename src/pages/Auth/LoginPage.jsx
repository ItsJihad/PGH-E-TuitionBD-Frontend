import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import { useAxiosOpen } from "../../hooks/useAxiosOpen";

export default function Loginpage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const Axios = useAxiosOpen();
  const { signIn, GoogleSign } = UseAuth();

  const [showPwd, setShowPwd] = useState(false);
  const [authError, setAuthError] = useState("");

  const location = useLocation();
  const navigation = useNavigate();

  /* ================= GOOGLE LOGIN ================= */
  const googleSignIn = async () => {
    try {
      setAuthError("");

      const result = await GoogleSign();
      const user = result.user;
      const token = await user.getIdToken();

      await Axios.post(
        "/user/googleauth",
        { role: "student", phone: "0100000000" },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      navigation(location?.state || "/");
    } catch (error) {
      setAuthError(error.message);
    }
  };

  /* ================= EMAIL LOGIN ================= */
  const onSubmit = async (data) => {
    try {
      setAuthError("");
      await signIn(data.email, data.password);
      navigation(location?.state || "/");
    } catch (error) {
      setAuthError(error.message);
    }
  };

  /* ================= DEMO AUTO FILL ================= */
  const fillDemo = (email, password) => {
    setValue("email", email);
    setValue("password", password);
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex items-center justify-center px-4 py-16">
      <main className="w-full max-w-md">
        <div className="bg-base-200 border border-base-300 rounded-xl shadow-lg p-8">

          {/* HEADER */}
          <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-sm text-base-content/70">
              Sign in to continue to eTuitionBd
            </p>
          </header>

          {/* ERROR MESSAGE */}
          {authError && (
            <div className="alert alert-error mb-6 text-sm">
              {authError}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* EMAIL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>

              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
                className="input input-bordered w-full"
              />

              {errors.email && (
                <span className="text-error text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* PASSWORD */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                  className="input input-bordered w-full pr-16"
                />

                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-primary text-sm"
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password && (
                <span className="text-error text-xs mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="divider text-xs my-8">
            Or continue with
          </div>

          {/* GOOGLE LOGIN */}
          <button
            onClick={googleSignIn}
            className="btn btn-outline w-full"
          >
            Continue with Google
          </button>

          {/* ================= DEMO CREDENTIALS ================= */}
          <div className="mt-8 bg-base-100 border border-base-300 rounded-lg p-5 text-sm">

            <h3 className="font-semibold text-base-content mb-4 text-center">
              Demo Credentials
            </h3>

            <div className="space-y-4">

              {/* Student */}
              <button
                type="button"
                onClick={() =>
                  fillDemo("demo.student@etuitionbd.com", "123456")
                }
                className="w-full text-left p-3 rounded-lg bg-base-200 hover:bg-primary/10 transition"
              >
                <p className="font-semibold text-primary mb-1">Student</p>
                <p>Email: demo.student@etuitionbd.com</p>
                <p>Password: 123456</p>
              </button>

              {/* Teacher */}
              <button
                type="button"
                onClick={() =>
                  fillDemo("demo.teacher@etuitionbd.com", "123456")
                }
                className="w-full text-left p-3 rounded-lg bg-base-200 hover:bg-secondary/10 transition"
              >
                <p className="font-semibold text-secondary mb-1">Teacher</p>
                <p>Email: demo.teacher@etuitionbd.com</p>
                <p>Password: 123456</p>
              </button>

              {/* Admin */}
              <button
                type="button"
                onClick={() =>
                  fillDemo("demo.admin@etuitionbd.com", "123456")
                }
                className="w-full text-left p-3 rounded-lg bg-base-200 hover:bg-accent/10 transition"
              >
                <p className="font-semibold text-accent mb-1">Admin</p>
                <p>Email: demo.admin@etuitionbd.com</p>
                <p>Password: 123456</p>
              </button>

            </div>
          </div>

          {/* LINKS */}
          <div className="mt-8 text-center text-sm text-base-content/70">
            <Link to="/forgot" className="text-primary hover:underline mr-3">
              Forgot password?
            </Link>
            |
            <Link
              to="/register"
              className="text-primary hover:underline ml-3"
            >
              Create account
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}