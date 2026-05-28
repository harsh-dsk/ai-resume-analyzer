import {
  ArrowRight,
  AtSign,
  BarChart3,
  BrainCircuit,
  Briefcase,
  FileText,
  GitBranch,
  Lightbulb,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Upload,
  Users,
  Zap,
} from 'lucide-react'

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/upload', label: 'Upload' },
  { to: '/dashboard', label: 'Dashboard' },
]

export const heroStats = [
  { label: 'Resumes Reviewed', value: '120K+' },
  { label: 'Average Score Lift', value: '+34%' },
  { label: 'Interview Conversion', value: '2.4x' },
]

export const uploadMockProgress = [
  { step: 'Parsing content', progress: 100 },
  { step: 'ATS structure check', progress: 84 },
  { step: 'Keyword relevance', progress: 62 },
]

export const features = [
  {
    icon: Target,
    title: 'ATS Score Analysis',
    description:
      'Understand exactly how tracking systems evaluate your resume and what impacts your pass rate.',
    gradient: 'from-cyan-500/30 via-cyan-400/10 to-transparent',
  },
  {
    icon: Search,
    title: 'Keyword Optimization',
    description:
      'Match role-specific terms from job descriptions with AI-generated keyword and phrasing upgrades.',
    gradient: 'from-emerald-500/30 via-emerald-400/10 to-transparent',
  },
  {
    icon: Lightbulb,
    title: 'AI Suggestions',
    description:
      'Get context-aware rewrites for summaries and bullet points that sound clear and measurable.',
    gradient: 'from-cyan-500/30 via-emerald-500/20 to-transparent',
  },
  {
    icon: BarChart3,
    title: 'Resume Strength Report',
    description:
      'See strengths, weak signals, and readability quality in one polished report built for action.',
    gradient: 'from-emerald-500/30 via-cyan-500/20 to-transparent',
  },
]

export const dashboard = {
  missingKeywords: ['Kubernetes', 'CI/CD', 'GraphQL', 'Terraform', 'System Design'],
  strengths: [
    'Quantified achievements across impact bullets',
    'Clean section hierarchy and ATS-safe layout',
    'Solid technical stack with relevant tooling',
  ],
  suggestions: [
    'Add one leadership-focused project bullet',
    'Improve summary with target-role outcomes',
    'Increase role-specific cloud keywords',
  ],
  skills: [
    { name: 'JavaScript', match: 92 },
    { name: 'React', match: 88 },
    { name: 'Node.js', match: 75 },
    { name: 'AWS', match: 62 },
    { name: 'System Design', match: 58 },
  ],
  miniMetrics: [
    { label: 'Formatting', value: '96%', icon: ShieldCheck },
    { label: 'Keyword Match', value: '78%', icon: Sparkles },
    { label: 'Role Relevance', value: '82%', icon: Briefcase },
  ],
}

export const workflowSteps = [
  {
    id: '01',
    title: 'Upload Resume',
    description:
      'Drop your PDF or DOCX and we parse structure, context, and role signals instantly.',
    icon: Upload,
  },
  {
    id: '02',
    title: 'AI Analyzes',
    description:
      'Advanced models evaluate ATS compatibility, wording quality, and keyword alignment.',
    icon: BrainCircuit,
  },
  {
    id: '03',
    title: 'Get Smart Suggestions',
    description:
      'Receive a prioritized action plan with concise improvements you can apply in minutes.',
    icon: Zap,
  },
]

export const footerColumns = [
  {
    title: 'Product',
    links: ['Features', 'Dashboard', 'How it Works', 'Pricing'],
  },
  {
    title: 'Resources',
    links: ['Resume Templates', 'ATS Guide', 'Career Blog', 'Help Center'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Security', 'Contact'],
  },
]

export const socialLinks = [
  { icon: GitBranch, href: 'https://github.com', label: 'GitHub' },
  { icon: AtSign, href: 'https://x.com', label: 'X' },
  { icon: Users, href: 'https://linkedin.com', label: 'LinkedIn' },
]

export const ctaButtons = [
  { icon: FileText, label: 'Upload Resume', variant: 'primary' },
  { icon: ArrowRight, label: 'Try Demo', variant: 'secondary' },
]

export const heroButtons = [
  { icon: Upload, label: 'Upload Resume', variant: 'primary' },
  { icon: ArrowRight, label: 'View Interactive Demo', variant: 'secondary' },
]

export const dashboardState = {
  score: 82,
  role: 'Senior Frontend Engineer',
  filename: 'resume-v4.pdf',
}
