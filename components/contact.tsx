"use client";
// Import necessary hooks and libraries
import { FC, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "../utils/send-email";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import react-toastify CSS
import { Roboto_Flex } from "@next/font/google";
import Footer from "../components/Footer";

// export type FormData = {
//   name: string;
//   email: string;
//   message: string;
//   messageType: string; // Add messageType to the FormData type
// };
export type FormData = {
  name: string;
  email: string;
  message: string;
  messageType: string;
  phone: string;
  files: FileList | null; // Add files to the FormData type
  communicationOption: string; // Add this line
};

const satisfy = Roboto_Flex({
  subsets: ["latin"],
  weight: "400",
});

const Contact: FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage form submission status
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the file input
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
      {/* <div className="flex flex-col justify-center items-center min-h-screen bg-[#5253a7] px-4 w-3/4 mx-auto font-mono ${satisfy.className}"> */}
      <div
        className={`flex flex-col justify-center items-center min-h-screen bg-[#5253a7] px-4 w-3/4 mx-auto font-mono ${satisfy.className} rounded-lg`}
      >
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
        <h4 className="text-3xl font-semibold text-white mt-0">
          Want to work with us?
        </h4>
        <p className="leading-relaxed mt-1 mb-4 text-white">
          Complete this form and we will get back to you in 24 hours.
        </p>

        {/* Flex container for services and form */}
        <div className="flex w-full">
          {/* Services Column */}

          <div className="w-1/2 p-6 rounded-lg shadow-xl mr-2 bg-[#7072e0] ">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              {/* Our Services */}
            </h3>
            {/* <ul>
              <li className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center h-10 w-10 rounded-full bg-[#5253A7] text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19V6l-2 2m12 0l-2-2v13m-5 0h3a2 2 0 002-2V5a2 2 0 00-2-2h-3v16zm-2 0V3H7a2 2 0 00-2 2v12a2 2 0 002 2h3zm-3 0h3"
                      />
                    </svg>
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900">Service 1</p>
                  <p className="text-sm text-gray-600">
                    Description of Service 1.
                  </p>
                </div>
              </li>
              <li className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center h-10 w-10 rounded-full bg-[#5253A7] text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900">Service 2</p>
                  <p className="text-sm text-gray-600">
                    Description of Service 2.
                  </p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center h-10 w-10 rounded-full bg-[#5253A7] text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900">Service 3</p>
                  <p className="text-sm text-gray-600">
                    Description of Service 3.
                  </p>
                </div>
              </li>
            </ul> */}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-lg shadow-xl p-8 text-red-700 w-1/2" // Adjusted width class to w-3/4
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
            {/* <div className="mb-5">
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
          </div> */}

            <div style={{ display: "flex", marginBottom: "20px", gap: "10px" }}>
              <div style={{ flex: 1 }}>
                <label
                  htmlFor="email"
                  style={{ display: "block", marginBottom: "10px" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="abc@example.com"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label
                  htmlFor="phone"
                  style={{ display: "block", marginBottom: "10px" }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  {...register("phone", { required: true })}
                  placeholder="+91 99999 99999"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <div className="mb-5" style={{ flex: 1 }}>
                <label
                  htmlFor="messageType"
                  className="mb-3 block text-base font-medium text-black"
                >
                  Message Category
                </label>
                <select
                  {...register("messageType", { required: true })}
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                >
                  <option value="">Select a type</option>
                  <option value="inquiry">Inquiry</option>
                  <option value="support">Support</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>
              <div className="mb-5" style={{ flex: 1 }}>
                <label
                  htmlFor="communicationOption"
                  className="mb-3 block text-base font-medium text-black"
                >
                  Communication Option
                </label>
                <select
                  {...register("communicationOption", { required: true })}
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                >
                  <option value="">Select an option</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                </select>
              </div>
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
                className="hover:shadow-form rounded-md bg-[#5253A7] py-3 px-8 text-base font-semibold text-white outline-none"
                disabled={isSubmitting} // Disable button during form submission
              >
                {isSubmitting ? "Sending..." : "Submit"}{" "}
                {/* Change button text based on submission status */}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
