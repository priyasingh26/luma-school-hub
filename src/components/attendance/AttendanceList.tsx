import { motion } from "framer-motion";
import { Clock, Users, Calendar, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const attendanceData = [
  {
    id: "CS101-2024-01-15",
    course: "Introduction to Computer Science",
    instructor: "Dr. Varun Bhabad",
    date: "2024-01-15",
    present: 45,
    totalStudents: 50,
    status: "complete" as const,
    attendanceRate: 90,
  },
  {
    id: "MATH201-2024-01-15",
    course: "Advanced Calculus",
    instructor: "Dr. Maria Garcia",
    date: "2024-01-15",
    present: 32,
    totalStudents: 40,
    status: "complete" as const,
    attendanceRate: 80,
  },
  {
    id: "PHY301-2024-01-16",
    course: "Quantum Physics",
    instructor: "Dr. Ashok Choksi",
    date: "2024-01-16",
    present: 28,
    totalStudents: 30,
    status: "complete" as const,
    attendanceRate: 93,
  },
  {
    id: "CHEM201-2024-01-16",
    course: "Organic Chemistry",
    instructor: "Dr. Emily Devi",
    date: "2024-01-16",
    present: 35,
    totalStudents: 40,
    status: "complete" as const,
    attendanceRate: 88,
  },
  {
    id: "ENG301-2024-01-17",
    course: "Mechanical Engineering Design",
    instructor: "Dr. Bibek Basu",
    date: "2024-01-17",
    present: 22,
    totalStudents: 25,
    status: "complete" as const,
    attendanceRate: 88,
  },
  {
    id: "BIO201-2024-01-17",
    course: "Molecular Biology",
    instructor: "Dr. Sara Kapoor",
    date: "2024-01-17",
    present: 38,
    totalStudents: 45,
    status: "complete" as const,
    attendanceRate: 84,
  },
];

export function AttendanceList() {
  const getAttendanceBadge = (rate: number) => {
    if (rate >= 90) {
      return (
        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
          Excellent
        </Badge>
      );
    } else if (rate >= 80) {
      return (
        <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
          Good
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
          Needs Attention
        </Badge>
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {attendanceData.map((record, index) => (
        <motion.div
          key={record.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="card-soft card-hover h-full">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg text-foreground">{record.course}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{record.date}</span>
                    </div>
                  </div>
                  {getAttendanceBadge(record.attendanceRate)}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{record.instructor}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">Attendance</span>
                    </div>
                    <span className="font-medium">
                      {record.present}/{record.totalStudents} students
                    </span>
                  </div>
                  <Progress value={record.attendanceRate} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{record.attendanceRate}% present</span>
                    <span>{record.totalStudents - record.present} absent</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}