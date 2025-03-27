// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { cn } from "@/lib/utils";

// const BloodRequests = () => {
//   const [isOpen, setIsOpen] = useState(false); // State to control popup visibility
//   const [bloodType, setBloodType] = useState("");
//   const [hospitalName, setHospitalName] = useState("");
//   const [contactPerson, setContactPerson] = useState("");
//   const [contactNumber, setContactNumber] = useState("");


//   const handleCreateRequest = () => {
//     console.log("Request Created:", { bloodType, hospitalName, contactPerson });

//     // Reset form after submission
//     setBloodType("");
//     setHospitalName("");
//     setContactPerson("");
//     setContactNumber("");

//     setIsOpen(false); // Close popup
//   };

//   const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between">
//         <div>
//           <CardTitle>Blood Requests</CardTitle>
//           <CardDescription>Manage your hospital's blood requests</CardDescription>
//         </div>

//         {/* Create Request Button that triggers the popup */}
//         <Dialog open={isOpen} onOpenChange={setIsOpen}>
//           <DialogTrigger asChild>
//             <Button className="bg-primary hover:bg-primary/90">Create Request</Button>
//           </DialogTrigger>

//           {/* The popup form */}
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Create Blood Request</DialogTitle>
//             </DialogHeader>
//             <div className="space-y-4">
//               <div>
//                 <Label>Blood Type</Label>
//                 <div className="grid grid-cols-4 gap-2">
//                   {bloodTypes.map((type) => (
//                     <Button
//                       key={type}
//                         type="button"
//                         variant="outline"
//                         className={cn(
//                           "h-10",
//                             bloodType === type && "bg-primary text-white hover:bg-primary/90"
//                         )}
//                         onClick={() => setBloodType(type)}
//                         >
//                           {type}
//                         </Button>
//                     ))}
//                 </div>
//               </div>
//               <div>
//                 <Label>Hospital Name</Label>
//                 <Input
//                   type="text"
//                   placeholder="ABC Hospital"
//                   value={hospitalName}
//                   onChange={(e) => setHospitalName(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <Label>Contact Person Name</Label>
//                 <Input
//                   type="text"
//                   placeholder="Dr. John Doe"
//                   value={contactPerson}
//                   onChange={(e) => setContactPerson(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <Label>Contact Number</Label>
//                 <Input
//                   type="int"
//                   placeholder="+91 **********"
//                   value={contactNumber}
//                   onChange={(e) => setContactNumber(e.target.value)}
//                 />
//               </div>
//               <Button onClick={handleCreateRequest} className="w-full bg-primary hover:bg-primary/90">
//                 Submit Request
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </CardHeader>
//       <CardContent>
//         <p className="text-gray-500">Blood request listing can go here...</p>
//       </CardContent>
//     </Card>
//   );
// };

// export default BloodRequests;
import { useState } from "react";
import { database, ref, push } from "../lib/firebase"; // Firebase integration
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const BloodRequests = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bloodType, setBloodType] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [urgency, setUrgency] = useState(""); // New field
  const [status, setStatus] = useState(""); // New field
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const urgencyLevels = ["Low", "Medium", "High"];
  const statusOptions = ["Pending", "Fulfilled", "Cancelled"];

  const handleCreateRequest = async () => {
    if (!bloodType || !hospitalName || !contactPerson || !contactNumber || !urgency || !status) {
      toast({ title: "Error", description: "All fields are required." });
      return;
    }
    setIsSubmitting(true);

    try {
      const newRequest = {
        bloodType,
        hospitalName,
        contactPerson,
        contactNumber,
        urgency,
        status,
        createdAt: new Date().toISOString(),
      };

      await push(ref(database, "bloodRequests"), newRequest);
      toast({ title: "Success!", description: "Blood request added." });
      setIsOpen(false);
      setBloodType("");
      setHospitalName("");
      setContactPerson("");
      setContactNumber("");
      setUrgency("");
      setStatus("");
    } catch (error) {
      toast({ title: "Error", description: "Failed to add request." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Blood Requests</CardTitle>
          <CardDescription>Manage your hospital's blood requests</CardDescription>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">Create Request</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Blood Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Blood Type</Label>
                <div className="grid grid-cols-4 gap-2">
                  {bloodTypes.map((type) => (
                    <Button
                      key={type}
                      type="button"
                      variant="outline"
                      className={cn(
                        "h-10",
                        bloodType === type && "bg-primary text-white hover:bg-primary/90"
                      )}
                      onClick={() => setBloodType(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Hospital Name</Label>
                <Input
                  type="text"
                  placeholder="ABC Hospital"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                />
              </div>
              <div>
                <Label>Contact Person Name</Label>
                <Input
                  type="text"
                  placeholder="Dr. John Doe"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                />
              </div>
              <div>
                <Label>Contact Number</Label>
                <Input
                  type="tel"
                  placeholder="+91 **********"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>
              <div>
                <Label>Urgency</Label>
                <Select onValueChange={setUrgency} value={urgency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select onValueChange={setStatus} value={status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleCreateRequest}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Blood request listing can go here...</p>
      </CardContent>
    </Card>
  );
};
export default BloodRequests;
