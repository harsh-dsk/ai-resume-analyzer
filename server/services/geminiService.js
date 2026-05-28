import { GoogleGenerativeAI } from '@google/generative-ai'

// Technical skills keyword database
const technicalSkillsDB = {
  frontend: [
    'React', 'Vue', 'Angular', 'Next.js', 'Svelte', 'HTML', 'CSS', 'JavaScript', 'TypeScript',
    'Tailwind', 'Bootstrap', 'Material-UI', 'Redux', 'State Management', 'Webpack', 'Vite',
    'ESLint', 'Prettier', 'Jest', 'Testing Library', 'Cypress', 'Playwright'
  ],
  backend: [
    'Node.js', 'Express', 'Python', 'Django', 'Flask', 'Java', 'Spring', 'Go', 'Rust',
    'C#', 'ASP.NET', 'PHP', 'Laravel', 'Ruby', 'Rails', 'GraphQL', 'REST API',
    'Microservices', 'Monolith', 'API Design', 'Authentication', 'Authorization'
  ],
  database: [
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'SQL', 'NoSQL', 'Elasticsearch',
    'Cassandra', 'DynamoDB', 'Firebase', 'Prisma', 'Sequelize', 'SQLAlchemy',
    'Data Modeling', 'Query Optimization', 'Indexing', 'Transactions'
  ],
  devops: [
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'GCP', 'Heroku',
    'CI/CD', 'GitHub Actions', 'GitLab CI', 'Jenkins', 'Terraform', 'Ansible',
    'Linux', 'Shell', 'Bash', 'Nginx', 'Apache', 'SSL/TLS', 'Deployment',
    'Monitoring', 'Logging', 'ECS', 'Lambda', 'CloudFormation'
  ],
  tools: [
    'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Jira', 'Confluence', 'Slack',
    'Figma', 'Postman', 'Notion', 'Linear', 'Asana', 'Monday.com'
  ],
  other: [
    'Agile', 'Scrum', 'Kanban', 'TDD', 'BDD', 'Design Patterns', 'System Design',
    'Problem Solving', 'Communication', 'Leadership', 'Mentoring', 'Code Review',
    'Performance Optimization', 'Security', 'Accessibility', 'Testing', 'Debugging'
  ]
}

// Role detection patterns
const rolePatterns = {
  'Frontend Developer': {
    keywords: ['react', 'vue', 'angular', 'frontend', 'ui', 'ux', 'javascript', 'typescript', 'css', 'html'],
    weight: 1.2
  },
  'Backend Developer': {
    keywords: ['backend', 'api', 'node.js', 'express', 'database', 'sql', 'mongodb', 'django', 'python'],
    weight: 1.2
  },
  'Full Stack Developer': {
    keywords: ['full stack', 'mern', 'mean', 'next.js', 'react', 'node.js', 'database', 'api'],
    weight: 1.3
  },
  'DevOps Engineer': {
    keywords: ['devops', 'docker', 'kubernetes', 'ci/cd', 'aws', 'infrastructure', 'deployment', 'terraform'],
    weight: 1.2
  },
  'Data Engineer': {
    keywords: ['data', 'sql', 'bigquery', 'spark', 'etl', 'pipeline', 'analytics', 'hadoop', 'snowflake'],
    weight: 1.2
  },
  'ML/AI Engineer': {
    keywords: ['machine learning', 'deep learning', 'python', 'tensorflow', 'pytorch', 'nlp', 'computer vision', 'ai'],
    weight: 1.2
  },
  'Data Analyst': {
    keywords: ['sql', 'analytics', 'tableau', 'power bi', 'excel', 'python', 'r', 'statistics', 'data'],
    weight: 1.2
  },
  'QA Engineer': {
    keywords: ['testing', 'qa', 'automation', 'selenium', 'jest', 'cypress', 'test', 'quality assurance'],
    weight: 1.2
  },
}

