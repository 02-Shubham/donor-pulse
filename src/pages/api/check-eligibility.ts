import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("🔵 API HIT! Request method:", req.method, "Request Body:", req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { age, weight, lastDonationDate, medicalConditions, medications, travelHistory } = req.body;

    // Validate input
    if (!age || !weight) {
      console.log("🔴 Missing required fields");
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Format the user data as JSON
    const userData = {
      age,
      weight,
      lastDonationDate: lastDonationDate || "Not provided",
      medicalConditions: medicalConditions || "None",
      medications: medications || "None",
      travelHistory: travelHistory || "No recent travel",
    };

    console.log("🟢 Formatted JSON Data:", JSON.stringify(userData, null, 2));

    // Define the prompt for Gemini AI
    const prompt = `The following is a JSON object representing a person who wants to donate blood:\n\n${JSON.stringify(
      userData,
      null,
      2
    )}\n\nBased on this data, determine if the person is eligible to donate blood and provide a short explanation.`;

    console.log("🔵 Sending request to Gemini API...");

    // Call Gemini API
    const geminiResponse = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GEMINI_API_KEY}`,
        },
      }
    );

    console.log("🟢 Gemini API Response:", JSON.stringify(geminiResponse.data, null, 2));

    // Extract AI output
    const aiOutput =
      geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";

    // Determine eligibility
    const isEligible = aiOutput.toLowerCase().includes("eligible");

    res.status(200).json({ eligible: isEligible ? "Yes" : "No", reason: aiOutput });
  } catch (error: unknown) {
    let errorMessage = "Internal server error";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.error?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("🔴 Gemini API Error:", errorMessage);
    res.status(500).json({ error: errorMessage });
  }
}
