import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // Teste ultra-simples: apenas listar as tabelas ou tentar ler uma linha
    // IMPORTANTE: Verifique se o nome da tabela no Supabase é 'Videos' ou 'videos'
    const { data, error } = await supabase.from('Videos').select('*').limit(1)

    if (error) {
      return res.status(400).json({ error: "Erro no Supabase: " + error.message })
    }

    return res.status(200).json({ 
      status: "Online", 
      mensagem: "Conexão estabelecida!",
      dados: data 
    })

  } catch (err) {
    return res.status(500).json({ error: "Erro Interno: " + err.message })
  }
}