"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react"; // Added Suspense
import Link from "next/link";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

// 1. Move the logic into a separate component
function LoginForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: any) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      toast.error("Invalid email or password");
      return;
    }

    toast.success("Login successful!");
    router.push(callbackUrl);
    router.refresh();
  };

  const handleDemoLogin = () => {
    setValue("email", "user@gmail.com", { shouldValidate: true });
    setValue("password", "user1234", { shouldValidate: true });
  };

  const inputClass =
    "w-full rounded-md border px-3 py-2 text-sm text-gray-900 " +
    "focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition";

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50/50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">Welcome Back</h2>
        <p className="text-sm text-center text-gray-500 mb-8">Please enter your details to sign in</p>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md mb-4 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="name@example.com"
              className={inputClass}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                {...register("password", { required: "Password is required" })}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message as string}
              </p>
            )}
          </div>

          <div className="pt-2 space-y-3">
            <button
              type="submit"
              className="w-full rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white
                hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500
                transition shadow-sm"
            >
              Login
            </button>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full flex items-center justify-center gap-2 rounded-md border border-orange-200 
                bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700
                hover:bg-orange-100 transition"
            >
              <ShieldCheck size={16} />
              Use Demo Credentials
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-orange-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

// 2. Wrap the form in Suspense in the main export
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-gray-50/50">
        <div className="animate-pulse text-orange-600 font-medium">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}