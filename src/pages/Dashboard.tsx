
import React, { useState } from "react";
import { 
  DropletIcon, 
  Heart, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Bell, 
  User,
  Settings,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Dashboard = () => {
  const [role] = useState<"donor" | "hospital">("donor");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-6 md:px-10 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          {role === "donor" ? <DonorDashboard /> : <HospitalDashboard />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const DonorDashboard = () => {
  return (
    <div className="animate-fade-in">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Donor Dashboard</h1>
        <p className="text-gray-600">Welcome back, John! Track your donations and help save lives.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-64 glass rounded-xl p-6 h-fit">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <User className="h-10 w-10 text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-sm text-gray-600">Blood Type: A+</p>
          </div>
          
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-primary">
              <Heart className="mr-2 h-4 w-4" /> Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" /> Donations
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Bell className="mr-2 h-4 w-4" /> Notifications
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-600">
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">5</div>
                <p className="text-xs text-gray-500 mt-1">Lives saved: ~15</p>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Last Donation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">21 days ago</div>
                <p className="text-xs text-gray-500 mt-1">Eligible again in 69 days</p>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Donation Eligibility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl font-bold">23%</div>
                  <Badge className="bg-orange-500">In Progress</Badge>
                </div>
                <Progress value={23} className="h-2 bg-gray-100" />
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="upcoming" className="glass rounded-xl p-6">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Upcoming Donations</TabsTrigger>
              <TabsTrigger value="history">Donation History</TabsTrigger>
              <TabsTrigger value="requests">Nearby Requests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="animate-fade-in">
              <div className="text-center py-8">
                <DropletIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Upcoming Donations</h3>
                <p className="text-gray-600 mb-6">You don't have any scheduled donations at the moment.</p>
                <Button className="bg-primary hover:bg-blood-dark gap-2">
                  <Heart className="h-4 w-4" />
                  Schedule a Donation
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="animate-fade-in">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].reverse().map((i) => (
                  <Card key={i} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold mb-1">City Hospital Blood Bank</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <Calendar className="h-4 w-4" />
                            <span>{`${i * 2} ${i === 1 ? 'Month' : 'Months'} Ago`}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <Badge className="bg-success">Completed</Badge>
                            <span className="text-gray-600">Blood Type: A+</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="requests" className="animate-fade-in">
              <div className="space-y-4">
                <Card className="border border-gray-200 bg-red-50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge className="bg-primary mb-2">Urgent</Badge>
                        <h3 className="font-semibold mb-1">Central Hospital</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>2.5 miles away</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-semibold">Blood Type: A+</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="text-primary">Needed within 24 hours</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button className="bg-primary hover:bg-blood-dark gap-2 mb-2">
                          <Heart className="h-4 w-4" />
                          Donate Now
                        </Button>
                        <p className="text-xs text-gray-600">5 donors needed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="outline" className="mb-2">Regular</Badge>
                        <h3 className="font-semibold mb-1">City Blood Bank</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>1.2 miles away</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-semibold">Blood Type: All Types</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-gray-600" />
                            <span className="text-gray-600">Regular donation</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button variant="outline" className="gap-2 mb-2">
                          <Calendar className="h-4 w-4" />
                          Schedule
                        </Button>
                        <p className="text-xs text-gray-600">Replenishing stock</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const HospitalDashboard = () => {
  return (
    <div className="animate-fade-in">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Hospital Dashboard</h1>
        <p className="text-gray-600">Welcome back, City Hospital! Manage your blood inventory and requests.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-64 glass rounded-xl p-6 h-fit">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Hospital className="h-10 w-10 text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold">City Hospital</h2>
            <p className="text-sm text-gray-600">Medical Center</p>
          </div>
          
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-primary">
              <DropletIcon className="mr-2 h-4 w-4" /> Inventory
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Heart className="mr-2 h-4 w-4" /> Blood Requests
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <CheckCircle className="mr-2 h-4 w-4" /> Donations
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Bell className="mr-2 h-4 w-4" /> Notifications
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-600">
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Blood Stock Overview */}
          <Card className="glass mb-8">
            <CardHeader>
              <CardTitle>Blood Inventory</CardTitle>
              <CardDescription>Current stock levels by blood type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type, i) => {
                  // Random stock level between 10% and 100%
                  const stockLevel = Math.floor(Math.random() * 90) + 10;
                  let statusColor = "bg-success";
                  
                  if (stockLevel < 30) {
                    statusColor = "bg-red-500";
                  } else if (stockLevel < 60) {
                    statusColor = "bg-orange-500";
                  }
                  
                  return (
                    <div key={type} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-bold">{type}</span>
                        <Badge className={statusColor}>{stockLevel}%</Badge>
                      </div>
                      <Progress value={stockLevel} className="h-2" />
                      <div className="mt-2 text-sm text-gray-600">
                        {Math.floor(stockLevel / 10)} units
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-primary hover:bg-blood-dark">Create Blood Request</Button>
            </CardFooter>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="active" className="glass rounded-xl p-6">
            <TabsList className="mb-6">
              <TabsTrigger value="active">Active Requests</TabsTrigger>
              <TabsTrigger value="incoming">Incoming Donations</TabsTrigger>
              <TabsTrigger value="history">Request History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="animate-fade-in">
              <div className="space-y-4">
                <Card className="border border-gray-200 bg-red-50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge className="bg-primary mb-2">Urgent</Badge>
                        <h3 className="font-semibold mb-1">O- Blood Request</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>Created 2 hours ago</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-semibold">5 units needed</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="text-primary">Expires in 22 hours</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium mb-2">2/5 donors confirmed</div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="outline" className="mb-2">Regular</Badge>
                        <h3 className="font-semibold mb-1">A+ Blood Request</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>Created 1 day ago</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-semibold">3 units needed</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-gray-600" />
                            <span className="text-gray-600">Expires in 6 days</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium mb-2">1/3 donors confirmed</div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="incoming" className="animate-fade-in">
              <div className="space-y-4">
                <Card className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold mb-1">Jane Smith (O-)</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>Today, 2:30 PM</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <Badge className="bg-success">Confirmed</Badge>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-gray-600" />
                            <span className="text-gray-600">ETA: 30 minutes</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button variant="outline" size="sm" className="mb-2">View Profile</Button>
                        <p className="text-xs text-gray-600">Previous donations: 3</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold mb-1">Robert Johnson (A+)</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>Today, 4:15 PM</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <Badge className="bg-success">Confirmed</Badge>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-gray-600" />
                            <span className="text-gray-600">ETA: 2 hours</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button variant="outline" size="sm" className="mb-2">View Profile</Button>
                        <p className="text-xs text-gray-600">First-time donor</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="animate-fade-in">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold mb-1">{["B+", "AB-", "O+"][i-1]} Blood Request</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <Calendar className="h-4 w-4" />
                            <span>{i} {i === 1 ? 'week' : 'weeks'} ago</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <Badge className="bg-success">Completed</Badge>
                            <span className="text-gray-600">{i + 1} units collected</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
