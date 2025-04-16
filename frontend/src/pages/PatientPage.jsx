import React from "react";
import ChatbotLayout from "./ChatbotLayout";

const PatientPage = () => {
  return (
    <ChatbotLayout
      userType="Patient"
      textChatbotUrl="/patient/text-chatbot"
      imageChatbotUrl="/patient/image-chatbot"
    />
  );
};

export default PatientPage;
