"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aiService } from "@/services/api";

export default function AIHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "SYSTEM: AI ASSISTANT ONLINE. AWAITING INPUT." }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    const data = await aiService.chat(userMsg);

    setMessages(prev => [...prev, { role: "ai", text: data.response }]);
    setLoading(false);
  };

  return (
    <>
      {/* HUD Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-10 right-10 z-50 pointer-events-auto bg-cyan-900/20 border border-cyan-500/50 text-cyan-400 p-4 font-mono text-xs hover:bg-cyan-900/50 transition-all backdrop-blur-md"
      >
        {isOpen ? "[ TERMINATELINK ]" : "[ INITIATE_AI_LINK ]"}
      </button>

      {/* Holographic Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-10 w-96 h-96 z-40 bg-black/80 border border-cyan-500/30 backdrop-blur-xl pointer-events-auto flex flex-col font-mono shadow-[0_0_30px_rgba(0,255,255,0.1)] rounded-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-cyan-900/20 p-2 border-b border-cyan-500/30 flex justify-between items-center">
              <span className="text-xs text-cyan-400">:: NEURAL_LINK_ACTIVE</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-cyan-500/50 rounded-full" />
              </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-2 text-xs border ${msg.role === "user"
                    ? "border-white/20 text-white bg-white/5"
                    : "border-cyan-500/50 text-cyan-300 bg-cyan-900/10"
                    }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="text-cyan-500 text-xs animate-pulse">PROCESSING...</div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-2 border-t border-cyan-500/30 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="ENTER COMMAND..."
                className="flex-1 bg-transparent border border-white/10 text-white text-xs p-2 focus:outline-none focus:border-cyan-500 transition-colors"
                autoFocus
              />
              <button
                onClick={handleSend}
                className="bg-cyan-900/30 text-cyan-400 border border-cyan-500/30 px-3 text-xs hover:bg-cyan-500 hover:text-black transition-colors"
              >
                TX
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