const defaultAnalysis = {
  atsScore: 70,
  formattingScore: 75,
  keywordMatch: 65,
  roleFit: 70,
  role: 'Software Developer',
  missingKeywords: ['AWS', 'System Design', 'Docker'],
  strengths: [
    'Resume has clear structure',
    'Technical skills listed',
    'Experience documented',
  ],
  suggestions: [
    'Add quantified metrics to achievements',
    'Include more role-specific keywords',
    'Highlight key accomplishments',
  ],
  skillsMatch: [
    { name: 'Problem Solving', score: 70 },
    { name: 'Development', score: 65 },
  ],
}

// Extract all skills from text (case-insensitive)
function extractSkills(text) {
  const lowerText = text.toLowerCase()
  const foundSkills = new Map()

  for (const [category, skills] of Object.entries(technicalSkillsDB)) {
    skills.forEach(skill => {
      const pattern = new RegExp(`\\b${skill.toLowerCase()}\\b`, 'gi')
      if (pattern.test(lowerText)) {
        if (!foundSkills.has(skill)) {
          foundSkills.set(skill, { count: 0, category })
        }
        foundSkills.get(skill).count += (lowerText.match(pattern) || []).length
      }
    })
  }

  return Array.from(foundSkills.entries()).map(([name, data]) => ({
    name,
    count: data.count,
    category: data.category
  }))
}

// Validate if extracted text is actually a resume
function validateResumeContent(text) {
  if (!text || text.trim().length < 200) {
    return {
      isValid: false,
      reason: 'Text is too short to be a valid resume. Minimum 200 characters required.'
    }
  }

  const lowerText = text.toLowerCase()

  // Check for resume-specific indicators
  const hasContactInfo = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b|(\+?\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})|linkedin|github/.test(text)
  const hasResumeStructure = /\b(experience|education|skills|projects?|work|employment|summary|objective|profile)\b/i.test(lowerText)
  const hasDatePattern = /\d{4}\s*[-–]\s*\d{4}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|present|current/i.test(text)
  const hasCareerContext = /\b(developer|engineer|manager|analyst|designer|architect|specialist|consultant|coordinator|administrator)\b/i.test(lowerText)

  // Check what's detected
  const indicators = {
    contactInfo: hasContactInfo,
    structure: hasResumeStructure,
    dates: hasDatePattern,
    careerContext: hasCareerContext
  }

  const indicatorCount = Object.values(indicators).filter(Boolean).length

  // Need at least 3 of 4 indicators to be a valid resume
  if (indicatorCount < 3) {
    return {
      isValid: false,
      reason: 'This file does not appear to be a valid resume. Missing key resume elements.',
      indicators
    }
  }

  // Check for obvious non-resume documents
  if (/receipt|invoice|payment|purchase|order|total|price|quantity|item/.test(lowerText.substring(0, 500))) {
    if (!hasResumeStructure && !hasCareerContext) {
      return {
        isValid: false,
        reason: 'This file appears to be a receipt or invoice, not a resume.'
      }
    }
  }

  return { isValid: true }
}

// Count actual skills found in resume
function countActualSkills(text) {
  const lowerText = text.toLowerCase()
  let skillCount = 0

  for (const category of Object.values(technicalSkillsDB)) {
    category.forEach(skill => {
      const pattern = new RegExp(`\\b${skill.toLowerCase()}\\b`, 'i')
      if (pattern.test(lowerText)) {
        skillCount++
      }
    })
  }

  return skillCount
}
function detectSections(text) {
  const sections = {
    summary: false,
    experience: false,
    projects: false,
    education: false,
    skills: false,
    certifications: false
  }

  const lowerText = text.toLowerCase()

  // Check for section headers (case-insensitive)
  sections.summary = /\b(profile|professional summary|summary|about|overview)\b/.test(lowerText)
  sections.experience = /\b(work experience|professional experience|experience|employment|positions?|career)\b/.test(lowerText)
  sections.projects = /\b(projects?|portfolio|capstone|side projects?|open source)\b/.test(lowerText)
  sections.education = /\b(education|university|college|degree|bachelor|master|phd|certification|training)\b/.test(lowerText)
  sections.skills = /\b(skills|technical skills|core competencies|expertise|proficiencies|languages?)\b/.test(lowerText)
  sections.certifications = /\b(certifications?|licenses?|credentials?|credentials?|certified)\b/.test(lowerText)

  return sections
}

