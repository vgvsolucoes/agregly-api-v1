import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  // A Vercel vai usar as chaves que você salvou no Dashboard automaticamente
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  try {
    // Vamos tentar ler a tabela 'Videos' que você desenhou no Swagger
    // Se a tabela ainda estiver vazia, ele retornará um array vazio [], o que é um sucesso!
    const { data, error } = await supabase
      .from('Videos') 
      .select('*')
      .limit(5)

    if (error) throw error

    return res.status(200).json({
      status: "🚀 Agregly Engine Online",
      mensagem: "Conexão entre Vercel e Supabase estabelecida com sucesso!",
      ambiente: "Produção",
      dados_encontrados: data
    })

  } catch (error) {
    return res.status(500).json({
      status: "Erro na Engenharia",
      mensagem: "O motor não conseguiu aceder ao banco de dados.",
      detalhes: error.message
    })
  }
}