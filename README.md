# Mini Seller Console

[![Vitest](https://img.shields.io/badge/tests-vitest-blue)](https://vitest.dev/)
[![Cypress](https://img.shields.io/badge/tests-cypress-green)](https://www.cypress.io/)
[![Build](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![Coverage](https://img.shields.io/badge/coverage-100%25-blue)](#)

Mini Seller Console is a CRM dashboard for managing **Leads** and **Opportunities**.

* Manage, filter, search, and convert leads into opportunities.
* Dark/Light mode with preference stored in `localStorage`.
* React Query caching improves performance.
* HOC `WithHeader` ensures consistent layout with Header.
* All files contain comments explaining responsibilities.

---

## Project Structure

```text
app/
  app.tsx
  provider/            # AppProvider (QueryClientProvider & ThemeProvider)
  routes/              # AppRouter configuration
  pages/
    dashboard/
      leads.tsx        # Leads page
      opportunities.tsx # Opportunities page

features/
  leads/
    components/        # Leads page components (Filter, SlideOver)
    hooks/             # React Query hooks for leads
    utils/             # Column definitions, validation schema, constants
    api/               # API calls (if any)
  opportunities/
    components/        # Opportunities page components
    hooks/             # React Query hooks for opportunities
    utils/             # Column definitions, constants
    api/               # API calls (if any)

hooks/
  customs/
    useDebounce.ts     # Custom debounce hook
    hoc/
      withHeader.tsx   # HOC wrapping pages/components with Header

layout/
  Header.tsx           # Header component

components/            # Shared UI components (Button, Input, Loading, Pagination, SearchInput)

context/
  theme/               # ThemeProvider (Dark/Light mode)

utils/
  constants/           # Table height, filter options
  helpers/             # Utility functions
```

---

## Technologies Used

* **Frontend:** React 19 + Vite, TypeScript, TailwindCSS, React Router, React Hook Form, AgGrid
* **State Management & API:** React Query (`useQuery`, `useMutation`) with caching
* **Backend:** Express, CORS, UUID, simulated Leads & Opportunities data
* **Testing:** Vitest (unit tests), Cypress (E2E tests)
* **Utilities:** clsx, sonner (toasts), yup (validation)

---

## Features

### Leads Page

* Search, filter by status, and pagination
* Edit leads using a SlideOver component
* Convert leads into opportunities

### Opportunities Page

* Search and pagination
* Displays all converted leads

### Dark/Light Mode

* Managed via `ThemeProvider`
* Preference stored in `localStorage`
* Components adapt dynamically

### HOC `WithHeader`

* Wraps pages/components with Header and consistent layout

### Performance

* React Query caches API responses to reduce network calls
* Debounce implemented in search inputs

---

## Getting Started

### Prerequisites

* Node.js v20+
* Yarn package manager

### Install Dependencies

```bash
yarn install
```

### Run Development

```bash
yarn dev
```

Runs Vite frontend + Express backend concurrently:

* Frontend: [http://localhost:5000](http://localhost:5000)
* Backend: [http://localhost:4000](http://localhost:4000)

### Build

```bash
yarn build
```

### Run Backend Only

```bash
yarn serve
```

### Preview Frontend

```bash
yarn preview
```

---

## Quick Start Examples

### Open Leads Page

1. Go to [http://localhost:5000/dashboard/leads](http://localhost:5000/dashboard/leads)
2. Search for a lead by name or filter by status
3. Edit using the SlideOver component
4. Convert lead to opportunity

### Open Opportunities Page

1. Go to [http://localhost:5000/dashboard/opportunities](http://localhost:5000/dashboard/opportunities)
2. Search or paginate through all converted leads

---

## Testing

### Unit Tests

```bash
yarn test          # Run all unit tests
yarn test:ui       # Interactive UI
yarn test:coverage # Coverage report
```
<div align="center">
<img width="799" height="470" alt="image" src="https://github.com/user-attachments/assets/7d864c18-5ab9-4dcc-81c3-9d828ce88dd4" />
</div>



### E2E Tests

```bash
yarn cypress       # Open Cypress UI
yarn cypress:run   # Run Cypress headless
```
<div align="center">
<img width="724" height="546" alt="image" src="https://github.com/user-attachments/assets/1296cd0d-3016-48b2-ab51-0741fc9b23b8" />
</div>
---

## Backend Overview

### `/api/leads`

* **GET** - List leads with pagination, optional search/status filters
* **PATCH** - Update a lead by ID

### `/api/opportunities`

* **GET** - List opportunities with pagination and search
* **POST** - Convert a lead into an opportunity

Notes:

* Leads are randomly generated with name, company, email, score, status, and source
* Converting a lead removes it from leads and adds it to opportunities

---

## Performance & Caching

* React Query caches API calls for Leads and Opportunities to improve UI responsiveness
* Debounced search reduces unnecessary network calls

---

## Code Documentation

* Every file contains comments explaining purpose and responsibilities
* Simplifies onboarding and maintenance
