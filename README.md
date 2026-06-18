# PixelForge AI - Premium Image Generation Platform

Welcome to **PixelForge AI**, a state-of-the-art, high-performance web portal designed for digital artists, designers, and developers. PixelForge provides an elegant, premium interface for generating high-fidelity AI artwork using three specialized image-generation engines. It features an interactive prompt generation sandbox, detailed model comparison matrix, customizable quality settings, a pricing credit estimator, a gallery lightbox, and an automated conversational FAQ chatbot assistant.

---

## 1. Project Overview & Architecture
The platform is designed to showcase high-fidelity image synthesis. It implements premium design aesthetics including glassmorphism, responsive HSL dark theme values, gradient text overlays, micro-interactions, and a custom HTML5 canvas particle background to maximize user engagement. 

### Key Modules:
- **Interactive Prompt Sandbox (`PromptDemo`)**: Live prompt builder allowing users to select engine models, quality profiles, and run mock generations with real-time feedback (generation speed, cost, and output metadata).
- **Hero Slider (`Hero`)**: Slideshow of 7 preset artistic categories showing prompt construction, seed, and generated output.
- **Media Gallery & Details Lightbox (`Gallery`)**: Category-filtered image grid (Landscape, Portrait, Abstract, Fantasy, Product) with hover overlays and full-screen preview lightbox modals featuring download and sharing functionality.
- **Pricing & Credit Estimator (`Pricing`)**: Interactive credit estimation slider, billing toggle (monthly/annual), and step-by-step payment wizard.
- **Conversational FAQ Chatbot (`Chatbot`)**: Floating interactive widget providing immediate customer support for models, billing, API usage, and security.

---

## 2. Technology Stack

### Frontend & Core
- **Framework**: **Next.js 16.2.6 (Turbopack)** - Server-side rendering, API routing, and component optimization.
- **Runtime & Render Layer**: **React 19** & **TypeScript 5.7.3** - Ensuring strict type safety and modern hooks implementation.
- **Styling & Theme**: **Tailwind CSS 4.2.0** & **PostCSS** - Utilizing utility classes, custom animation config, and standard glassmorphic effects.
- **Animations**: **Framer Motion 12.40.0** - Enabling spring-based layout transitions, fade-ins, sliding panels, and hover states.
- **Iconography**: **Lucide React 1.16.0** - Clean, vector icons for UI state indicators.

### Backend & API Routes
- **Image Generation Endpoints (`/api/generate`)**:
  - Accept POST requests containing prompt, model, and quality parameters.
  - Dynamically output deterministic vector SVG mockups base64 encoded as data URIs using hash mappings.
- **Models Metadata Endpoint (`/api/models`)**:
  - GET API supplying properties, latency scores, and computational credit costs.

---

## 3. Directory Structure
```bash
app/
├── api/
│   ├── generate/
│   │   └── route.ts         # Mock AI Image generation endpoint
│   └── models/
│       └── route.ts         # List available models
├── globals.css              # Custom styling definitions & Tailwind setup
├── layout.tsx               # Root layout with chatbot & error interceptor
└── page.tsx                 # Main portal layout
components/
├── ui/                      # shadcn & layout blocks (buttons, dialogs, cards)
├── chatbot.tsx              # Conversational FAQ assistant
├── features.tsx             # Core platform advantages grid
├── footer.tsx               # Site footer & CTA section
├── gallery.tsx              # Media showcase & lightbox
├── hero.tsx                 # Slideshow showcasing presets
├── models.tsx               # Model spec tables
├── navbar.tsx               # Header navigations & user profiles
├── particle-bg.tsx          # Custom HTML5 Canvas ambient background
├── pricing.tsx              # Plans, credit estimator, and checkout wizard
├── prompt-demo.tsx          # Interactive image generation simulator
└── scroll-animate.tsx       # Viewport entry animation trigger
hooks/
└── useImageGeneration.ts    # Custom React Hook for API calls
lib/
├── api-config.ts            # Constants, models configuration, pricing matrices
└── utils.ts                 # Classname tailwind mergers
```

---

## 4. Feature Details

### 1. Model Engines Configured
Users can configure and run simulations on three different AI generators:
1. **Phoenix Pro** (Default): Exceptional quality, premium details, and rich composition. Cost: **$0.04/image**.
2. **Quantum Ultra**: Speed-optimized model for rapid prototyping and concept art. Cost: **$0.02/image**.
3. **Nova Light**: Ultra-fast lightweight model for drafts. Cost: **$0.01/image**.

### 2. Conversational FAQ Intents (`components/chatbot.tsx`)
The bot classifies user text queries and offers predefined rich answers on the following:
- **Pricing**: Explains Starter (Free), Professional, and Enterprise subscriptions.
- **Models**: Compares speeds and costs between Phoenix, Quantum, and Nova.
- **API Access**: Points to JSON endpoints, headers, and [BACKEND_INTEGRATION.md](file:///d:/AI%20Text-to-Image-Platform/BACKEND_INTEGRATION.md).
- **Quality and Resolution**: Evaluates the aspect ratio cost factors.
- **How to Use**: Step-by-step guide on generating images inside the Prompt Demo.

### 3. Local Resource Optimization
To improve reliability, reduce external network overhead, and offer immediate presentation capability, all 19 image assets used in the **Hero Slideshow** and **Gallery Showcase** have been migrated from external Pollinations AI endpoints to local high-resolution assets stored in `/public/images/hero/` and `/public/images/gallery/`.