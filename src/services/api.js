import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://ai-resume-analyzer-blfa.onrender.com'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
})

export async function analyzeResume(file) {
  const formData = new FormData()
  formData.append('resume', file)

  const response = await api.post('/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}