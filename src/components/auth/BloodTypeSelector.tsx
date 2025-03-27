
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface BloodTypeSelectorProps {
  bloodType: string;
  setBloodType: (type: string) => void;
}

const BloodTypeSelector = ({ bloodType, setBloodType }: BloodTypeSelectorProps) => {
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="space-y-2">
      <Label htmlFor="bloodType">Blood Type</Label>
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
  );
};

export default BloodTypeSelector;
