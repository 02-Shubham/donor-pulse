
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

// Type definitions
type BloodRequest = {
  id: string;
  bloodType: string;
  hospital: string;
  status: "pending" | "fulfilled" | "expired";
  urgency: "normal" | "urgent" | "emergency";
  date: string;
  location: string;
};

type DonationHistory = {
  id: string;
  date: string;
  hospital: string;
  bloodType: string;
  recipient: string | null;
};

type HospitalRequest = {
  id: string;
  date: string;
  bloodType: string;
  urgency: "normal" | "urgent" | "emergency";
  status: "pending" | "fulfilled" | "expired";
};

type HospitalType = {
  id: string;
  name: string;
  location: string;
};

// Sample data
const sampleRequests: BloodRequest[] = [
  {
    id: "req-001",
    bloodType: "O+",
    hospital: "City General Hospital",
    status: "pending",
    urgency: "urgent",
    date: "2024-03-15",
    location: "123 Main St, City",
  },
  {
    id: "req-002",
    bloodType: "A-",
    hospital: "County Medical Center",
    status: "fulfilled",
    urgency: "normal",
    date: "2024-03-10",
    location: "456 Oak Ave, County",
  },
  {
    id: "req-003",
    bloodType: "AB+",
    hospital: "Metro Healthcare",
    status: "expired",
    urgency: "emergency",
    date: "2024-03-05",
    location: "789 Pine Rd, Metro",
  },
];

const sampleDonations: DonationHistory[] = [
  {
    id: "don-001",
    date: "2024-02-20",
    hospital: "City General Hospital",
    bloodType: "O+",
    recipient: "John Doe",
  },
  {
    id: "don-002",
    date: "2024-01-15",
    hospital: "County Medical Center",
    bloodType: "O+",
    recipient: null,
  },
  {
    id: "don-003",
    date: "2023-12-05",
    hospital: "Metro Healthcare",
    bloodType: "O+",
    recipient: "Jane Smith",
  },
];

const sampleHospitalRequests: HospitalRequest[] = [
  {
    id: "hosp-001",
    date: "2024-03-20",
    bloodType: "O+",
    urgency: "emergency",
    status: "pending",
  },
  {
    id: "hosp-002",
    date: "2024-03-18",
    bloodType: "B-",
    urgency: "normal",
    status: "fulfilled",
  },
  {
    id: "hosp-003",
    date: "2024-03-15",
    bloodType: "AB+",
    urgency: "urgent",
    status: "expired",
  },
];

const sampleHospitals: HospitalType[] = [
  {
    id: "hosp-001",
    name: "City General Hospital",
    location: "123 Main St, City",
  },
  {
    id: "hosp-002",
    name: "County Medical Center",
    location: "456 Oak Ave, County",
  },
  {
    id: "hosp-003",
    name: "Metro Healthcare",
    location: "789 Pine Rd, Metro",
  },
];

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("donor");

  React.useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/login");
    } else if (user?.role && user.role !== "donor") {
      // Set active tab based on user role
      setActiveTab(user.role);
    }
  }, [isAuthenticated, navigate, user]);

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  const renderDonorDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Blood Type</CardTitle>
            <CardDescription>Your registered blood type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">O+</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Donations</CardTitle>
            <CardDescription>Total donations made</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{sampleDonations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Lives Saved</CardTitle>
            <CardDescription>Estimated lives impacted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{sampleDonations.length * 3}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nearby Blood Requests</CardTitle>
          <CardDescription>
            Blood requests from hospitals in your area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Blood Type</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.date}</TableCell>
                  <TableCell className="font-medium">{request.bloodType}</TableCell>
                  <TableCell>{request.hospital}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.urgency === "emergency"
                          ? "destructive"
                          : request.urgency === "urgent"
                          ? "default"
                          : "outline"
                      }
                    >
                      {request.urgency}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "fulfilled"
                          ? "success"
                          : request.status === "pending"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {request.status === "pending" ? (
                      <Button size="sm" className="bg-primary hover:bg-blood-dark">
                        Donate
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
                        {request.status === "fulfilled" ? "Completed" : "Expired"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Donation History</CardTitle>
          <CardDescription>Your previous blood donations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Blood Type</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead className="text-right">Certificate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleDonations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>{donation.date}</TableCell>
                  <TableCell>{donation.hospital}</TableCell>
                  <TableCell>{donation.bloodType}</TableCell>
                  <TableCell>
                    {donation.recipient || "General Blood Bank"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderRecipientDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Blood Type</CardTitle>
            <CardDescription>Your blood type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">AB-</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Requests</CardTitle>
            <CardDescription>Your pending blood requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Nearby Hospitals</CardTitle>
            <CardDescription>Blood banks in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{sampleHospitals.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Your Blood Requests</CardTitle>
            <CardDescription>
              Manage your current and past blood requests
            </CardDescription>
          </div>
          <Button className="bg-primary hover:bg-blood-dark">
            New Request
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Blood Type</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleRequests.slice(0, 2).map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.date}</TableCell>
                  <TableCell className="font-medium">{request.bloodType}</TableCell>
                  <TableCell>{request.hospital}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.urgency === "emergency"
                          ? "destructive"
                          : request.urgency === "urgent"
                          ? "default"
                          : "outline"
                      }
                    >
                      {request.urgency}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "fulfilled"
                          ? "success"
                          : request.status === "pending"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nearby Hospitals & Blood Banks</CardTitle>
          <CardDescription>
            Find hospitals and blood banks in your area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleHospitals.map((hospital) => (
                <TableRow key={hospital.id}>
                  <TableCell className="font-medium">{hospital.name}</TableCell>
                  <TableCell>{hospital.location}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">
                      Get Directions
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderHospitalDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Blood Bank</CardTitle>
            <CardDescription>Available blood units</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">24 units</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Requests</CardTitle>
            <CardDescription>Current blood requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {
                sampleHospitalRequests.filter(
                  (r) => r.status === "pending"
                ).length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Registered Donors</CardTitle>
            <CardDescription>Donors in your network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">84</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Blood Requests</CardTitle>
            <CardDescription>
              Manage your hospital's blood requests
            </CardDescription>
          </div>
          <Button className="bg-primary hover:bg-blood-dark">
            Create Request
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Blood Type</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleHospitalRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.date}</TableCell>
                  <TableCell className="font-medium">{request.bloodType}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.urgency === "emergency"
                          ? "destructive"
                          : request.urgency === "urgent"
                          ? "default"
                          : "outline"
                      }
                    >
                      {request.urgency}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "fulfilled"
                          ? "success"
                          : request.status === "pending"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Blood Inventory</CardTitle>
          <CardDescription>
            Current blood stock in your blood bank
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
              (type) => (
                <Card key={type}>
                  <CardHeader className="py-2">
                    <CardTitle className="text-center text-lg">{type}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="text-center text-2xl font-bold">
                      {Math.floor(Math.random() * 10)} units
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 px-6 md:px-10 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Welcome, {user?.name || "User"}!</h1>
            <p className="text-gray-600">
              Manage your blood donation activity and requests
            </p>
          </div>

          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6 w-full justify-start">
              <TabsTrigger value="donor">Donor Dashboard</TabsTrigger>
              <TabsTrigger value="recipient">Recipient Dashboard</TabsTrigger>
              <TabsTrigger value="hospital">Hospital Dashboard</TabsTrigger>
            </TabsList>
            <TabsContent value="donor">{renderDonorDashboard()}</TabsContent>
            <TabsContent value="recipient">
              {renderRecipientDashboard()}
            </TabsContent>
            <TabsContent value="hospital">
              {renderHospitalDashboard()}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
