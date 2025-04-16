import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import chatbotImage from "../images/AI-mental-health-chatbot.png";
import { SignedIn, SignedOut, SignInButton, useClerk, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import '../styles/temp.css';
import * as Dialog from '@radix-ui/react-dialog';
import { useUser } from "@clerk/clerk-react";
import RoleDialog from "./RoleDialog";



function AIExploreDialog({ open, onOpenChange }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-40" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black rounded-xl shadow-lg w-[90%] max-w-md p-6">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl font-bold"
          >
            &times;
          </button>

          <Dialog.Title className="text-2xl font-bold mb-2 text-center">AI Doctor Assistant 🤖</Dialog.Title>
          <Dialog.Description className="mb-6 text-center text-gray-700">
            Choose your role to continue with AI-powered medical assistance.
          </Dialog.Description>

          <div className="flex justify-center gap-4">
            <a
              href="/doctor"
              className="bg-black text-yellow-400 border border-yellow-400 px-5 py-2 rounded-full font-semibold hover:bg-yellow-300 hover:text-black transition"
            >
              👨‍⚕️ Doctor
            </a>
            <a
              href="/patient"
              className="bg-black text-yellow-400 border border-yellow-400 px-5 py-2 rounded-full font-semibold hover:bg-yellow-300 hover:text-black transition"
            >
              🧑‍⚕️ Patient
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}


function AppointmentDialog({ open, onOpenChange }) {
  const [showPasskeyDialog, setShowPasskeyDialog] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [doctorname,setDoctorName] = useState("");
  const [error, setError] = useState("");

  const handleDoctorClick = () => {
    setShowPasskeyDialog(true);
  };

  const handleVerify = () => {
    if (passkey === "doc123") {
      window.location.href = "http://192.168.156.83:3000/admin";
    } else {
      setError("Invalid Passkey ❌");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-40" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black rounded-xl shadow-lg w-[90%] max-w-md p-6">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl font-bold"
          >
            &times;
          </button>

          {!showPasskeyDialog ? (
            <>
              <Dialog.Title className="text-2xl font-bold mb-2 text-center">📅 Book Appointments</Dialog.Title>
              <Dialog.Description className="mb-6 text-center text-gray-700">
                Are you doctor or patient?
              </Dialog.Description>

              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDoctorClick}
                  className="bg-black text-yellow-400 border border-yellow-400 px-5 py-2 rounded-full font-semibold hover:bg-yellow-300 hover:text-black transition"
                >
                  👨‍⚕️ Doctor
                </button>
                <a
                  href="http://192.168.156.83:3000/patients/67b882ab001eb0c9a76f/new-appointment"
                  className="bg-black text-yellow-400 border border-yellow-400 px-5 py-2 rounded-full font-semibold hover:bg-yellow-300 hover:text-black transition"
                >
                  🧑‍⚕️ Patient
                </a>
              </div>
            </>
          ) : (
            <>
              <Dialog.Title className="text-xl font-bold mb-4 text-center">🔐 Doctor Passkey Required</Dialog.Title>
              <Dialog.Description className="mb-4 text-center text-gray-700">
                Please enter your secure passkey to proceed.
              </Dialog.Description>
              <input
                type="text"
                value={doctorname}
                onChange={(e) => {
                  setDoctorName(e.target.value);
                  setError("");
                }}
                placeholder="Enter Your Name:"
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-yellow-400"
              />
              <input
                type="password"
                value={passkey}
                onChange={(e) => {
                  setPasskey(e.target.value);
                  setError("");
                }}
                placeholder="Enter Your Passkey"
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-yellow-400"
              />

              {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleVerify}
                  className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
                >
                  Verify
                </button>
                <button
                  onClick={() => {
                    setShowPasskeyDialog(false);
                    setPasskey("");
                    setError("");
                  }}
                  className="text-gray-500 hover:text-black"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}


function AnimatedSection({ section }) {
  const ref = useRef();
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const controls = useAnimation();
  const [openAI, setOpenAI] = useState(false);
  const [openBook, setOpenBook] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, x: 0 });
    } else {
      controls.start({ opacity: 0, x: 100 });
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -100 }}
      animate={controls}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col md:flex-row items-center justify-center p-8 snap-center space-y-6 md:space-y-0 md:space-x-10"
    >
      <img
        src={section.image}
        alt={section.title}
        className="w-full md:w-[400px] h-auto rounded-2xl shadow-xl"
      />
      <div className="text-center md:text-left max-w-md space-y-4">
        <h2 className="text-4xl font-bold text-yellow-400">{section.title}</h2>
        <p className="text-white text-2xl glowing-text">{section.description}</p>

        {section.title === "🤖 AI Assistant" ? (
          <>
            <button
              onClick={() => setOpenAI(true)}
              className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
            >
              Explore
            </button>
            <AIExploreDialog open={openAI} onOpenChange={setOpenAI} />
          </>
        ) : section.title === "📅 Book Appointments" ? (
          <>
            <button
              onClick={() => setOpenBook(true)}
              className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
            >
              Explore
            </button>
            <AppointmentDialog open={openBook} onOpenChange={setOpenBook} />
          </>
        ) : section.route ? (
          <a
            href={section.route}
            className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
          >
            Explore
          </a>
        ) : null}
      </div>
    </motion.div>
  );
}

