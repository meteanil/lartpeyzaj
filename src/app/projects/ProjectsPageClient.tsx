"use client";

import { useState } from "react";
import ProjectGallery3D from "@/components/StackGallery";
import { Project } from "@/lib/projects";

export default function ProjectsPageClient({ 
  projects, 
  applications 
}: { 
  projects: Project[]; 
  applications: Project[]; 
}) {
  const [activeTab, setActiveTab] = useState<"projects" | "applications">("projects");

  const currentItems = activeTab === "projects" ? projects : applications;

  return (
    <div style={{ width: "100%", minHeight: "100vh", position: "relative" }}>
      {/* Sekmeler */}
      <div style={{
        position: "fixed",
        top: "clamp(5rem, 8vh, 6rem)",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        display: "flex",
        gap: "0.5rem",
        backgroundColor: "rgba(10, 11, 10, 0.8)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "100px",
        padding: "0.4rem",
      }}>
        <button
          onClick={() => setActiveTab("projects")}
          style={{
            padding: "0.7rem 2rem",
            borderRadius: "100px",
            border: "none",
            cursor: "none",
            fontSize: "0.9rem",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            transition: "all 0.3s ease",
            backgroundColor: activeTab === "projects" ? "var(--accent)" : "transparent",
            color: activeTab === "projects" ? "#000" : "var(--muted)",
          }}
        >
          Projeler
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          style={{
            padding: "0.7rem 2rem",
            borderRadius: "100px",
            border: "none",
            cursor: "none",
            fontSize: "0.9rem",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            transition: "all 0.3s ease",
            backgroundColor: activeTab === "applications" ? "var(--accent)" : "transparent",
            color: activeTab === "applications" ? "#000" : "var(--muted)",
          }}
        >
          Uygulamalar
        </button>
      </div>

      {/* 3D Galeri */}
      <ProjectGallery3D key={activeTab} projects={currentItems} />
    </div>
  );
}
