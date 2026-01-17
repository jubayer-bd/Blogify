"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        // Redirect to login after successful registration
        router.push("/login");
      } else {
        const errorData = await res.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Name Field */}
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="w-full border p-2 rounded"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message as string}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="w-full border p-2 rounded"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message as string}</p>}
          </div>

          {/* Image URL Field (Optional) */}
          <div>
            <label className="block mb-1 text-sm">Image URL (Optional)</label>
            <input
              {...register("image")}
              type="text"
              placeholder="https://example.com/avatar.jpg"
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 chars" } })}
              type="password"
              className="w-full border p-2 rounded"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message as string}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account? <Link href="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
}