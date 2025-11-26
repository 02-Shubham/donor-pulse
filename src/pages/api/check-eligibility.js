// api/check-eligibility.js
// Vercel Serverless Function — no external deps

/**
 * Request body expected JSON:
 * {
 *   age: number,
 *   weight: number,
 *   hemoglobin?: number,
 *   lastDonationDate?: "YYYY-MM-DD",
 *   medicalConditions?: "cond1,cond2" OR ["cond1","cond2"],
 *   medications?: "med1,med2" OR ["med1","med2"],
 *   recentSymptoms?: true|false
 * }
 */

const RULES = {
  minAge: 18,
  maxAge: 65,
  minWeightKg: 45,
  minDaysBetweenDonations: 56,
  minHemoglobinGdL: 12.0,
  disqualifyingConditions: ["hepatitis b", "hepatitis c", "hiv", "active tuberculosis", "malaria"],
  disqualifyingMedications: ["isotretinoin", "warfarin"],
  recentSymptomsDays: 14
};

function safeNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function daysSince(dateString) {
  if (!dateString) return Infinity;
  const t = Date.parse(dateString);
  if (Number.isNaN(t)) return Infinity;
  const diffMs = Date.now() - t;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

function normalizeListField(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(v => String(v).toLowerCase().trim());
  return String(value).split(",").map(v => v.toLowerCase().trim()).filter(Boolean);
}

function checkEligibility(input) {
  const reasons = [];
  const age = safeNumber(input.age);
  const weight = safeNumber(input.weight);
  const hb = input.hemoglobin !== undefined ? safeNumber(input.hemoglobin) : null;
  const lastDonationDate = input.lastDonationDate || null;
  const daysFromLast = daysSince(lastDonationDate);

  // Basic validations
  if (age === null) reasons.push("Age is missing or invalid.");
  if (weight === null) reasons.push("Weight is missing or invalid.");

  // Age rules
  if (age !== null) {
    if (age < RULES.minAge) reasons.push(`Minimum age is ${RULES.minAge} years.`);
    if (age > RULES.maxAge) reasons.push(`Donors older than ${RULES.maxAge} years need local policy review.`);
  }

  // Weight rule
  if (weight !== null && weight < RULES.minWeightKg) {
    reasons.push(`Minimum weight is ${RULES.minWeightKg} kg.`);
  }

  // Recent symptoms
  if (input.recentSymptoms === true) {
    reasons.push(`Recent symptoms/illness reported within the last ${RULES.recentSymptomsDays} days.`);
  }

  // Hemoglobin
  if (hb !== null && hb < RULES.minHemoglobinGdL) {
    reasons.push(`Hemoglobin below ${RULES.minHemoglobinGdL} g/dL.`);
  }

  // Donation interval
  if (lastDonationDate && daysFromLast < RULES.minDaysBetweenDonations) {
    reasons.push(`Last donation was ${daysFromLast} days ago; minimum interval is ${RULES.minDaysBetweenDonations} days.`);
  }

  // Conditions & medications
  const conditions = normalizeListField(input.medicalConditions);
  const medications = normalizeListField(input.medications);

  for (const dis of RULES.disqualifyingConditions) {
    if (conditions.some(c => c.includes(dis))) {
      reasons.push(`Disqualifying condition: ${dis}.`);
      break;
    }
  }
  for (const med of RULES.disqualifyingMedications) {
    if (medications.some(m => m.includes(med))) {
      reasons.push(`Disqualifying medication: ${med}.`);
      break;
    }
  }

  const eligible = reasons.length === 0;

  const finalReason = eligible
    ? "You are eligible to donate blood. Your age, weight, general health and donation history meet the required criteria."
    : "You are not eligible to donate blood right now because: " + reasons.join(" ");

  return { eligible, finalReason, reasons };
}

module.exports = (req, res) => {
  // Only POST allowed
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const body = req.body || {};

    // If Vercel receives raw string body (depends on framework), attempt parse
    const payload = typeof body === "string" ? JSON.parse(body || "{}") : body;

    const result = checkEligibility(payload);
    return res.status(200).json({
      eligible: result.eligible,
      reason: result.finalReason,
      reasons: result.reasons
    });
  } catch (err) {
    console.error("Eligibility function error:", err);
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
};
