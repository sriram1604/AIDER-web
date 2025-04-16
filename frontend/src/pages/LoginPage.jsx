import React from "react";
import { SignIn } from "@clerk/clerk-react";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="rounded-2xl border  shadow-[0_0_20px_4px_#facc15]">
        <SignIn
          
        />
      </div>
    </div>
  );
}

export default Login;
