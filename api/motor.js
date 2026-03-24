import { createClient } from '@supabase/supabase-js'
import OpenAI from "openai"

// 1. Criando a variável 'openai' (com 'o' minúsculo)
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
    // 2. Usando a variável 'openai' que criamos lá em cima
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001", 
      messages: [
        { role: "system", content: "Você é o roteirista mestre do Agregly." },
        { role: "user", content: "Crie um roteiro de 15 segundos para uma cobertura de luxo." }
      ],
    })

    const roteiro = completion.choices[0].message.content

    const { data, error } = await supabase
      .from('generated_videos')
      .insert([{ 
        video_url: "pendente", 
        status: "completed", 
        metadata: { roteiro_gerado: roteiro } 
      }])
      .select()

    if (error) throw error

    return res.status(200).json({
      status: "🚀 Motor Online!",
      roteiro_ia: roteiro
    })

  } catch (err) {
    return res.status(500).json({ error: "Erro no Motor: " + err.message })
  }
}