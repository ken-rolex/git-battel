# ⚔️ GitHub Battle App (Dockerized)

This project is a Vite + TypeScript based GitHub Battle app, styled with Tailwind CSS. This guide shows how to run it using Docker.

---

## 🐳 Run with Docker

### 📦 1. Navigate to the Project Folder

Make sure you're in the root folder where the Dockerfile is located.

```bash
cd project

```
### 🛠️ 2. Build the Docker Image

Build the Docker image with a custom tag name (github-battel):

```bash
docker build -t github-battel .

```

#### 🚀 3. Run the Container

Once the image is built, run the container and expose port 4173 (used by Vite preview server):

```bash
docker run -p 4173:4173 github-battel


```
### 📋 4. Check Running Containers (Optional)

To verify the container is running:

```bash

docker ps

```

### ⚙️ Environment Variables


If your app relies on a .env file (already included), Docker needs access to it. You can mount it like this:

```bash

docker run --env-file .env -p 4173:4173 github-battel


``` 
###  📁 Project Structure (Important Files)

```

project/

├── 📁 dist
│   └── 📁 assets
├── 📁 src
│   ├── 📁 api
│   │   └── github.ts
│   ├── 📁 components
│   │   ├── AuthModal.tsx
│   │   ├── ComparisonContainer.tsx
│   │   ├── ComparisonResults.tsx
│   │   ├── ErrorDisplay.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ProfileCard.tsx
│   │   ├── ProfileSearch.tsx
│   │   └── ShareButton.tsx
│   ├── 📁 pages
│   │   ├── AboutPage.tsx
│   │   ├── ChatbotPage.tsx
│   │   ├── HomePage.tsx
│   │   └── HowItWorksPage.tsx
│   ├── 📁 services
│   │   ├── ai.ts
│   │   ├── clerk.ts
│   │   └── supabase.ts
│   ├── 📁 types
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── 📁 supabase
│   └── 📁 migrations
│       └── 20250504164436_pale_pond.sql
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vite.config.ts.timestamp-1746625059124-3cacb0d4adec3.mjs

