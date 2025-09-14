import { motion } from "framer-motion";
import { Clock, Users, Calendar, MapPin, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const coursesData = [
  {
    id: "CS101",
    name: "Introduction to Computer Science",
    instructor: "Dr. Varun Bhabad",
    department: "Computer Science",
    credits: 3,
    enrolled: 45,
    capacity: 50,
    schedule: "Mon, Wed, Fri - 09:00 AM",
    room: "Room 301",
    duration: "16 weeks",
    status: "active"
  },
  {
    id: "MATH201",
    name: "Advanced Calculus",
    instructor: "Dr. Maria ", 
    department: "Mathematics",
    credits: 4,
    enrolled: 32,
    capacity: 40,
    schedule: "Tue, Thu - 02:00 PM",
    room: "Room 205",
    duration: "16 weeks",
    status: "active"
  },
  {
    id: "PHY301",
    name: "Quantum Physics",
    instructor: "Dr. Ashok Choksi",
    department: "Physics", 
    credits: 4,
    enrolled: 28,
    capacity: 30,
    schedule: "Mon, Wed - 11:00 AM",
    room: "Lab 105",
    duration: "16 weeks",
    status: "active"
  },
  {
    id: "CHEM201",
    name: "Organic Chemistry",
    instructor: "Dr. Emily Devi",
    department: "Chemistry",
    credits: 3,
    enrolled: 35,
    capacity: 40,
    schedule: "Tue, Thu, Fri - 10:00 AM", 
    room: "Lab 203",
    duration: "16 weeks",
    status: "active"
  },
  {
    id: "ENG301",
    name: "Mechanical Engineering Design",
    instructor: "Dr.Bibek Basu ",
    department: "Engineering",
    credits: 4,
    enrolled: 22,
    capacity: 25,
    schedule: "Mon, Wed, Fri - 01:00 PM",
    room: "Workshop 401",
    duration: "16 weeks", 
    status: "active"
  },
  {
    id: "BIO201",
    name: "Molecular Biology",
    instructor: "Dr. Sara Kapoor",
    department: "Biology",
    credits: 3,
    enrolled: 38,
    capacity: 45,
    schedule: "Tue, Thu - 09:00 AM",
    room: "Lab 301",
    duration: "16 weeks",
    status: "active" 
  }
];

const departmentColors = {
  "Computer Science": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "Mathematics": "bg-green-500/10 text-green-600 border-green-500/20", 
  "Physics": "bg-purple-500/10 text-purple-600 border-purple-500/20",
  "Chemistry": "bg-orange-500/10 text-orange-600 border-orange-500/20",
  "Engineering": "bg-red-500/10 text-red-600 border-red-500/20",
  "Biology": "bg-teal-500/10 text-teal-600 border-teal-500/20"
};

export function CoursesList() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {coursesData.map((course, index) => {
        const enrollmentPercentage = (course.enrolled / course.capacity) * 100;
        
        return (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-soft card-hover h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{course.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline"
                        className={departmentColors[course.department as keyof typeof departmentColors]}
                      >
                        {course.department}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{course.id}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{course.credits} Credits</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Instructor */}
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{course.instructor}</span>
                </div>

                {/* Schedule and Location */}
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{course.schedule}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{course.room}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{course.duration}</span>
                  </div>
                </div>

                {/* Enrollment Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Enrollment</span>
                    </div>
                    <span className="text-sm font-medium">
                      {course.enrolled}/{course.capacity} students
                    </span>
                  </div>
                  <Progress value={enrollmentPercentage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{enrollmentPercentage.toFixed(0)}% filled</span>
                    <span>{course.capacity - course.enrolled} spots remaining</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}