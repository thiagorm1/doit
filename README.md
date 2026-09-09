# DOiT

Plataforma web para gestao de estudos, produtividade e foco.

## Tecnologias

- Frontend: React 18, TypeScript, Vite, Tailwind CSS, Excalidraw, React Router
- Backend: Java 21, Spring Boot, Spring Data JPA
- Banco de Dados: PostgreSQL
- Containerizacao: Docker, Docker Compose

## Estrutura do Projeto

- backend/: API RESTful desenvolvida em Spring Boot com arquitetura em camadas orientada a dominio (DDD).
  - domain/: Entidades, contratos e regras de negocio.
  - application/: Casos de uso, DTOs e servicos da aplicacao.
  - infrastructure/: Adaptadores, repositorios JPA e configuracoes externas.
  - presentation/: Controladores REST e exposicao de endpoints.
- frontend/: Interface SPA desenvolvida em React com TypeScript.
  - src/app/: Ponto de entrada, configuracao de rotas e componentes globais.
  - src/modules/studies/: Modulo de estudos (Pomodoro, YouTube Player, Faculdade, Concursos, Base de Conhecimento e Excalidraw).
  - src/shared/: Layouts, configuracoes da API, utilitarios de edicao e componentes compartilhados.

## Execucao

### Pre-requisitos

- Docker e Docker Compose
- Node.js 18+ (opcional para execucao local fora do container)
- Java 21 e Maven (opcional para execucao local fora do container)

### Execucao via Docker Compose

Inicie todos os servicos (banco de dados, API e frontend):

```bash
docker-compose up -d
```

Servicos disponiveis:
- Frontend: http://localhost:5173
- Backend: http://localhost:8080
- PostgreSQL: localhost:5432

### Execucao Local (Desenvolvimento)

1. Banco de Dados:
```bash
docker-compose up -d db
```

2. Backend:
```bash
cd backend
./mvnw spring-boot:run
```

3. Frontend:
```bash
cd frontend
npm install
npm run dev
```
