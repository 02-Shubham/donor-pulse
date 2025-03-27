import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const DonateButton = ({ contactPerson, contactNumber, location }) => {
  const [isOpen, setIsOpen] = useState(false); // State to control popup visibility

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          Donate
        </Button>
      </DialogTrigger>

      {/* The popup with contact details */}
      <DialogContent>
        <DialogHeader>

          <DialogTitle className="font-bold text-2xl">Donation Contact Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p><strong>Contact Person:</strong> {contactPerson}</p>
          <p><strong>Contact Number:</strong> {contactNumber}</p>
          <p><strong>Location:</strong> {location}</p>
        </div>
        <Button onClick={() => setIsOpen(false)} className="w-full bg-primary hover:bg-primary/90">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DonateButton;
