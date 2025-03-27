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
import { MapPin, Navigation } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BloodRequests from "@/components/bloodRequest";
import DonateButton from "@/components/donateButton";
import BloodTypeCard from "@/components/bloodTypeCard";

import BloodRequestsTable from "@/components/BloodRequestsTable";
// import DonateButton from "@/components/DonateButton";
import { ref, get } from "firebase/database";
import { realtimeDb } from "../lib/firebase"; // Ensure you import the correct database


type BloodRequest = {
  id: string;
  bloodType: string;
  hospital: string;
  status: "pending" | "fulfilled" | "expired";
  urgency: "normal" | "urgent" | "emergency";
  date: string;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
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
  coordinates: {
    lat: number;
    lng: number;
  };
};

const sampleRequests: BloodRequest[] = [
  {
    id: "req-001",
    bloodType: "O+",
    hospital: "City General Hospital",
    status: "pending",
    urgency: "urgent",
    date: "2024-03-15",
    location: "123 Main St, City",
    coordinates: { lat: 40.7128, lng: -74.0060 },
  },
  {
    id: "req-002",
    bloodType: "A-",
    hospital: "County Medical Center",
    status: "fulfilled",
    urgency: "normal",
    date: "2024-03-10",
    location: "456 Oak Ave, County",
    coordinates: { lat: 34.0522, lng: -118.2437 },
  },
  {
    id: "req-003",
    bloodType: "AB+",
    hospital: "Metro Healthcare",
    status: "expired",
    urgency: "emergency",
    date: "2024-03-05",
    location: "789 Pine Rd, Metro",
    coordinates: { lat: 41.8781, lng: -87.6298 },
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
    coordinates: { lat: 40.7128, lng: -74.0060 },
  },
  {
    id: "hosp-002",
    name: "County Medical Center",
    location: "456 Oak Ave, County",
    coordinates: { lat: 34.0522, lng: -118.2437 },
  },
  {
    id: "hosp-003",
    name: "Metro Healthcare",
    location: "789 Pine Rd, Metro",
    coordinates: { lat: 41.8781, lng: -87.6298 },
  },
];

const HospitalLocationDialog = ({ hospital }: { hospital: string }) => {
  const hospitalData = sampleHospitals.find(h => h.name === hospital);

  if (!hospitalData) return null;

  const getDirectionsLink = () => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      hospitalData.location
    )}`;
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <MapPin className="h-4 w-4" /> Get Location
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{hospitalData.name}</DialogTitle>
          <DialogDescription>
            {hospitalData.location}
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 bg-gray-100 rounded-md mb-4">
          <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center mb-2">
            <div className="text-gray-500">Hospital Location Map Placeholder</div>
          </div>
          <p className="text-sm text-gray-700">{hospitalData.location}</p>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" className="gap-1">
            <MapPin className="h-4 w-4" /> Copy Address
          </Button>
          <Button className="gap-1" onClick={() => window.open(getDirectionsLink(), '_blank')}>
            <Navigation className="h-4 w-4" /> Get Directions
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("donor");

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (user?.role && user.role !== "donor") {
      setActiveTab(user.role);
    }
  }, [isAuthenticated, navigate, user]);

  if (!isAuthenticated) {
    return null;
  }

  

  const renderDonorDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <BloodTypeCard />
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

      {/* <Card>
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
                          ? "secondary"
                          : request.status === "pending"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    {request.status === "pending" && (
                      <>
                        <HospitalLocationDialog hospital={request.hospital} />
                        <DonateButton 
                         contactPerson="Shubham Sahu" 
                         contactNumber="+91 8850502975" 
                         location="City General Hospital" 
                        />
                      </>
                    )}
                    {request.status !== "pending" && (
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
      </Card> */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Nearby Blood Requests</CardTitle>
          <CardDescription>Blood requests from hospitals in your area</CardDescription>
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
            {requests.length > 0 ? (
              requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{request.bloodType}</TableCell>
                  <TableCell>{request.hospitalName}</TableCell>
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
                          ? "secondary"
                          : request.status === "pending"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    {request.status === "pending" ? (
                      <>
                        <HospitalLocationDialog hospital={request.hospitalName} />
                        <DonateButton 
                          contactPerson={request.contactPerson} 
                          contactNumber={request.contactNumber} 
                          location={request.hospitalName} 
                        />
                      </>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
                        {request.status === "fulfilled" ? "Completed" : "Expired"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  No blood requests available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card> */}
    <BloodRequestsTable />

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
          <Button className="bg-primary hover:bg-primary/90">
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
                          ? "secondary"
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
        <BloodRequests/>
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
                          ? "secondary"
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
              {/* <TabsTrigger value="recipient">Recipient Dashboard</TabsTrigger> */}
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
function setIsOpen(arg0: boolean): void {
  throw new Error("Function not implemented.");
}
