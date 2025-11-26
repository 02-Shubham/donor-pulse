// "use client";

// import React, { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { AlertCircle, CheckCircle } from "lucide-react";
// import Navbar from "@/components/layout/Navbar";
// import { Footer } from "react-day-picker";

// // Define API response type
// interface EligibilityResponse {
//   eligible: boolean; // Changed to boolean instead of string
//   reason: string;
// }

// export default function BloodEligibility() {
//   const [formData, setFormData] = useState({
//     age: "",
//     weight: "",
//     lastDonationDate: "",
//     medicalConditions: "",
//     medications: "",
//     travelHistory: "",
//   });

//   const [result, setResult] = useState<EligibilityResponse | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Handle input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setResult(null);

//     try {
//       const response = await fetch("http://127.0.0.1:5000/api/check-eligibility", { // Flask API URL
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Server error: Unable to fetch response");
//       }

//       const data: EligibilityResponse = await response.json();
//       setResult(data);
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("An unknown error occurred.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//     <Navbar/>
//     <div className="container mx-auto px-4 py-8 mt-20 max-w-4xl">
//       <h1 className="text-3xl text-red-600 font-bold mb-2">Check Blood Donation Eligibility</h1>
//       <p className="text-muted-foreground mb-8">Find out if you're eligible to donate blood.</p>

//       <Card>
//         <CardContent className="pt-6">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <Label htmlFor="age">Age</Label>
//                 <Input id="age" type="number" name="age" placeholder="Enter your age" value={formData.age} onChange={handleChange} required />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="weight">Weight (kg)</Label>
//                 <Input id="weight" type="number" name="weight" placeholder="Enter your weight in kg" value={formData.weight} onChange={handleChange} required />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="lastDonationDate">Last Donation Date (if applicable)</Label>
//                 <Input id="lastDonationDate" type="date" name="lastDonationDate" value={formData.lastDonationDate} onChange={handleChange} />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="medicalConditions">Medical Conditions (if any)</Label>
//               <Textarea id="medicalConditions" name="medicalConditions" placeholder="List any medical conditions" value={formData.medicalConditions} onChange={handleChange} />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="medications">Current Medications (if any)</Label>
//               <Textarea id="medications" name="medications" placeholder="List any medications you're taking" value={formData.medications} onChange={handleChange} />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="travelHistory">Recent Travel History</Label>
//               <Textarea id="travelHistory" name="travelHistory" placeholder="List any countries visited in the last 12 months" value={formData.travelHistory} onChange={handleChange} />
//             </div>

//             <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white">
//               {loading ? "Checking..." : "Check Eligibility"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>

//       {error && <p className="text-red-500 mt-4">{error}</p>}

//       {result && (
//         <Card className={`mt-8 ${result.eligible ? "border-green-500" : "border-red-500"}`}>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               {result.eligible ? (
//                 <CheckCircle className="mr-2 text-green-500" />
//               ) : (
//                 <AlertCircle className="mr-2 text-red-500" />
//               )}
//               {result.eligible ? "Eligible to Donate" : "Not Eligible to Donate"}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p>{result.reason}</p>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//     </>
//   );
// }
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

// API response type (matches serverless function)
interface EligibilityResponse {
  eligible: boolean;
  reason: string;
  reasons?: string[]; // optional detailed reasons
}

export default function BloodEligibility() {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    lastDonationDate: "",
    medicalConditions: "",
    medications: "",
    hemoglobin: "" // optional field if you want to submit hb value
  });

  const [result, setResult] = useState<EligibilityResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Use relative path when deployed on Vercel (function lives at /api/check-eligibility)
      const response = await fetch("/api/check-eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // convert numeric fields to numbers where appropriate
          age: formData.age !== "" ? Number(formData.age) : undefined,
          weight: formData.weight !== "" ? Number(formData.weight) : undefined,
          lastDonationDate: formData.lastDonationDate || undefined,
          medicalConditions: formData.medicalConditions || undefined,
          medications: formData.medications || undefined,
          hemoglobin: formData.hemoglobin !== "" ? Number(formData.hemoglobin) : undefined,
          recentSymptoms: false // keep default; adjust UI to include it if you want
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || "Server error: Unable to fetch response");
      }

      const data: EligibilityResponse = await response.json();
      setResult(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-20 max-w-4xl">
        <h1 className="text-3xl text-red-600 font-bold mb-2">Check Blood Donation Eligibility</h1>
        <p className="text-muted-foreground mb-8">Find out if you're eligible to donate blood.</p>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    name="age"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    name="weight"
                    placeholder="Enter your weight in kg"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastDonationDate">Last Donation Date (if applicable)</Label>
                  <Input
                    id="lastDonationDate"
                    type="date"
                    name="lastDonationDate"
                    value={formData.lastDonationDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hemoglobin">Hemoglobin (g/dL) — optional</Label>
                  <Input
                    id="hemoglobin"
                    type="number"
                    step="0.1"
                    name="hemoglobin"
                    placeholder="e.g., 13.2"
                    value={formData.hemoglobin}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicalConditions">Medical Conditions (if any)</Label>
                <Textarea
                  id="medicalConditions"
                  name="medicalConditions"
                  placeholder="List any medical conditions (comma separated)"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medications">Current Medications (if any)</Label>
                <Textarea
                  id="medications"
                  name="medications"
                  placeholder="List any medications you're taking (comma separated)"
                  value={formData.medications}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white">
                {loading ? "Checking..." : "Check Eligibility"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {result && (
          <Card className={`mt-8 ${result.eligible ? "border-green-500" : "border-red-500"}`}>
            <CardHeader>
              <CardTitle className="flex items-center">
                {result.eligible ? (
                  <CheckCircle className="mr-2 text-green-500" />
                ) : (
                  <AlertCircle className="mr-2 text-red-500" />
                )}
                {result.eligible ? "Eligible to Donate" : "Not Eligible to Donate"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{result.reason}</p>
              {result.reasons && result.reasons.length > 0 && (
                <ul className="list-disc ml-5 text-sm text-muted-foreground">
                  {result.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
