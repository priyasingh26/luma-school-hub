import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Calendar, Search, Filter, Download, Plus, CheckCircle2, XCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AttendanceList } from "@/components/attendance/AttendanceList";

const Attendance = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">Attendance</h1>
            <p className="text-muted-foreground">Track and manage student attendance</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="btn-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Add Record
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search attendance records..." className="pl-10" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Course Filter
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Card className="card-soft">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">6</p>
                  <p className="text-xs text-muted-foreground">Total Records</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-soft">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-8 h-8 text-success" />
                <div>
                  <p className="text-2xl font-bold text-foreground">92%</p>
                  <p className="text-xs text-muted-foreground">Overall Present</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-soft">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <XCircle className="w-8 h-8 text-destructive" />
                <div>
                  <p className="text-2xl font-bold text-foreground">8%</p>
                  <p className="text-xs text-muted-foreground">Overall Absent</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-soft">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold text-foreground">37.5</p>
                  <p className="text-xs text-muted-foreground">Avg. Students</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Attendance List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Attendance Records</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AttendanceList />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;