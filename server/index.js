import dotenv from "dotenv";
dotenv.config();

import cors from 'cors'
import express from 'express'
import multer from 'multer'
import { analyzeWithGemini } from './services/geminiService.js'
import { extractResumeText } from './services/resumeParser.js'

const app = express()
const port = Number(process.env.PORT || 5000)

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  }),
)
app.use(express.json())

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const extension = file.originalname.split('.').pop()?.toLowerCase()
    if (extension === 'pdf' || extension === 'docx') {
      cb(null, true)
      return
    }
    cb(new Error('Only PDF and DOCX files are allowed'))
  },
})

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/analyze', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Resume file is required.' })
    }

    const extractedText = await extractResumeText(req.file)
    if (!extractedText?.trim()) {
      return res.status(422).json({ error: 'Could not extract resume text.' })
    }

    const analysis = await analyzeWithGemini(extractedText)
    return res.json({
      fileName: req.file.originalname,
      analysis,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Resume analysis failed.'

    // Handle specific error codes
    if (error.code === 'INVALID_RESUME') {
      return res.status(422).json({
        error: message
      })
    }

    if (message.includes('GEMINI_API_KEY')) {
      return res.status(500).json({
        error:
          'Gemini API key is missing. Set GEMINI_API_KEY to enable real analysis.',
      })
    }

    if (message.includes('JSON')) {
      return res.status(502).json({ error: 'AI returned an invalid response.' })
    }

    if (message.includes('Could not extract')) {
      return res.status(422).json({ error: message })
    }

    if (message.includes('Only PDF and DOCX')) {
      return res.status(400).json({ error: message })
    }

    if (message.includes('insufficient content')) {
      return res.status(422).json({ error: message })
    }

    return res.status(500).json({ error: message })
  }
})

app.use((error, _req, res) => {
  if (error?.message?.includes('File too large')) {
    return res.status(400).json({ error: 'File exceeds 5MB limit.' })
  }
  return res.status(400).json({ error: error.message || 'Request failed.' })
})

app.listen(port, () => {
  console.log(`Resume analyzer server running on http://localhost:${port}`)
})