// Detect quantified achievements
function detectQuantifiedAchievements(text) {
  const patterns = [
    /\d+%/g,  // percentages
    /\$[\d.]+[KM]?/g,  // money
    /\d+x/g,  // multiples
    /\d+\+/g,  // plus numbers
  ]

  let count = 0
  patterns.forEach(pattern => {
    const matches = text.match(pattern) || []
    count += matches.length
  })

  return count
}

// Detect likely role based on skills
function detectRole(text, extractedSkills) {
  const lowerText = text.toLowerCase()
  const roleScores = {}

  for (const [role, config] of Object.entries(rolePatterns)) {
    let score = 0

    // Check for role keywords
    config.keywords.forEach(keyword => {
      const pattern = new RegExp(`\\b${keyword}\\b`, 'gi')
      const matches = lowerText.match(pattern) || []
      score += matches.length * 2
    })

    // Check for role-specific skills in extracted skills
    extractedSkills.forEach(skill => {
      if (config.keywords.some(kw => skill.name.toLowerCase().includes(kw))) {
        score += skill.count
      }
    })

    roleScores[role] = score * config.weight
  }

  const detectedRole = Object.entries(roleScores).sort((a, b) => b[1] - a[1])[0]
  return detectedRole ? detectedRole[0] : 'Software Developer'
}

// Generate role-specific missing keywords
function generateRoleSpecificKeywords(detectedRole, foundSkills) {
  const roleConfigs = {
    'Frontend Developer': ['Redux', 'Next.js', 'Performance Optimization', 'A/B Testing', 'Responsive Design'],
    'Backend Developer': ['System Design', 'Microservices', 'API Gateway', 'Load Balancing', 'Database Optimization'],
    'Full Stack Developer': ['Next.js', 'Full Stack', 'Database Design', 'DevOps', 'Cloud Deployment'],
    'DevOps Engineer': ['Infrastructure as Code', 'Prometheus', 'ELK Stack', 'Container Orchestration', 'Disaster Recovery'],
    'Data Engineer': ['Apache Spark', 'Data Warehousing', 'ETL', 'Stream Processing', 'Data Quality'],
    'ML/AI Engineer': ['Model Training', 'Feature Engineering', 'Model Deployment', 'RAG', 'LLM Fine-tuning'],
    'Data Analyst': ['Data Visualization', 'Statistical Analysis', 'SQL Optimization', 'Dashboarding', 'A/B Testing'],
    'QA Engineer': ['Test Automation', 'Performance Testing', 'Security Testing', 'CI/CD', 'Bug Tracking'],
  }

  const keywords = roleConfigs[detectedRole] || roleConfigs['Software Developer']
  const foundKeywords = new Set(foundSkills.map(s => s.name.toLowerCase()))

  return keywords
    .filter(kw => !foundKeywords.has(kw.toLowerCase()))
    .slice(0, 5)
}

