import React, { useState } from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2, Trophy, Award } from "lucide-react";
import { resumeData } from "../resumeData.js";
import { motion } from "motion/react";

export default function ExperienceTimeline() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Helper to determine status tags for internships
  const getCompanyDetails = (company: string) => {
    if (company.toLowerCase().includes("denvik")) {
      return {
        badge: "Sensors & AI models",
        color: "bg-emerald-50 text-emerald-700 border-emerald-100",
        logo: "DT"
      };
    } else if (company.toLowerCase().includes("slash mark")) {
      return {
        badge: "API Integrations",
        color: "bg-indigo-50 text-indigo-700 border-indigo-100",
        logo: "SM"
      };
    } else {
      return {
        badge: "Simulation Core",
        color: "bg-amber-50 text-amber-700 border-amber-100",
        logo: "CI"
      };
    }
  };

  return (
    <div className="relative border-l border-slate-200 ml-4 md:ml-6 pl-6 space-y-12 py-3" id="experience-timeline-container">
      {resumeData.experience.map((exp, idx) => {
        const meta = getCompanyDetails(exp.company);
        return (
          <motion.div
            key={idx}
            id={`experience-entry-${idx}`}
            className="relative group cursor-pointer"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
          >
            {/* Timeline Marker Node */}
            <span
              className={`absolute -left-12 top-1.5 flex items-center justify-center w-8 h-8 rounded-full border-3 ring-8 transition-colors ${
                hoveredIndex === idx
                  ? "bg-indigo-600 border-white ring-indigo-50 text-white"
                  : "bg-white border-slate-200 ring-slate-50 text-slate-400"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
            </span>

            {/* Content Container Card */}
            <div className={`p-6 md:p-8 rounded-3xl border transition-all ${
              hoveredIndex === idx
                ? "bg-white border-indigo-200 shadow-xl shadow-slate-100/60"
                : "bg-white border-slate-100/80 shadow-xs"
            }`}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${meta.color}`}>
                      {meta.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-bold font-display text-slate-800 mt-2" id={`role-title-${idx}`}>
                    {exp.role}
                  </h4>
                  <p className="text-indigo-600 font-semibold font-display text-sm mt-1 flex items-center gap-1" id={`company-name-${idx}`}>
                    {exp.company}
                  </p>
                </div>

                <div className="text-right">
                  {/* Subtle company visual placeholder block */}
                  <div className="w-12 h-12 bg-slate-50 group-hover:bg-indigo-50 border border-slate-100 group-hover:border-indigo-100 rounded-2xl flex items-center justify-center text-slate-700 group-hover:text-indigo-600 font-display font-medium text-base transition-colors ml-auto">
                    {meta.logo}
                  </div>
                </div>
              </div>

              {/* Bullet Highlights */}
              <ul className="space-y-3" id={`exp-highlights-${idx}`}>
                {exp.highlights.map((bullet, bIdx) => {
                  const checkHighValueKeyword = (text: string) => {
                    // Make statistical accomplishments pop visually
                    return text.replace(/(91% accuracy|Random Forest and Gradient Boosting|FastAPI|Streamlit|predictive analytics|UML state diagrams|Java-based internal tool)/g, "<strong class='font-bold text-slate-900'>$1</strong>");
                  };

                  return (
                    <li key={bIdx} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                      <CheckCircle2 className="w-4.5 h-4.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span dangerouslySetInnerHTML={{ __html: checkHighValueKeyword(bullet) }} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