function HomePage() {
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isSignedIn, user } = useUser();
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 2.5 seconds

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (isSignedIn) {
      setRoleDialogOpen(true);
    }
  }, [isSignedIn]);
  

  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut(() => {
      window.location.href = "/login";
    });
  };


  const sections = [
    {
      title: "🧠 AIDER - Minds",
      description: "A friendly chatbot to talk about stress, focus, and wellness. Multilingual, voice-enabled support.",
      image: chatbotImage,
      route: "/mental-health",
    },
    {
      title: "🤖 AI Assistant",
      description: "Ask medical questions and get AI-powered answers, based on real-time health data and symptoms.",
      image: "https://img.freepik.com/free-vector/medical-diagnosis-concept-illustration_114360-8699.jpg",
    },
    {
      title: "📅 Book Appointments",
      description: "Browse and book appointments with certified doctors easily with availability and filters.",
      image: "https://img.freepik.com/free-vector/online-doctor-concept-illustration_114360-2536.jpg",
    },
    {
      title: "🔐 Secure Prescription Locker",
      description: "Safely store and manage your medical prescriptions with top-grade encryption and privacy protection.",
      image: "https://img.freepik.com/free-vector/secure-data-concept-illustration_114360-547.jpg",
      route: "/medical-prescription"
    }
  ];
  if(loading){
    return(
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-yellow-400 transition-opacity duration-1000 opacity-100 animate-fade-in">
        <h1 className="text-5xl font-extrabold tracking-wide mb-4 animate-pulse">AIDER</h1>
        <p className="text-xl text-white opacity-0 animate-fade-in-delay">🤖<span className="text-yellow-400 font-bold">AI</span> That Understands You. <span className="text-yellow-400 font-bold">AIDER</span> That Heals You.❤️</p>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fadeIn 1.2s ease-in-out forwards;
          }
          .animate-fade-in-delay {
            animation: fadeIn 2s ease-in-out forwards;
            animation-delay: 1s;
            animation-fill-mode: forwards;
          }
        `}</style>
      </div>
    )
  }
  return (
    <>
      {roleDialogOpen ? (
        <RoleDialog open={roleDialogOpen} setOpen={setRoleDialogOpen} />
    ) : (
      <div className="relative text-white min-h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
        <video autoPlay muted loop playsInline className="fixed top-0 left-0 w-full h-full object-cover z-0">
          <source src="/videos/back.mp4" type="video/mp4" />
        </video>

        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-60 z-10"></div>

        <div className="relative z-20">
        <div className="fixed top-0 left-0 right-0 bg-black z-50 px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h1 className="text-yellow-400 text-xl font-bold">
            <Link to="/" className="hover:text-yellow-300">AIDER - Smart Health</Link>
          </h1>

          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="hover:text-yellow-300">Home</a>
            <a href="/mental-health" className="hover:text-yellow-300">Chatbot</a>
            <a href="/ai-assistant" className="hover:text-yellow-300">AI Doctor</a>
            <a href="http://192.168.137.116:3000/patients/67b882ab001eb0c9a76f/new-appointment" className="hover:text-yellow-300">Book</a>

            <SignedOut>
              <SignInButton mode="modal" redirectUrl="/login" />
            </SignedOut>

            <SignedIn>
              <div className="relative group">
                <UserButton />
                <div className="absolute right-0 mt-2 hidden group-hover:flex flex-col bg-black border border-gray-700 rounded-md shadow-lg z-50">
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 text-sm hover:bg-yellow-400 hover:text-black transition"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </SignedIn>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-black flex flex-col items-center space-y-4 py-4 md:hidden z-40">
            <a href="/" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="/mental-health" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Chatbot</a>
            <a href="/ai-assistant" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>AI Doctor</a>
            <a href="http://192.168.137.116:3000/patients/67b882ab001eb0c9a76f/new-appointment" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Book</a>

            <SignedOut>
              <SignInButton mode="modal" redirectUrl="/login" />
            </SignedOut>

            <SignedIn>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm border border-yellow-400 rounded hover:bg-yellow-400 hover:text-black transition"
              >
                Sign Out
              </button>
            </SignedIn>
          </div>
        )}
        <div className="text-center mt-90">
          {isSignedIn ? (
              <>
                <h1 className="text-4xl font-bold text-yellow-400">Welcome, {user?.firstName || user?.fullName || "User"}!👋</h1>
                <p className="mt-2 text-white text-2xl glowing-text">Secure your medical data with aider❤️</p>
              </>
            ) : (
              <>
                <h1 className="text-4xl font-bold text-yellow-400">Welcome, New User!</h1>
                <p className="mt-2 text-white text-2xl glowing-text">Please Register to connect with us.❤️</p>
              </>
            )}
          
        </div>
        <div className="pt-40">
          {sections.map((section, i) => (
            <AnimatedSection key={i} section={section} />
          ))}
        </div>
      </div>
    </div>
    )}
    </>
  );
}

export default HomePage;
