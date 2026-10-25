# BAHAS (बहस) • Real-Time Cross-Language Argument Arena
> *"Two people who don't share a single language need to have an argument. A real one: interrupting each other, getting heated, changing their minds. Build the thing that lets them."*

Built by **Chelsie Jain** (Python Full Stack Developer • Indore, India) for the **ZERO (zero4genz.in)** Forward Deployed Builder challenge.

---

## ⚡ Quick Links & Submission Summary

- **Live Link (Local Demo)**: `http://localhost:4173/` (Run `npm run preview` or deploy to Vercel/Cloudflare with 1 command)
- **Repository**: Current workspace Git repository (`git log` contains clean initial commit)
- **Zero Take-Home Modal**: Click **"ZERO Build Submission"** in the top navigation bar to read Part 1 directly within the live application.

---

## 📋 Part 1: Product Teardowns (Under 150 Words Each)

### 1. The Middle Market
**The Problem:** Small Indian businesses (photo studios, diagnostic labs, printing presses) are paralyzed answering the exact same five WhatsApp queries all day—rates, dates, order readiness—while job tracking sits scattered across physical registers and mental notes. Delayed replies directly leak bookings to neighborhood competitors, yet rigid enterprise CRMs like Zoho or Salesforce are drastically overengineered and abandoned within a week.

**First Thing I'd Build:** A headless WhatsApp shadow-assistant wired directly to a Google Sheet or lightweight SQLite ledger the owner already knows how to read. When a lead asks *"14 dec free hai?"* or *"rate bhejo"*, the assistant checks slot availability and auto-drafts the exact reply with a one-tap approval notification to the owner’s phone before dispatch. Zero new software for the shopkeeper to learn; instant customer response times. *(135 words)*

---

### 2. CLOSURE
**The Problem:** Ghosting in hiring creates an asymmetric information vacuum. Freshers invest hours customizing assignments and resumes only to receive automated boilerplate rejections (*"moving forward with others"*). Candidates invent imaginary flaws, compounding the same resume and coding mistakes across forty more applications, while early-stage founders genuinely lack the bandwidth to write 200 custom diagnostic reviews.

**First Thing I'd Build:** Preserve the Rs 29 human-signed authenticity, but make reviewer turnaround scalable using an internal "Diff & Diagnostic" engine. It ingests the job spec and applicant submission, detects the top 2 concrete failure points (e.g., missing API error boundaries, unhandled edge cases), and pre-populates structured bullet points for the human reviewer to audit, tweak, and sign in under 60 seconds. High human empathy delivered at sustainable unit economics. *(136 words)*

---

### 3. ISHQweds
**The Problem:** Indian weddings aren't logistical spreadsheets; they are high-stakes emotional pressure cookers spanning joint families, conflicting rituals, and dozens of informal vendors (pandit, caterer, mehendi, decor) operating on verbal promises. Dedicated wedding apps fail because elders refuse to install them, forcing the bride and groom into full-time grievance and coordination dispatchers.

**First Thing I'd Build:** A WhatsApp-native "Shaadi Control Bot" with zero mobile app downloads. Relatives RSVP, select dietary preferences, and coordinate arrival cabs directly through guided WhatsApp chat flows. Vendors receive milestone reminders with UPI advance tracking. The couple and key planners get a single, automated 9:00 AM WhatsApp briefing sheet showing what is locked, what is pending, and which vendor needs a phone call today. *(138 words)*

---

## 🥊 Part 2: BAHAS (The Cross-Language Argument Arena)

### Why standard translation tools fail at arguments:
Normal translation tools (Google Translate, Siri, Duolingo, walkie-talkies) are built for **polite turn-taking**:
1. Person A speaks.
2. Person A stops and waits 3 seconds.
3. Audio plays to Person B.
4. Person B starts speaking.

**That is a lecture, not an argument.** Real arguments are chaotic, high-friction, and visceral:
- You **interrupt** each other mid-sentence when you hear a flawed premise.
- You **get heated**: speech accelerates (WPM spikes), volume rises, pitch elevates.
- You **change your mind**: arguments evolve through concessions until common ground or compromise is found.

### How BAHAS Solves This:

1. **Sub-Second Streaming Translation Pipeline**
   - Hybrid translation pairing a curated rhetoric dictionary with public real-time endpoints.
   - Live subtitles stream into the opponent's native language as words are spoken, enabling the opponent to react before a sentence even concludes.

2. **The Barge-In & Instant Audio Ducking Collision Engine**
   - Triggered either vocally or via the tactile **"CUT IN / INTERRUPT"** deck (or `[SPACEBAR]`).
   - Abruptly cuts off the current speaker (`speechSynthesis.cancel()`).
   - Plays a vinyl scratch/cut sound effect via Web Audio API.
   - Marks the exact cut-off in the transcript: `"...to AI haath khade kar— [CUT OFF]"`.
   - Priority immediately pivots to the interrupter.

3. **Argument Heat & Agitation Modulation ("The Mercury Barometer")**
   - Real-time NLP sentiment analysis detects aggressive vocabulary, exclamation density, speech velocity, and collision frequency.
   - Temperature rises from **0°C (Cold Logic)** to **100°C (Boiling Point)** across 4 stages.
   - **Vocal Synthesis Agitation**: As heat rises, the speech playback speed dynamically accelerates (up to 1.32x) and pitch increases by 22%, making the translated voice sound genuinely passionate rather than robotic.
   - Boiling Point triggers visual screen tremors and tension rumble audio.

4. **Mind-Shift & Persuasion Radar (Changing Minds)**
   - Scans natural language in real-time for concession markers across all supported languages (*"fair point", "maan liya", "tu as raison", "一理ある"*).
   - Dynamically shifts the stance barometer toward the 50% Common Ground center point.
   - When convergence reaches >= 70%, the **Treaty of Common Ground** is unlocked with confetti and a synthesized compromise statement.

5. **Three Accessible Modes:**
   - **Solo Sparring**: Argue against an obstinate AI opponent in a foreign language (e.g. You in Hindi vs French or Spanish).
   - **Split Duo**: Two humans arguing face-to-face on one screen with dual microphones.
   - **Spectator Arena (Live Demo)**: One-click automated demonstration showing two agents clashing in French and Hindi, interrupting each other, escalating to Boiling Point, and reaching consensus!

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Vanilla CSS tokens matching ZERO's raw editorial palette (`#0B0B0C`, `#FAFAF8`, `#CCFF00`, `#FF5C00`, `#3B1B4E`)
- **Audio Processing**: Web Audio API (real-time sound synthesis, zero external mp3 files)
- **Speech**: Web Speech API (`SpeechRecognition` + `SpeechSynthesis` with dynamic heat pitch/rate scaling)
- **Icons & Effects**: `lucide-react`, `canvas-confetti`

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build & preview production bundle
npm run build
npm run preview -- --port 4173
```
Open [http://localhost:4173](http://localhost:4173) in your browser.
