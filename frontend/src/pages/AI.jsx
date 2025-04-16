import React from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

function AIAssistantPage() {
  return (
    <>
      <SignedIn>
        <div className="bg-black text-white min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold">🤖 Welcome to the AI Doctor Assistant</h1>
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn redirectUrl="/login" />
      </SignedOut>
    </>
  );
}

export default AIAssistantPage;
