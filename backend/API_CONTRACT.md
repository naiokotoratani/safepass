# Contrato provisório para integração do SAFEpass

A camada temporária foi criada para poder ser substituída sem alterar os componentes visuais.

| Método | Rota | Entrada | Saída principal |
|---|---|---|---|
| POST | `/api/auth/register` | `name,email,password,role,document,phone,specialty?` | `{ user }` |
| POST | `/api/auth/login` | `email,password` | `{ user }` |
| GET | `/api/auth/me` | cookie de sessão | `{ user }` |
| POST | `/api/auth/logout` | — | `{ ok: true }` |
| POST | `/api/auth/recovery` | `email` | `{ message }` |

`role`: `empresa` ou `prestador`. `user`: `id,name,email,role`.

O contrato pode ser mantido pelo backend definitivo. Se o squad escolher outros caminhos ou nomes, basta adaptar os handlers de `frontend/src/app/api/auth` como uma camada de compatibilidade.
