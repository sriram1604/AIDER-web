import React from "react";
import ChatbotLayout from "./ChatbotLayout";

const DoctorPage = () => {
  return (
    <ChatbotLayout
      userType="Doctor"
      textChatbotUrl="/doctor/text-chatbot"
      imageChatbotUrl="/doctor/image-chatbot"
    />
  );
};

export default DoctorPage;
