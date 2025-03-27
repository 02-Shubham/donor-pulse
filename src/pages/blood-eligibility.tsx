"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle } from "lucide-react"

interface EligibilityResponse {
  eligible: "Yes" | "No"
  reason: string
}

export default function BloodEligibility() {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    lastDonationDate: "",
    medicalConditions: "",
    medications: "",
    travelHistory: "",
  })

  const [result, setResult] = useState<EligibilityResponse | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/check-eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      // Use a type assertion to ensure the response matches EligibilityResponse
      const data = await response.json() as EligibilityResponse
      setResult(data)
    } catch (error) {
      console.error("Error checking eligibility:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Check Blood Donation Eligibility</h1>
      <p className="text-muted-foreground mb-8">Find out if you're eligible to donate blood</p>

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
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalConditions">Medical Conditions (if any)</Label>
              <Textarea
                id="medicalConditions"
                name="medicalConditions"
                placeholder="List any medical conditions you have"
                value={formData.medicalConditions}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications (if any)</Label>
              <Textarea
                id="medications"
                name="medications"
                placeholder="List any medications you're currently taking"
                value={formData.medications}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelHistory">Recent Travel History</Label>
              <Textarea
                id="travelHistory"
                name="travelHistory"
                placeholder="List any countries you've visited in the last 12 months"
                value={formData.travelHistory}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white">
              {loading ? "Checking..." : "Check Eligibility"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className={`mt-8 ${result.eligible === "Yes" ? "border-green-500" : "border-red-500"}`}>
          <CardHeader>
            <CardTitle className="flex items-center">
              {result.eligible === "Yes" ? (
                <>
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  <span className="text-green-600">Eligible to Donate</span>
                </>
              ) : (
                <>
                  <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
                  <span className="text-red-600">Not Eligible to Donate</span>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{result.reason}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}