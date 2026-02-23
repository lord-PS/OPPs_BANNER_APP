"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import CornerNav from "@/components/CornerNav";
import HeroSection from "@/components/Hero";
import MarqueeSection from "@/components/MarqueeSection";
import AboutSection from "@/components/AboutSection";
import TechSection from "@/components/TechSection";
import TimelineSection from "@/components/TimelineSection";
import ProjectsSection from "@/components/ProjectsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <>
          <CustomCursor />
          <CornerNav />
          <HeroSection />
          <div className="section-divider" />
          <AboutSection />
          <MarqueeSection />
          <div className="section-divider" />
          <TechSection />
          <div className="section-divider" />
          <TimelineSection />
          <div className="section-divider" />
          <ProjectsSection />
          <div className="section-divider" />
          <CTASection />
          <Footer />
        </>
      )}
    </main>
  );
}
