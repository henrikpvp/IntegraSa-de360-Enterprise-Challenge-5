# IntegraSaúde 360

Plataforma de gestão hospitalar para acompanhamento de pacientes, triagem, fila de atendimento e operação clínica.

## Estrutura

```text
IntegraSaúde/
├── Backend/    API Spring Boot, Java 17, JPA, Security e JWT
└── Frontend/   Aplicação Next.js, React, TypeScript e Tailwind CSS
```

## Tecnologias

- Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS, Axios e Lucide React
- Backend: Spring Boot 3.2.5, Java 17, Gradle, Spring Data JPA e Spring Security
- Autenticação: JWT
- Banco local: H2 em memória
- Documentação da API: Springdoc OpenAPI / Swagger

## Pré-requisitos

- Node.js 18 ou superior
- Java 17 ou superior
- Git

As pastas `node_modules`, `.next`, builds locais e o JDK distribuído localmente não fazem parte do repositório. Instale as dependências no ambiente de desenvolvimento.

## Executar o Frontend

```bash
cd IntegraSaúde/Frontend
npm install
npm run dev
```

Acesse http://localhost:3000.

Outros comandos disponíveis:

```bash
npm run build
npm start
npm run lint
```

## Executar o Backend

Em outro terminal:

```bash
cd IntegraSaúde/Backend
./gradlew bootRun
```

No Windows:

```powershell
cd IntegraSaúde/Backend
.\gradlew.bat bootRun
```

A API inicia na porta `8080` com o contexto `/api`.

- Health/API: `http://localhost:8080/api`
- Swagger UI: `http://localhost:8080/api/swagger-ui.html`
- Console H2: `http://localhost:8080/api/h2-console`

## Testes do Backend

```powershell
cd IntegraSaúde/Backend
.\gradlew.bat test
```

## Configuração

O backend usa H2 em memória por padrão. Para definir um segredo JWT diferente, configure a variável de ambiente `JWT_SECRET` antes de iniciar a aplicação.

Nunca utilize o segredo padrão em produção. Para um ambiente produtivo, configure banco persistente, credenciais externas, HTTPS, CORS restrito e segredos por variáveis de ambiente ou secret manager.

## Principais fluxos

- Autenticação e cadastro de usuários
- Cadastro e consulta de pacientes
- Registro de recepção
- Triagem com sinais vitais
- Fila de atendimento priorizada por risco
- Finalização de atendimento
- Gestão de médicos e relatórios no frontend

## Observações

Este projeto está em evolução. A configuração incluída é adequada para desenvolvimento local; antes de publicar em produção, revise autenticação, autorização por perfil, banco de dados, logs, validações e política de segredos.

## Licença

Projeto acadêmico e empresarial de demonstração. Defina a licença antes de distribuir publicamente.
