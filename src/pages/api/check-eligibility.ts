import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { age, weight } = req.body;

    // Validate input
    if (!age || !weight) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Simulate AI eligibility check (Replace with your AI API call)
    const isEligible = age >= 18 && weight >= 50; // Example condition
    const reason = isEligible ? "You are eligible to donate blood!" : "You do not meet the criteria.";

    res.status(200).json({ eligible: isEligible, reason });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
