"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ProjectsShowcase from "@/components/home/ProjectsShowcase";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import ContactSection from "@/components/home/ContactSection";
import { Project } from "@/lib/projects";

export default function HomeClient({ projects }: { projects: Project[] }) {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      <HeroSection preloaderDone={preloaderDone} />
      <AboutSection />
      <ProjectsShowcase preloaderDone={preloaderDone} projects={projects} />
      <StatsSection />
      <ServicesSection />
      <ContactSection />
    </main>
  );
}
