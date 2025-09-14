import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Settings as SettingsIcon, Bell, User, Sun, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "next-themes";

interface UserSettings {
  fullName: string;
  email: string;
  examAlerts: boolean;
  gradeUpdates: boolean;
  announcements: boolean;
  darkMode: boolean;
}

export function SystemSettings() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Use the authentication hook
  const { theme, setTheme } = useTheme(); // Use the theme hook

  // Fetch settings from Firestore
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const docRef = doc(db, "users", user.uid);
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        const fetchedSettings = docSnap.data() as UserSettings;
        setSettings(fetchedSettings);
        setTheme(fetchedSettings.darkMode ? "dark" : "light");
      } else {
        // Set default settings if none exist
        setSettings({
          fullName: user.displayName || "",
          email: user.email || "",
          examAlerts: true,
          gradeUpdates: false,
          announcements: true,
          darkMode: false,
        });
      }
      setLoading(false);
    }).catch(error => {
      console.error("Error fetching settings:", error);
      toast({
        title: "Error",
        description: "Failed to load user settings.",
        variant: "destructive"
      });
      setLoading(false);
    });
  }, [user, setTheme]);

  // Handle saving changes to Firestore
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !settings) return;

    try {
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, settings, { merge: true });
      toast({
        title: "Settings Saved",
        description: "Your preferences have been updated.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Save Failed",
        description: "Could not save settings. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDarkModeToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
    if (settings) {
      setSettings({ ...settings, darkMode: checked });
    }
  };

  if (loading) {
    return <div>Loading settings...</div>;
  }

  if (!settings) {
    return <div>Failed to load settings.</div>;
  }

  return (
    <Card className="card-soft h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <SettingsIcon className="w-5 h-5 text-primary" />
          <span>System Settings</span>
        </CardTitle>
        <CardDescription>
          Manage your account preferences and application settings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center space-x-2">
              <Sun className="w-4 h-4" />
              <span>Appearance</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="mt-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Priya Singh"
                    value={settings.fullName}
                    onChange={(e) => setSettings({ ...settings, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="priyasingh@example.com"
                    value={settings.email}
                    disabled
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" className="btn-gradient">Save Changes</Button>
                </div>
              </form>
            </motion.div>
          </TabsContent>
          <TabsContent value="notifications" className="mt-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="exam-alerts">Upcoming Exam Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for new exam schedules.</p>
                  </div>
                  <Switch
                    id="exam-alerts"
                    checked={settings.examAlerts}
                    onCheckedChange={(checked) => setSettings({ ...settings, examAlerts: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="grade-updates">Grade Updates</Label>
                    <p className="text-sm text-muted-foreground">Get an alert when a new grade is posted.</p>
                  </div>
                  <Switch
                    id="grade-updates"
                    checked={settings.gradeUpdates}
                    onCheckedChange={(checked) => setSettings({ ...settings, gradeUpdates: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="announcements">General Announcements</Label>
                    <p className="text-sm text-muted-foreground">Stay informed about school-wide news.</p>
                  </div>
                  <Switch
                    id="announcements"
                    checked={settings.announcements}
                    onCheckedChange={(checked) => setSettings({ ...settings, announcements: checked })}
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" variant="secondary">Save Notifications</Button>
                </div>
              </form>
            </motion.div>
          </TabsContent>
          <TabsContent value="appearance" className="mt-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={theme === "dark"}
                    onCheckedChange={handleDarkModeToggle}
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" variant="secondary">Save Appearance</Button>
                </div>
              </form>
            </motion.div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}