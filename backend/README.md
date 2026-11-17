# SAFEpass — API temporária de autenticação (demonstração)

A autenticação temporária está implementada por Route Handlers do Next.js em `frontend/src/app/api/auth`. Esta pasta guarda os dados locais em `backend/data/users.json` para permitir demonstrar cadastro, login, sessão, proteção de rotas e logout sem depender do backend definitivo do squad.

## Endpoints

- `POST /api/auth/register` — cria usuário e inicia sessão.
- `POST /api/auth/login` — autentica e inicia sessão.
- `GET /api/auth/me` — retorna o usuário da sessão atual.
- `POST /api/auth/logout` — encerra a sessão.
- `POST /api/auth/recovery` — recebe solicitação de recuperação (resposta demonstrativa; não envia e-mail).

## Contrato de usuário

`{ id, name, email, role }`, onde `role` é `empresa` ou `prestador`.

## Como substituir pelo backend definitivo

A UI chama somente os endpoints `/api/auth/*`. Quando o squad entregar a API, mantenha esse contrato e altere a implementação dos handlers em `frontend/src/app/api/auth` para encaminhar as chamadas ao serviço definitivo. Os formulários e as telas não precisam ser refeitos.

## Limitações importantes

Esta implementação é para demonstração local: armazena usuários em JSON, usa cookie de sessão assinado e não substitui uma solução de produção. Não publique em produção nem use dados pessoais reais. Recuperação de senha não envia link; integração de e-mail, banco de dados, rate limiting, política de senha, auditoria e gestão de tokens devem ser concluídos pelo backend definitivo. Defina `SAFEPASS_SESSION_SECRET` com um segredo forte no ambiente local.
