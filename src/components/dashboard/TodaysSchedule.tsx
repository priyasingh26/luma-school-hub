import { motion } from "framer-motion";
import { Clock, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const scheduleData = [
  {
    id: 1,
    title: "Mathematics - Calculus I",
    time: "09:00 - 10:30",
    room: "Room 101",
    students: 45,
    status: "ongoing" as const
  },
  {
    id: 2,
    title: "Physics - Quantum Mechanics",
    time: "11:00 - 12:30",
    room: "Lab 205",
    students: 32,
    status: "upcoming" as const
  },
  {
    id: 3,
    title: "Computer Science - Algorithms",
    time: "14:00 - 15:30",
    room: "Room 301",
    students: 28,
    status: "upcoming" as const
  },
  {
    id: 4,
    title: "Chemistry - Organic Chemistry",
    time: "16:00 - 17:30",
    room: "Lab 102",
    students: 35,
    status: "scheduled" as const
  }
];

export function TodaysSchedule() {
  return (
    <Card className="card-soft">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-primary" />
          <span>Today's Schedule</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {scheduleData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="space-y-1 flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-sm">{item.title}</h4>
                <Badge
                  variant={
                    item.status === "ongoing" ? "default" :
                    item.status === "upcoming" ? "secondary" : "outline"
                  }
                  className="text-xs"
                >
                  {item.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.time}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{item.room}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{item.students} students</span>
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}