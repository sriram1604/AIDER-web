// components/AIExploreDialog.jsx
import React, { useState } from "react";

export default function AIExploreDialog({ open, onOpenChange }) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const closeDialog = () => {
    setStep(1);
    setRole("");
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-2xl p-6 w-96 relative">
        {/* ❌ Close button */}
        <button
          onClick={closeDialog}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
        >
          ×
        </button>

        {step === 1 && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-yellow-500">Are you a doctor or patient?</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleRoleSelect("Doctor")}
                className="bg-yellow-400 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300"
              >
                Doctor
              </button>
              <button
                onClick={() => handleRoleSelect("Patient")}
                className="bg-yellow-400 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300"
              >
                Patient
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-yellow-500">
              Welcome, {role} 👋
            </h2>
            <p className="text-gray-700">Choose how you'd like to chat:</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-blue-400 px-4 py-2 rounded-full font-semibold hover:bg-blue-300"
              >
                Image Chatbot
              </button>
              <button
                className="bg-green-400 px-4 py-2 rounded-full font-semibold hover:bg-green-300"
              >
                Text Chatbot
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
