"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { FaSignature, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa6";

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

  const styles = {
    label: "text-black/50 dark:text-white/90",
    input: [
      "bg-transparent",
      "text-black/90 dark:text-white/90",
      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
    ],
    innerWrapper: "bg-transparent",
    inputWrapper: [
      "shadow-xl",
      "bg-default-200/50",
      "dark:bg-default/60",
      "backdrop-blur-xl",
      "backdrop-saturate-200",
      "hover:bg-default-200/70",
      "focus-within:!bg-default-200/50",
      "dark:hover:bg-default/70",
      "dark:focus-within:!bg-default/60",
      "!cursor-text",
    ],
  };

  return (
    <div className="flex min-h-screen flex-col gap-y-6 items-center justify-center">
      <h1 className="text-4xl font-bold">Register</h1>
      {error !== "" && (
        <p className="text-red-500">{error}</p>
      )}
      <div className="rounded-2xl py-10 px-20 bg-gradient-to-tr from-sky-950 text-white shadow-[-25px_25px_75px_25px_rgba(0,127,255,0.75)]">
        <form onSubmit={handleSubmit} className="w-full space-y-10">
          <Input
            label="Full Name"
            type="text"
            name="fullname"
            id="fullname"
            size="lg"
            labelPlacement="outside"
            classNames={{...styles}}
            endContent={
              <FaSignature className="text-2xl text-black/90 dark:text-white/90 text-default-400 pointer-events-none" />
            }
          />
          <Input
            label="Email"
            type="email"
            name="email"
            id="email"
            size="lg"
            labelPlacement="outside"
            classNames={{...styles}}
            endContent={
              <FaEnvelope className="text-2xl text-black/90 dark:text-white/90 text-default-400 pointer-events-none" />
            }
          />
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            size="lg"
            labelPlacement="outside"
            classNames={{...styles}}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <FaEyeSlash className="text-2xl text-black/90 dark:text-white/90 text-default-400 pointer-events-none" />
                ) : (
                  <FaEye className="text-2xl text-black/90 dark:text-white/90 text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />
          <Button
            type="submit"
            color="primary"
            variant="shadow"
            className="w-full"
            isLoading={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </form>
      </div>
      <p className="text-sm text-slate-300">Have an account? Sign in <Link href="/login" className="text-blue-500">here</Link></p>
    </div>
  );
}