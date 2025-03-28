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
  <a
    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
  >
    Get Directions
  </a>
</div>

        <Button onClick={() => setIsOpen(false)} className="w-full bg-primary hover:bg-primary/90">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DonateButton;
