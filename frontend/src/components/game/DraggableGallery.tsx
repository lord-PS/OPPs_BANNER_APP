"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  { id: 1, title: "PROJECT_ALPHA", type: "AI_CORE", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1740&auto=format&fit=crop" },
  { id: 2, title: "NEURAL_NET_V2", type: "INFRASTRUCTURE", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1740&auto=format&fit=crop" },
  { id: 3, title: "CYBER_SECURITY_GRID", type: "DEFENSE", image: "https://images.unsplash.com/photo-1558494949-ef2bb3fee039?q=80&w=1740&auto=format&fit=crop" },
  { id: 4, title: "QUANTUM_LINK", type: "COMMUNICATION", image: "https://images.unsplash.com/photo-1531297461136-820727185496?q=80&w=1740&auto=format&fit=crop" },
  { id: 5, title: "VOID_WALKER", type: "EXPLORATION", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1740&auto=format&fit=crop" },
];

export default function DraggableGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Calculate scroll width
      const totalWidth = containerRef.current.scrollWidth;
      const viewWidth = containerRef.current.offsetWidth;
      setConstraints({ left: -(totalWidth - viewWidth + 100), right: 0 });
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center overflow-hidden cursor-grab active:cursor-grabbing relative">
      <motion.div
        ref={containerRef}
        drag="x"
        dragConstraints={constraints}
        dragElastic={0.1}
        className="flex gap-10 px-10"
      >
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            layoutId={`card-${project.id}`}
            onClick={() => setSelectedId(project.id)}
            className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] flex-shrink-0 bg-gray-900 border border-white/20 group overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.02, borderColor: "#00e5ff" }}
            transition={{ duration: 0.3 }}
          >
            {/* Image */}
            <div className="absolute inset-0 z-0">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-10 flex flex-col items-start gap-2">
              <motion.span layoutId={`type-${project.id}`} className="text-xs font-mono text-cyan-400 border border-cyan-500/50 px-2 py-1 bg-cyan-900/20">
                    //{project.type}
              </motion.span>
              <motion.h3 layoutId={`title-${project.id}`} className="text-2xl font-bold text-white tracking-widest">{project.title}</motion.h3>
              <p className="text-xs text-gray-400 font-mono">
                STATUS: <span className="text-green-400">OPERATIONAL</span>
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Expanded View */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-20 bg-black/80 backdrop-blur-md pointer-events-auto cursor-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            {PROJECTS.filter(p => p.id === selectedId).map(project => (
              <motion.div
                key={project.id}
                layoutId={`card-${project.id}`}
                className="w-full max-w-4xl h-full bg-gray-900 border border-cyan-500/50 flex flex-col md:flex-row overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 z-50 text-white hover:text-cyan-400 bg-black/50 p-2 rounded-full"
                >
                  ✕
                </button>

                <div className="relative w-full md:w-1/2 h-64 md:h-full">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r" />
                </div>

                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center items-start gap-6">
                  <motion.span layoutId={`type-${project.id}`} className="text-sm font-mono text-cyan-400 border border-cyan-500/50 px-3 py-1 bg-cyan-900/20">
                        // {project.type}
                  </motion.span>
                  <motion.h3 layoutId={`title-${project.id}`} className="text-4xl md:text-5xl font-black text-white tracking-tighter">{project.title}</motion.h3>
                  <p className="text-gray-400 leading-relaxed font-mono text-sm border-l-2 border-white/10 pl-4">
                    CLASSIFIED PROJECT DATA. ACCESS GRANTED REQ-LEVEL-5.
                    Optimization of neural pathways for latency reduction in deep space communication.
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                    <div className="bg-black/50 p-4 border border-white/10">
                      <h4 className="text-xs text-gray-500 mb-1">CPU LOAD</h4>
                      <p className="text-xl font-mono text-cyan-400">34%</p>
                    </div>
                    <div className="bg-black/50 p-4 border border-white/10">
                      <h4 className="text-xs text-gray-500 mb-1">UPTIME</h4>
                      <p className="text-xl font-mono text-green-400">99.9%</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
