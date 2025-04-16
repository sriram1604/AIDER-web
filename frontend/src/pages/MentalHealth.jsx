import React, { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [chat, setChat] = useState([]);
  const [language, setLanguage] = useState("en-US");
  const [listening, setListening] = useState(false);

  const handleSend = async (text = prompt) => {
    if (!text.trim()) return;

    const userMessage = { sender: "user", text };
    setChat((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post("http://127.0.0.1:5000/api/prompt", { prompt: text });
      const botMessage = { sender: "bot", text: res.data.response };
      setChat((prev) => [...prev, botMessage]);
    } catch (error) {
      const botMessage = { sender: "bot", text: "⚠️ Something went wrong." };
      console.error(error);
      setChat((prev) => [...prev, botMessage]);
    }

    setPrompt("");
  };

  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
      alert("Error during speech recognition. Try again.");
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      console.log("Voice input:", result);
      setPrompt(result);
      handleSend(result); // auto-send
    };

    recognition.start();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4 relative">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400">🧠 Brain Health Chatbot</h1>

      {/* 🔙 Exit Icon */}
      <div className="absolute top-6 right-6">
        <a href="/" title="Go Home">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-yellow-400 hover:text-yellow-300 transition"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </a>
      </div>

      {/* 🌍 Language Selector */}
      <div className="mb-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        >
          <option value="en-US">English</option>
          <option value="ta-IN">Tamil</option>
          <option value="hi-IN">Hindi</option>
          <option value="te-IN">Telugu</option>
          <option value="ml-IN">Malayalam</option>
        </select>
      </div>

      {/* 💬 Chat Messages */}
      <div className="w-full md:w-2/3 lg:w-1/2 h-[500px] overflow-y-auto bg-gray-800 rounded-lg p-4 space-y-4">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start space-x-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "bot" && (
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
                alt="bot"
                className="w-10 h-10 rounded-full"
              />
            )}
            <div
              className={`p-3 rounded-xl max-w-[80%] ${
                msg.sender === "user" ? "bg-yellow-400 text-black" : "bg-white text-black"
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === "user" && (
              <img
                src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${index}`}
                alt="user"
                className="w-10 h-10 rounded-full"
              />
            )}
          </div>
        ))}
      </div>

      {/* 📥 Text Input & 🎤 Mic */}
      <div className="flex w-full md:w-2/3 lg:w-1/2 mt-4">
        <textarea
          className="flex-1 p-3 rounded-l-lg text-white bg-gray-700"
          rows="2"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask about focus, stress, sleep..."
        />
        <button
          onClick={() => handleSend()}
          className="bg-yellow-400 text-black px-4 py-2 rounded-r-lg hover:bg-yellow-300 transition"
        >
          Send
        </button>
        <button
          onClick={handleVoiceInput}
          className={`ml-2 px-4 py-2 rounded-full ${
            listening ? "bg-red-500" : "bg-green-500"
          } hover:opacity-80`}
        >
          🎤
        </button>
      </div>
    </div>
  );
}

export default App;
