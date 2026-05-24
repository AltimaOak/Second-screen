# SecondScreen AI 🏏🤖
### Next-Generation AI-Powered Real-Time IPL Cricket Companion Platform

SecondScreen AI transforms the passive experience of watching IPL cricket matches into an immersive, highly interactive, and data-driven second-screen arena. Ingesting live ball-by-ball commentary and game states, a multi-agent AI system analyzes tactical options, forecasts probabilities, generates humorous social-style reactions, tracks fantasy metrics, and answers fan questions in real time.

---

## 🚀 Key Feature Showcases

### 1. Multi-Agent AI Architecture
Five specialized AI agents ingest live data feeds concurrently to output distinct tactical and engaging results:
- **📊 Tactical Insight Agent (Coach Mode)**: Evaluates batsman-vs-bowler matchups, warns about pitching adjustments, and advises on optimal bowling modifications.
- **🔮 Prediction Agent (Statistical AI)**: Forecasts runs/wicket probabilities for upcoming overs and monitors turning-point indicators.
- **🤪 Meme & Social Agent (Fan Banter)**: Emits viral-style cricket tweets, roasts, and typical passionate crowd reactions.
- **🏆 Fantasy Pro Assistant (Expert Value)**: Calculates point adjustments in real-time and recommends differential vice-captain value picks.
- **🤖 Fan Q&A Agent (Interactive Companion)**: Answers detailed questions in a sports-Discord style chatroom, fully synced with the current score.

### 2. Interactive Match Control Center
For presentation and hackathon evaluation, the app provides a **Match Control Center**:
- **Play / Pause**: Start or stop the live match commentator stream.
- **Simulation Speeds**: Accelerate the simulator (Slow, Normal, Fast, or Super-fast).
- **Manual Injectors**: Click buttons to force a **SIX**, **FOUR**, **WICKET**, or **DOT** ball to instantly watch win probability graphs, pressure indicators, and AI agent panels react without lag.

### 3. Dynamic Visual Dashboards
- **Live Win Probability Gauge & Area Chart**: Dual-colored gradient graphs showing CSK vs MI winning probabilities.
- **Radial Pressure & Momentum Dials**: Custom SVG meters measuring stadium pressure index and linear team momentum.
- **Quadrants Selection scatter plot**: A Recharts Scatter Chart mapping fantasy players based on their risk vs projected reward.
- **Over-by-Over Line Chart**: Interactive comparison of MI's chase run rate vs CSK's defending pace.

---

## 🛠️ Technology Stack
- **Frontend**: Next.js 15 (App Router, React 19 compatibility) + TypeScript + Tailwind CSS
- **Animations**: Framer Motion (for score ticks, glowing panel highlights, and scrolling logs)
- **Data Visualizations**: Recharts
- **Icons**: Lucide React
- **AI Core**: Gemini API (model `gemini-2.5-flash` via direct Node fetching) with a built-in high-fidelity local rules fallback system.

---

## 📁 Project Directory Structure
```
src/
├── app/
│   ├── layout.tsx              # Global layout with font imports & Providers
│   ├── page.tsx                # Cinematic Landing Page
│   ├── dashboard/
│   │   └── page.tsx            # Live Match Dashboard Page
│   ├── chat/
│   │   └── page.tsx            # Dedicated AI Fan Chat Page
│   ├── fantasy/
│   │   └── page.tsx            # Fantasy Insights Page
│   └── analytics/
│       └── page.tsx            # Deep Match Analytics Page
├── components/
│   ├── layout/
│   │   └── Navbar.tsx          # Premium Navbar with live stats & selectors
│   ├── dashboard/
│   │   ├── Scorecard.tsx       # Live scoreboard metrics card
│   │   ├── MatchControls.tsx   # Play/Pause/Speed & Manual Injectors
│   │   ├── WinProbability.tsx  # Dual Recharts Area Win Chart
│   │   ├── PressureMeter.tsx   # Custom SVG radial gauges for pressure/momentum
│   │   ├── AgentFeed.tsx       # Scrolling list of concurrent multi-agent thoughts
│   │   └── MatchTimeline.tsx   # Ball-by-ball commentary and progress track bubbles
│   └── chat/
│       └── ChatRoom.tsx        # Sports-Discord style chatroom layout with presets
├── context/
│   └── MatchContext.tsx        # Global state managing simulator loops & inbox feeds
├── hooks/
│   └── useGemini.ts            # Client-side hook with local simulation fallbacks
└── utils/
    ├── matchSimulator.ts       # Algorithmic live scoring, wickets, and probabilities
    └── agentPrompts.ts         # System instructions & fallback templates
```

---

## 💻 Installation & Getting Started

### 1. Clone the repository
Navigate into your workspace directory.

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Gemini API Key (Optional)
To enable real-time dynamic thoughts, create a `.env.local` file in the root folder and add your Gemini API Key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
*Note: If no API key is specified, the application will automatically engage its high-fidelity local rules engine, offering zero-latency, realistic simulated agent commentary.*

### 4. Launch the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to enter the arena.

### 5. Build for Production
To verify typescript types and compile optimized static pages:
```bash
npm run build
```
To run the production-optimized build locally:
```bash
npm run start
```
contact Details 
mail : adi144.yadav@gmail.com
