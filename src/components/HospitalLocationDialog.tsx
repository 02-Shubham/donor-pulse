import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { MapPin, Navigation } from 'lucide-react';

type HospitalType = {
    id: string;
    name: string;
    location: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };

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
export default HospitalLocationDialog;