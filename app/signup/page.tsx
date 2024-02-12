"use client";
import { useState } from "react";

function isInputNamedElement(
  e: Element
): e is HTMLInputElement & { name: string } {
  return "value" in e && "name" in e;
}

const SignupForm = () => {
  // Initialize state with a more descriptive initial value
  const [state, setState] = useState<"idle" | "loading" | "ready">("idle");

  async function handleOnSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData: Record<string, string> = {};

    Array.from(e.currentTarget.elements)
      .filter(isInputNamedElement)
      .forEach((field) => {
        formData[field.name] = field.value;
      });

    setState("loading");

    try {
      const response = await fetch("/api/resendemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Include content-type header
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          email: formData.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setState("ready");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setState("idle"); // Reset state or set to an error state
    }
  }

  // Simple implementation of buttonVariants function
  const buttonVariants = () => {
    return state === "loading"
      ? "bg-gray-500 text-white"
      : "bg-blue-500 text-white";
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
      {/* Assuming Label and Input are standard HTML elements */}
      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" />
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" />
      <button className={buttonVariants()} disabled={state === "loading"}>
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
