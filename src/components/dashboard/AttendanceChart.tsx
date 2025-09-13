import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const attendanceData = [
  { day: "Mon", present: 245, absent: 15, percentage: 94.2 },
  { day: "Tue", present: 238, absent: 22, percentage: 91.5 },
  { day: "Wed", present: 252, absent: 8, percentage: 96.9 },
  { day: "Thu", present: 241, absent: 19, percentage: 92.7 },
  { day: "Fri", present: 229, absent: 31, percentage: 88.1 },
  { day: "Sat", present: 195, absent: 25, percentage: 88.6 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-medium">
        <p className="font-medium">{label}</p>
        <p className="text-success">
          Present: <span className="font-semibold">{data.present}</span>
        </p>
        <p className="text-destructive">
          Absent: <span className="font-semibold">{data.absent}</span>
        </p>
        <p className="text-primary">
          Rate: <span className="font-semibold">{data.percentage}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export function AttendanceChart() {
  return (
    <Card className="card-soft">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Weekly Attendance</span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-success">92.3%</p>
            <p className="text-xs text-muted-foreground">Average Rate</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="present" 
                fill="hsl(var(--success))"
                radius={[4, 4, 0, 0]}
                opacity={0.8}
              />
              <Bar 
                dataKey="absent" 
                fill="hsl(var(--destructive))"
                radius={[4, 4, 0, 0]}
                opacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
}