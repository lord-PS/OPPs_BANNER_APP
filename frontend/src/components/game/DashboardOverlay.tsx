"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useDashboardStore } from "@/store/dashboardStore";

interface DashboardOverlayProps {
  children: React.ReactNode;
  title: string;
  viewId: string;
}

export default function DashboardOverlay({ children, title, viewId }: DashboardOverlayProps) {
  const { currentView, closeView } = useDashboardStore();
  const isActive = currentView === viewId;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 z-40 bg-black/90 backdrop-blur-md flex flex-col p-10 md:p-20 overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-end mb-10 border-b border-white/20 pb-4">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
              {title}
            </h2>
            <button
              onClick={closeView}
              className="text-cyan-400 hover:text-white font-mono text-sm tracking-widest border border-cyan-500/30 px-4 py-2 hover:bg-cyan-900/50 transition-colors"
            >
              [ CLOSE_PANEL ]
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
