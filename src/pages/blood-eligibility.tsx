"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "react-day-picker";

// Define API response type
interface EligibilityResponse {
  eligible: boolean; // Changed to boolean instead of string
  reason: string;
}

export default function BloodEligibility() {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    lastDonationDate: "",
    medicalConditions: "",
    medications: "",
    travelHistory: "",
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
      const response = await fetch("http://127.0.0.1:5000/api/check-eligibility", { // Flask API URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Server error: Unable to fetch response");
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
    <Navbar/>
    <div className="container mx-auto px-4 py-8 mt-20 max-w-4xl">
      <h1 className="text-3xl text-red-600 font-bold mb-2">Check Blood Donation Eligibility</h1>
      <p className="text-muted-foreground mb-8">Find out if you're eligible to donate blood.</p>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" name="age" placeholder="Enter your age" value={formData.age} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" type="number" name="weight" placeholder="Enter your weight in kg" value={formData.weight} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastDonationDate">Last Donation Date (if applicable)</Label>
                <Input id="lastDonationDate" type="date" name="lastDonationDate" value={formData.lastDonationDate} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalConditions">Medical Conditions (if any)</Label>
              <Textarea id="medicalConditions" name="medicalConditions" placeholder="List any medical conditions" value={formData.medicalConditions} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications (if any)</Label>
              <Textarea id="medications" name="medications" placeholder="List any medications you're taking" value={formData.medications} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelHistory">Recent Travel History</Label>
              <Textarea id="travelHistory" name="travelHistory" placeholder="List any countries visited in the last 12 months" value={formData.travelHistory} onChange={handleChange} />
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
            <p>{result.reason}</p>
          </CardContent>
        </Card>
      )}
    </div>
    </>
  );
}
