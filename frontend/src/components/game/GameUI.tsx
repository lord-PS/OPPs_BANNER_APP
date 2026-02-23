"use client";

import { useGameStore } from "@/store/gameStore";
import Navigation from "./Navigation";
import AIHUD from "./AIHUD";
import DashboardOverlay from "./DashboardOverlay";
import DraggableGallery from "./DraggableGallery";
import { motion, AnimatePresence } from "framer-motion";

export default function GameUI() {
  const { altitude, stage, mission, setMission } = useGameStore();

  return (
    <>
      <Navigation />
      <AIHUD />

      {/* Dashboards */}
      <DashboardOverlay title="ARSENAL // PROJECTS" viewId="SPELL_BOOK">
        <DraggableGallery />
      </DashboardOverlay>

      <DashboardOverlay title="FLIGHT_LOG" viewId="FLIGHT_LOG">
        <div className="font-mono text-sm text-gray-300 space-y-4 max-w-xl">
          <p>&gt; SYSTEM BOOT SEQUENCE INITIATED...</p>
          <p>&gt; [OK] CORE PROCESSORS ONLINE</p>
          <p>&gt; [OK] NEURAL LINK ESTABLISHED</p>
          <p className="text-cyan-400">&gt; PILOT IDENTIFIED: COMMANDER [REDACTED]</p>
          <p>LOG DATE: 2049.12.15</p>
          <p>MISSION OBJECTIVE: REACH EXOSPHERE AND DEPLOY SATELLITE NETWORK.</p>
        </div>
      </DashboardOverlay>

      {/* Mission Modal */}
      <AnimatePresence>
        {mission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm pointer-events-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black border border-cyan-500 p-8 max-w-2xl w-full relative shadow-[0_0_50px_rgba(0,255,255,0.2)]"
            >
              <button
                onClick={() => setMission(null)}
                className="absolute top-4 right-4 text-cyan-500 hover:text-white"
              >
                [ CLOSE ]
              </button>
              <h2 className="text-4xl font-bold mb-2 text-white">{mission.title}</h2>
              <div className="flex gap-4 text-xs font-mono text-cyan-400 mb-6">
                <span>STATUS: {mission.status}</span>
                <span>SCORE: {mission.score}</span>
                <span>ELEMENT: {mission.artifactParams.element}</span>
              </div>
              <p className="text-gray-300 font-mono leading-relaxed">
                {mission.description}
              </p>
              <div className="mt-8 flex gap-4">
                <button className="bg-cyan-500 text-black px-6 py-2 font-bold hover:bg-white transition-colors">
                  ACCESS DATA
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-10 flex flex-col justify-between z-10 text-white font-mono mix-blend-difference">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-6xl font-black tracking-tighter">VELOCITA</h1>
            <p className="text-sm opacity-70">SYSTEM_READY // PILOT_INITIALIZED</p>
          </div>
          <div className="text-right">
            <p className="text-xs">STATUS: <span className="text-cyan-400">ONLINE</span></p>
            <p className="text-xs">
              STAGE: <span className={`font-bold ${stage === "SPACE" ? "text-purple-400" : "text-cyan-400"}`}>{stage}</span>
            </p>
            <p className="text-4xl font-light tabular-nums">
              ALT: {altitude.toLocaleString()} <span className="text-xs">FT</span>
            </p>
          </div>
        </div>

        {/* Footer / Instructions */}
        <div className="text-center opacity-50 text-xs tracking-[0.2em]">
          SCROLL TO ENGAGE THRUSTERS
        </div>
      </div>
    </>
  );
}
