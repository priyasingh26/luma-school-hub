// src/components/user/UserProfileForm.tsx
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { User, Save } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface UserProfile {
  name: string;
  enrNo: string;
}

export function UserProfileForm() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({ name: "", enrNo: "" });
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch existing profile data from Firestore
  useEffect(() => {
    if (user) {
      const docRef = doc(db, "profiles", user.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        }
        setIsFetching(false);
      });
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      const docRef = doc(db, "profiles", user.uid);
      await setDoc(docRef, profile, { merge: true });
      toast({
        title: "Profile Saved",
        description: "Your profile details have been updated.",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Save Failed",
        description: "Could not save profile details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return <div>Loading profile...</div>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <Card className="card-soft max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-primary" />
            <span>Profile Details</span>
          </CardTitle>
          <CardDescription>
            Please enter your personal and enrollment information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="enrNo">Enrollment Number</Label>
              <Input
                id="enrNo"
                value={profile.enrNo}
                onChange={(e) => setProfile({ ...profile, enrNo: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="btn-gradient" disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}