// src/pages/Index.tsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/hooks/use-auth";
import {
  Users,
  BookOpen,
  GraduationCap,
  Award,
  UserPlus,
  FileText,
  Calendar,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TodaysSchedule } from "@/components/dashboard/TodaysSchedule";
import { UpcomingExams } from "@/components/dashboard/UpcomingExams";
import { AttendanceChart } from "@/components/dashboard/AttendanceChart";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { api } from "@/api"; // API helper

interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  year: string;
}

const Index = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ name: string; enrNo: string } | null>(null);
  const [toastShown, setToastShown] = useState(false);

  // Dashboard API students
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "profiles", user.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setProfile(docSnap.data() as { name: string; enrNo: string });
        } else {
          setProfile(null);
          if (!toastShown) {
            toast({
              title: "Profile Incomplete",
              description: "Please complete your profile details.",
              action: (
                <Link to="/profile">
                  <Button variant="outline" size="sm">
                    Fill Profile
                  </Button>
                </Link>
              ),
              duration: 5000,
            });
            setToastShown(true);
          }
        }
      });
    }
  }, [user, toastShown]);

  // Fetch students from API
  useEffect(() => {
    async function fetchStudents() {
      try {
        const data = await api("/students");
        setStudents(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch students");
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);

  const statsData = [
    { title: "Total Students", value: "1,234", change: "+12%", changeType: "positive" as const, icon: Users, gradient: "from-blue-500 to-blue-600" },
    { title: "Active Courses", value: "45", change: "+3", changeType: "positive" as const, icon: BookOpen, gradient: "from-green-500 to-green-600" },
    { title: "Faculty Members", value: "89", change: "±0%", changeType: "neutral" as const, icon: GraduationCap, gradient: "from-purple-500 to-purple-600" },
    { title: "Average Grade", value: "87.2%", change: "+2.1%", changeType: "positive" as const, icon: Award, gradient: "from-orange-500 to-orange-600" },
  ];

  const miniStudents = [
    { name: "Aditi Sharma", enrNo: "ENR001", course: "CSE" },
    { name: "Rahul Verma", enrNo: "ENR002", course: "ECE" },
    { name: "Simran Kaur", enrNo: "ENR003", course: "ME" },
    { name: "Arjun Patel", enrNo: "ENR004", course: "CIVIL" },
  ];

  const userName = profile?.name || "User";

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Greeting & Profile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg"
        >
          <div>
            <h1 className="text-3xl font-bold mb-1">Welcome, {userName} 👋</h1>
            <p className="text-sm opacity-90">
              Here’s what’s happening at your institution today.
            </p>
          </div>
          <Avatar className="h-14 w-14 border-2 border-white shadow-md">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${userName}`} alt={userName} />
            <AvatarFallback>{userName[0]}</AvatarFallback>
          </Avatar>
        </motion.div>

        {/* Quick Actions */}
        <div className="flex gap-3 flex-wrap">
          <Button asChild variant="secondary" className="gap-2">
            <Link to="/students/add"><UserPlus className="h-4 w-4" /> Add Student</Link>
          </Button>
          <Button asChild variant="secondary" className="gap-2">
            <Link to="/attendance/upload"><Calendar className="h-4 w-4" /> Upload Attendance</Link>
          </Button>
          <Button asChild variant="secondary" className="gap-2">
            <Link to="/reports"><FileText className="h-4 w-4" /> View Reports</Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} whileHover={{ scale: 1.05 }}>
              <StatsCard {...stat} delay={index * 0.1} />
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <AttendanceChart />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <TodaysSchedule />
            </motion.div>

            {/* API Students */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
              <h3 className="text-xl font-semibold mb-4">All Students</h3>

              {loading && (
                <div className="flex justify-center items-center h-40 gap-2">
                  <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
                  <span>Loading students...</span>
                </div>
              )}

              {error && <div className="text-red-500 text-center">{error}</div>}

              {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {students.map((s) => (
                    <motion.div key={s.id} whileHover={{ scale: 1.03 }} className="cursor-pointer">
                      <Card className="shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition">
                        <CardContent>
                          <h4 className="font-bold">{s.name}</h4>
                          <p className="text-sm text-gray-600">{s.email}</p>
                          <p className="mt-1"><span className="font-medium">Course:</span> {s.course}</p>
                          <p><span className="font-medium">Year:</span> {s.year}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
              <UpcomingExams />
            </motion.div>

            {/* Mini Student List */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.8 }} className="bg-card rounded-xl shadow-md p-4">
              <h3 className="text-lg font-semibold mb-3">Recent Students</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Enroll No</TableHead>
                    <TableHead>Course</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {miniStudents.map((s, i) => (
                    <TableRow key={i} className="hover:bg-muted transition-colors cursor-pointer">
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${s.name}`} alt={s.name} />
                          <AvatarFallback>{s.name[0]}</AvatarFallback>
                        </Avatar>
                        {s.name}
                      </TableCell>
                      <TableCell>{s.enrNo}</TableCell>
                      <TableCell>{s.course}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-3 text-right">
                <Link to="/students" className="text-sm text-blue-600 hover:underline font-medium">View All →</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
