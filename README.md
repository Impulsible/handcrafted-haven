Handcrafted Haven 🏺
A modern, full-stack artisan marketplace built with Next.js 14, TypeScript, and Tailwind CSS.

https://img.shields.io/badge/LIVE_DEMO-Handcrafted_Haven-8B7355?style=for-the-badge&logo=vercel
https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js
https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript
https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react
https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css
https://img.shields.io/badge/License-MIT-yellow.svg
https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat&logo=vercel

✨ Overview
Handcrafted Haven is a sophisticated e-commerce platform connecting customers with independent artisans specializing in pottery, jewelry, woodwork, and textiles. This project demonstrates modern full-stack development practices with a focus on performance, accessibility, and clean architecture.

🔗 Live Demo: https://handcrafted-haven-gold.vercel.app
📂 GitHub Repository: https://github.com/Impulsible/handcrafted-haven
🚀 Deployment: Vercel (Automatic CI/CD)

https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=630&fit=crop&auto=format
Experience the live demo: handcrafted-haven-gold.vercel.app

🚀 Features
🛒 Core E-commerce Functionality
Product Showcase: Beautiful grid display of artisan products with filtering by category

Artisan Profiles: Detailed creator bios showcasing their craft and story

Shopping Cart: Persistent cart functionality using React Context API

Product Details: Comprehensive pages with high-resolution images and specifications

🎨 Design & UX
Custom Color Scheme: Professional palette (Earthen Brown, Terracotta, Sage Green)

Responsive Design: Mobile-first approach with Tailwind CSS utilities

Performance Optimized: Next.js Image component with automatic optimization

Accessibility: WCAG AA compliant with proper ARIA labels and keyboard navigation

⚙️ Technical Excellence
Type-Safe Development: Full TypeScript implementation with strict checking

Component Architecture: Atomic design pattern with reusable, testable components

Modern Tooling: ESLint, Prettier, and GitHub Actions for code quality

SEO Ready: Server-side rendering and optimized metadata

Production Deployment: Automated CI/CD pipeline with Vercel

🎯 Quick Start
Visit the Live Application
👉 https://handcrafted-haven-gold.vercel.app

Run Locally
bash
# Clone the repository
git clone https://github.com/Impulsible/handcrafted-haven.git
cd handcrafted-haven

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
📁 Project Structure
text
handcrafted-haven/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── products/          # Product pages & dynamic routes
│   │   ├── cart/              # Shopping cart pages
│   │   ├── layout.tsx         # Root layout with providers
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── ui/                # Reusable UI primitives (Button, Card, etc.)
│   │   ├── home/              # Homepage sections
│   │   ├── products/          # Product-related components
│   │   └── layout/            # Layout components (Header, Footer)
│   ├── lib/                   # Utilities & configurations
│   │   ├── types.ts           # TypeScript type definitions
│   │   ├── utils.ts           # Helper functions (formatPrice, cn)
│   │   └── contexts/          # React Context providers
│   ├── data/                  # Static data & mock database
│   └── styles/                # Global styles & CSS modules
├── public/                    # Static assets
│   ├── images/                # Optimized product & artisan images
│   └── fonts/                 # Custom font files
├── tests/                     # Test suites
└── documentation/             # Project documentation
🛠️ Tech Stack
Frontend Framework

Next.js 14 (App Router, Server Components, API Routes)

React 18 (Hooks, Context, Concurrent Features)

Styling & UI

Tailwind CSS (Utility-first CSS framework)

Lucide React (Icon library)

CSS Modules (Component-scoped styling)

Development & Deployment

TypeScript (Type safety)

Vercel (Hosting & CI/CD)

ESLint + Prettier (Code quality)

🚀 Deployment
This project is automatically deployed to Vercel with the following configuration:

Deployment Pipeline
Automatic Deployments: Every push to main branch triggers a new deployment

Preview Deployments: Pull requests generate unique preview URLs

Performance Monitoring: Built-in analytics and performance tracking

Access the Deployment
Production: https://handcrafted-haven-gold.vercel.app

GitHub Integration: Connected to Impulsible/handcrafted-haven

Deployment Logs: Available in Vercel dashboard

Environment Variables
The following environment variables are configured in production:


🎨 Design System
Color Palette
Role	Color	Hex	Usage
Primary	Earthen Brown	#8B7355	Buttons, accents, primary actions
Secondary	Terracotta	#E2725B	Highlights, alerts, secondary actions
Accent	Sage Green	#87A96B	Success states, eco-friendly badges
Background	Cream	#FDF6E3	Page background, card backgrounds
Text	Charcoal	#2C3E50	Primary text, headings
Typography
Headings: Playfair Display (elegant, traditional serif)

Body: Open Sans (clean, readable sans-serif)

Accent: Dancing Script (handwritten feel for special elements)

📱 Application Preview
<div align="center"> <h3>Visit the Live Application</h3> <a href="https://handcrafted-haven-gold.vercel.app" target="_blank"> <img src="https://img.shields.io/badge/🚀_Visit_Handcrafted_Haven-8B7355?style=for-the-badge&logo=vercel&logoColor=white" alt="Visit Handcrafted Haven" /> </a> </div>
Feature	Live Demo
Homepage	View Homepage
Product Categories	Navigate via category cards
Artisan Profiles	Browse artisan stories and crafts
Responsive Design	Test on mobile/tablet/desktop
🏗️ Development Setup
Prerequisites
Node.js 18.17 or higher

npm, yarn, or pnpm

Git

Installation
Clone the repository

bash
git clone https://github.com/Impulsible/handcrafted-haven.git
cd handcrafted-haven
Install dependencies

bash
npm install
# or
yarn install
# or
pnpm install
Set up environment variables

bash
cp .env.example .env.local
# Edit .env.local with your configuration
Run the development server

bash
npm run dev
# or
yarn dev
# or
pnpm dev
Open your browser
Navigate to http://localhost:3000 or visit the live deployment

Available Scripts
npm run dev - Start development server

npm run build - Create production build

npm start - Start production server

npm run lint - Run ESLint

npm test - Run test suite

npm run type-check - Validate TypeScript types

🤝 Contributing
We welcome contributions! Please see our Contributing Guide for details.

Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

Development Workflow
Follow the Conventional Commits specification

Write meaningful commit messages

Add tests for new functionality

Update documentation as needed

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👥 Team
WDD 430 - Web Full-Stack Development
Brigham Young University-Idaho

Prince Henry Osuagwu - Project Lead & Full-Stack Developer

Christopher Jeremy Scott - Frontend & TypeScript Specialist

Seth Ben Gabriel Harrington Arraez - UI/UX & Styling Lead

Rafael Pereira de Souza Castro - Component Architecture & Performance

Project Links:

Live Application: https://handcrafted-haven-gold.vercel.app

Source Code: https://github.com/Impulsible/handcrafted-haven

Project Board: https://github.com/users/Impulsible/projects/1

🙏 Acknowledgments
BYU-I Faculty for guidance and instruction

Unsplash for providing beautiful, high-quality artisan photography

Next.js & Vercel for the excellent framework and deployment platform

All artisans worldwide who inspire us with their craft and dedication

📞 Support
For support, email henryosuagwu22@gmail.com or open an issue in the GitHub repository.

<div align="center"> <sub>Built with ❤️ by the Handcrafted Haven team | WDD 430 Final Project</sub> <br> <a href="https://handcrafted-haven-gold.vercel.app"> <img src="https://img.shields.io/badge/Visit_Our_Live_Site-8B7355?style=for-the-badge&logo=vercel&logoColor=white" alt="Visit Live Site" /> </a> </div>