// AGREGLY MOTOR - REVISADO 2026
import { createClient } from '@supabase/supabase-js'
import OpenAI from "openai"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
})

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.SUPABASE_URL, 
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001", 
      messages: [
        { role: "system", content: "Você é o roteirista do Agregly." },
        { role: "user", content: "Crie um roteiro de 15 segundos para uma cobertura de luxo." }
      ],
    })

    const roteiro = completion.choices[0].message.content

    const { data, error } = await supabase
      .from('generated_videos')
      .insert([{ 
        video_url: "pendente", 
        status: "completed", 
        metadata: { roteiro_ia: roteiro } 
      }])
      .select()

    if (error) throw error

    return res.status(200).json({ status: "🚀 Sucesso!", roteiro })

  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}