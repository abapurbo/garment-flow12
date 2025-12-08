import React from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const password = data.password;

    // Password Validation
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const isLong = password.length >= 6;

    if (!hasUpper) {
      toast.error("Password must contain an Uppercase letter");
      return;
    }
    if (!hasLower) {
      toast.error("Password must contain a Lowercase letter");
      return;
    }
    if (!isLong) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Success Login
    toast.success("Login Successful!");
    console.log("Form Data:", {
      ...data,
      role: "buyer",
      status: "pending",
    });
  };

  // Google Login Placeholder
  const handleGoogleLogin = () => {
    const user = {
      role: "buyer",
      status: "pending",
    };
    toast.success("Google Login Successful!");
    console.log("Google User ->", user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div>
        
      </div>
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h2 className="card-title text-center text-2xl font-bold">Login</h2>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="input input-bordered w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered w-full"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          {/* Login Button */}
          <div className="form-control mt-4">
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-outline mt-3 w-full"
          >
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <Link to="/register" className="link link-primary">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
