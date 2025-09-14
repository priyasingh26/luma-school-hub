import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  User,
  Settings,
  LogOut,
  Trash2,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "next-themes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface TopBarProps {
  sidebarWidth: number;
}

// Simulated notification data for demonstration
interface Notification {
  id: string;
  title: string;
  description: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New student enrolled",
    description: "A new student has enrolled in Computer Science 101.",
    read: false,
  },
  {
    id: "2",
    title: "Upcoming exam schedule",
    description: "The schedule for the final exams has been published.",
    read: false,
  },
  {
    id: "3",
    title: "Server maintenance",
    description: "System maintenance is scheduled for tonight at 10 PM.",
    read: true,
  },
];

export function TopBar({ sidebarWidth }: TopBarProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Fetch notifications on component mount (simulated)
  useEffect(() => {
    // In a real application, you would fetch this from a database like Firestore
    setNotifications(mockNotifications);
  }, []);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const clearAllNotifications = () => {
    // In a real app, this would update a database
    setNotifications([]);
    // The toast function is assumed to be available
    console.log("Notifications cleared.");
  };

  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : "A";

  return (
    <motion.header
      style={{ marginLeft: sidebarWidth }}
      className="fixed top-0 right-0 h-16 bg-card/80 backdrop-blur-sm border-b border-border shadow-soft z-20 transition-all duration-300"
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Search */}
        <div className="flex items-center space-x-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search students, courses, faculty..."
              className="pl-10 bg-muted/50 border-0 focus:bg-card transition-colors"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="h-9 w-9 p-0 hover:bg-muted"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === "dark" ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </motion.div>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 relative hover:bg-muted"
              >
                <Bell className="h-4 w-4" />
                {unreadNotifications > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between p-2">
                <DropdownMenuLabel>Notifications ({unreadNotifications})</DropdownMenuLabel>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 p-2"
                  onClick={clearAllNotifications}
                  disabled={notifications.length === 0}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>
              <DropdownMenuSeparator />
              <ScrollArea className="h-72">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="flex flex-col items-start gap-1 p-3"
                    >
                      <div className="flex items-center space-x-2 w-full">
                        {!notification.read && <CheckCircle2 className="w-4 h-4 text-primary" />}
                        <span className="font-semibold">{notification.title}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                      <Separator className="mt-2" />
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground p-4">
                    No new notifications.
                  </div>
                )}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 hover:bg-muted"
              >
                <div className="w-7 h-7 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-medium">{userInitial}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                {user ? (
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.email}</p>
                    <p className="text-xs text-muted-foreground">Signed in</p>
                  </div>
                ) : (
                  "My Account"
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}