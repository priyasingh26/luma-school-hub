# Modern Student MIS

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.1.0-blue?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-blue?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.2.0-blue?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

A **Modern Student Management Information System (MIS)** designed for schools, colleges, and universities. Built with **Vite, React, TypeScript, and TailwindCSS**, this system offers a modern, professional UI with dark mode support.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Tailwind Setup](#tailwind-setup)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Manage **students, faculty, courses, and attendance**
- **Responsive UI** with modern design
- **Dark mode** support
- **Custom components** (cards, buttons, tooltips, forms)
- Smooth **animations** (fadeIn, slideUp, scaleIn)
- Ready-to-use **dashboard layouts**
- **React Query** integration
- Optional **Firebase** authentication

---

## Tech Stack

- **Frontend:** React + TypeScript + TailwindCSS + Vite  
- **State Management:** React Query  
- **Styling:** TailwindCSS, CSS variables, custom animations  
- **Authentication:** Firebase (optional)  
- **Deployment:** Vercel / Netlify / GitHub Pages  

---

## Project Structure


src/
│
├─ components/ # Reusable UI components (Tooltip, Toaster, Card, etc.)
├─ hooks/ # Custom React hooks (useAuth, useToast, etc.)
├─ pages/ # Pages (Login, Signup, Dashboard, Settings, Attendance)
├─ App.tsx # Main app entry
├─ index.tsx # React DOM render
├─ index.css # Tailwind + custom CSS
│
tailwind.config.ts # Tailwind configuration
vite.config.ts # Vite configuration


---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/modern-student-mis.git
cd modern-student-mis


Install dependencies:

npm install
# or
yarn install


Run the development server:

npm run dev
# or
yarn dev


Open http://localhost:5173
 in your browser.

Usage

Use the dashboard pages to manage students, faculty, and courses

Toggle dark mode by adding the dark class on <html> or <body>

Customize colors, shadows, and gradients via CSS variables in index.css

Extend UI by creating new components in the components/ folder

Tailwind Setup

Base styles are in index.css

Custom colors and gradients are defined using :root and .dark CSS variables

Animations like fadeIn, slideUp, and scaleIn are pre-defined

Tailwind content paths are configured in tailwind.config.ts to scan all .tsx, .ts, .js, .jsx files

Contributing

Contributions are welcome!

Fork the repository

Create a feature branch: git checkout -b feature-name

Commit your changes: git commit -m "Add new feature"

Push to branch: git push origin feature-name

Open a Pull Request



---

### 2️⃣ GitHub Actions Workflow (`.github/workflows/deploy.yml`)

This workflow builds your Vite project and deploys it to **Netlify**.  

```yaml
name: Deploy to Netlify

on:
  push:
    branches:
      - main  # Deploy when code is pushed to the main branch

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: ./dist
          production-deploy: true
          netlify-auth-token: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          netlify-site-id: ${{ secrets.NETLIFY_SITE_ID }}
