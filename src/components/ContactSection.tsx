import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Send, Calendar, Clock, CheckCircle2, Mail, Phone, MapPin, Linkedin, Github, Shield, Sparkles, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    roleType: 'Full-Time Java Full Stack Role',
    timeline: 'Immediate / Ready to Join',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string>('Tomorrow • 10:00 AM IST');

  const consultationSlots = [
    'Tomorrow • 10:00 AM IST',
    'Tomorrow • 2:30 PM IST',
    'Thursday • 11:00 AM IST',
    'Friday • 4:00 PM IST',
    'Next Monday • 10:30 AM IST'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section className="space-y-6">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Send className="w-4 h-4" />
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Contact & Interview Engagement
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Currently open to full-time Java Full Stack Developer, Spring Boot, and React opportunities. Let's connect!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Direct Info & Meeting Scheduler */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Status Card */}
          <div className="rounded-xl bg-[#0c1626] border border-[#1f2a3c] p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
              <div>
                <h3 className="text-sm font-bold text-white font-mono">Status: Ready to Join</h3>
                <p className="text-xs text-slate-400">Response time: &lt; 2 hours</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs font-mono text-slate-300 pt-2 border-t border-[#1f2a3c]">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white hover:text-blue-400 font-medium">{PERSONAL_INFO.email}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`} className="text-white hover:text-emerald-400 font-medium">{PERSONAL_INFO.phone}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Immediate Availability for In-Office / Hybrid / Remote</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex gap-2 pt-2">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 rounded bg-blue-600/20 hover:bg-blue-600/30 text-xs font-mono text-blue-400 border border-blue-500/30 text-center flex items-center justify-center gap-1.5"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 rounded bg-[#111c2d] hover:bg-[#152031] text-xs font-mono text-slate-300 hover:text-white border border-[#334155] text-center flex items-center justify-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Quick Technical Discussion Slot Picker */}
          <div className="rounded-xl bg-[#0c1626] border border-[#1f2a3c] p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase font-mono tracking-wider">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>Direct Discussion Slot</span>
            </div>
            <p className="text-xs text-slate-400">
              Select a preferred technical interview or introduction slot:
            </p>

            <div className="space-y-2">
              {consultationSlots.map((slot, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`w-full p-2.5 rounded text-xs font-mono text-left flex items-center justify-between transition-all cursor-pointer ${
                    selectedSlot === slot
                      ? 'bg-blue-600/20 border border-blue-500/50 text-blue-300'
                      : 'bg-[#081425] hover:bg-[#111c2d] text-slate-300 border border-[#1f2a3c]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>{slot}</span>
                  </div>
                  {selectedSlot === slot && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Message Form */}
        <div className="lg:col-span-7">
          <div className="rounded-xl bg-[#0c1626] border border-[#1f2a3c] p-6 sm:p-8">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>! Your message regarding <strong className="text-blue-400">{formData.roleType}</strong> has been received. Kuldip Sah will follow up promptly at <strong className="text-white">{formData.email}</strong>.
                </p>
                <div className="p-3 rounded bg-[#081425] border border-[#1f2a3c] max-w-sm mx-auto text-xs font-mono text-slate-400">
                  Preferred Slot: <span className="text-emerald-400">{selectedSlot}</span>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded bg-[#111c2d] hover:bg-[#152031] text-xs font-mono text-slate-300 border border-[#334155] cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Your Name / Recruiter Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma / Technical Recruiter"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs font-mono rounded bg-[#081425] border border-[#1f2a3c] text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="recruiter@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs font-mono rounded bg-[#081425] border border-[#1f2a3c] text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. TCS, Infosys, Wipro, Product Startup"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3 py-2 text-xs font-mono rounded bg-[#081425] border border-[#1f2a3c] text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Opportunity Type
                    </label>
                    <select
                      value={formData.roleType}
                      onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                      className="w-full px-3 py-2 text-xs font-mono rounded bg-[#081425] border border-[#1f2a3c] text-white focus:outline-none focus:border-blue-500"
                    >
                      <option>Full-Time Java Full Stack Role</option>
                      <option>Spring Boot & Backend Developer</option>
                      <option>ReactJS & Frontend Developer</option>
                      <option>Technical Interview Invitation</option>
                      <option>Other Collaboration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Message / Job Description Overview
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share role details, location (Hyderabad / Remote / Pan-India), technology stack, or interview schedule..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono rounded bg-[#081425] border border-[#1f2a3c] text-white focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    id="submit-contact-form-btn"
                    className="w-full py-3 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold font-mono tracking-wider uppercase transition-all shadow-lg shadow-blue-600/20 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message & Book {selectedSlot.split(' • ')[0]}</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>

    </section>
  );
};
