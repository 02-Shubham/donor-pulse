# import os
# import requests
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from dotenv import load_dotenv

# # Load environment variables
# load_dotenv()
# GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
# GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

# # Initialize Flask
# app = Flask(__name__)
# CORS(app)  # Enable CORS for React frontend

# @app.route("/api/check-eligibility", methods=["POST"])
# def check_eligibility():
#     try:
#         # Get JSON data from frontend
#         data = request.get_json()
#         print("Received Data:", data)

#         if not data:
#             return jsonify({"error": "No data received"}), 400

#         # Validate API key
#         if not GEMINI_API_KEY:
#             print("ERROR: Missing GEMINI_API_KEY")
#             return jsonify({"error": "Server misconfiguration: Missing API key"}), 500

#         # **Optimized Prompt for Concise & Beautiful Output**
#         prompt = f"""
#         Determine if this person is eligible to donate blood. Provide a short and clear response.
#         - **Age**: {data['age']} years
#         - **Weight**: {data['weight']} kg
#         - **Last Donation**: {data['lastDonationDate'] or "N/A"}
#         - **Medical Conditions**: {data['medicalConditions'] or "None"}
#         - **Medications**: {data['medications'] or "None"}
#         - **Travel History**: {data['travelHistory'] or "None"}

#         Response format:
#         - **Eligibility**: Yes/No
#         - **Reason**: (Brief explanation, max 2 sentences)
#         """

#         # Call Gemini API
#         gemini_response = requests.post(
#             GEMINI_URL,
#             headers={"Content-Type": "application/json"},
#             json={
#                 "contents": [
#                     {"role": "user", "parts": [{"text": prompt}]}
#                 ]
#             },
#             params={"key": GEMINI_API_KEY}
#         )

#         print("Gemini API Response:", gemini_response.status_code, gemini_response.text)
#         gemini_data = gemini_response.json()

#         # Extract AI response
#         ai_output = gemini_data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "No response from AI")

#         # Determine eligibility
#         is_eligible = "yes" in ai_output.lower()

#         # **Format output beautifully**
#         formatted_response = f"✅ **Eligible:** {is_eligible}\n\n📝 **Reason:** {ai_output}"

#         # Return response to frontend
#         return jsonify({"eligible": is_eligible, "reason": formatted_response})

#     except Exception as e:
#         print("Full Error Details:", str(e))
#         return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

# # Run the Flask app
# if __name__ == "__main__":
#     app.run(debug=True)
