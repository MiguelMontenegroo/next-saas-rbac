# next-saas-rbac

Saas multi tenant

# Next.js SaaS + RBAC

This project contains all the necessary boilerplate to setup a multi-tenant SaaS with Next.js including authentication and RBAC authorization.

Note: I have standardized all my commits on GitHub in English to demonstrate my proficiency as an English speaker.

## Features

### Authentication

- [ ] It should be able to authenticate using e-mail & password;
- [ ] It should be able to authenticate using Github account;
- [ ] It should be able to recover password using e-mail;
- [x] It should be able to create an account (e-mail, name and password);

### Organizations

- [ ] It should be able to create a new organization;
- [ ] It should be able to get organizations to which the user belongs;
- [ ] It should be able to update an organization;
- [ ] It should be able to shutdown an organization;
- [ ] It should be able to transfer organization ownership;

### Invites

- [ ] It should be able to invite a new member (e-mail, role);
- [ ] It should be able to accept an invite;
- [ ] It should be able to revoke a pending invite;

### Members

- [ ] It should be able to get organization members;
- [ ] It should be able to update a member role;

### Projects

- [ ] It should be able to get projects within a organization;
- [ ] It should be able to create a new project (name, url, description);
- [ ] It should be able to update a project (name, url, description);
- [ ] It should be able to delete a project;

### Billing

- [ ] It should be able to get billing details for organization ($20 per project / $10 per member excluding billing role);

## RBAC

Roles & permissions.

### Roles

- Owner (count as administrator)
- Administrator
- Member
- Billing (one per organization)
- Anonymous

### Permissions table

|                          | Administrator | Member | Billing | Anonymous |
| ------------------------ | ------------- | ------ | ------- | --------- |
| Update organization      | ✅            | ❌     | ❌      | ❌        |
| Delete organization      | ✅            | ❌     | ❌      | ❌        |
| Invite a member          | ✅            | ❌     | ❌      | ❌        |
| Revoke an invite         | ✅            | ❌     | ❌      | ❌        |
| List members             | ✅            | ✅     | ✅      | ❌        |
| Transfer ownership       | ⚠️            | ❌     | ❌      | ❌        |
| Update member role       | ✅            | ❌     | ❌      | ❌        |
| Delete member            | ✅            | ⚠️     | ❌      | ❌        |
| List projects            | ✅            | ✅     | ✅      | ❌        |
| Create a new project     | ✅            | ✅     | ❌      | ❌        |
| Update a project         | ✅            | ⚠️     | ❌      | ❌        |
| Delete a project         | ✅            | ⚠️     | ❌      | ❌        |
| Get billing details      | ✅            | ❌     | ✅      | ❌        |
| Export billing details   | ✅            | ❌     | ✅      | ❌        |

> ✅ = allowed
> ❌ = not allowed
> ⚠️ = allowed w/ conditions

#### Conditions

- Only owners may transfer organization ownership;
- Only administrators and project authors may update/delete the project;
- Members can leave their own organization;

Tecnologias:

Back-end:

Turborepo:  ferramenta de build e gerenciamento de monorepos, criada para otimizar o processo de desenvolvimento em projetos

CASL: biblioteca JavaScript voltada para a implementação de controle de acesso baseado em regras

zod: biblioteca TypeScript para validação e definição de esquemas de dados

PRISMA: O Prisma ORM é um mapeador objeto-relacional (ORM) moderno para Node.js e TypeScript, que facilita a interação com bancos de dados SQL, como PostgreSQL, MySQL e SQLite.

brcryptjs: biblioteca JavaScript para hash de senhas.

fakerjs:  biblioteca JavaScript usada para gerar dados falsos (mock data) de forma aleatória.

Fastify: O Fastify é um framework web para Node.js focado em desempenho, baixo consumo de recursos e extensibilidade.

Fastify Swagger UI: O Fastify Swagger UI é uma ferramenta que permite gerar e visualizar automaticamente a documentação de APIs criadas com o Fastify, usando o Swagger UI

------------

Front-end:

Shadcn/ui: biblioteca de componentes para React baseada no Radix UI e estilizada com Tailwind CSS.

KY: biblioteca JavaScript leve para fazer requisições HTTP, funcionando como uma alternativa simplificada ao fetch e ao axios.

cookies-next: biblioteca para Next.js que facilita o gerenciamento de cookies no lado do cliente e do servidor.

next-themes: biblioteca para Next.js que facilita a implementação de temas dinâmicos, como modo claro e escuro.