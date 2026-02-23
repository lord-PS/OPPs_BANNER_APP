"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardStore } from "@/store/dashboardStore";

const menuItems = [
  { label: "FLIGHT_LOG", id: "FLIGHT_LOG" },
  { label: "SPELL_BOOK", id: "SPELL_BOOK" },
  { label: "ARSENAL", id: "ARSENAL" },
  { label: "TIMELINE", id: "TIMELINE" },
  { label: "COMMUNICATIONS", id: "COMMUNICATIONS" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { setView } = useDashboardStore();

  const handleMenuClick = (id: string) => {
    setView(id as any);
    setIsOpen(false);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-10 right-10 z-50 text-white mix-blend-difference font-mono text-sm tracking-widest hover:text-cyan-400 transition-colors"
      >
        {isOpen ? "[ CLOSE_SYSTEM ]" : "[ OPEN_MENU ]"}
      </button>

      {/* Fullscreen Staggered Menu */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 flex flex-col pointer-events-none">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="flex-1 bg-black border-b border-white/10 flex items-center px-20 pointer-events-auto hover:bg-white/5 transition-colors group cursor-pointer relative overflow-hidden"
                onClick={() => handleMenuClick(item.id)}
              >
                {/* Hover Reveal Effect */}
                <div className="absolute inset-0 bg-cyan-900/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 group-hover:text-cyan-400 relative z-10 transition-colors tracking-tighter">
                  {item.label}
                </span>
                <span className="ml-4 text-xs font-mono opacity-50 relative z-10">
                  // 0{i + 1}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
