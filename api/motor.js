import { createClient } from '@supabase/supabase-js'
import OpenAI from "openai"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
})

export default async function handler(req, res) {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

  try {
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.2-3b-instruct:free",
      messages: [
        { role: "system", content: "Você é um roteirista de vídeos imobiliários." },
        { role: "user", content: "Crie um roteiro de 15 segundos para um apartamento em SP." }
      ],
    })

    const roteiroGerado = completion.choices[0].message.content

    const { data, error } = await supabase
      .from('generated_videos')
      .insert([
        { 
          video_url: "processando", 
          status: "completed", 
          metadata: { roteiro: roteiroGerado } 
        }
      ])
      .select()

    if (error) throw error

    return res.status(200).json({
      status: "🚀 Motor Online!",
      roteiro: roteiroGerado
    })

  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}