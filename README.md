# Stablus Website

AI-powered consultancy website for regulated financial institutions in the GCC.

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Claude API** (claude-sonnet-4-20250514) for the AI intake bot

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Anthropic API key

### Setup

1. Clone the repository:

```bash
git clone <repo-url>
cd stablus-website
```

2. Install dependencies:

```bash
npm install
```

3. Create your environment file:

```bash
cp .env.local.example .env.local
```

4. Add your Anthropic API key to `.env.local`:

```
ANTHROPIC_API_KEY=your_api_key_here
```

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/services` | Services & Deliverables |
| `/approach` | Five-phase delivery methodology |
| `/about` | About Stablus and the founder |
| `/start` | AI intake bot (conversational project scoping) |
| `/contact` | Contact form and information |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | API key for the Claude-powered intake bot |

## Build

```bash
npm run build
npm start
```
