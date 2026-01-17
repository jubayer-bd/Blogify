"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (data: any) => {
    // Uses NextAuth signIn
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false, // We handle redirect manually
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/"); // Redirect to home/dashboard
      router.refresh();
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="w-full border p-2 rounded"
            />
             {errors.email && <p className="text-red-500 text-xs">{errors.email.message as string}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className="w-full border p-2 rounded"
            />
             {errors.password && <p className="text-red-500 text-xs">{errors.password.message as string}</p>}
          </div>

          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don't have an account? <Link href="/signup" className="text-blue-500">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}