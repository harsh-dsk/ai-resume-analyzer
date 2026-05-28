export const mockAnalysis = {
  atsScore: 84,
  formattingScore: 91,
  keywordMatch: 78,
  roleFit: 86,
  role: 'Frontend Engineer',
  fileName: 'frontend-resume.pdf',
  overview:
    'Your resume is strong for frontend roles. Prioritize cloud and system design keywords to improve ATS relevance for senior openings.',
  keywordsMissing: ['Kubernetes', 'CI/CD', 'System Design', 'A/B Testing'],
  strengths: [
    'Quantified achievements in multiple experience bullets',
    'Clear project stack and modern frontend tooling',
    'Well-structured layout with ATS-safe formatting',
  ],
  suggestions: [
    'Add one bullet highlighting performance optimization outcomes',
    'Include keywords from target job descriptions in summary',
    'Expand leadership and cross-functional collaboration details',
  ],
  skillsMatch: [
    { name: 'React', score: 92 },
    { name: 'TypeScript', score: 86 },
    { name: 'JavaScript', score: 90 },
    { name: 'Testing', score: 72 },
    { name: 'Cloud', score: 61 },
  ],
}

export const analysisMessages = [
  'Parsing resume...',
  'Extracting skills...',
  'Running ATS analysis...',
  'Detecting missing keywords...',
  'Generating AI suggestions...',
]
