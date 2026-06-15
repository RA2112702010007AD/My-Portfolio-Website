import React, { useState } from "react";
import {
  FileText,
  Mail,
  Linkedin,
  Github,
  Award,
  MapPin,
  Phone,
  ArrowUpRight,
  BookOpen,
  Send,
  Sparkles,
  Search,
  CheckCircle2,
  Bookmark,
  Printer,
  ChevronRight,
  UserCheck
} from "lucide-react";
import { resumeData } from "./resumeData.js";
import RecruiterBot from "./components/RecruiterBot.js";
import SkillsGrid from "./components/SkillsGrid.js";
import ExperienceTimeline from "./components/ExperienceTimeline.js";
import ProjectsShowcase from "./components/ProjectsShowcase.js";
import CertificationsGrid from "./components/CertificationsGrid.js";
import { motion } from "motion/react";

export default function App() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSkillSelect = (skillName: string) => {
    setSelectedSkill(skillName);
    // Smoothly scroll down to the projects section to see matching entries
    const projSection = document.getElementById("projects-section");
    if (projSection) {
      projSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setIsSubmitSuccess(false);

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY";

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: contactName,
          email: contactEmail,
          message: contactMsg,
          subject: `New Portfolio Message from ${contactName}`,
          from_name: "Portfolio Inquiry Form",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setIsSubmitSuccess(true);
        setContactName("");
        setContactEmail("");
        setContactMsg("");
        setTimeout(() => {
          setIsSubmitSuccess(false);
        }, 5000);
      } else {
        setSubmitError(data.message || "Failed to send message. Please register an access key or try again.");
      }
    } catch (error: any) {
      setSubmitError(error.message || "An unexpected error occurred. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900" id="app-root">
      {/* Recruiter Floating Agent */}
      <RecruiterBot />

      {/* Styled Printable Stylesheet Header (Injects cleanly for browser PDF exports) */}
      <style>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
            font-size: 11px !important;
          }
          #recruiter-chat-launcher,
          #recruiter-chat-overlay,
          #recruiter-chat-panel,
          #main-navigation,
          #skills-grid-controls,
          #skills-category-list,
          #projects-controls-bar,
          #contact-section,
          #site-footer,
          .print-hidden {
            display: none !important;
          }
          .print-break-before {
            page-break-before: always !important;
          }
          .print-card-grid {
            grid-template-cols: 1fr !important;
          }
           .bg-white, .bg-slate-50, .bg-slate-50/40 {
             background: transparent !important;
             box-shadow: none !important;
             border-color: #e2e8f0 !important;
           }
        }
      `}</style>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100/80 transition-shadow print-hidden" id="main-navigation">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-display font-bold text-base shadow-sm shadow-indigo-500/10">
              AD
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm tracking-tight font-display">Anurag Das</p>
              <p className="text-[10px] text-indigo-600 font-mono font-semibold tracking-wider uppercase">AI/ML & Full Stack Portfolio</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-500">
            <a href="#about-section" className="hover:text-slate-900 transition-colors">Summary</a>
            <a href="#skills-section" className="hover:text-slate-900 transition-colors">Skill Dictionary</a>
            <a href="#experience-section" className="hover:text-slate-900 transition-colors">Experience</a>
            <a href="#projects-section" className="hover:text-slate-900 transition-colors">Publications & Projects</a>
            <a href="#certs-section" className="hover:text-slate-900 transition-colors">Certifications</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Quick Export PDF Trigger */}
            <button
              onClick={handlePrint}
              id="export-pdf-nav-btn"
              className="flex items-center gap-1.5 border border-slate-200 hover:border-indigo-200 hover:bg-slate-50 text-slate-600 hover:text-indigo-600 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export CV</span>
            </button>
            <a
              href="#contact-section"
              id="request-interview-nav-btn"
              className="bg-slate-900 hover:bg-indigo-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              Hire Anurag
            </a>
          </div>
        </div>
      </header>

      {/* Hero Layout */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 bg-gradient-to-b from-white to-slate-50/20" id="about-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="hero-layout-grid">
            
            {/* Left Headline Information Column */}
            <div className="lg:col-span-7 space-y-6" id="hero-info-column">
              <span className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-100 text-indigo-700 font-mono font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
                cognitive computing specialization
              </span>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 font-display tracking-tight leading-[1.05]" id="profile-headline">
                Developing Next-Gen <br className="hidden sm:inline" />
                <span className="text-indigo-600 relative inline-block text-glow-indigo">
                  AI Systems & RAG
                </span> Foundations.
              </h1>

              {/* Bio Statement Summary */}
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-sans max-w-2xl" id="professional-bio-summary">
                I'm <strong className="font-semibold text-slate-800">Anurag Das</strong>, an Integrated M.Tech student in Computer Science and Engineering at SRM University. I specialize in building robust, self-correcting Retrieval-Augmented Generation (RAG) frameworks, predictive business analytics components, and cloud-enabled AI microservices.
              </p>

              {/* Quick Contact Badge Row */}
              <div className="flex flex-wrap gap-2 pt-2" id="hero-contact-metadata-badges">
                <span className="flex items-center gap-1.5 bg-white border border-slate-100 text-slate-600 text-xs font-mono font-medium px-3.5 py-2 rounded-xl shadow-2xs">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {resumeData.personalInfo.location}
                </span>
                <span className="flex items-center gap-1.5 bg-white border border-slate-100 text-slate-600 text-xs font-mono font-medium px-3.5 py-2 rounded-xl shadow-2xs">
                  <Mail className="w-4 h-4 text-slate-400" />
                  {resumeData.personalInfo.email}
                </span>
                <span className="flex items-center gap-1.5 bg-white border border-slate-100 text-slate-600 text-xs font-mono font-medium px-3.5 py-2 rounded-xl shadow-2xs">
                  <Phone className="w-4 h-4 text-slate-400" />
                  {resumeData.personalInfo.phone}
                </span>
              </div>

              {/* Social Channels Call Action Block */}
              <div className="flex items-center gap-3 pt-4 print-hidden" id="hero-links-action-row">
                <a
                  href={resumeData.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-5 py-3 text-sm font-bold transition-colors cursor-pointer"
                  id="linkedin-hero-link"
                >
                  <Linkedin className="w-4 h-4" />
                  Connect on LinkedIn
                </a>
                <a
                  href={resumeData.personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 px-5 py-3 rounded-2xl text-sm font-bold transition-colors cursor-pointer"
                  id="github-hero-link"
                >
                  <Github className="w-4 h-4" />
                  GitHub Repository
                </a>
              </div>
            </div>

            {/* Right Recruiter Guidance / Fast Summary Bento Stats Panel */}
            <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs md:shadow-lg relative" id="hero-stats-panel">
              {/* Recruiter Quick Card Callout */}
              <span className="text-indigo-600 font-bold font-mono text-[10px] tracking-wider uppercase flex items-center gap-1.5 mb-3">
                <UserCheck className="w-4 h-4 text-indigo-500" />
                recruiters checkbook summary
              </span>
              <h3 className="text-xl font-bold text-slate-800 font-display mb-4" id="intro-pitch-title">Professional Candidacy Highlights</h3>
              
              <div className="space-y-4" id="scoreboard-bento-grid">
                
                {/* Academic Highlights */}
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100/60" id="stat-academic">
                  <div className="bg-white shrink-0 p-2 border border-slate-100 rounded-xl font-display font-black text-indigo-600 text-sm">
                    8.78
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 leading-tight">M.Tech Integrated Student CSE w/s Cognitive Computing</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">SRM University (2021 – 2026) | CGPA: 8.78/10</p>
                  </div>
                </div>

                {/* Research Publication highlights */}
                <div className="flex items-start gap-3 p-3 bg-indigo-50/40 rounded-2xl border border-indigo-105/20" id="stat-publication">
                  <div className="bg-white shrink-0 p-2 border border-slate-100 rounded-xl text-indigo-600">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 leading-tight">First-Author Published Researcher</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Author of "Reflective RAG" IEEE Xplore ICICT  2026 Publication</p>
                  </div>
                </div>

                {/* Oracle Credentials Highlights */}
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100/60" id="stat-creds">
                  <div className="bg-white shrink-0 p-2 border border-slate-100 rounded-xl text-indigo-600">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 leading-tight">OCI Certified GenAI & Data Scientist</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Double credentials from Oracle Cloud Infrastructure (2025)</p>
                  </div>
                </div>
              </div>

              {/* Bot guidance indicator */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between shadow-sm print-hidden" id="chatbot-callout">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4.5 h-4.5 text-indigo-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold font-display">Screen candidate dynamically?</p>
                    <p className="text-[10px] text-slate-400">Launch the chat screening helper at bottom-right!</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Structured Skill Matrix Section */}
      <section className="py-16 bg-slate-50/20 scroll-mt-20" id="skills-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-3xl font-bold font-display text-slate-900 tracking-tight" id="skills-title">Core Competencies Catalog</h2>
            <p className="text-sm text-slate-500 mt-1.5">Interactive index mapped directly from resume domains. Clicking a skill focuses relevant projects and experiences below.</p>
          </div>
          <SkillsGrid onSelectSkill={handleSkillSelect} selectedSkill={selectedSkill} />
        </div>
      </section>

      {/* Experience Chronological Timeline Section */}
      <section className="py-16 scroll-mt-20" id="experience-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-12" id="experience-header-wrapper">
            <h2 className="text-3xl font-bold font-display text-slate-900 tracking-tight" id="experience-title">Professional Internships & Experience</h2>
            <p className="text-sm text-slate-500 mt-1.5">Proven backend development and AI deployment successes across dedicated internship terms.</p>
          </div>
          <ExperienceTimeline />
        </div>
      </section>

      {/* Publications Segment (IEEE Feature Spot) */}
      <section className="py-16 bg-indigo-900 text-white rounded-t-[3rem] p-1 shadow-sm font-sans" id="publications-segment">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="pub-grid">
            <div className="lg:col-span-8 space-y-4" id="pub-left">
              <span className="text-[10px] bg-indigo-700/60 border border-indigo-500/30 text-indigo-200 font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                IEEE Research spotlight
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight font-display text-white leading-tight" id="pub-headline">
                Reflective RAG: A Self-Correcting Cognitive Framework for Reducing Hallucinations in AI Research Assistants
              </h3>
              <p className="text-sm text-indigo-200/95" id="pub-source">
                Published in <strong className="text-white font-semibold">IEEE Xplore (ICICT 2026)</strong>
              </p>
              
              <ul className="space-y-2.5 pt-2" id="pub-bullets">
                {resumeData.publications[0].highlights.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-indigo-100/90 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:col-span-4 bg-indigo-850 border border-indigo-700 rounded-3xl p-6 text-center" id="pub-right">
              <div className="w-12 h-12 bg-indigo-800 shadow-md rounded-2xl flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 font-mono">
                RAG
              </div>
              <p className="text-xs font-mono text-indigo-300 font-semibold uppercase tracking-widest">Cognitive Scope</p>
              <h4 className="text-base font-bold text-white font-display mt-1">Reducing AI Hallucinations</h4>
              <p className="text-xs text-indigo-200/70 mt-3 leading-relaxed">
                Anurag's work designs custom LangChain orchestration methods utilizing iterative, evidence-grounded loops of self-correction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid Grid Showcase Section */}
      <section className="py-16 scroll-mt-20 print-break-before" id="projects-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-10" id="projects-header-wrapper">
            <h2 className="text-3xl font-bold font-display text-slate-900 tracking-tight" id="projects-title">Technical Projects Portfolio</h2>
            <p className="text-sm text-slate-500 mt-1.5">Showcase of complex code, predictive models, and software integrations.</p>
          </div>
          <ProjectsShowcase selectedSkill={selectedSkill} onClearSkillFilter={() => setSelectedSkill(null)} />
        </div>
      </section>

      {/* Certifications & Achievements Section */}
      <section className="py-16 bg-slate-50/20 scroll-mt-20" id="certs-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-10" id="certs-header-wrapper">
            <h2 className="text-3xl font-bold font-display text-slate-900 tracking-tight">Credentials & Accolades</h2>
            <p className="text-sm text-slate-500 mt-1.5">Trained, assessed, and certified by industry headers and prestigious remote sensing bodies.</p>
          </div>
          <CertificationsGrid />
        </div>
      </section>

      {/* Contact Panel Card Segment */}
      <section className="py-16 scroll-mt-20 print-hidden" id="contact-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-100/40 p-8 md:p-12" id="contact-card">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="contact-grid">
              
              <div className="lg:col-span-5 space-y-6" id="contact-left">
                <span className="text-[10px] bg-slate-100 text-slate-600 font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block border border-slate-200/50">
                  direct inquiries
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight leading-none" id="contact-pitch-title">
                  Let's Discuss Opportunities.
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed font-sans">
                  Anurag Das is open for recruitment discussions, technical consultations, or project development dialogues. Drop your screening requests or roles details here!
                </p>

                <div className="space-y-4 pt-4" id="direct-contact-endpoints">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-mono">Send Direct Email</p>
                      <a href={`mailto:${resumeData.personalInfo.email}`} id="cta-email-link" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 font-display transition-colors">
                        {resumeData.personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-mono">Mobile Callback</p>
                      <a href={`tel:${resumeData.personalInfo.phone}`} id="cta-phone-link" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 font-display transition-colors">
                        {resumeData.personalInfo.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry Form Simulation */}
              <div className="lg:col-span-7 bg-slate-50/50 border border-slate-100 p-6 md:p-8 rounded-3xl" id="contact-form-wrapper">
                <form onSubmit={handleContactSubmit} className="space-y-4" id="direct-contact-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 font-display">Your Name</label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="John Doe"
                        id="contact-form-name"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 font-display">Business Email</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="recruiter@company.com"
                        id="contact-form-email"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 font-display">Acknowledge Statement / Job Role Context</label>
                    <textarea
                      rows={4}
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      placeholder="Hi Anurag, we are interested in screening your profile for an AI/ML Engineer role..."
                      id="contact-form-message"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      required
                    ></textarea>
                  </div>

                  {submitError && (
                    <div className="text-xs text-rose-600 bg-rose-50 border border-rose-100 rounded-xl p-3 text-center font-medium">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    id="contact-form-submit"
                    className="w-full bg-indigo-600 hover:bg-slate-900 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-indigo-600/10 disabled:opacity-75 disabled:cursor-not-allowed"
                    disabled={isSubmitting || isSubmitSuccess}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending Inquiry...</span>
                      </>
                    ) : isSubmitSuccess ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span>Inquiry Dispatched Successfully!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="border-t border-slate-150/60 bg-white py-12" id="site-footer">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-2.5" id="footer-logo-row">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-display font-bold text-sm">
              AD
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700 font-display">Anurag Das</p>
              <p className="text-[10px] text-slate-400 font-mono">AI Specialist & Cognitive Computing Core</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-400" id="footer-links-row">
            <a href="#about-section" className="hover:text-slate-800 transition-colors">Summary</a>
            <a href="#skills-section" className="hover:text-slate-800 transition-colors">Skills</a>
            <a href="#experience-section" className="hover:text-slate-800 transition-colors">Experience</a>
            <a href="#projects-section" className="hover:text-slate-800 transition-colors">Projects</a>
            <a href="#certs-section" className="hover:text-slate-800 transition-colors">Credentials</a>
            <button onClick={handlePrint} className="hover:text-indigo-600 transition-colors cursor-pointer">Export PDF</button>
          </div>

          <p className="text-xs text-slate-400/80 font-mono" id="footer-copyright">
            © {new Date().getFullYear()} Anurag Das. Portfolio engineered for recruitment screening.
          </p>
        </div>
      </footer>
    </div>
  );
}
