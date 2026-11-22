# SAFEpass — camada temporária de API

## Objetivo

O frontend mantém a comunicação HTTP isolada para que a equipe do backend possa
substituir a implementação sem reescrever componentes ou telas.

## O que é temporário hoje

- Os endpoints `/api/auth/*` do Next.js implementam autenticação local de demonstração.
- O cadastro aceita somente os perfis `empresa` e `prestador`.
- Os usuários são gravados em `../backend/data/users.json`; isso não é banco de dados
  multi-instância e não deve ser usado em produção.
- Recuperação de senha é demonstrativa e não envia e-mail.
- Parte das áreas de prestador/empresa usa dados locais de apresentação.
- Agenda, notificações e perfil de empresa ainda não persistem em uma API de domínio.

## Como conectar o backend definitivo

1. Configure `NEXT_PUBLIC_API_BASE_URL` com a URL pública da API.
2. Mantenha os caminhos e formatos de resposta acordados com a equipe backend.
3. Migre as chamadas de cada feature para `src/lib/api/client.ts` (ou adapte somente
   esse módulo caso o backend mantenha o contrato HTTP).
4. Remova os Route Handlers temporários de `src/app/api/auth` quando a autenticação
   definitiva estiver publicada e validada.
5. Remova `src/lib/auth/store.ts`, `src/lib/auth/http.ts` e o arquivo JSON local
   somente depois da migração e dos testes de sessão.
6. Atualize os tipos a partir do OpenAPI do backend e substitua os dados demonstrativos
   por consultas reais.

## Segurança e limitações

- Não habilitar cadastro público de administrador.
- O frontend não é a autoridade de autorização: toda permissão deve ser validada
  novamente pelo backend.
- Não usar localStorage para tokens ou dados sensíveis.
- O cookie e o armazenamento JSON locais são apenas uma ponte de desenvolvimento.
- Dados demonstrativos precisam permanecer identificados como demonstração até a API
  real fornecer dados persistidos.

## Validação local

Na pasta `frontend`:

```powershell
pnpm install
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

A camada HTTP não substitui os endpoints de domínio. Marketplace, pontos, resgates,
dependentes, documentos, relatórios, validação de cupons e administração precisam
de contratos e autorização implementados pelo backend antes de funcionarem com dados
reais.
