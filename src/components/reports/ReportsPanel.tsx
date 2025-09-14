import { motion } from "framer-motion";
import { FileText, Download, TrendingUp, Users, CalendarDays, BarChart4 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const reportsData = [
  {
    id: "REP001",
    title: "Student Performance Report",
    description: "Detailed performance analytics for all enrolled students.",
    icon: TrendingUp,
  },
  {
    id: "REP002",
    title: "Course Enrollment Summary",
    description: "Overview of enrollment numbers and capacity across all courses.",
    icon: Users,
  },
  {
    id: "REP003",
    title: "Faculty Workload Analysis",
    description: "Breakdown of faculty member course assignments and teaching hours.",
    icon: BarChart4,
  },
  {
    id: "REP004",
    title: "Monthly Attendance Sheet",
    description: "Comprehensive monthly attendance records for all classes.",
    icon: CalendarDays,
  }
];

export function ReportsPanel() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {reportsData.map((report, index) => (
        <motion.div
          key={report.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="card-soft card-hover h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">{report.title}</CardTitle>
              <report.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-foreground">{report.description}</p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}