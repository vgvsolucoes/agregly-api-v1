import { createClient } from '@supabase/supabase-js'
import OpenAI from "openai"

// Aqui é onde definimos a variável que estava faltando!
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
})

export default async function handler(req, res) {
  // Inicializa o Supabase
  const supabase = createClient(
    process.env.SUPABASE_URL, 
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  try {
    // Agora o 'openai' já existe e vai funcionar!
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001", 
      messages: [
        { role: "system", content: "Você é o roteirista do Agregly." },
        { role: "user", content: "Crie um roteiro de 15 segundos para uma cobertura de luxo em SP." }
      ],
    })

    const roteiro = completion.choices[0].message.content

    // Salva no Supabase para você ver o histórico depois
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
    // Se der erro de saldo ou chave, ele vai avisar aqui
    return res.status(500).json({ error: "Erro no Motor: " + err.message })
  }
}