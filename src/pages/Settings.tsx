import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SystemSettings } from "@/components/settings/SystemSettings";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gradient mb-2">Settings</h1>
          <p className="text-muted-foreground">Configure system preferences and settings</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SystemSettings />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;