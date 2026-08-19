import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, CornerDownLeft, Maximize2, Minimize2, Trash2 } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, EDUCATION_HISTORY, EXPERIENCE_HISTORY } from '../data/portfolioData';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose, onOpenContact }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'system:init',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-blue-400 font-bold">Kuldip Sah - Java Full Stack Developer CLI v1.0.0 (x86_64)</p>
          <p>Type <span className="text-emerald-400 font-bold">help</span> to view available commands or <span className="text-emerald-400 font-bold">cat resume.json</span> to view ATS resume.</p>
        </div>
      ),
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let output: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-blue-400 font-bold">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div><span className="text-emerald-400 font-bold">help</span> - Show this help menu</div>
              <div><span className="text-emerald-400 font-bold">cat resume.json</span> - View complete ATS resume</div>
              <div><span className="text-emerald-400 font-bold">skills</span> - List technical skill matrix</div>
              <div><span className="text-emerald-400 font-bold">projects</span> - View full-stack projects</div>
              <div><span className="text-emerald-400 font-bold">experience</span> - View internship & work history</div>
              <div><span className="text-emerald-400 font-bold">education</span> - View degree & training details</div>
              <div><span className="text-emerald-400 font-bold">whoami</span> - Display developer persona</div>
              <div><span className="text-emerald-400 font-bold">contact</span> - Contact Kuldip Sah directly</div>
              <div><span className="text-emerald-400 font-bold">clear</span> - Clear terminal output</div>
            </div>
          </div>
        );
        break;

      case 'cat resume.json':
      case 'resume':
        output = (
          <pre className="text-slate-300 text-xs overflow-x-auto">
{JSON.stringify({
  name: PERSONAL_INFO.name,
  role: PERSONAL_INFO.role,
  phone: PERSONAL_INFO.phone,
  email: PERSONAL_INFO.email,
  github: PERSONAL_INFO.github,
  linkedin: PERSONAL_INFO.linkedin,
  location: PERSONAL_INFO.location,
  status: PERSONAL_INFO.status,
  summary: PERSONAL_INFO.bio,
  skills: {
    languages: ['Java', 'Advanced Java', 'C', 'JavaScript'],
    backend: ['Spring Boot', 'REST APIs', 'JDBC', 'Node.js', 'Nest-JS'],
    frontend: ['ReactJS', 'HTML5', 'CSS3', 'JavaScript'],
    databases: ['MySQL', 'Oracle SQL / PL-SQL', 'Prisma ORM'],
    tools: ['Git', 'GitHub', 'IntelliJ IDEA', 'Eclipse', 'Postman', 'Docker', 'Kubernetes']
  },
  experience: EXPERIENCE_HISTORY.map(e => ({ role: e.role, company: e.company, period: e.period })),
  education: EDUCATION_HISTORY.map(ed => ({ degree: ed.degree, institution: ed.institution, period: ed.period }))
}, null, 2)}
          </pre>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-2 text-xs">
            {SKILL_CATEGORIES.map((cat, i) => (
              <div key={i} className="text-slate-300">
                <span className="text-blue-400 font-bold">{cat.category}: </span>
                <span>{cat.skills.map(s => s.name).join(', ')}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-1.5 text-xs">
            <p className="text-blue-400 font-bold">Full Stack Projects:</p>
            {PROJECTS.map((p, i) => (
              <div key={i} className="text-slate-300">
                <span className="text-emerald-400">[{p.technologies.slice(0, 3).join(', ')}]</span> <span className="font-bold">{p.title}</span> - {p.subtitle}
              </div>
            ))}
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="space-y-2 text-xs">
            {EXPERIENCE_HISTORY.map((exp, i) => (
              <div key={i} className="text-slate-300 space-y-1">
                <p className="text-blue-400 font-bold">{exp.role} @ {exp.company} ({exp.period})</p>
                <p className="text-slate-400">{exp.summary}</p>
                <p className="text-emerald-400">Tech: {exp.technologies.join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'education':
        output = (
          <div className="space-y-1.5 text-xs">
            <p className="text-blue-400 font-bold">Education & Training:</p>
            {EDUCATION_HISTORY.map((ed, i) => (
              <div key={i} className="text-slate-300">
                <span className="text-emerald-400 font-semibold">{ed.period}</span>: <span className="font-bold text-white">{ed.degree}</span> - {ed.institution}
              </div>
            ))}
          </div>
        );
        break;

      case 'whoami':
        output = (
          <p className="text-xs text-slate-300">
            <span className="text-blue-400 font-bold">kuldip-sah</span> ({PERSONAL_INFO.role} - Hyderabad, Telangana, India | Nepal)
          </p>
        );
        break;

      case 'contact':
      case 'hire':
        output = (
          <div className="text-xs text-slate-300">
            <p className="text-emerald-400 font-bold">Opening Contact & Scheduler...</p>
            <p>You can reach Kuldip Sah directly at <span className="text-blue-400">{PERSONAL_INFO.email}</span> or <span className="text-emerald-400">{PERSONAL_INFO.phone}</span></p>
          </div>
        );
        setTimeout(() => {
          onClose();
          onOpenContact();
        }, 800);
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        output = (
          <p className="text-xs text-rose-400">
            Command not recognized: "{cmd}". Type <span className="text-emerald-400 font-bold">help</span> for a list of valid commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        command: cmd,
        output,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className={`w-full bg-[#081425] border border-[#334155] rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all ${
          isFullscreen ? 'h-[95vh] max-w-6xl' : 'h-[550px] max-w-3xl'
        }`}
      >
        
        {/* Terminal Header */}
        <div className="bg-[#0c1626] px-4 py-2.5 border-b border-[#1f2a3c] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            <div className="flex items-center gap-1.5 ml-2 text-xs font-mono text-slate-300">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>kuldipsah@dev-machine:~</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setHistory([])}
              className="p-1 rounded text-slate-400 hover:text-white cursor-pointer"
              title="Clear history"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1 rounded text-slate-400 hover:text-white cursor-pointer"
              title="Toggle fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white cursor-pointer"
              title="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Content Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs text-slate-200">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-emerald-400">&gt;_</span>
                <span className="text-blue-300 font-semibold">{item.command}</span>
                <span className="text-[10px] text-slate-600 ml-auto">{item.timestamp}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Interactive Input Line */}
        <form onSubmit={handleSubmit} className="p-3 bg-[#0c1626] border-t border-[#1f2a3c] flex items-center gap-2 font-mono text-xs">
          <span className="text-emerald-400 font-bold shrink-0">&gt;_</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help', 'resume', 'skills', 'projects', or 'education'..."
            className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none"
          />
          <button type="submit" className="text-slate-400 hover:text-white shrink-0 p-1 cursor-pointer">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
