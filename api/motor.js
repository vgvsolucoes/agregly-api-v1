import { createClient } from '@supabase/supabase-js'
import OpenAI from "openai"

// 1. Configurando o "Cérebro" (OpenRouter)
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY, 
})

export default async function handler(req, res) {
  // 2. Conectando ao "Cofre" (Supabase)
  const supabase = createClient(
    process.env.SUPABASE_URL, 
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  try {
    // 3. O Agregly pede um roteiro para a IA (Usando o Gemini 2.0 Flash Lite Free)
    const completion = await openai.chat.completions.create({
      model: "model: "google/gemini-2.0-flash-001-Lite-free", 
      messages: [
        { 
          role: "system", 
          content: "Você é o roteirista mestre do Agregly. Crie roteiros de 15 segundos para vídeos curtos de imóveis de alto padrão. Foque em gatilhos mentais e luxo." 
        },
        { 
          role: "user", 
          content: "Crie um roteiro de impacto para uma cobertura de luxo em São Paulo com vista para o Ibirapuera." 
        }
      ],
    })

    const roteiroGerado = completion.choices[0].message.content

    // 4. O Agregly salva esse roteiro na sua tabela 'generated_videos'
    const { data, error } = await supabase
      .from('generated_videos')
      .insert([
        { 
          video_url: "processando_ia", 
          status: "completed", 
          metadata: { 
            roteiro: roteiroGerado,
            modelo_usado: "gemini-2.0-flash-lite"
          } 
        }
      ])
      .select()

    if (error) throw error

    // 5. O Grande Gran Finale: Resposta na sua tela!
    return res.status(200).json({
      status: "🚀 Motor Agregly Ativo!",
      mensagem: "IA pensou e o banco de dados gravou!",
      roteiro_da_ia: roteiroGerado,
      id_no_banco: data[0].id
    })

  } catch (err) {
    // Se algo der errado, ele avisa exatamente onde foi
    return res.status(500).json({ 
      error: "Falha no Motor do Agregly", 
      detalhes: err.message 
    })
  }
}