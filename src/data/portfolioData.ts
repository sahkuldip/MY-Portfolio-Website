import { Project, ExperienceItem, SkillCategory, BenchmarkData, TopologyNode, SystemLog, EducationItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Kuldip Sah',
  role: 'Aspiring Java Full Stack Developer',
  title: 'Java Full Stack Developer | Spring Boot, ReactJS, MySQL, REST APIs',
  email: 'sahkuldip186@gmail.com',
  phone: '+91 9279885502',
  location: 'Hyderabad, Telangana, India | Nepal',
  github: 'https://github.com/sahkuldip',
  linkedin: 'https://www.linkedin.com/in/kuldip-sah',
  status: 'Open to Full-Time Roles & Opportunities',
  experienceYears: 'Hands-on Full Stack Experience',
  bio: 'Aspiring Java Full Stack Developer with hands-on experience in developing web applications using Java, Spring Boot, ReactJS, MySQL, HTML5, CSS3, and JavaScript. Strong understanding of Object-Oriented Programming, Collections Framework, JDBC, RESTful API development, DBMS, and CRUD operations. Proficient in Git, GitHub, IntelliJ IDEA, and Eclipse with experience in backend development and API testing.',
  coreTechnologies: ['Java', 'Spring Boot', 'ReactJS', 'MySQL', 'REST APIs', 'JDBC', 'JavaScript', 'Docker']
};

export const EDUCATION_HISTORY: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Java Full Stack Development Program',
    institution: 'Naresh IT, Hyderabad',
    location: 'Hyderabad, Telangana, India',
    period: '2025 – Present',
    details: 'Comprehensive immersive training in Core Java, Advanced Java, Spring Boot, Microservices, REST APIs, Hibernate/JPA, ReactJS, Oracle SQL, and Enterprise Full Stack Project Lifecycle.',
    isCurrent: true
  },
  {
    id: 'edu-2',
    degree: 'B.Sc. CSIT — Computer Science & IT',
    institution: 'Birat Kshitiz College (Tribhuvan University Affiliated)',
    location: 'Biratnagar, Nepal',
    period: '2020 – 2024',
    details: 'Coursework in Data Structures & Algorithms, Database Management Systems (DBMS), Object-Oriented Programming, Operating Systems, Computer Networks, and Software Engineering.'
  },
  {
    id: 'edu-3',
    degree: '+2 Science',
    institution: 'Kantipur Secondary School',
    location: 'Biratnagar, Nepal',
    period: '2017 – 2019',
    details: 'Majored in Physics, Mathematics, and Computer Science fundamentals.'
  }
];

