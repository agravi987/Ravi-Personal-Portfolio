# Ravi Personal Portfolio

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

A modern personal portfolio for Ravi Agrahari. It combines public portfolio pages, a protected admin dashboard, MongoDB-managed content, Cloudinary uploads, a contact workflow, and a public GitHub project explorer.

## Features

- Dynamic portfolio content for profile, projects, skills, knowledge, experience, achievements, and contacts.
- Protected admin routes powered by NextAuth credentials authentication.
- Cloudinary-backed image upload and deletion through authenticated server routes.
- Contact form with validation, email notifications, honeypot spam protection, and basic rate limiting.
- Public GitHub project explorer for `github.com/agravi987` with search, language filters, topic filters, status filters, and repository stats.
- Responsive Tailwind UI with dark mode, motion, project case-study modals, and fallback data.

## Tech Stack

- Framework: Next.js 16 App Router
- Language: TypeScript
- Styling: Tailwind CSS, Framer Motion
- Database: MongoDB with Mongoose
- Authentication: NextAuth.js v5
- Media: Cloudinary
- Forms: React Hook Form
- Validation: Zod

## Getting Started

Install dependencies:

```bash
npm install
```

Create `.env.local` and configure:

```env
MONGODB_URI=
AUTH_SECRET=
ADMIN_USERNAME=
ADMIN_PASSWORD=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_USER=
EMAIL_PASS=
EMAIL_TO=
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Useful Scripts

```bash
npm run lint
npm run build
npm run start
```

## Project Structure

- `src/app`: App Router pages and API routes.
- `src/components`: Reusable public, admin, and UI components.
- `src/lib`: Portfolio services, database connection, validation, email, and helpers.
- `src/models`: Mongoose schemas.
- `public`: Static assets and resume.

## GitHub Explorer

The GitHub explorer uses public GitHub repository data from `agravi987`, so no Personal Access Token is required for public projects. If private repositories or higher API limits are needed later, add a server-only fine-grained read-only token and never expose it to client code.

Made by Ravi Agrahari.
