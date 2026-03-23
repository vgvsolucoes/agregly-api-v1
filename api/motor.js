import { createClient } from '@supabase/supabase-js'
import OpenAI from "openai"

// Configurando o OpenRouter
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY, // Vamos salvar essa chave na Vercel já já
})

export default async function handler(req, res) {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

  try {
    // 1. O Agregly pede um roteiro para a IA (Usando o Gemini via OpenRouter)
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free", 
      messages: [
        { role: "system", content: "Você é o roteirista de vídeos do Agregly. Crie roteiros curtos de 15 segundos para Reels de imóveis." },
        { role: "user", content: "Crie um roteiro de impacto para uma cobertura de luxo em SP." }
      ],
    })

    const roteiroGerado = completion.choices[0].message.content

    // 2. O Agregly salva esse roteiro no seu Supabase Pro
    const { data, error } = await supabase
      .from('generated_videos')
      .insert([
        { 
          video_url: "processando...", 
          status: "completed", 
          metadata: { roteiro: roteiroGerado } 
        }
      ])
      .select()

    if (error) throw error

    // 3. Resposta final na tela do navegador
    return res.status(200).json({
      status: "🚀 Motor de IA Agregly Online!",
      mensagem: "Roteiro gerado e salvo no banco de dados!",
      roteiro_da_ia: roteiroGerado,
      id_no_banco: data[0].id
    })

  } catch (err) {
    return res.status(500).json({ error: "Erro no Cérebro da IA: " + err.message })
  }
}