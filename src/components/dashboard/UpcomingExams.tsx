import { motion } from "framer-motion";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const examData = [
  {
    id: 1,
    subject: "Advanced Mathematics",
    date: "2024-01-15",
    time: "09:00 AM",
    duration: "3 hours",
    registered: 145,
    total: 150,
    priority: "high" as const
  },
  {
    id: 2,
    subject: "Physics - Mechanics",
    date: "2024-01-18",
    time: "02:00 PM",
    duration: "2 hours",
    registered: 98,
    total: 120,
    priority: "medium" as const
  },
  {
    id: 3,
    subject: "Computer Programming",
    date: "2024-01-22",
    time: "10:00 AM",
    duration: "4 hours",
    registered: 76,
    total: 80,
    priority: "low" as const
  }
];

const priorityColors = {
  high: "text-destructive bg-destructive/10 border-destructive/20",
  medium: "text-warning bg-warning/10 border-warning/20",
  low: "text-success bg-success/10 border-success/20"
};

export function UpcomingExams() {
  return (
    <Card className="card-soft">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-primary" />
          <span>Upcoming Exams</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {examData.map((exam, index) => {
          const registrationPercent = (exam.registered / exam.total) * 100;
          
          return (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">{exam.subject}</h4>
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{exam.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{exam.time} ({exam.duration})</span>
                    </span>
                  </div>
                </div>
                <Badge
                  className={priorityColors[exam.priority]}
                  variant="outline"
                >
                  {exam.priority} priority
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Registration Progress</span>
                  <span className="font-medium">{exam.registered}/{exam.total} students</span>
                </div>
                <Progress value={registrationPercent} className="h-2" />
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}