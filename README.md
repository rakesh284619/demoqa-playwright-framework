# DemoQA Playwright Framework

Playwright + TypeScript end-to-end automation framework with **Page Object Model (POM)** covering:

- **UI**: DemoQA Book Store Application (`https://demoqa.com/`)
- **API**: ReqRes User Management (`https://reqres.in/`)

---

## Project Structure

```
demoqa-framework/
├── pages/                      # Page Object classes (POM)
│   ├── HomePage.ts             # DemoQA home — card navigation
│   ├── LoginPage.ts            # Book Store login / logout
│   └── BookStorePage.ts        # Book search, validation, file output
├── services/                   # API service wrappers
│   └── ReqResApiService.ts     # ReqRes CRUD operations
├── tests/
│   ├── ui/
│   │   └── bookstore.spec.ts   # UI end-to-end test
│   └── api/
│       └── reqres.spec.ts      # API tests (create / get / update)
├── utils/
│   ├── env.ts                  # .env loader
│   └── logger.ts               # Structured JSON logger
├── output/                     # Created at runtime — book_details.txt
├── .env.example                # Copy to .env and fill credentials
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

## Setup

### 1. Install dependencies

```bash
npm install
npx playwright install chromium
```

### 2. Register a DemoQA user (manual step)

Visit `https://demoqa.com/register` and create a new account.

### 3. Configure credentials

```bash
cp .env.example .env
```

Edit `.env`:

```
DEMOQA_USERNAME=your_username
DEMOQA_PASSWORD=your_password
```

> ⚠️ The `.env` file is git-ignored. **Never commit real credentials.**

---

## Running Tests

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:ui` | UI tests only |
| `npm run test:api` | API tests only |
| `npm run test:headed` | Run in headed (visible) browser |
| `npm run report` | Open HTML report |

---

## UI Test — What It Does

1. Navigate to `https://demoqa.com/`
2. Click **Book Store Application** card
3. Navigate to `/login` and log in with your credentials
4. **Validate** username label and logout button are visible
5. Open **Book Store** from the side menu
6. Search for `Learning JavaScript Design Patterns`
7. **Validate** the book appears in the result table
8. **Write** Title, Author, Publisher to `output/book_details.txt`
9. Click **Log Out** and verify redirect to login page

---

## API Tests — What They Do

| # | Test | Endpoint | Validation |
|---|------|----------|------------|
| 1 | Create user | `POST /api/users` | HTTP 201, id returned, name & job match |
| 2 | Get user details | `GET /api/users/2` | HTTP 200, all fields present |
| 3 | Update user name | `PUT /api/users/:id` | HTTP 200, updated name in response |

> `reqres.in` is a public mock API. The `GET` endpoint returns static data (ids 1–12); `POST` and `PUT` reflect the request body back with a generated id/timestamp.

---

## Output

After a successful UI test run, `output/book_details.txt` will contain:

```
Title     : Learning JavaScript Design Patterns
Author    : Addy Osmani
Publisher : O'Reilly Media
```
