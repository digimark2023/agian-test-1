"use client";
// Import necessary hooks and libraries
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "../utils/send-email";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import react-toastify CSS

export type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact: FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage form submission status

  async function onSubmit(data: FormData) {
    setIsSubmitting(true); // Indicate the start of form submission
    try {
      await sendEmail(data); // Attempt to send the email
      reset(); // Reset the form fields on successful email submission
      toast.success("Email sent successfully!"); // Display success toast message
    } catch (error) {
      toast.error("Failed to send the email."); // Display error toast message in case of failure
    } finally {
      setIsSubmitting(false); // Reset submission status regardless of the outcome
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto"
      >
        {/* Full Name Input */}
        <div className="mb-2">
          <label
            htmlFor="name"
            className="mb-3 block text-base font-medium text-black"
          >
            Full Name
          </label>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
            {...register("name", { required: true })}
          />
        </div>

        {/* Email Address Input */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-3 block text-base font-medium text-black"
          >
            Email Address
          </label>
          <input
            type="email"
            placeholder="example@domain.com"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
            {...register("email", { required: true })}
          />
        </div>

        {/* Message Textarea */}
        <div className="mb-5">
          <label
            htmlFor="message"
            className="mb-3 block text-base font-medium text-black"
          >
            Message
          </label>
          <textarea
            rows={4}
            placeholder="Type your message"
            className="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
            {...register("message", { required: true })}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="hover:shadow-form rounded-md bg-purple-500 py-3 px-8 text-base font-semibold text-white outline-none"
            disabled={isSubmitting} // Disable button during form submission
          >
            {isSubmitting ? "Sending..." : "Submit"}{" "}
            {/* Change button text based on submission status */}
          </button>
        </div>
      </form>
    </>
  );
};

export default Contact;
