import React, { useState } from "react";
import { Search, Brain, Code, Database, Globe, Layers, Award, Terminal } from "lucide-react";
import { resumeData } from "../resumeData.js";
import { motion } from "motion/react";

interface SkillsGridProps {
  onSelectSkill?: (skill: string) => void;
  selectedSkill?: string | null;
}

export default function SkillsGrid({ onSelectSkill, selectedSkill }: SkillsGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "All Domains", icon: Layers },
    { id: "aiMl", name: "Artificial Intelligence & ML", icon: Brain, key: "aiMl" },
    { id: "programming", name: "Languages", icon: Code, key: "programming" },
    { id: "frameworksTools", name: "Frameworks & Tools", icon: Terminal, key: "frameworksTools" },
    { id: "dataScience", name: "Data Science & Analytics", icon: Award, key: "dataScience" },
    { id: "cloud", name: "Cloud Infrastructure", icon: Globe, key: "cloud" },
    { id: "databases", name: "Databases", icon: Database, key: "databases" },
    { id: "coreCS", name: "CS Foundations", icon: Layers, key: "coreCS" },
  ];

  // Helper to categorize skills list and label them
  const allSkillsCategorized = [
    ...resumeData.skills.aiMl.map(s => ({ name: s, cat: "aiMl", rank: 5 })),
    ...resumeData.skills.programming.map(s => ({ name: s, cat: "programming", rank: 5 })),
    ...resumeData.skills.frameworksTools.map(s => ({ name: s, cat: "frameworksTools", rank: 4 })),
    ...resumeData.skills.dataScience.map(s => ({ name: s, cat: "dataScience", rank: 4 })),
    ...resumeData.skills.cloud.map(s => ({ name: s, cat: "cloud", rank: 4 })),
    ...resumeData.skills.databases.map(s => ({ name: s, cat: "databases", rank: 4 })),
    ...resumeData.skills.coreCS.map(s => ({ name: s, cat: "coreCS", rank: 5 })),
  ];

  const filteredSkills = allSkillsCategorized.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || skill.cat === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-xs md:shadow-md" id="skills-grid-container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8" id="skills-grid-controls">
        <div>
          <h3 className="text-xl font-bold font-display text-slate-800" id="skills-section-header">Interactive Skill Catalog</h3>
          <p className="text-sm text-slate-500 mt-1">Search, category-filter, or click skills to see Anurag's specialized stacks.</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72" id="skills-search-wrapper">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
          <input
            type="text"
            placeholder="Search matching skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="skills-search-input"
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50/50"
          />
        </div>
      </div>

      {/* Category selector chips */}
      <div className="flex flex-wrap gap-1.5 pb-4 mb-6 border-b border-slate-100" id="skills-category-list">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              id={`skills-cat-tab-${cat.id}`}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors border ${
                isSelected
                  ? "bg-slate-900 border-slate-900 text-white"
                  : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600"
              }`}
            >
              <IconComponent className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Skills output */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3" id="skills-results-container">
        {filteredSkills.map((skill, idx) => {
          const isHighlight = selectedSkill && skill.name.toLowerCase() === selectedSkill.toLowerCase();
          return (
            <motion.div
              layout
              key={idx}
              whileHover={{ y: -2 }}
              onClick={() => onSelectSkill && onSelectSkill(skill.name)}
              id={`skill-card-${idx}`}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                isHighlight
                  ? "bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-100/50 text-white"
                  : "bg-slate-50/60 hover:bg-white hover:border-indigo-200 hover:shadow-xs border-slate-200/60"
              }`}
            >
              <span className={`text-xs font-bold leading-tight font-display ${isHighlight ? "text-white" : "text-slate-800"}`}>
                {skill.name}
              </span>
              
              {/* Subtle skill expertise indicator bar */}
              <div className="mt-3" id={`skill-meter-wrapper-${idx}`}>
                <div className="flex justify-between items-center text-[9px] mb-1 font-mono">
                  <span className={isHighlight ? "text-indigo-200" : "text-slate-400"}>Expertise</span>
                  <span className={`font-semibold ${isHighlight ? "text-white" : "text-slate-500"}`}>
                    {skill.rank === 5 ? "Advanced" : "Fluent"}
                  </span>
                </div>
                <div className={`h-1 w-full rounded-full ${isHighlight ? "bg-indigo-700" : "bg-slate-200"}`}>
                  <div
                    className={`h-1 rounded-full ${isHighlight ? "bg-white" : "bg-indigo-500"}`}
                    style={{ width: skill.rank === 5 ? "100%" : "80%" }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
        {filteredSkills.length === 0 && (
          <div className="col-span-full py-8 text-center" id="skills-empty-state">
            <p className="text-slate-400 text-sm">No capabilities match your query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
