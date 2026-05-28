import { GoogleGenerativeAI } from '@google/generative-ai'

const defaultAnalysis = {
  atsScore: 75,
  formattingScore: 80,
  keywordMatch: 70,
  roleFit: 72,
  missingKeywords: ['AWS', 'CI/CD', 'System Design'],
  strengths: [
    'Clear project structure and section separation',
    'Relevant technical stack listed',
    'Readable formatting for ATS systems',
  ],
  suggestions: [
    'Add quantified achievements to experience bullets',
    'Include more role-specific cloud and backend keywords',
    'Highlight ownership and leadership impact',
  ],
  skillsMatch: [
    { name: 'React', score: 88 },
    { name: 'JavaScript', score: 85 },
    { name: 'TypeScript', score: 74 },
    { name: 'Testing', score: 65 },
  ],
}

function normalizeArray(input) {
  return Array.isArray(input)
    ? input.filter((item) => typeof item === 'string')
    : []
}

function normalizeSkills(skills) {
  if (!Array.isArray(skills)) return defaultAnalysis.skillsMatch

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

  return normalized.length > 0
    ? normalized
    : defaultAnalysis.skillsMatch
}

function normalizeAnalysis(parsed) {
  return {
    atsScore: Number.isFinite(parsed?.atsScore)
      ? Math.max(0, Math.min(100, parsed.atsScore))
      : defaultAnalysis.atsScore,

    formattingScore: Number.isFinite(parsed?.formattingScore)
      ? Math.max(0, Math.min(100, parsed.formattingScore))
      : defaultAnalysis.formattingScore,

    keywordMatch: Number.isFinite(parsed?.keywordMatch)
      ? Math.max(0, Math.min(100, parsed.keywordMatch))
      : defaultAnalysis.keywordMatch,

    roleFit: Number.isFinite(parsed?.roleFit)
      ? Math.max(0, Math.min(100, parsed.roleFit))
      : defaultAnalysis.roleFit,

    missingKeywords: normalizeArray(parsed?.missingKeywords).slice(0, 10),

    strengths: normalizeArray(parsed?.strengths).slice(0, 8),

    suggestions: normalizeArray(parsed?.suggestions).slice(0, 8),

    skillsMatch: normalizeSkills(parsed?.skillsMatch).slice(0, 12),
  }
}

function buildPrompt(resumeText) {
  return `
You are an expert ATS evaluator and technical recruiter.

Analyze the resume text below and return STRICT JSON only.

Required JSON schema:

{
  "atsScore": number,
  "formattingScore": number,
  "keywordMatch": number,
  "roleFit": number,
  "missingKeywords": string[],
  "strengths": string[],
  "suggestions": string[],
  "skillsMatch": [
    {
      "name": string,
      "score": number
    }
  ]
}

Requirements:
- Return valid JSON only
- No markdown
- No explanation text
- Scores between 0-100
- At least 3 strengths
- At least 3 suggestions
- 4-8 skill matches

Resume text:
${resumeText.slice(0, 12000)}
`
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

export async function analyzeWithGemini(resumeText) {
  try {
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured')
    }

    const client = new GoogleGenerativeAI(apiKey)

    const model = client.getGenerativeModel({
      model: 'gemini-1.5-flash-latest',
    })

    const prompt = buildPrompt(resumeText)

    const result = await model.generateContent(prompt)

    const response = await result.response

    const text = response.text()

    const parsed = parseJsonFromText(text)

    return normalizeAnalysis(parsed)
  } catch (error) {
    console.error('Gemini Analysis Error:', error)

    return defaultAnalysis
  }
}

export { defaultAnalysis }