// Calculate ATS score based on resume metrics
function calculateATSScore(text, sections, quantifiedCount, foundSkills) {
  let score = 50

  // Section completeness (30 points max)
  const completeSections = Object.values(sections).filter(Boolean).length
  score += Math.min(30, completeSections * 5)

  // Skill density (20 points max)
  const skillScore = Math.min(20, foundSkills.length * 1.5)
  score += skillScore

  // Quantified achievements (20 points max)
  const quantifiedScore = Math.min(20, quantifiedCount * 2)
  score += quantifiedScore

  // Formatting quality (10 points max)
  // Check for common formatting indicators
  const hasGoodStructure = /\n/.test(text) && text.split('\n').length > 10
  const hasEmailPhone = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b|(\+?\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/.test(text)
  if (hasGoodStructure) score += 5
  if (hasEmailPhone) score += 5

  return Math.max(40, Math.min(99, score))
}

// Calculate keyword match score
function calculateKeywordMatch(text, detectedRole, foundSkills) {
  const roleConfig = rolePatterns[detectedRole]
  const lowerText = text.toLowerCase()

  let matchCount = 0
  let totalKeywords = 0

  roleConfig.keywords.forEach(keyword => {
    totalKeywords++
    if (lowerText.includes(keyword.toLowerCase())) {
      matchCount++
    }
  })

  // Also count found skills
  matchCount += Math.min(foundSkills.length, 10)
  totalKeywords += 10

  return Math.max(40, Math.min(100, Math.round((matchCount / totalKeywords) * 100)))
}

// Calculate role fit score
function calculateRoleFit(foundSkills, detectedRole, text) {
  const roleConfig = rolePatterns[detectedRole]
  const lowerText = text.toLowerCase()

  let fitScore = 50

  // Check for role-specific keywords
  roleConfig.keywords.forEach(keyword => {
    if (lowerText.includes(keyword.toLowerCase())) {
      fitScore += 3
    }
  })

  // Check for matching skills
  const skillNames = foundSkills.map(s => s.name.toLowerCase())
  roleConfig.keywords.forEach(keyword => {
    if (skillNames.some(s => s.includes(keyword.toLowerCase()))) {
      fitScore += 2
    }
  })

  return Math.max(40, Math.min(100, fitScore))
}

// Calculate formatting score
function calculateFormattingScore(text) {
  let score = 70

  // Check for common formatting elements
  if (text.split('\n').length > 15) score += 10
  if (/\b[A-Z]{2,}\b/.test(text.substring(0, 500))) score += 5
  if (/\d{4}\s*[-–]\s*\d{4}|present|current/.test(text)) score += 10
  if (/[•\-\*]/.test(text)) score += 5

  return Math.max(50, Math.min(100, score))
}

// Generate strengths based on resume content
function generateStrengths(sections, quantifiedCount, foundSkills, text) {
  const strengths = []

  if (foundSkills.length >= 8) {
    strengths.push('Strong technical skill set with diverse technologies')
  }

  if (quantifiedCount >= 5) {
    strengths.push('Multiple quantified achievements demonstrating impact')
  }

  if (sections.projects) {
    strengths.push('Projects section showcasing hands-on experience')
  }

  if (sections.experience) {
    strengths.push('Clear work experience progression')
  }

  if (/leadership|managed|led|directed|mentored/i.test(text)) {
    strengths.push('Leadership and mentoring experience highlighted')
  }

  if (foundSkills.length >= 5 && /database|api|system/i.test(text)) {
    strengths.push('Full-stack capabilities demonstrated')
  }

  return strengths.length > 0 ? strengths : [
    'Resume has identifiable structure',
    'Technical background documented'
  ]
}

// Generate suggestions based on resume content
function generateSuggestions(detectedRole, missingKeywords, text, sections) {
  const suggestions = []

  // Missing sections
  if (!sections.summary) {
    suggestions.push('Add a professional summary section at the top')
  }

  if (!sections.projects && /developer|engineer/i.test(detectedRole)) {
    suggestions.push('Include a projects section to showcase practical work')
  }

  if (!sections.certifications && /engineer|specialist/i.test(detectedRole)) {
    suggestions.push('Add relevant certifications or achievements section')
  }

  // Content improvements
  if (!/\d+%/.test(text)) {
    suggestions.push('Add quantifiable metrics and percentages to achievements')
  }

  if (!/leadership|team|collaboration|mentored/i.test(text)) {
    suggestions.push('Highlight leadership and team collaboration examples')
  }

  // Keyword improvements
  const roleSpecific = generateRoleSpecificKeywords(detectedRole, [])
  if (roleSpecific.length > 0) {
    suggestions.push(`Incorporate role-specific keywords: ${roleSpecific.slice(0, 2).join(', ')}`)
  }

  return suggestions.slice(0, 5)
}



function normalizeArray(input) {
  return Array.isArray(input)
    ? input.filter((item) => typeof item === 'string')
    : []
}

function normalizeSkills(skills) {
  if (!Array.isArray(skills)) return []

  const normalized = skills
    .map((item) => ({
      name: String(item?.name || '').trim(),
      score: Number(item?.score),
    }))
    .filter((item) => item.name && Number.isFinite(item.score))
    .map((item) => ({
      ...item,
      score: Math.max(0, Math.min(100, item.score)),
    }))

  return normalized.length > 0 ? normalized : []
}

function normalizeAnalysis(parsed, detectedRole) {
  return {
    atsScore: Number.isFinite(parsed?.atsScore)
      ? Math.max(40, Math.min(100, parsed.atsScore))
      : 70,

    formattingScore: Number.isFinite(parsed?.formattingScore)
      ? Math.max(40, Math.min(100, parsed.formattingScore))
      : 75,

    keywordMatch: Number.isFinite(parsed?.keywordMatch)
      ? Math.max(40, Math.min(100, parsed.keywordMatch))
      : 65,

    roleFit: Number.isFinite(parsed?.roleFit)
      ? Math.max(40, Math.min(100, parsed.roleFit))
      : 70,

    role: String(parsed?.role || detectedRole || 'Software Developer').trim(),

    missingKeywords: normalizeArray(parsed?.missingKeywords).slice(0, 6),

    strengths: normalizeArray(parsed?.strengths).slice(0, 6),

    suggestions: normalizeArray(parsed?.suggestions).slice(0, 6),

    skillsMatch: normalizeSkills(parsed?.skillsMatch).slice(0, 12),
  }
}

function buildImprovedPrompt(resumeText, detectedRole, foundSkills, sections, hasSkills) {
  const skillsList = foundSkills.slice(0, 15).map(s => s.name).join(', ')
  const sectionsString = Object.entries(sections)
    .filter(([_, found]) => found)
    .map(([section]) => section)
    .join(', ')

  const skillsInstructions = hasSkills
    ? `For skillsMatch, include ONLY skills found in the resume text above. Base scores on how prominently they appear.`
    : `For skillsMatch, return EMPTY ARRAY [] since no technical skills were found in this resume.`

  return `You are an expert ATS evaluator and technical recruiter. Analyze this resume for a ${detectedRole} role.

IMPORTANT: 
- Return ONLY valid JSON. No markdown, no explanation text.
- ONLY include skills that actually appear in the resume text below.
- Do NOT fabricate or hallucinate skills not mentioned in the resume.
- If no skills found, return empty skillsMatch array.

Resume text:
${resumeText.slice(0, 10000)}

Analysis context:
- Detected role: ${detectedRole}
- Found sections: ${sectionsString || 'minimal'}
- Skills mentioned in resume: ${skillsList || 'NONE - no technical skills detected'}

Return this exact JSON structure:
{
  "atsScore": number (0-100, based on formatting, structure, keyword density),
  "formattingScore": number (0-100, based on ATS-safe formatting),
  "keywordMatch": number (0-100, match with ${detectedRole} job market keywords),
  "roleFit": number (0-100, how well resume fits ${detectedRole} role),
  "role": "${detectedRole}",
  "missingKeywords": ["keyword1", "keyword2", "keyword3"],
  "strengths": ["strength1", "strength2", "strength3"],
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
  "skillsMatch": [${hasSkills ? '{"name": "skill1", "score": 85}, {"name": "skill2", "score": 78}' : ''}]
}

Critical rules:
- ${skillsInstructions}
- For missingKeywords, suggest only role-appropriate keywords NOT in the resume.
- For strengths, identify actual resume qualities, not assumptions.
- For suggestions, provide realistic, actionable improvements.
- If resume lacks a role fit, lower roleFit score appropriately.`
}


function parseJsonFromText(text) {
  const fencedMatch = text.match(/```json\s*([\s\S]*?)```/i)
  const raw = fencedMatch ? fencedMatch[1] : text

  const start = raw.indexOf('{')
  const end = raw.lastIndexOf('}')

  if (start === -1 || end === -1 || end <= start) {
    throw new Error('No JSON object found in model response')
  }

  return JSON.parse(raw.slice(start, end + 1))
}

// Main improved analysis function
export async function analyzeWithGemini(resumeText) {
  try {
    // Step 0: Validate that this is actually a resume
    const validation = validateResumeContent(resumeText)
    if (!validation.isValid) {
      const error = new Error(validation.reason)
      error.code = 'INVALID_RESUME'
      throw error
    }

    // Step 1: Local analysis
    const extractedSkills = extractSkills(resumeText)
    const actualSkillCount = countActualSkills(resumeText)
    const detectedSections = detectSections(resumeText)
    const quantifiedCount = detectQuantifiedAchievements(resumeText)
    const detectedRole = detectRole(resumeText, extractedSkills)

    // Only proceed if we found some resume indicators
    if (extractedSkills.length === 0 && actualSkillCount === 0 && quantifiedCount === 0 && Object.values(detectedSections).filter(Boolean).length < 2) {
      throw new Error('Resume has insufficient content for analysis. Please ensure your resume includes relevant experience, skills, or education.')
    }

    // Step 2: Calculate local scores
    const localATSScore = calculateATSScore(resumeText, detectedSections, quantifiedCount, extractedSkills)
    const localFormattingScore = calculateFormattingScore(resumeText)
    const localKeywordMatch = calculateKeywordMatch(resumeText, detectedRole, extractedSkills)
    const localRoleFit = calculateRoleFit(extractedSkills, detectedRole, resumeText)

    // Step 3: Generate local insights
    const localStrengths = generateStrengths(detectedSections, quantifiedCount, extractedSkills, resumeText)
    const localSuggestions = generateSuggestions(detectedRole, [], resumeText, detectedSections)
    const missingKeywords = generateRoleSpecificKeywords(detectedRole, extractedSkills)

    // Step 4: Build skills match from extracted skills
    // If no skills found, return empty array instead of fake data
    const topSkills = extractedSkills.length > 0
      ? extractedSkills
          .sort((a, b) => b.count - a.count)
          .slice(0, 8)
          .map(skill => {
            const baseScore = Math.min(95, 60 + skill.count * 5)
            return {
              name: skill.name,
              score: Math.round(baseScore)
            }
          })
      : []

    // Step 5: Try Gemini enhancement (if API available)
    let geminiAnalysis = null
    const apiKey = process.env.GEMINI_API_KEY

    if (apiKey) {
      try {
        const client = new GoogleGenerativeAI(apiKey)
        const model = client.getGenerativeModel({ model: 'gemini-1.5-flash-latest' })

        const prompt = buildImprovedPrompt(resumeText, detectedRole, extractedSkills, detectedSections, topSkills.length > 0)
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        geminiAnalysis = parseJsonFromText(text)
      } catch (error) {
        console.warn('Gemini enhancement failed, using local analysis:', error.message)
        geminiAnalysis = null
      }
    }

    // Step 6: Merge local and Gemini analysis (prefer Gemini for refinement)
    const finalAnalysis = {
      atsScore: geminiAnalysis?.atsScore ?? localATSScore,
      formattingScore: geminiAnalysis?.formattingScore ?? localFormattingScore,
      keywordMatch: geminiAnalysis?.keywordMatch ?? localKeywordMatch,
      roleFit: geminiAnalysis?.roleFit ?? localRoleFit,
      role: detectedRole,
      missingKeywords: geminiAnalysis?.missingKeywords ?? missingKeywords,
      strengths: geminiAnalysis?.strengths ?? localStrengths,
      suggestions: geminiAnalysis?.suggestions ?? localSuggestions,
      skillsMatch: geminiAnalysis?.skillsMatch ?? topSkills,
    }

    return normalizeAnalysis(finalAnalysis, detectedRole)
  } catch (error) {
    console.error('Analysis Error:', error)

    // Only use defaultAnalysis in true emergencies (unexpected errors)
    // For validation/content errors, re-throw with proper error code
    if (error.code === 'INVALID_RESUME') {
      throw error
    }

    throw error
  }
}

export { defaultAnalysis }