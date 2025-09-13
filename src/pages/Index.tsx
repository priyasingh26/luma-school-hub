import { motion } from "framer-motion";
import { Users, BookOpen, Calendar, TrendingUp, GraduationCap, Award } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TodaysSchedule } from "@/components/dashboard/TodaysSchedule";
import { UpcomingExams } from "@/components/dashboard/UpcomingExams";
import { AttendanceChart } from "@/components/dashboard/AttendanceChart";

const Index = () => {
  const statsData = [
    {
      title: "Total Students",
      value: "1,234",
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Active Courses",
      value: "45",
      change: "+3",
      changeType: "positive" as const,
      icon: BookOpen,
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "Faculty Members",
      value: "89",
      change: "±0%",
      changeType: "neutral" as const,
      icon: GraduationCap,
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Average Grade",
      value: "87.2%",
      change: "+2.1%",
      changeType: "positive" as const,
      icon: Award,
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening at your institution today.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
              gradient={stat.gradient}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <AttendanceChart />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <TodaysSchedule />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <UpcomingExams />
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
