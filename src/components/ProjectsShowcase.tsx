import React, { useState } from "react";
import { FolderGit2, Github, ExternalLink, Sparkles, AlertCircle, BookOpen } from "lucide-react";
import { resumeData } from "../resumeData.js";
import { motion, AnimatePresence } from "motion/react";

interface ProjectsShowcaseProps {
  selectedSkill?: string | null;
  onClearSkillFilter?: () => void;
}

export default function ProjectsShowcase({ selectedSkill, onClearSkillFilter }: ProjectsShowcaseProps) {
  const [activeTab, setActiveTab] = useState<"all" | "ai" | "data">("all");

  const filteredProjects = resumeData.projects.filter((project) => {
    // Standard visual tab filter
    let matchesTab = true;
    if (activeTab === "ai") {
      matchesTab = project.technologies.some(t => ["langchain", "openai api", "nlp", "rag", "agentic", "gradient boosting", "random forest", "machine learning"].includes(t.toLowerCase()));
    } else if (activeTab === "data") {
      matchesTab = project.technologies.some(t => ["sql", "data visualization", "tf-idf", "faiss", "statistics"].includes(t.toLowerCase()) || project.title.toLowerCase().includes("analytics"));
    }

    // Intersecting interactive skill selection filter from the skills catalog
    let matchesSkill = true;
    if (selectedSkill) {
      matchesSkill = project.technologies.some(
        (tech) => tech.toLowerCase() === selectedSkill.toLowerCase()
      );
    }

    return matchesTab && matchesSkill;
  });

  return (
    <div className="space-y-6" id="projects-showcase-container">
      {/* Filters & Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" id="projects-controls-bar">
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl self-start" id="projects-tab-selector">
          <button
            onClick={() => setActiveTab("all")}
            id="projects-tab-all"
            className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              activeTab === "all" ? "bg-white text-slate-800 shadow-xs" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            All Work ({resumeData.projects.length})
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            id="projects-tab-ai"
            className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              activeTab === "ai" ? "bg-white text-slate-800 shadow-xs" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            GenAI & Machine Learning
          </button>
          <button
            onClick={() => setActiveTab("data")}
            id="projects-tab-data"
            className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              activeTab === "data" ? "bg-white text-slate-800 shadow-xs" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            NLP & Analytics
          </button>
        </div>

        {/* Skill Active Filter Notification Banner */}
        {selectedSkill && (
          <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1.5 rounded-xl text-xs font-medium" id="projects-active-filter-badge">
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Filtering by: <strong className="font-bold">{selectedSkill}</strong>
            <button
              onClick={onClearSkillFilter}
              id="projects-clear-filter"
              className="ml-2 hover:bg-indigo-100 hover:text-indigo-900 rounded-md p-0.5 text-indigo-600 cursor-pointer"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Projects Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="projects-cards-grid">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            const isReflectiveRag = project.title.toLowerCase().includes("reflective");
            return (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -4 }}
                id={`project-card-${idx}`}
                className="relative bg-white border border-slate-100 rounded-3xl p-6 md:p-8 hover:shadow-xl hover:border-indigo-100 transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Visual Accent for RAG Project - IEEE Icon ribbon */}
                {isReflectiveRag && (
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                     IEEE Published
                  </div>
                )}

                <div>
                  <div className="mb-4" id={`project-card-header-${idx}`}>
                    <span className="text-xs text-indigo-600 font-mono tracking-wider font-semibold uppercase">
                      {project.subtitle}
                    </span>
                    <h4 className="text-lg font-bold text-slate-800 tracking-tight leading-snug mt-1.5 font-display group-hover:text-indigo-600 transition-colors" id={`project-title-${idx}`}>
                      {project.title}
                    </h4>
                  </div>

                  {/* Highlights Bulleted Points */}
                  <ul className="space-y-2.5 mb-6" id={`project-highlights-${idx}`}>
                    {project.highlights.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs leading-relaxed text-slate-500 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5 inline-block"></span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1 mb-6" id={`project-tags-${idx}`}>
                    {project.technologies.map((tech) => {
                      const isActive = selectedSkill && tech.toLowerCase() === selectedSkill.toLowerCase();
                      return (
                        <span
                          key={tech}
                          id={`project-${idx}-tag-${tech}`}
                          className={`text-[10px] sm:text-xs px-2.5 py-1 rounded-lg font-mono font-medium border ${
                            isActive
                              ? "bg-indigo-600 border-indigo-600 text-white"
                              : "bg-slate-50 text-slate-600 border-slate-200/55"
                          }`}
                        >
                          {tech}
                        </span>
                      );
                    })}
                  </div>

                  {/* GitHub linkage buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100" id={`project-card-footer-${idx}`}>
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`project-${idx}-github-link`}
                      className="text-xs font-semibold text-slate-600 hover:text-indigo-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Github className="w-4 h-4" />
                      View Repository
                    </a>
                    {project.deployUrl && (
                      <a
                        href={project.deployUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`project-${idx}-deploy-link`}
                        className="text-xs font-semibold text-indigo-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="col-span-full bg-slate-50 border border-slate-100 rounded-3xl py-12 px-6 text-center" id="projects-empty-state">
            <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm font-medium">No projects containing exact skill context found.</p>
            <button
              onClick={onClearSkillFilter}
              id="projects-reset-filter-btn"
              className="mt-3 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-xl cursor-pointer"
            >
              Reset Skill Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
