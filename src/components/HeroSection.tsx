import React, { useState } from 'react';
import { 
  Shield, 
  Sparkles, 
  Terminal, 
  ArrowUpRight, 
  Copy, 
  Check, 
  Server, 
  Layers, 
  Cpu, 
  Database, 
  Activity, 
  Code2, 
  MapPin, 
  Mail, 
  Phone, 
  Camera, 
  Upload, 
  FileText, 
  Download,
  CheckCircle2
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useMedia } from '../context/MediaContext';

interface HeroSectionProps {
  onExploreArchitecture: () => void;
  onViewProjects: () => void;
  onOpenContact: () => void;
  onOpenTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreArchitecture,
  onViewProjects,
  onOpenContact,
  onOpenTerminal,
}) => {
  const [activeCodeTab, setActiveCodeTab] = useState<'spring' | 'service' | 'react' | 'sql'>('spring');
  const [copied, setCopied] = useState(false);
  const { profilePhoto, openUploadModal, uploadedResume } = useMedia();

  const codeSnippets = {
    spring: `// Spring Boot 3 - RESTful Banking Account Controller
package com.kuldip.banking.controller;

import com.kuldip.banking.dto.TransferRequest;
import com.kuldip.banking.entity.Transaction;
import com.kuldip.banking.service.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/accounts")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/transfer")
    public ResponseEntity<Transaction> transferFunds(
            @Valid @RequestBody TransferRequest request) {
        
        // Execute transactional transfer with balance verification
        Transaction tx = accountService.transferFunds(
            request.getFromAccountId(),
            request.getToAccountId(),
            request.getAmount()
        );
        
        return ResponseEntity.ok(tx);
    }
}`,
    service: `// Java & Spring Data JPA - Transactional Business Layer
package com.kuldip.banking.service.impl;

import com.kuldip.banking.entity.Account;
import com.kuldip.banking.entity.Transaction;
import com.kuldip.banking.repository.AccountRepository;
import com.kuldip.banking.repository.TransactionRepository;
import com.kuldip.banking.exception.InsufficientBalanceException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;

@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepo;
    private final TransactionRepository txRepo;

    public AccountServiceImpl(AccountRepository accountRepo, TransactionRepository txRepo) {
        this.accountRepo = accountRepo;
        this.txRepo = txRepo;
    }

    @Override
    @Transactional
    public Transaction transferFunds(Long fromId, Long toId, BigDecimal amount) {
        Account fromAccount = accountRepo.findById(fromId)
            .orElseThrow(() -> new ResourceNotFoundException("Sender account not found"));
        Account toAccount = accountRepo.findById(toId)
            .orElseThrow(() -> new ResourceNotFoundException("Receiver account not found"));

        if (fromAccount.getBalance().compareTo(amount) < 0) {
            throw new InsufficientBalanceException("Insufficient balance for transfer");
        }

        // Debit sender & Credit receiver
        fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
        toAccount.setBalance(toAccount.getBalance().add(amount));

        accountRepo.save(fromAccount);
        accountRepo.save(toAccount);

        Transaction record = new Transaction(fromId, toId, amount, "SUCCESS");
        return txRepo.save(record);
    }
}`,
    react: `// ReactJS - Dynamic Banking Account Dashboard Component
import React, { useState, useEffect } from 'react';

export function AccountDashboard({ accountId }) {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAccount() {
      try {
        const res = await fetch(\`/api/v1/accounts/\${accountId}\`);
        const data = await res.json();
        setAccount(data);
      } catch (err) {
        console.error("Failed to load account ledger", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAccount();
  }, [accountId]);

  if (loading) return <div className="spinner">Loading Banking Ledger...</div>;

  return (
    <div className="account-card">
      <h3>Account #{account.accountNumber}</h3>
      <div className="balance">$ {account.balance.toLocaleString()}</div>
      <span className="status-badge active">{account.status}</span>
    </div>
  );
}`,
    sql: `-- MySQL Relational Schema with Foreign Key Constraints
CREATE TABLE customers (
    customer_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE accounts (
    account_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE transactions (
    transaction_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    from_account_id BIGINT NOT NULL,
    to_account_id BIGINT NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeCodeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#1f2a3c] bg-radial-gradient">
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badges & Contact Info */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#111c2d] border border-[#334155] text-xs font-mono text-blue-400">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
            <span>Java • Spring Boot • ReactJS • MySQL • REST APIs</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{PERSONAL_INFO.status}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#0f172a] border border-[#1f2a3c] text-xs font-mono text-slate-400">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>{PERSONAL_INFO.location}</span>
          </div>

          {/* Quick upload trigger badge */}
          <button
            onClick={() => openUploadModal('photo')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-xs font-mono text-blue-300 transition-all cursor-pointer"
          >
            <Camera className="w-3 h-3 text-blue-400" />
            <span>{profilePhoto ? 'Edit Photo' : 'Upload Photo'}</span>
          </button>

          <button
            onClick={() => openUploadModal('resume')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 text-xs font-mono text-emerald-300 transition-all cursor-pointer"
          >
            <Upload className="w-3 h-3 text-emerald-400" />
            <span>{uploadedResume ? 'Resume Attached' : 'Upload Resume PDF'}</span>
          </button>
        </div>

        {/* Main Grid: Headline & Technical Abstract on Left, Live Interactive IDE on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6">
            
            {/* Identity & Profile Photo Block */}
            <div className="flex items-start gap-4 sm:gap-6">
              
              {/* Photo Avatar Card with Upload Trigger */}
              <div className="relative group shrink-0">
                <div 
                  onClick={() => openUploadModal('photo')}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-blue-500/40 group-hover:border-blue-400 bg-[#0c1626] shadow-xl shadow-blue-500/10 flex items-center justify-center cursor-pointer transition-all relative"
                  title="Click to upload/update photo"
                >
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt={PERSONAL_INFO.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-xl sm:text-2xl font-extrabold text-blue-400 font-mono">
                      KS
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-600/75 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono gap-1">
                    <Camera className="w-4 h-4" />
                    <span>Upload</span>
                  </div>
                </div>

                <button
                  onClick={() => openUploadModal('photo')}
                  className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-md cursor-pointer"
                  title="Upload profile photo"
                >
                  <Camera className="w-3 h-3" />
                </button>
              </div>

              {/* Name & Titles */}
              <div className="space-y-1.5 flex-1">
                <span className="text-xs sm:text-sm font-mono text-blue-400 font-semibold tracking-wider uppercase">
                  Hello, I'm {PERSONAL_INFO.name}
                </span>
                <h1 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-[1.15]">
                  Full Stack Web Engineering with{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400">
                    Java, Spring Boot
                  </span>{' '}
                  & ReactJS.
                </h1>
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              {PERSONAL_INFO.bio}
            </p>

            {/* Quick Contact Chips */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-1.5 hover:text-blue-400 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <a href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1.5 hover:text-blue-400 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onViewProjects}
                id="hero-cta-projects"
                className="px-5 py-3 rounded bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-lg shadow-blue-600/25 active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>View Full Stack Projects</span>
              </button>

              {/* Upload or Download Resume Action Button */}
              {uploadedResume?.fileDataUrl ? (
                <a
                  href={uploadedResume.fileDataUrl}
                  download={uploadedResume.fileName}
                  className="px-4 py-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all shadow-lg shadow-emerald-600/25 cursor-pointer flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Uploaded PDF</span>
                </a>
              ) : (
                <button
                  onClick={() => openUploadModal('resume')}
                  className="px-4 py-3 rounded bg-[#111c2d] hover:bg-[#152031] text-emerald-400 border border-emerald-500/40 text-sm font-medium transition-all cursor-pointer flex items-center gap-2"
                >
                  <Upload className="w-4 h-4 text-emerald-400" />
                  <span>Upload Resume PDF</span>
                </button>
              )}

              <button
                onClick={onExploreArchitecture}
                id="hero-cta-sim"
                className="px-4 py-3 rounded bg-[#111c2d] hover:bg-[#152031] text-slate-200 hover:text-white border border-[#334155] text-sm font-medium transition-all cursor-pointer flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-blue-400" />
                <span>Architecture Lab</span>
              </button>

              <button
                onClick={onOpenTerminal}
                id="hero-cta-terminal"
                className="px-3.5 py-3 rounded bg-[#0f172a] hover:bg-[#152031] text-slate-300 border border-[#334155] text-sm font-mono transition-all cursor-pointer flex items-center gap-2"
                title="Launch CLI terminal"
              >
                <Terminal className="w-4 h-4 text-slate-400" />
                <span>&gt;_ CLI</span>
              </button>
            </div>

            {/* Core Competencies Pill Strip */}
            <div className="pt-4 border-t border-[#1f2a3c]/80 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded bg-[#0f172a] border border-[#1f2a3c]">⚡ Spring Boot REST APIs</span>
              <span className="px-2.5 py-1 rounded bg-[#0f172a] border border-[#1f2a3c]">🛡️ OOP & Collections</span>
              <span className="px-2.5 py-1 rounded bg-[#0f172a] border border-[#1f2a3c]">📦 MySQL & JDBC</span>
              <span className="px-2.5 py-1 rounded bg-[#0f172a] border border-[#1f2a3c]">⚛️ ReactJS & Hooks</span>
              <span className="px-2.5 py-1 rounded bg-[#0f172a] border border-[#1f2a3c]">🧪 Postman API Testing</span>
            </div>

          </div>

          {/* Right Column: Interactive Code Console */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="rounded-lg bg-[#0c1626] border border-[#334155] shadow-2xl overflow-hidden">
              
              {/* IDE Top Bar */}
              <div className="bg-[#081425] px-4 py-2.5 border-b border-[#1f2a3c] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    {activeCodeTab === 'spring' ? 'AccountController.java' : activeCodeTab === 'service' ? 'AccountServiceImpl.java' : activeCodeTab === 'react' ? 'AccountDashboard.jsx' : 'schema.sql'}
                  </span>
                </div>
                
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#111c2d] hover:bg-[#152031] text-[11px] font-mono text-slate-300 border border-[#334155] transition-all cursor-pointer"
                  title="Copy code"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Snippet Tabs */}
              <div className="bg-[#0b1320] px-3 pt-2 border-b border-[#1f2a3c] flex gap-1 overflow-x-auto text-xs font-mono scrollbar-none">
                <button
                  onClick={() => setActiveCodeTab('spring')}
                  className={`px-3 py-1.5 rounded-t transition-colors cursor-pointer ${
                    activeCodeTab === 'spring'
                      ? 'bg-[#0c1626] text-blue-400 border-t-2 border-t-blue-500 border-x border-[#334155]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Spring REST
                </button>
                <button
                  onClick={() => setActiveCodeTab('service')}
                  className={`px-3 py-1.5 rounded-t transition-colors cursor-pointer ${
                    activeCodeTab === 'service'
                      ? 'bg-[#0c1626] text-blue-400 border-t-2 border-t-blue-500 border-x border-[#334155]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Service Layer
                </button>
                <button
                  onClick={() => setActiveCodeTab('react')}
                  className={`px-3 py-1.5 rounded-t transition-colors cursor-pointer ${
                    activeCodeTab === 'react'
                      ? 'bg-[#0c1626] text-blue-400 border-t-2 border-t-blue-500 border-x border-[#334155]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  ReactJS UI
                </button>
                <button
                  onClick={() => setActiveCodeTab('sql')}
                  className={`px-3 py-1.5 rounded-t transition-colors cursor-pointer ${
                    activeCodeTab === 'sql'
                      ? 'bg-[#0c1626] text-blue-400 border-t-2 border-t-blue-500 border-x border-[#334155]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  MySQL Schema
                </button>
              </div>

              {/* Code Display Area */}
              <div className="p-4 overflow-x-auto max-h-[340px] text-[12px] font-mono leading-relaxed bg-[#0a111e]">
                <pre className="text-slate-300">
                  <code>{codeSnippets[activeCodeTab]}</code>
                </pre>
              </div>

              {/* Code Console Footer Status */}
              <div className="bg-[#081425] px-4 py-2 border-t border-[#1f2a3c] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>IntelliJ IDEA • Maven 3.9 / OpenJDK 17/21</span>
                </div>
                <span>UTF-8 • UNIX</span>
              </div>

            </div>
          </div>

        </div>

        {/* Live Metrics & Engineering KPI Strip */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-md bg-[#111c2d] border border-[#1f2a3c] hover:border-[#334155] transition-all">
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono text-blue-400">
              Java & Spring Boot
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">
              Backend Architecture
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              Layered REST APIs & JPA
            </div>
          </div>

          <div className="p-4 rounded-md bg-[#111c2d] border border-[#1f2a3c] hover:border-[#334155] transition-all">
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono text-emerald-400">
              ReactJS + CSS3
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">
              Dynamic Frontend
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              SPA, Hooks & Components
            </div>
          </div>

          <div className="p-4 rounded-md bg-[#111c2d] border border-[#1f2a3c] hover:border-[#334155] transition-all">
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono text-indigo-400">
              MySQL & Oracle
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">
              Relational Databases
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              ACID, Joins, JDBC & CRUD
            </div>
          </div>

          <div className="p-4 rounded-md bg-[#111c2d] border border-[#1f2a3c] hover:border-[#334155] transition-all">
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono text-amber-400">
              B.Sc. CSIT + Naresh IT
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">
              Education & Certification
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              Full Stack Immersion
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
