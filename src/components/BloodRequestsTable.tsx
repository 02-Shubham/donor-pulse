import { useEffect, useState } from "react";
import { database, ref, onValue } from "../lib/firebase"; // Import Firebase functions
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HospitalLocationDialog from "./HospitalLocationDialog";
import DonateButton from "./donateButton";

const BloodRequestsTable = () => {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const requestsRef = ref(database, "bloodRequests");

    onValue(requestsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedRequests = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setRequests(formattedRequests);
      } else {
        setRequests([]);
      }
    });
  }, []);

  return (
    <Card>
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
                  {/* <TableCell className="flex justify-end gap-2">
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
                  </TableCell> */}
                  <TableCell>
                  <HospitalLocationDialog hospital={request.hospitalName} />
                        <DonateButton 
                          contactPerson={request.contactPerson} 
                          contactNumber={request.contactNumber} 
                          location={request.hospitalName} 
                        />
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
    </Card>
  );
};

export default BloodRequestsTable;
