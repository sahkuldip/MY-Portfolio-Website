import React, { useState, useRef } from 'react';
import { useMedia, UploadedResumeInfo } from '../context/MediaContext';
import { 
  X, 
  Upload, 
  User, 
  FileText, 
  Check, 
  Trash2, 
  Download, 
  Eye, 
  Image as ImageIcon, 
  FileCheck, 
  AlertCircle, 
  Sparkles,
  Camera,
  RefreshCw
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const UploadModal: React.FC = () => {
  const {
    isUploadModalOpen,
    closeUploadModal,
    activeUploadTab,
    setActiveUploadTab,
    profilePhoto,
    setProfilePhoto,
    removeProfilePhoto,
    uploadedResume,
    setUploadedResume,
    removeUploadedResume,
  } = useMedia();

  // Drag states
  const [isPhotoDragging, setIsPhotoDragging] = useState(false);
  const [isResumeDragging, setIsResumeDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  if (!isUploadModalOpen) return null;

  // Handle Photo File
  const handlePhotoProcess = (file: File) => {
    setErrorMsg(null);
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (PNG, JPG, JPEG, WEBP, or SVG).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Image size exceeds 5MB limit. Please choose a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setProfilePhoto(result);
      setSuccessMsg('Profile photo updated successfully!');
      setTimeout(() => setSuccessMsg(null), 3000);
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read the image file.');
    };
    reader.readAsDataURL(file);
  };

  // Handle Resume File
  const handleResumeProcess = (file: File) => {
    setErrorMsg(null);
    const validExtensions = ['.pdf', '.docx', '.doc', '.txt'];
    const hasValidExt = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

    if (!hasValidExt && !file.type.includes('pdf') && !file.type.includes('document')) {
      setErrorMsg('Please upload a valid document file (.PDF, .DOCX, .DOC, or .TXT).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Resume file size exceeds 10MB limit.');
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
      setSuccessMsg(`Resume "${file.name}" uploaded successfully!`);
      setTimeout(() => setSuccessMsg(null), 3000);
    };
    reader.onerror = () => {
      setErrorMsg('Failed to process the resume file.');
    };
    reader.readAsDataURL(file);
  };

  // Drag and Drop Handlers for Photo
  const handlePhotoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsPhotoDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePhotoProcess(e.dataTransfer.files[0]);
    }
  };

  // Drag and Drop Handlers for Resume
  const handleResumeDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsResumeDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleResumeProcess(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#0c1626] border border-[#334155] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-[#081425] px-6 py-4 border-b border-[#1f2a3c] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Profile Photo & Resume Manager
              </h2>
              <p className="text-xs text-slate-400">
                Upload your custom photo and official resume to personalize the portfolio.
              </p>
            </div>
          </div>

          <button
            onClick={closeUploadModal}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-[#111c2d] transition-all cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-[#0a111e] px-6 pt-3 border-b border-[#1f2a3c] flex gap-2">
          <button
            onClick={() => { setActiveUploadTab('photo'); setErrorMsg(null); }}
            className={`px-4 py-2 text-xs font-mono font-medium rounded-t flex items-center gap-2 border-t-2 transition-all cursor-pointer ${
              activeUploadTab === 'photo'
                ? 'bg-[#0c1626] text-blue-400 border-t-blue-500 border-x border-[#334155]'
                : 'text-slate-400 hover:text-slate-200 border-t-transparent'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Profile Photo</span>
            {profilePhoto && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
          </button>

          <button
            onClick={() => { setActiveUploadTab('resume'); setErrorMsg(null); }}
            className={`px-4 py-2 text-xs font-mono font-medium rounded-t flex items-center gap-2 border-t-2 transition-all cursor-pointer ${
              activeUploadTab === 'resume'
                ? 'bg-[#0c1626] text-blue-400 border-t-blue-500 border-x border-[#334155]'
                : 'text-slate-400 hover:text-slate-200 border-t-transparent'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume Document (PDF/DOCX)</span>
            {uploadedResume && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
          </button>
        </div>

        {/* Feedback Banners */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mx-6 mt-4 p-3 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          
          {/* TAB 1: PROFILE PHOTO UPLOAD */}
          {activeUploadTab === 'photo' && (
            <div className="space-y-6">
              
              {/* Current Preview & Status */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-[#081425] border border-[#1f2a3c]">
                
                {/* Avatar Display */}
                <div className="relative group">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-blue-500/40 bg-[#111c2d] flex items-center justify-center shadow-lg shadow-blue-500/10">
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt="Kuldip Sah Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono tracking-tight">
                        KS
                      </div>
                    )}
                  </div>
                  
                  {profilePhoto && (
                    <button
                      onClick={removeProfilePhoto}
                      className="absolute -top-1 -right-1 p-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white shadow transition-all cursor-pointer"
                      title="Remove custom photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Status and info */}
                <div className="space-y-1 text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h3 className="text-base font-bold text-white">{PERSONAL_INFO.name}</h3>
                    {profilePhoto ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Custom Photo Active
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-500/10 text-slate-400 border border-slate-500/20">
                        Default Initials Avatar
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    {profilePhoto 
                      ? 'Your custom photo is displayed across the Hero section, Navbar, and Resume view.' 
                      : 'Upload a headshot or professional photo to display in the header and resume.'}
                  </p>
                  <p className="text-[11px] font-mono text-slate-400">
                    Supported: JPG, PNG, WEBP, SVG • Max: 5MB
                  </p>
                </div>
              </div>

              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsPhotoDragging(true); }}
                onDragLeave={() => setIsPhotoDragging(false)}
                onDrop={handlePhotoDrop}
                onClick={() => photoInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
                  isPhotoDragging
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-[#334155] hover:border-blue-400 bg-[#081425]/50 hover:bg-[#081425]'
                }`}
              >
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handlePhotoProcess(e.target.files[0]);
                    }
                  }}
                />

                <div className="p-3 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Camera className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    <span className="text-blue-400 underline underline-offset-2">Click to select photo</span> or drag & drop here
                  </p>
                  <p className="text-[11px] font-mono text-slate-400">
                    Recommended resolution: Square 400×400px or larger
                  </p>
                </div>

                <button
                  type="button"
                  className="mt-2 px-4 py-1.5 rounded bg-[#111c2d] hover:bg-[#152031] text-xs font-mono text-slate-200 border border-[#334155] transition-all cursor-pointer"
                >
                  Browse Files
                </button>
              </div>

              {/* Quick Sample Presets */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 block font-semibold">
                  Or select a sample developer avatar preset:
                </span>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'Tech Specialist (Navy)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80' },
                    { label: 'Software Engineer (Studio)', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80' },
                    { label: 'Full Stack Dev (Modern)', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80' }
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setProfilePhoto(preset.url);
                        setSuccessMsg(`Applied avatar: ${preset.label}`);
                        setTimeout(() => setSuccessMsg(null), 3000);
                      }}
                      className="flex items-center gap-2 p-1.5 pr-3 rounded bg-[#081425] hover:bg-[#111c2d] border border-[#1f2a3c] hover:border-blue-500 text-xs font-mono text-slate-300 transition-all cursor-pointer"
                    >
                      <img src={preset.url} alt={preset.label} className="w-6 h-6 rounded-full object-cover" />
                      <span>{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: RESUME UPLOAD */}
          {activeUploadTab === 'resume' && (
            <div className="space-y-6">
              
              {/* Current Resume Status Card */}
              <div className="p-4 rounded-xl bg-[#081425] border border-[#1f2a3c] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {uploadedResume ? uploadedResume.fileName : 'Kuldip_Sah_Resume.pdf (ATS Dynamic Resume)'}
                      </h3>
                      <p className="text-xs font-mono text-slate-400">
                        {uploadedResume 
                          ? `Custom Uploaded File • ${uploadedResume.fileSize} • Uploaded on ${uploadedResume.uploadDate}` 
                          : 'Built-in interactive ATS resume configured with full resume content'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {uploadedResume?.fileDataUrl && (
                      <a
                        href={uploadedResume.fileDataUrl}
                        download={uploadedResume.fileName}
                        className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </a>
                    )}
                    {uploadedResume && (
                      <button
                        onClick={removeUploadedResume}
                        className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-mono transition-all cursor-pointer"
                        title="Remove custom resume"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {uploadedResume && (
                  <div className="pt-2 border-t border-[#1f2a3c] flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Active in Resume Tab & Hero Download
                    </span>
                    <span>Ready for Recruiter Export</span>
                  </div>
                )}
              </div>

              {/* Drag and Drop Zone for Resume */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsResumeDragging(true); }}
                onDragLeave={() => setIsResumeDragging(false)}
                onDrop={handleResumeDrop}
                onClick={() => resumeInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
                  isResumeDragging
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-[#334155] hover:border-emerald-400 bg-[#081425]/50 hover:bg-[#081425]'
                }`}
              >
                <input
                  ref={resumeInputRef}
                  type="file"
                  accept=".pdf, .docx, .doc, .txt, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleResumeProcess(e.target.files[0]);
                    }
                  }}
                />

                <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <FileText className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    <span className="text-emerald-400 underline underline-offset-2">Click to upload your PDF resume</span> or drag & drop file here
                  </p>
                  <p className="text-[11px] font-mono text-slate-400">
                    Supported formats: PDF, DOCX, DOC • Max file size: 10MB
                  </p>
                </div>

                <button
                  type="button"
                  className="mt-2 px-4 py-1.5 rounded bg-[#111c2d] hover:bg-[#152031] text-xs font-mono text-slate-200 border border-[#334155] transition-all cursor-pointer"
                >
                  Select Resume Document
                </button>
              </div>

              {/* Information Note */}
              <div className="p-3 rounded-lg bg-[#081425] border border-[#1f2a3c] text-xs text-slate-400 space-y-1">
                <p className="text-slate-300 font-semibold font-mono">💡 How it works:</p>
                <p>
                  When you upload your custom PDF resume, recruiters will be able to download your exact official PDF directly from the Hero section and Resume screen. You can replace or remove it at any time.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-[#081425] px-6 py-3.5 border-t border-[#1f2a3c] flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-400">
            Changes are saved locally in your browser
          </span>
          <button
            onClick={closeUploadModal}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold font-mono transition-all cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
