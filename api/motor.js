// No teu ficheiro api/motor.js, altera para este modelo oficial:
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001", // SEM o ":free" no final
      messages: [
        { 
          role: "system", 
          content: "És o roteirista mestre do Agregly. Cria roteiros de 15 segundos para imóveis de luxo." 
        },
        { 
          role: "user", 
          content: "Cria um roteiro de impacto para uma cobertura de luxo em São Paulo." 
        }
      ],
    })