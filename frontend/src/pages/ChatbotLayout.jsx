import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const ChatbotLayout = () => {
  const { userType } = useParams();

  const isDoctor = userType === "doctor";
  const isPatient = userType === "patient";
  const capitalized = userType?.charAt(0).toUpperCase() + userType?.slice(1);

  // 🔗 Link mapping
  const textBotURL = isDoctor ? "http://localhost:8501" : "http://localhost:8503";
  const imageBotURL = isDoctor ? "http://localhost:8502" : "http://localhost:8504";

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* 🔁 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/back.mp4" type="video/mp4" />
      </video>

      {/* 🖤 Overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-40 z-10" />

      {/* Main Content */}
      <div className="relative z-20">
        {/* Header */}
        <div className="text-center py-12">
          <h1 className="text-5xl font-bold text-yellow-400">
            {isDoctor && "👨‍⚕️ Doctor Chatbots"}
            {isPatient && "🧑‍⚕️ Patient Chatbots"}
          </h1>
          <p className="text-xl mt-4 text-gray-300">
            Explore text-based and image-based AI chat support for {capitalized}
          </p>
        </div>

        {/* Chatbot Sections */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-6 pb-16">
          {/* Text-Based */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900 p-6 rounded-xl shadow-md w-full max-w-md"
          >
            <h2 className="text-2xl font-semibold text-yellow-400 mb-2">💬 Text-Based Chatbot</h2>
            <p className="text-gray-300 mb-4">
              Chat with an AI-powered assistant for personalized health advice.
            </p>
            <a
              href={textBotURL}
            
              rel="noopener noreferrer"
              className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
            >
              Open Chat
            </a>
          </motion.div>

          {/* Image-Based */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-900 p-6 rounded-xl shadow-md w-full max-w-md"
          >
            <h2 className="text-2xl font-semibold text-yellow-400 mb-2">🖼️ Image-Based Chatbot</h2>
            <p className="text-gray-300 mb-4">
              Upload scan images and let AI assist in analysis and suggestions.
            </p>
            <a
              href={imageBotURL}
              
              rel="noopener noreferrer"
              className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
            >
              Upload Image
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotLayout;
