"use client";
import Header from "../ui/Header";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { useState } from "react";
import { Signup } from "./Signup"; // Import the SignupForm component

export default function Register() {
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  const words = [
    {
      text: "Build your own attractive portfolio with",
    },
    {
      text: " FolioVerse.",
      className: "text-blue-500 ml-[1.9px] dark:text-blue-500",
    },
  ];

  const handleRegisterClick = () => {
    setShowForm(true); // Show the form when Register is clicked
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-[40rem]">
        <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base">
          The road to selection starts from here
        </p>
        <TypewriterEffectSmooth words={words} />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <button 
            onClick={handleRegisterClick} 
            className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm"
          >
            Register
          </button>
          <a href="/login">
            <button className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm">
              Log in
            </button>
          </a>
        </div>
      </div>

      {/* Sign-Up Form Section */}
      {showForm && <Signup />}
    </>
  );
}
