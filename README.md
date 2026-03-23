r# 🚀 Agregly API | Infraestrutura de IA Generativa

Bem-vindo ao repositório de documentação da **Agregly**, uma plataforma de orquestração de conteúdo inteligente desenhada para escalar a presença digital de imobiliárias e criadores de conteúdo através de automação de ponta.

## 🧠 Sobre o Projeto
A Agregly não é apenas um app, mas uma **infraestrutura robusta** que gerencia o ciclo de vida completo da produção de mídia via IA. Este repositório contém a especificação **OpenAPI 3.0** que governa a comunicação entre o banco de dados (Supabase) e os modelos de Inteligência Artificial.

### 🛠️ Arquitetura de Dados (Core)
A API gerencia mais de 20 fluxos de dados críticos, incluindo:
- **Orquestração de Vídeos:** Controle de status, processamento e entrega de ativos visuais (`generated_videos`, `launch_videos`).
- **Automação de Redes Sociais:** Agendamento inteligente e publicação automática (`scheduled_posts`, `published_posts`).
- **CRM & Leads:** Captura de intenção de compra e qualificação de clientes via chat (`chats`, `messages`).
- **Monetização & Uso:** Gestão de quotas de IA, logs de consumo por token e controle de faturamento (`api_usage_logs`, `invoices`).

## ⚙️ Tecnologias Utilizadas
- **OpenAPI / Swagger:** Para padronização e documentação técnica.
- **Supabase (PostgreSQL):** Camada de dados com segurança nível enterprise (RLS).
- **Redoc:** Interface de visualização de alta performance (estilo Stripe/OpenAI).
- **Git/GitHub:** Para versionamento e governança de código.

## 📖 Como Visualizar a Documentação
Para visualizar a documentação interativa e testar os endpoints:
1. Clone este repositório.
2. Abra o arquivo `index.html` no seu navegador ou acesse o link da **Vercel** (em breve).
3. Utilize sua `anon_key` no header `apikey` para autenticação.

## 👩‍💻 Sobre a Autora
Desenvolvido por uma Engenheira de IA focada em **Independência Financeira através da Tecnologia**. Este projeto demonstra competência em:
- Arquitetura de Sistemas Escaláveis.
- Integração de Modelos de Linguagem (LLMs).
- Gestão de Infraestrutura Cloud e Backend-as-a-Service.

---
*Este projeto está licenciado sob a [MIT License](LICENSE).*eadme