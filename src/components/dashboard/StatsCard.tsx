import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  gradient?: string;
  delay?: number;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  gradient = "from-primary to-primary-glow",
  delay = 0
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
    >
      <Card className="card-soft card-hover p-6 relative overflow-hidden">
        {/* Background Gradient */}
        <div className={cn(
          "absolute top-0 right-0 w-20 h-20 bg-gradient-to-br opacity-10 rounded-full -mr-10 -mt-10",
          gradient
        )} />
        
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className={cn(
              "w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center shadow-soft",
              gradient
            )}>
              <Icon className="w-6 h-6 text-primary-foreground" />
            </div>
            {change && (
              <span className={cn(
                "text-sm font-medium px-2 py-1 rounded-full",
                changeType === "positive" && "text-success bg-success/10",
                changeType === "negative" && "text-destructive bg-destructive/10",
                changeType === "neutral" && "text-muted-foreground bg-muted"
              )}>
                {change}
              </span>
            )}
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {value}
            </h3>
            <p className="text-muted-foreground text-sm font-medium">
              {title}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}