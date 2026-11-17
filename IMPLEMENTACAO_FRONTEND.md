# SAFEpass — alterações de frontend

As alterações foram feitas sobre a estrutura original, sem recriar o projeto e sem modificar o assistente de IA.

## Novas rotas
- `/login`: tela de entrada.
- `/cadastro`: cadastro com seleção entre empresa e prestador.
- `/recuperar-senha`: solicitação de recuperação de acesso.
- `/empresa/perfil`: interface de perfil da empresa.
- `/notificacoes`: central de notificações com filtros e ações locais.
- `/prestador/agenda`: agenda com visualizações Dia/Semana/Mês, filtro por status e painel de detalhes.

A rota `/` agora direciona para `/login`.

## Navegação
- Adicionado o acesso à agenda no menu do prestador.
- Adicionado o acesso ao perfil da empresa no menu empresarial.
- Adicionado o acesso às notificações nos dois menus.

## Limitações que dependem do backend
O repositório não contém a API principal de autenticação e gestão. Por isso, estas telas não simulam autenticação real nem persistência remota:
- Login e cadastro exibem claramente que a autenticação/cadastro depende da API.
- Recuperação de senha não envia e-mail.
- Perfil da empresa não persiste alterações e não envia logotipo.
- Notificações e agenda usam conteúdo demonstrativo local, identificado na interface.
- Confirmação/cancelamento de agendamentos ainda não foi conectado.

A área do beneficiário não foi criada porque o próprio escopo fornecido a define como condicional e não foi apresentado o requisito oficial que confirme essa modalidade.

## Validação
O ZIP original não continha `node_modules` e o ambiente não tinha pnpm instalado. Portanto, não foi possível executar `typecheck`, lint, build ou testes automatizados nesta sessão. Instale as dependências com `pnpm install` dentro de `frontend` e execute `pnpm typecheck`, `pnpm lint`, `pnpm test` e `pnpm build` antes de publicar.
