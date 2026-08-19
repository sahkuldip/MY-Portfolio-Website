export type ScreenTab = 
  | 'overview' 
  | 'architecture' 
  | 'projects' 
  | 'experience' 
  | 'skills' 
  | 'benchmarks' 
  | 'terminal' 
  | 'resume' 
  | 'contact';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Distributed Systems' | 'Spring Boot & Java 21' | 'Full Stack Web' | 'Cloud & DevOps' | 'Event-Driven';
  featured: boolean;
  metrics: {
    label: string;
    value: string;
    change?: string;
  }[];
  description: string;
  architectureDetails: {
    pattern: string;
    throughput: string;
    latency: string;
    resilienceStrategy: string;
    dataStore: string;
  };
  technologies: string[];
  keyHighlights: string[];
  architectureAscii?: string;
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
  githubUrl?: string;
  liveDemoUrl?: string;
  impactSummary: string;
  diagramNodes: {
    name: string;
    role: string;
    type: 'gateway' | 'service' | 'queue' | 'db' | 'cache' | 'client' | 'metrics';
  }[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  details?: string;
  isCurrent?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  duration: string;
  type: 'Full-time' | 'Contract / Advisory';
  summary: string;
  achievements: string[];
  technologies: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  isCurrent?: boolean;
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    years: number;
    highlight: string;
    badge?: string;
  }[];
}

export interface BenchmarkData {
  title: string;
  subtitle: string;
  description: string;
  metricName: string;
  unit: string;
  comparison: {
    name: string;
    baseline: number;
    optimized: number;
    improvement: string;
    details: string;
  }[];
  verdict: string;
}

export interface TopologyNode {
  id: string;
  name: string;
  type: 'client' | 'gateway' | 'auth' | 'microservice' | 'kafka' | 'cache' | 'postgres' | 'metrics';
  status: 'healthy' | 'degraded' | 'tripped' | 'recovering';
  rps: number;
  latencyMs: number;
  cpuPercent: number;
  instances: number;
  circuitBreakerState: 'CLOSED' | 'HALF_OPEN' | 'OPEN';
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  service: string;
  message: string;
}
