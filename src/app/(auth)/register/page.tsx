'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      password: form.password.value,
    };

    const result = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/login");
    } else {
      setIsLoading(false);
      setError("Email is already registered");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-slate-300 to-slate-100">
      <h1 className="mb-4 text-3xl font-bold">Register</h1>
      {error !== "" && (
        <p className="mb-4 text-red-500">{error}</p>
      )}
      <div className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="fullname" className="mb-2 block text-sm font-bold text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-sm font-bold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="mb-2 block text-sm font-bold text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <div
                  className="flex h-6 w-6 cursor-pointer items-center text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-full" />
                  ) : (
                    <FaEye className="w-full" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="focus:shadow-outline w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <p className="mt-4 text-sm text-gray-700">Have an account? Sign in <Link href="/login" className="text-blue-500">here</Link></p>
    </div>
  );
}