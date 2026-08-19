import React, { useState, useRef } from 'react';
import { PERSONAL_INFO, EXPERIENCE_HISTORY, EDUCATION_HISTORY, PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';
import { 
  FileText, 
  Printer, 
  Copy, 
  Check, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Mail, 
  Phone, 
  Linkedin, 
  ExternalLink,
  Upload,
  Download,
  Trash2,
  FileCheck,
  Camera,
  AlertCircle
} from 'lucide-react';
import { useMedia, UploadedResumeInfo } from '../context/MediaContext';

interface ResumeViewProps {
  onOpenContact: () => void;
}

export const ResumeView: React.FC<ResumeViewProps> = ({ onOpenContact }) => {
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { 
    profilePhoto, 
    openUploadModal, 
    uploadedResume, 
    setUploadedResume, 
    removeUploadedResume 
  } = useMedia();

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
KULDIP SAH
Aspiring Java Full Stack Developer
9279885502 | sahkuldip186@gmail.com | github.com/sahkuldip | linkedin.com/in/Kuldip-sah | Hyderabad, Telangana, India | Nepal

PROFESSIONAL SUMMARY
Aspiring Java Full Stack Developer with hands-on experience in developing web applications using Java, Spring Boot, ReactJS, MySQL, HTML5, CSS3, and JavaScript. Strong understanding of Object-Oriented Programming, Collections Framework, JDBC, RESTful API development, DBMS, and CRUD operations. Proficient in Git, GitHub, IntelliJ IDEA, and Eclipse with experience in backend development and API testing.

TECHNICAL SKILLS
Languages: Java, Advanced Java, C, JavaScript
Backend Framework: Spring Boot
Frontend: HTML5, CSS3, JavaScript, ReactJS
Databases: MySQL, Oracle SQL / PL-SQL, Prisma ORM
Tools: Git, GitHub, IntelliJ IDEA, Eclipse, Figma, GitHub Copilot, CI/CD pipelines, Jenkins, Docker and Kubernetes
Concepts: REST APIs, JDBC, OOP, DBMS, CRUD, Agile Basics, Networking
Soft Skills: Problem Solving, Analytical Thinking, Team Collaboration, Communication, Adaptability

PROFESSIONAL EXPERIENCE
Backend Developer Intern — Clove IT Pvt. Ltd., Biratnagar, Nepal
2023 – 2024
• Developed RESTful backend services using Node.js, Nest-JS, and TypeScript for application modules.
• Implemented CRUD operations using Prisma ORM for database management.
• Performed API testing using Postman and fixed critical bugs before deployment.

PROJECTS
Banking Management System — Java · Spring Boot · MySQL · REST API
2025
• Developed a full-stack banking system using Spring Boot and ReactJS with layered architecture for modular design.
• Designed and implemented REST APIs for banking operations including account management, fund transfer, and transactions.
• Built responsive UI components using ReactJS, JavaScript, HTML5, and CSS3 for dynamic rendering and form handling.
• Integrated MySQL database and ensured smooth frontend–backend communication using REST APIs and Postman testing.

E-Commerce Website — ReactJS · HTML5 · CSS3
2024
• Built a responsive storefront with reusable React components, dynamic product listings, state management, and multi-page routing using ReactJS.

Portfolio Website — HTML · CSS · JavaScript
2023
• Designed a mobile-first personal portfolio with optimized layout, smooth navigation, and full cross-browser compatibility.

EDUCATION
Java Full Stack Development Program — Naresh IT, Hyderabad
2025 – Present
B.Sc. CSIT — Computer Science & IT — Birat Kshitiz College (TU Affiliated), Nepal
2020 – 2024
+2 Science — Kantipur Secondary School, Biratnagar, Nepal
2017 – 2019
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResumeFileProcess = (file: File) => {
    const validExtensions = ['.pdf', '.docx', '.doc', '.txt'];
    const hasValidExt = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

    if (!hasValidExt && !file.type.includes('pdf') && !file.type.includes('document')) {
      setUploadFeedback('Error: Please upload a PDF or Word document (.pdf, .docx).');
      setTimeout(() => setUploadFeedback(null), 4000);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadFeedback('Error: File exceeds 10MB limit.');
      setTimeout(() => setUploadFeedback(null), 4000);
      return;
    }

    const formatSize = (bytes: number) => {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const newResume: UploadedResumeInfo = {
        fileName: file.name,
        fileSize: formatSize(file.size),
        fileType: file.type || 'application/pdf',
        uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        fileDataUrl: dataUrl,
      };

      setUploadedResume(newResume);
      setUploadFeedback(`Successfully uploaded "${file.name}"!`);
      setTimeout(() => setUploadFeedback(null), 4000);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleResumeFileProcess(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action & Control Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-[#0c1626] border border-[#1f2a3c]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <FileText className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Interactive ATS-Formatted Engineering Resume
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            Structured for executive review, automated ATS parsing, and direct recruiter downloads.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          
          {/* Upload Custom Resume Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            id="quick-upload-resume-btn"
            className="px-3 py-1.5 rounded bg-[#111c2d] hover:bg-[#152031] text-emerald-400 border border-emerald-500/30 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
            title="Upload your original PDF resume"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{uploadedResume ? 'Replace PDF Resume' : 'Upload PDF Resume'}</span>
          </button>

          {/* Download Uploaded Resume if exists */}
          {uploadedResume?.fileDataUrl && (
            <a
              href={uploadedResume.fileDataUrl}
              download={uploadedResume.fileName}
              className="px-3.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-medium flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          )}

          {/* Copy plaintext */}
          <button
            onClick={handleCopyText}
            id="copy-resume-text-btn"
            className="px-3 py-1.5 rounded bg-[#111c2d] hover:bg-[#152031] text-slate-200 border border-[#334155] text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Text</span>
              </>
            )}
          </button>

          {/* Print / PDF export */}
          <button
            onClick={handlePrint}
            id="print-resume-btn"
            className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>

          <button
            onClick={onOpenContact}
            className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Contact Kuldip</span>
          </button>
        </div>
      </div>

      {/* Embedded Drag and Drop Upload Zone for Resume */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`p-4 rounded-xl border transition-all ${
          isDragging 
            ? 'border-emerald-500 bg-emerald-500/10' 
            : 'border-[#1f2a3c] bg-[#0c1626]/60 hover:bg-[#0c1626]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf, .docx, .doc, application/pdf"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleResumeFileProcess(e.target.files[0]);
            }
          }}
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {uploadedResume 
                    ? `Attached Resume: ${uploadedResume.fileName} (${uploadedResume.fileSize})` 
                    : 'Upload Original Resume Document (PDF / DOCX)'}
                </span>
                {uploadedResume && (
                  <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Active
                  </span>
                )}
              </div>
              <p className="text-[11px] font-mono text-slate-400">
                Drag & drop your file here, or{' '}
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()} 
                  className="text-emerald-400 hover:underline cursor-pointer"
                >
                  click to browse from computer
                </button>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {uploadedResume && (
              <button
                onClick={removeUploadedResume}
                className="px-2.5 py-1 text-xs font-mono rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all cursor-pointer flex items-center gap-1"
                title="Remove uploaded resume"
              >
                <Trash2 className="w-3 h-3" />
                <span>Remove</span>
              </button>
            )}
            <button
              onClick={() => openUploadModal('photo')}
              className="px-3 py-1 text-xs font-mono rounded bg-[#111c2d] hover:bg-[#152031] text-blue-400 border border-blue-500/30 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Camera className="w-3 h-3" />
              <span>{profilePhoto ? 'Change Photo' : 'Upload Photo'}</span>
            </button>
          </div>
        </div>

        {uploadFeedback && (
          <div className="mt-3 p-2 rounded bg-[#081425] border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{uploadFeedback}</span>
          </div>
        )}
      </div>

      {/* Structured Resume Canvas */}
      <div className="rounded-xl bg-[#0b1320] border border-[#1f2a3c] p-6 sm:p-10 space-y-8 text-slate-200 shadow-2xl">
        
        {/* Header Information with Profile Photo Avatar */}
        <div className="border-b border-[#1f2a3c] pb-6 space-y-3">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
            
            <div className="flex items-center gap-4">
              {/* Profile Avatar Frame with click-to-upload */}
              <div 
                onClick={() => openUploadModal('photo')}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-blue-500/40 bg-[#0c1626] flex items-center justify-center cursor-pointer hover:border-blue-400 transition-all shadow-md group relative shrink-0"
                title="Click to edit profile photo"
              >
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-xl font-bold font-mono text-blue-400">KS</div>
                )}
                <div className="absolute inset-0 bg-blue-600/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase font-heading">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-sm sm:text-base font-semibold text-blue-400 font-mono mt-0.5">
                  {PERSONAL_INFO.role}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Immediate Joiner
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Java • Spring Boot • ReactJS
                  </span>
                </div>
              </div>
            </div>

            {/* Contact details */}
            <div className="text-xs font-mono text-slate-400 space-y-1 text-center sm:text-right">
              <div>{PERSONAL_INFO.phone} | <a href={`mailto:${PERSONAL_INFO.email}`} className="text-blue-400 hover:underline">{PERSONAL_INFO.email}</a></div>
              <div>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">github.com/sahkuldip</a>
                {' | '}
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">linkedin.com/in/Kuldip-sah</a>
              </div>
              <div>{PERSONAL_INFO.location}</div>
            </div>

          </div>
        </div>

        {/* Professional Summary */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase font-mono tracking-widest border-b border-[#1f2a3c] pb-1">
            Professional Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {PERSONAL_INFO.bio}
          </p>
        </div>

        {/* Technical Skills */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase font-mono tracking-widest border-b border-[#1f2a3c] pb-1">
            Technical Skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded bg-[#081425] border border-[#1f2a3c] space-y-1">
              <span className="font-bold text-blue-400">Languages:</span>
              <p className="text-slate-300">Java, Advanced Java, C, JavaScript</p>
            </div>
            <div className="p-3 rounded bg-[#081425] border border-[#1f2a3c] space-y-1">
              <span className="font-bold text-blue-400">Backend Framework:</span>
              <p className="text-slate-300">Spring Boot, REST APIs, JDBC</p>
            </div>
            <div className="p-3 rounded bg-[#081425] border border-[#1f2a3c] space-y-1">
              <span className="font-bold text-blue-400">Frontend:</span>
              <p className="text-slate-300">HTML5, CSS3, JavaScript, ReactJS</p>
            </div>
            <div className="p-3 rounded bg-[#081425] border border-[#1f2a3c] space-y-1">
              <span className="font-bold text-blue-400">Databases:</span>
              <p className="text-slate-300">MySQL, Oracle SQL / PL-SQL, Prisma ORM</p>
            </div>
            <div className="p-3 rounded bg-[#081425] border border-[#1f2a3c] space-y-1 md:col-span-2">
              <span className="font-bold text-blue-400">Tools & CI/CD:</span>
              <p className="text-slate-300">Git, GitHub, IntelliJ IDEA, Eclipse, Figma, GitHub Copilot, CI/CD pipelines, Jenkins, Docker and Kubernetes</p>
            </div>
            <div className="p-3 rounded bg-[#081425] border border-[#1f2a3c] space-y-1">
              <span className="font-bold text-blue-400">Concepts:</span>
              <p className="text-slate-300">REST APIs, JDBC, OOP, DBMS, CRUD, Agile Basics, Networking</p>
            </div>
            <div className="p-3 rounded bg-[#081425] border border-[#1f2a3c] space-y-1">
              <span className="font-bold text-blue-400">Soft Skills:</span>
              <p className="text-slate-300">Problem Solving, Analytical Thinking, Team Collaboration, Communication, Adaptability</p>
            </div>
          </div>
        </div>

        {/* Professional Experience */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase font-mono tracking-widest border-b border-[#1f2a3c] pb-1">
            Professional Experience
          </h2>

          <div className="space-y-4">
            {EXPERIENCE_HISTORY.map((exp) => (
              <div key={exp.id} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <span className="text-sm font-bold text-white">{exp.role}</span>
                    <span className="text-blue-400 text-xs font-mono"> — {exp.company}, {exp.location}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                </div>

                <ul className="space-y-1.5 pt-1">
                  {exp.achievements.map((ach, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-blue-400 font-bold shrink-0 mt-0.5">•</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase font-mono tracking-widest border-b border-[#1f2a3c] pb-1">
            Projects
          </h2>

          <div className="space-y-5">
            {PROJECTS.map((proj) => (
              <div key={proj.id} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <span className="text-sm font-bold text-white">{proj.title}</span>
                    <span className="text-slate-400 text-xs font-mono"> — {proj.technologies.slice(0, 4).join(' · ')}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {proj.id === 'proj-banking-management' ? '2025' : proj.id === 'proj-ecommerce-storefront' ? '2024' : '2023'}
                  </span>
                </div>

                <ul className="space-y-1.5 pt-1">
                  {proj.keyHighlights.map((hl, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase font-mono tracking-widest border-b border-[#1f2a3c] pb-1">
            Education
          </h2>

          <div className="space-y-3">
            {EDUCATION_HISTORY.map((edu) => (
              <div key={edu.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs gap-1">
                <div>
                  <span className="font-bold text-white">{edu.degree}</span>
                  <span className="text-slate-400"> — {edu.institution}</span>
                </div>
                <span className="font-mono text-slate-400 shrink-0">{edu.period}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