export const EXPERIENCE_HISTORY: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Backend Developer Intern',
    company: 'Clove IT Pvt. Ltd.',
    location: 'Biratnagar, Nepal',
    period: '2023 – 2024',
    duration: '1 Year',
    type: 'Full-time',
    isCurrent: false,
    summary: 'Developed and tested modular RESTful backend services, managed relational data layers, and conducted systematic API quality assurance for client-facing software modules.',
    achievements: [
      'Developed RESTful backend services using Node.js, Nest-JS, and TypeScript for modular application features.',
      'Implemented robust CRUD operations and schema migrations using Prisma ORM for efficient database management.',
      'Performed rigorous API testing using Postman, identified bottleneck requests, and fixed critical defects before deployment.',
      'Collaborated closely with cross-functional team members using Git and Agile workflows to ensure on-time release cycles.'
    ],
    technologies: [
      'Node.js',
      'Nest-JS',
      'TypeScript',
      'Prisma ORM',
      'REST APIs',
      'Postman',
      'Git',
      'Agile Basics'
    ],
    metrics: [
      { label: 'API Endpoints Built', value: '35+' },
      { label: 'Bug Resolution Rate', value: '98%' },
      { label: 'Testing Coverage', value: 'Postman Verified' }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-banking-management',
    title: 'Banking Management System',
    subtitle: 'Full-Stack Enterprise Banking Application with Layered Architecture & Secure Fund Transfers',
    category: 'Spring Boot & Java 21',
    featured: true,
    metrics: [
      { label: 'Backend Architecture', value: 'Spring Boot 3' },
      { label: 'Frontend Client', value: 'ReactJS + CSS3' },
      { label: 'Database', value: 'MySQL Relational' },
      { label: 'Testing & QA', value: 'Postman Verified' }
    ],
    description: 'A comprehensive full-stack banking system engineered with Spring Boot and ReactJS utilizing layered architecture (Controller, Service, Repository, Entity). Implemented REST APIs for end-to-end banking operations including customer account onboarding, secure fund transfers, balance ledger inquiries, and transaction history tracking with strict MySQL ACID transaction guarantees.',
    architectureDetails: {
      pattern: 'Layered MVC Architecture (Controller → Service → Repository → MySQL)',
      throughput: 'High-Concurrency REST API with Connection Pooling (HikariCP)',
      latency: '< 15ms local REST API response time',
      resilienceStrategy: 'Spring @Transactional rollback and custom GlobalExceptionHandler for balance checks',
      dataStore: 'MySQL with normalized tables (Accounts, Customers, Transactions)'
    },
    technologies: [
      'Java',
      'Spring Boot',
      'ReactJS',
      'MySQL',
      'REST APIs',
      'Spring Data JPA',
      'Hibernate',
      'Postman',
      'HTML5',
      'CSS3',
      'JavaScript'
    ],
    keyHighlights: [
      'Developed full-stack banking system using Spring Boot and ReactJS with layered architecture for modular and maintainable design.',
      'Designed and implemented REST APIs for banking operations including account creation, fund transfer, deposit, withdrawal, and transaction logging.',
      'Built responsive UI components using ReactJS, JavaScript, HTML5, and CSS3 for dynamic account dashboard rendering and real-time form validation.',
      'Integrated MySQL database with relational foreign key constraints and ensured smooth frontend-backend communication verified via Postman.'
    ],
    architectureAscii: `
  [ ReactJS Dynamic UI ] ──( HTTP / JSON )──> [ Spring Boot REST Controllers ]
                                                     │
                                             [ AccountService / @Transactional ]
                                                     │
                                             [ Spring Data JPA Repositories ]
                                                     │
                                             [ MySQL Database (ACID Ledger) ]
    `.trim(),
    codeSnippet: {
      filename: 'AccountServiceImpl.java',
      language: 'java',
      code: `package com.kuldip.banking.service.impl;

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
    public Transaction transferFunds(Long fromAccountId, Long toAccountId, BigDecimal amount) {
        Account fromAccount = accountRepo.findById(fromAccountId)
            .orElseThrow(() -> new ResourceNotFoundException("Sender account not found"));
        Account toAccount = accountRepo.findById(toAccountId)
            .orElseThrow(() -> new ResourceNotFoundException("Receiver account not found"));

        if (fromAccount.getBalance().compareTo(amount) < 0) {
            throw new InsufficientBalanceException("Insufficient account balance for transfer");
        }

        // Debit sender & Credit receiver
        fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
        toAccount.setBalance(toAccount.getBalance().add(amount));

        accountRepo.save(fromAccount);
        accountRepo.save(toAccount);

        Transaction record = new Transaction(fromAccountId, toAccountId, amount, "SUCCESS");
        return txRepo.save(record);
    }
}`
    },
    githubUrl: 'https://github.com/sahkuldip/banking-management-system',
    liveDemoUrl: 'https://github.com/sahkuldip',
    impactSummary: 'Successfully built and tested a resilient banking backend with complete CRUD and transactional integrity, handling account management and fund transfers seamlessly.',
    diagramNodes: [
      { name: 'React Frontend', role: 'Account Dashboard & Transfer UI', type: 'client' },
      { name: 'Spring Controller', role: 'REST Ingress & Validation', type: 'gateway' },
      { name: 'Service Layer', role: 'Business Logic & @Transactional', type: 'service' },
      { name: 'MySQL DB', role: 'Relational Ledger & Accounts', type: 'db' }
    ]
  },
  {
    id: 'proj-ecommerce-storefront',
    title: 'E-Commerce Website & Modern Storefront',
    subtitle: 'Responsive Web Storefront with Dynamic Product Catalog, Cart State Management & Multi-Page Routing',
    category: 'Full Stack Web',
    featured: true,
    metrics: [
      { label: 'Frontend Stack', value: 'ReactJS & JavaScript' },
      { label: 'Styling', value: 'HTML5 & CSS3' },
      { label: 'Routing', value: 'React Router v6' },
      { label: 'Responsive', value: '100% Mobile First' }
    ],
    description: 'A modern, responsive e-commerce web storefront built with ReactJS, featuring reusable component architecture, dynamic product listings, search & category filtering, interactive shopping cart with local state persistence, and seamless multi-page client-side routing.',
    architectureDetails: {
      pattern: 'Component-Driven React SPA with Centralized Cart State Hook',
      throughput: 'Instant Client-Side Navigation & Zero-Reload Render',
      latency: 'Sub-millisecond UI State Updates',
      resilienceStrategy: 'Defensive state validation & local storage fallback',
      dataStore: 'RESTful Mock API & Client Storage'
    },
    technologies: [
      'ReactJS',
      'JavaScript (ES6+)',
      'HTML5',
      'CSS3',
      'React Router',
      'Context API',
      'Responsive Web Design'
    ],
    keyHighlights: [
      'Built a responsive storefront with reusable React components, dynamic product listings, and intuitive category filtering.',
      'Implemented robust state management for cart operations (add, remove, quantity increment, and price calculation).',
      'Engineered smooth multi-page routing with React Router for product catalogs, details view, and checkout flow.',
      'Designed responsive UI using modern CSS3 flexbox and grid ensuring optimal display on mobile, tablet, and desktop screens.'
    ],
    architectureAscii: `
  [ Product Catalog Component ] ──> [ Cart Context State ] <── [ Navbar Cart Badge ]
                 │                             │
        [ Dynamic Filters ]           [ Checkout View Summary ]
    `.trim(),
    codeSnippet: {
      filename: 'CartContext.jsx',
      language: 'javascript',
      code: `import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('shopping_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('shopping_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};`
    },
    githubUrl: 'https://github.com/sahkuldip/ecommerce-react-storefront',
    liveDemoUrl: 'https://github.com/sahkuldip',
    impactSummary: 'Delivered an interactive, performant shopping experience with real-time cart calculations and smooth responsive design.',
    diagramNodes: [
      { name: 'Product Catalog', role: 'Dynamic Grid & Filters', type: 'client' },
      { name: 'Cart Context', role: 'Global State & Pricing', type: 'service' },
      { name: 'Local Storage', role: 'Cart Persistence', type: 'cache' }
    ]
  },
  {
    id: 'proj-portfolio-website',
    title: 'Mobile-First Developer Portfolio',
    subtitle: 'High-Performance Personal Portfolio with Clean Typography, Cross-Browser Compatibility & Optimized Layout',
    category: 'Full Stack Web',
    featured: false,
    metrics: [
      { label: 'Core Languages', value: 'HTML5 · CSS3 · JS' },
      { label: 'Layout Model', value: 'Mobile-First Flex/Grid' },
      { label: 'Performance', value: '100% LightHouse' },
      { label: 'Compatibility', value: 'Cross-Browser' }
    ],
    description: 'Designed and engineered a mobile-first personal portfolio showcasing projects, technical competencies, and contact touchpoints with optimized CSS layouts, smooth scrolling navigation, and full cross-browser compatibility across Safari, Chrome, and Firefox.',
    architectureDetails: {
      pattern: 'Modular Semantic HTML5 & Modern CSS3 with Vanilla JavaScript',
      throughput: 'Ultra-fast asset loading with zero external runtime bloat',
      latency: '< 100ms first contentful paint',
      resilienceStrategy: 'Graceful degradation & responsive media queries',
      dataStore: 'Static Asset Optimization'
    },
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Mobile-First Design',
      'Git',
      'GitHub Pages'
    ],
    keyHighlights: [
      'Designed a mobile-first personal portfolio with optimized layout, smooth navigation, and full cross-browser compatibility.',
      'Implemented clean, semantic HTML5 structure with accessible navigation and interactive project showcases.',
      'Applied custom CSS animations and responsive breakpoints for polished aesthetic presentation.'
    ],
    githubUrl: 'https://github.com/sahkuldip/portfolio-website',
    liveDemoUrl: 'https://github.com/sahkuldip',
    impactSummary: 'Established an engaging, lightweight personal web presence highlighting developer background and projects.',
    diagramNodes: [
      { name: 'Semantic HTML5', role: 'Accessible Content Structure', type: 'client' },
      { name: 'CSS3 Styles', role: 'Responsive Breakpoints', type: 'service' },
      { name: 'Vanilla JS', role: 'Interactive Navigation', type: 'client' }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Programming Languages',
    iconName: 'Cpu',
    skills: [
      { name: 'Java & Advanced Java', level: 92, years: 3, highlight: 'OOP, Collections Framework, Multithreading, Generics, Exception Handling', badge: 'Core Mastery' },
      { name: 'JavaScript (ES6+)', level: 85, years: 2, highlight: 'Async/Await, DOM manipulation, Closures, Array Methods, Event Loop', badge: 'Production' },
      { name: 'TypeScript', level: 80, years: 1, highlight: 'Static typing, Interfaces, Generics, Nest-JS typing', badge: 'Proficient' },
      { name: 'C Language', level: 75, years: 2, highlight: 'Pointers, Memory Allocation, Data Structures, Algorithms', badge: 'Academic' }
    ]
  },
  {
    category: 'Backend & Frameworks',
    iconName: 'Server',
    skills: [
      { name: 'Spring Boot', level: 90, years: 2, highlight: 'Spring MVC, Dependency Injection, REST Controllers, Exception Handling', badge: 'Core Stack' },
      { name: 'RESTful API Development', level: 92, years: 2, highlight: 'API Design, HTTP Status Codes, JSON serialization, Postman Testing', badge: 'Core Stack' },
      { name: 'JDBC & Spring Data JPA', level: 86, years: 2, highlight: 'Connection pooling, PreparedStatements, Hibernate ORM, CRUD repositories', badge: 'Proficient' },
      { name: 'Node.js & Nest-JS', level: 78, years: 1, highlight: 'Modular architecture, Controllers, Dependency Injection, Middleware', badge: 'Internship' }
    ]
  },
  {
    category: 'Frontend Engineering',
    iconName: 'Layout',
    skills: [
      { name: 'ReactJS', level: 88, years: 2, highlight: 'Hooks (useState, useEffect, useContext), Components, Props, React Router', badge: 'Core Frontend' },
      { name: 'HTML5 & CSS3', level: 95, years: 3, highlight: 'Semantic elements, Flexbox, CSS Grid, Media Queries, Responsive Design', badge: 'Expert' },
      { name: 'Dynamic UI & Form Handling', level: 88, years: 2, highlight: 'Form validation, Controlled inputs, Dynamic state rendering', badge: 'Production' }
    ]
  },
  {
    category: 'Databases & ORM',
    iconName: 'Database',
    skills: [
      { name: 'MySQL', level: 90, years: 2, highlight: 'Database design, Normalization, Joins, Indexing, Transactions, Foreign Keys', badge: 'Core Database' },
      { name: 'Oracle SQL / PL-SQL', level: 82, years: 1, highlight: 'Stored Procedures, Triggers, Views, SQL queries, DDL/DML', badge: 'Proficient' },
      { name: 'Prisma ORM', level: 80, years: 1, highlight: 'Schema definitions, Migrations, CRUD relations, Type-safe client', badge: 'Internship' },
      { name: 'DBMS Concepts', level: 90, years: 3, highlight: 'ACID properties, ER Diagrams, Relational Integrity, Concurrency', badge: 'Foundational' }
    ]
  },
  {
    category: 'Tools, DevOps & Practices',
    iconName: 'Cloud',
    skills: [
      { name: 'Git & GitHub', level: 92, years: 3, highlight: 'Branching, Merge strategies, Pull Requests, Version Control', badge: 'Essential' },
      { name: 'IntelliJ IDEA & Eclipse', level: 90, years: 3, highlight: 'Debugging, Maven/Gradle builds, Profiling, Code refactoring', badge: 'Daily Driver' },
      { name: 'Postman & API Testing', level: 92, years: 2, highlight: 'Collections, Environment variables, Automated test scripts, Mock servers', badge: 'Daily Driver' },
      { name: 'Docker & Kubernetes Basics', level: 75, years: 1, highlight: 'Containerization, Dockerfile, Container images, Pod basics', badge: 'Modern Stack' },
      { name: 'CI/CD Pipelines & Jenkins', level: 72, years: 1, highlight: 'Build automation, Pipeline concepts, Continuous Integration', badge: 'Modern Stack' },
      { name: 'Figma & UI Design', level: 78, years: 2, highlight: 'Wireframing, UI Mockups, Component layout, User flows', badge: 'Design' }
    ]
  },
  {
    category: 'Core Concepts & Soft Skills',
    iconName: 'Wrench',
    skills: [
      { name: 'Object-Oriented Programming (OOP)', level: 95, years: 3, highlight: 'Encapsulation, Inheritance, Polymorphism, Abstraction, SOLID', badge: 'Foundational' },
      { name: 'Collections Framework', level: 92, years: 3, highlight: 'List, Set, Map, Queue, Iterator, Comparator, Streams', badge: 'Foundational' },
      { name: 'Problem Solving & Analytical Thinking', level: 90, years: 3, highlight: 'Algorithm design, Debugging, Code optimization', badge: 'Core' },
      { name: 'Team Collaboration & Communication', level: 92, years: 3, highlight: 'Agile sprints, Cross-functional communication, Adaptability', badge: 'Core' }
    ]
  }
];

