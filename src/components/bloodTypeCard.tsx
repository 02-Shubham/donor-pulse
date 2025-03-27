import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { realtimeDb } from "../lib/firebase"; // Ensure this is correctly imported
import { useAuth } from "../context/AuthContext"; // Import AuthContext to get current user
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const fetchUserData = async (userId: string) => {
    try {
      const userRef = ref(realtimeDb, `users/${userId}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        return snapshot.val(); // Returns user data
      } else {
        console.log("User not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

const BloodTypeCard = () => {
  const { user } = useAuth(); // Get the current user from context
  const [bloodType, setBloodType] = useState<string | null>(null);

  useEffect(() => {
    const fetchBloodType = async () => {
      if (!user?.id) return; // Ensure user is logged in

      try {
        const userRef = ref(realtimeDb, `users/${user.id}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setBloodType(userData.bloodType || "Not Available");
        }
      } catch (error) {
        console.error("Error fetching blood type:", error);
      }
    };

    fetchBloodType();
  }, [user]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Blood Type</CardTitle>
        <CardDescription>Your registered blood type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-primary">{bloodType || "Loading..."}</div>
      </CardContent>
    </Card>
  );
};

export default BloodTypeCard;
