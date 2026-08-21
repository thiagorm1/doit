# Doit

Base inicial de uma aplicação web estruturada com arquitetura DDD.

## Tecnologias Utilizadas

- **Frontend:** React, Vite, TypeScript
- **Backend:** Spring Boot (Java 21), Spring Data JPA, Validation
- **Banco de Dados:** PostgreSQL
- **Infraestrutura:** Docker e Docker Compose

## Estrutura do Projeto

- `/frontend`: Aplicação SPA construída com React, Vite e TypeScript.
- `/backend`: API RESTful construída com Spring Boot seguindo os princípios de Domain-Driven Design (DDD).
  - `domain`: Entidades e regras de negócio.
  - `application`: Casos de uso da aplicação e serviços.
  - `infrastructure`: Configurações, integrações externas e repositórios.
  - `presentation`: Controladores REST (APIs).

## Como Executar

### Pré-requisitos
- Node.js (v18+)
- Java 21+
- Maven
- Docker e Docker Compose

### 1. Banco de Dados (PostgreSQL via Docker)
Na raiz do projeto, execute:
```bash
docker-compose up -d
```

### 2. Backend (Spring Boot)
Navegue até a pasta `backend` e inicie a aplicação:
```bash
cd backend
./mvnw spring-boot:run
```

### 3. Frontend (React + Vite)
Navegue até a pasta `frontend`, instale as dependências e inicie o servidor de desenvolvimento:
```bash
cd frontend
npm install
npm run dev
```