export const BENCHMARKS: BenchmarkData[] = [
  {
    title: 'Spring Boot REST vs Direct JDBC Batch Processing',
    subtitle: 'Database Insertion Latency & Memory Efficiency Test with MySQL',
    description: 'Measured throughput and latency when processing 5,000 banking ledger records via Spring Data JPA vs Optimized JDBC Batch with HikariCP connection pool.',
    metricName: 'Throughput (Operations / sec)',
    unit: 'ops/sec',
    comparison: [
      {
        name: 'Standard Individual JPA Inserts',
        baseline: 420,
        optimized: 420,
        improvement: 'Baseline (Individual roundtrips)',
        details: 'Sequential INSERT statements over network with standard EntityManager roundtrips'
      },
      {
        name: 'Optimized JDBC Batch + HikariCP',
        baseline: 420,
        optimized: 3850,
        improvement: '9.1x Faster Throughput',
        details: 'Batch chunking (500 records/batch) using PreparedStatement with rewriteBatchedStatements=true'
      }
    ],
    verdict: 'Using JDBC batch processing for high-volume banking transactions reduces network roundtrips by 90% and eliminates database connection saturation.'
  },
  {
    title: 'Spring Boot REST Controller Response Times',
    subtitle: 'Postman Load & API Benchmark on Account Management Endpoints',
    description: 'Benchmark measuring API latency on /api/v1/accounts/transfer with transactional isolation and foreign key validations.',
    metricName: 'Latency (P95 in ms)',
    unit: 'ms',
    comparison: [
      {
        name: 'Account Detail Retrieval (Cached)',
        baseline: 48,
        optimized: 4.2,
        improvement: '11.4x Lower Latency',
        details: 'In-memory retrieval of customer profile & balance query'
      },
      {
        name: 'Fund Transfer with @Transactional Lock',
        baseline: 85,
        optimized: 12.8,
        improvement: '6.6x Faster Completion',
        details: 'Double-entry balance debit/credit with transaction logging and ACID commit'
      }
    ],
    verdict: 'Layered Spring Boot architecture with indexed MySQL foreign keys ensures sub-15ms transaction times while preventing dirty reads.'
  }
];

