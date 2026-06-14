import React from "react";
import { Award, ShieldCheck, Flame, Medal, Star, CheckSquare } from "lucide-react";
import { resumeData } from "../resumeData.js";
import { motion } from "motion/react";

export default function CertificationsGrid() {
  
  // Custom badges for Oracle and DL.AI
  const getCertDecoration = (name: string) => {
    const lname = name.toLowerCase();
    if (lname.includes("oracle")) {
      return {
        badge: "OCI Professional",
        bgColor: "bg-amber-50/70 border-amber-200/50 text-amber-800",
        label: "Oracle"
      };
    } else if (lname.includes("deeplearning")) {
      return {
        badge: "Specialized Certificate",
        bgColor: "bg-blue-50 text-blue-800 border-blue-200/50",
        label: "DeepLearning.AI"
      };
    } else if (lname.includes("isro")) {
      return {
        badge: "Geospatial AI",
        bgColor: "bg-orange-50 text-orange-800 border-orange-200/50",
        label: "IIRS-ISRO"
      };
    }
    return {
      badge: "Industry Certified",
      bgColor: "bg-slate-50 text-slate-700 border-slate-200/50",
      label: "Professional"
    };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="certifications-achievements-container">
      
      {/* Certifications Card Frame */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs md:shadow-md" id="certifications-left-panel">
        <h3 className="text-xl font-bold font-display text-slate-800 flex items-center gap-2 mb-2" id="certifications-header">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
            Core Credentials & Certifications
        </h3>
        <p className="text-sm text-slate-500 mb-6">Verified industry certifications validating specialization in Generative AI, Data Science & ML engineering.</p>
        
        <div className="space-y-3.5" id="certifications-list">
          {resumeData.certifications.map((cert, idx) => {
            const style = getCertDecoration(cert.name);
            return (
              <motion.div
                key={idx}
                id={`cert-item-${idx}`}
                whileHover={{ x: 2 }}
                className="flex items-start gap-3.5 p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-all"
              >
                <div className="bg-white shrink-0 p-2.5 rounded-xl border border-slate-100 text-indigo-600 shadow-2xs">
                  <Award className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border inline-block mb-1.5 ${style.bgColor}`}>
                    {style.badge}
                  </span>
                  <h4 className="text-sm font-bold text-slate-700 leading-snug tracking-tight font-display" id={`cert-name-${idx}`}>
                    {cert.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">{style.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Achievements & Awards Grid Block */}
      <div className="flex flex-col gap-6" id="achievements-right-panel">
        
        {/* Achievements Card Banner */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs md:shadow-md flex-1">
          <h3 className="text-xl font-bold font-display text-slate-800 flex items-center gap-2 mb-2" id="achievements-header">
            <Medal className="w-5 h-5 text-indigo-600" />
              Noteworthy Accomplishments
          </h3>
          <p className="text-sm text-slate-500 mb-6">Academic and competitive recognitions distinguishing outstanding performance.</p>
          
          <div className="space-y-4" id="achievements-list">
            {resumeData.achievements.map((ach, idx) => (
              <div
                key={idx}
                id={`achievement-item-${idx}`}
                className="flex items-center gap-4 p-4 border border-slate-100 bg-slate-50/50 rounded-2xl transition-all"
              >
                <div className="bg-indigo-50 border border-indigo-100 text-indigo-600 p-2.5 rounded-xl shrink-0">
                  <Star className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 leading-snug font-display" id={`achievement-name-${idx}`}>
                    {ach.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">Acclamations of Merit</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Areas of Interest Bento Item */}
        <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 md:p-8 shadow-md">
          <h3 className="text-base font-bold font-display text-white flex items-center gap-2 mb-4" id="interest-areas-header">
            <Flame className="w-4.5 h-4.5 text-amber-400" />
              Primary Areas of Focus & Research
          </h3>
          <div className="flex flex-wrap gap-1.5" id="interest-areas-list">
            {resumeData.additionalInfo.areasOfInterest.map((area, idx) => (
              <span
                key={idx}
                id={`interest-badge-${idx}`}
                className="text-xs bg-slate-805 hover:bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg transition-colors cursor-default border border-slate-800 font-medium font-display"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
