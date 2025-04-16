from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173",'http://192.168.156.83:5173/'])
load_dotenv()

# Configure GenAI with your API key
api = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=api)
generation_config = {"temperature": 0.9}
model = genai.GenerativeModel("gemini-1.5-flash", generation_config=generation_config)

@app.route("/api/prompt", methods=["POST"])
def get_ai_response():
    data = request.get_json()
    print("Received data:", data)

    user_prompt = data.get("prompt")
    print("User prompt:", user_prompt)

    try:
        # Multilingual prompt customization
        system_prompt = (
            "You are a friendly and supportive mental health assistant who speaks in Tamil, Tanglish, or English. "
            "Respond based on the user's input language. Keep responses simple, comforting, and motivating. "
            "For Tanglish, mix Tamil and English naturally (like how locals talk)."
        )
        formatted_prompt = f"{system_prompt}\nUser: {user_prompt}\nAI:"

        # Send to Gemini
        response = model.generate_content(formatted_prompt)
        print("AI Response:", response.text)
        return jsonify({"response": response.text})
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