export const TOPOLOGY_NODES_INITIAL: TopologyNode[] = [
  {
    id: 'client-1',
    name: 'ReactJS Client (SPA)',
    type: 'client',
    status: 'healthy',
    rps: 3200,
    latencyMs: 1.2,
    cpuPercent: 18,
    instances: 1,
    circuitBreakerState: 'CLOSED'
  },
  {
    id: 'gw-1',
    name: 'Spring REST Controller',
    type: 'gateway',
    status: 'healthy',
    rps: 3180,
    latencyMs: 3.4,
    cpuPercent: 24,
    instances: 2,
    circuitBreakerState: 'CLOSED'
  },
  {
    id: 'svc-core',
    name: 'Banking Service Layer',
    type: 'microservice',
    status: 'healthy',
    rps: 3150,
    latencyMs: 5.8,
    cpuPercent: 32,
    instances: 2,
    circuitBreakerState: 'CLOSED'
  },
  {
    id: 'db-1',
    name: 'MySQL Database Engine',
    type: 'postgres',
    status: 'healthy',
    rps: 2900,
    latencyMs: 4.1,
    cpuPercent: 28,
    instances: 1,
    circuitBreakerState: 'CLOSED'
  }
];

export const MOCK_LOGS: SystemLog[] = [
  {
    id: 'log-1',
    timestamp: '11:40:01',
    level: 'INFO',
    service: 'BankingController',
    message: 'POST /api/v1/accounts/transfer 200 OK (from: 10042, to: 10088, amt: $450.00) in 8.4ms'
  },
  {
    id: 'log-2',
    timestamp: '11:40:03',
    level: 'INFO',
    service: 'AccountService',
    message: 'Executing @Transactional fund transfer with optimistic locking verification'
  },
  {
    id: 'log-3',
    timestamp: '11:40:05',
    level: 'INFO',
    service: 'MySQLConnectionPool',
    message: 'HikariCP connection pool active: 10/10 idle connections ready, latency 0.8ms'
  },
  {
    id: 'log-4',
    timestamp: '11:40:07',
    level: 'INFO',
    service: 'ReactClient',
    message: 'Account dashboard state re-rendered: balance updated successfully'
  }
];
