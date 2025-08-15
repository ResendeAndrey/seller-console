Claro, aqui está o seu `README.md` formatado corretamente para o GitHub.

---

# Mini Seller Console

[![Vitest](https://img.shields.io/badge/tests-vitest-blue)](https://vitest.dev/)
[![Cypress](https://img.shields.io/badge/tests-cypress-green)](https://www.cypress.io/)

Mini Seller Console é um painel de CRM para gerenciar **Leads** e **Oportunidades**.

- Gerencie, filtre, pesquise e converta leads em oportunidades.
- Modo Dark/Light com preferência salva no `localStorage`.
- O cache do React Query melhora a performance.
- O HOC `WithHeader` garante um layout consistente com o Header.
- Todos os arquivos contêm comentários explicando suas responsabilidades.

---

## Estrutura do Projeto

```
app/
├─ app.tsx               # Ponto de entrada principal da aplicação
├─ provider/             # AppProvider (QueryClientProvider & ThemeProvider)
├─ routes/               # Configuração do AppRouter
└─ pages/
   └─ dashboard/
      ├─ leads.tsx         # Página de Leads
      └─ opportunities.tsx # Página de Oportunidades
features/
├─ leads/
│  ├─ components/        # Componentes da página de Leads (Filter, SlideOver)
│  ├─ hooks/             # Hooks do React Query para leads
│  ├─ utils/             # Definições de colunas, schema de validação, constantes
│  └─ api/               # Chamadas de API (se houver)
└─ opportunities/
   ├─ components/        # Componentes da página de Oportunidades
   ├─ hooks/             # Hooks do React Query para oportunidades
   ├─ utils/             # Definições de colunas, constantes
   └─ api/               # Chamadas de API (se houver)
hooks/
├─ customs/
│  └─ useDebounce.ts     # Hook customizado de debounce
└─ hoc/
   └─ withHeader.tsx     # HOC que envolve páginas/componentes com o Header
layout/
└─ Header.tsx            # Componente Header
components/               # Componentes de UI compartilhados (Button, Input, Loading, etc.)
context/
└─ theme/                # ThemeProvider (Modo Dark/Light)
utils/
├─ constants/            # Altura da tabela, opções de filtro
└─ helpers/              # Funções utilitárias
```

---

## Tecnologias Utilizadas

- **Frontend:** React 19, TypeScript, TailwindCSS, React Router, React Hook Form, AgGrid
- **Gerenciamento de Estado & API:** React Query (`useQuery`, `useMutation`) com cache
- **Backend:** Express, CORS, UUID, dados simulados de Leads & Oportunidades
- **Testes:** Vitest (testes unitários), Cypress (testes E2E)
- **Utilitários:** clsx, sonner (toasts), yup (validação)

---

## Funcionalidades

### Página de Leads

- Pesquisa, filtro por status e paginação.
- Edição de leads usando um componente SlideOver.
- Conversão de leads em oportunidades.

### Página de Oportunidades

- Pesquisa e paginação.
- Exibe todos os leads convertidos.

### Modo Dark/Light

- Gerenciado via `ThemeProvider`.
- Preferência armazenada no `localStorage`.
- Componentes se adaptam dinamicamente.

### HOC `WithHeader`

- Envolve páginas/componentes com o Header para um layout consistente.

### Performance

- React Query armazena respostas de API em cache para reduzir chamadas de rede.
- Debounce implementado nos campos de busca.

---

## Como Começar

### Pré-requisitos

- Node.js v20+
- Gerenciador de pacotes Yarn

### Instalar Dependências

```bash
yarn install
```

### Rodar em Desenvolvimento

```bash
yarn dev
```
> Executa o frontend Vite + backend Express simultaneamente.
> - **Frontend:** `http://localhost:5000`
> - **Backend:** `http://localhost:4000`

### Build

```bash
yarn build
```

### Rodar Apenas o Backend

```bash
yarn serve
```

### Preview do Frontend

```bash
yarn preview
```

---

## Testes

### Testes Unitários

```bash
yarn test          # Roda todos os testes unitários
yarn test:ui       # UI interativa
yarn test:coverage # Relatório de cobertura
```

### Testes E2E

```bash
yarn cypress       # Abre a UI do Cypress
yarn cypress:run   # Roda o Cypress em modo headless
```

---

## Visão Geral do Backend

#### `/api/leads`
- **GET:** Lista leads com paginação e filtros opcionais de busca/status.
- **PATCH:** Atualiza um lead por ID.

#### `/api/opportunities`
- **GET:** Lista oportunidades com paginação e busca.
- **POST:** Converte um lead em uma oportunidade.

> Os leads são gerados aleatoriamente com nome, empresa, e-mail, pontuação, status e origem.
> Converter um lead o remove da lista de leads e o adiciona às oportunidades.

---

## Performance & Caching

- O **React Query** armazena em cache as chamadas de API para Leads e Oportunidades para melhorar a responsividade da UI.
- A busca com **debounce** reduz chamadas de rede desnecessárias.

## Documentação do Código

- Cada arquivo contém comentários explicando seu propósito e responsabilidades.
- Simplifica o onboarding de novos desenvolvedores e a manutenção do código.
