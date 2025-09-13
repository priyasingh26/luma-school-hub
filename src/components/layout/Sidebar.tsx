import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  BookOpen, 
  Calendar, 
  FileText, 
  Settings,
  ChevronLeft,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "Students", href: "/students" },
  { icon: UserCheck, label: "Faculty", href: "/faculty" },
  { icon: BookOpen, label: "Courses", href: "/courses" },
  { icon: Calendar, label: "Attendance", href: "/attendance" },
  { icon: FileText, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen bg-card border-r border-border shadow-soft z-30"
    >
      <div className="flex flex-col h-full">
        {/* Logo and Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <motion.div
            initial={false}
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-3"
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-semibold text-lg text-gradient">EduMIS</h1>
                <p className="text-xs text-muted-foreground">Management System</p>
              </div>
            )}
          </motion.div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0 hover:bg-muted"
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform duration-300",
                isCollapsed && "rotate-180"
              )}
            />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.href} to={item.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-gradient-primary text-primary-foreground shadow-soft"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <motion.span
                    initial={false}
                    animate={{
                      opacity: isCollapsed ? 0 : 1,
                      width: isCollapsed ? 0 : "auto"
                    }}
                    transition={{ duration: 0.2 }}
                    className="font-medium text-sm truncate"
                  >
                    {item.label}
                  </motion.span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* User Profile - Simplified for collapsed state */}
        <div className="p-4 border-t border-border">
          <motion.div
            className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50"
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-medium">A</span>
            </div>
            <motion.div
              initial={false}
              animate={{ opacity: isCollapsed ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {!isCollapsed && (
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
}