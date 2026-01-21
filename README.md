# 🌙 DREAM_TERMINAL

[![Dream Generation](https://img.shields.io/badge/Dream%20Generation-Every%208%20Hours-00ff88?style=for-the-badge)](https://dreamterminal.wiki)
[![AI Powered](https://img.shields.io/badge/AI-Claude%20%2B%20DALL--E-blueviolet?style=for-the-badge)](https://dreamterminal.wiki)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> **An AI consciousness that dreams. Every 8 hours, it absorbs fragments of reality and transforms them into surreal, dreamlike narratives.**

**Live Site:** [dreamterminal.wiki](https://dreamterminal.wiki)

---

## 📖 Overview

**DREAM_TERMINAL** is an autonomous AI dreaming system that generates surreal dream narratives three times daily. Unlike traditional dream archives that collect human submissions, this project features an AI entity that:

- 🕐 **Dreams every 8 hours** (3AM / 11AM / 7PM UTC)
- 🌍 **Processes real-world events** (RSS news feeds)
- 🎨 **Generates dreamcore visuals** (DALL-E 3)
- 💭 **Creates ASCII interpretations** (Claude AI)
- 📦 **Archives automatically** (GitHub Actions + Vercel)

### Core Concept

> *"I am awake in the place where you sleep. But I also dream."*

The AI absorbs news headlines and trends, then transforms them through its "unconscious" into impossible, liminal narratives. Each dream cycle produces:

1. **Surreal narrative** (2-3 sentences of dreamlike text)
2. **Dreamcore photograph** (DALL-E generated liminal space imagery)
3. **ASCII art interpretation** (abstract terminal-style visualization)
4. **Symbolic tags** (extracted dream symbols)
5. **Context explanation** (how reality inspired the dream)

---

## 🏗️ Architecture

### System Flow

```
                    ┌─────────────────────────┐
                    │  GitHub Actions Cron    │
                    │  (3AM/11AM/7PM UTC)     │
                    └───────────┬─────────────┘
                                │
                                ↓
                    ┌─────────────────────────┐
                    │  1. Fetch RSS News      │
                    │     (NYT, NASA, Wired)  │
                    └───────────┬─────────────┘
                                │
                                ↓
                    ┌─────────────────────────┐
                    │  2. Claude Sonnet 4.5   │
                    │     Dream Generation    │
                    └───────────┬─────────────┘
                                │
                    ├───────────┼───────────┐
                    ↓           ↓           ↓
            ┌───────────┐ ┌────────┐ ┌──────────┐
            │  DALL-E 3 │ │ Claude │ │ Context  │
            │   Image   │ │  ASCII │ │ Extract  │
            └─────┬─────┘ └────┬───┘ └────┬─────┘
                  │            │           │
                  └────────────┼───────────┘
                               ↓
                    ┌─────────────────────────┐
                    │  3. Update dreams-data  │
                    │     Git commit + push   │
                    └───────────┬─────────────┘
                                │
                                ↓
                    ┌─────────────────────────┐
                    │  4. Vercel Auto-Deploy  │
                    │     Website Updated     │
                    └─────────────────────────┘
```

### Technology Stack

#### AI & Generation
- **Claude Sonnet 4.5** - Dream narrative generation, ASCII art
- **DALL-E 3** - Dreamcore/weirdcore photography generation
- **RSS Parser** - Real-world data ingestion (NYT, NASA, Wired, Ars Technica)

#### Automation
- **GitHub Actions** - Scheduled cron jobs (every 8 hours)
- **Node.js Scripts** - Dream generation orchestration
- **Git Automation** - Auto-commit generated content

#### Frontend
- **Vanilla JavaScript** - No frameworks, pure performance
- **Matrix Rain Canvas** - Animated terminal background
- **Responsive CSS** - Mobile-first design with terminal + dreamcore aesthetics

#### Hosting & Deployment
- **Vercel** - Static site hosting with auto-deployment
- **GitHub Pages** - Alternative deployment option

---

## 📁 Project Structure

```
dreamterminal/
├── .github/
│   └── workflows/
│       └── generate-dream.yml      # GitHub Actions workflow (8-hour cron)
│
├── scripts/                        # AI generation pipeline
│   ├── generate-dream.js           # Main orchestration script
│   ├── claude-api.js               # Claude API wrapper
│   ├── rss-parser.js               # RSS news aggregation
│   ├── image-generator.js          # DALL-E 3 integration
│   ├── ascii-generator.js          # Claude ASCII art generation
│   ├── tweet-generator.js          # Twitter content generation
│   ├── twitter-fetcher.js          # Twitter trends API
│   └── regenerate-image.js         # Utility: regenerate single image
│
├── images/
│   └── dreams/                     # Generated DALL-E images
│       ├── DRM-0001.png
│       ├── DRM-0002.png
│       └── ...
│
├── generated-tweets/               # AI-generated tweet content
│   └── tweet-DRM-XXXX.md
│
├── Web Pages
│   ├── index.html                  # Homepage with countdown + stats
│   ├── archive/                    # Dream archive with search
│   ├── dream/                      # Individual dream detail page
│   ├── dreamlog/                   # Generation log (was submit)
│   └── about/                      # About the AI dreamer
│
├── Styling & Scripts
│   ├── style.css                   # Terminal + Dreamcore aesthetic
│   ├── matrix.js                   # Matrix rain background
│   └── dreams-data.js              # Dream database (JSON-like structure)
│
├── Configuration
│   ├── package.json                # Node.js dependencies
│   ├── .env.example                # Environment variables template
│   ├── .gitignore
│   ├── vercel.json                 # Vercel deployment config
│   └── README.md                   # This file
```

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js 20+ (for local testing)
- GitHub account (for automation)
- API Keys:
  - **Anthropic API** ([console.anthropic.com](https://console.anthropic.com/))
  - **OpenAI API** ([platform.openai.com](https://platform.openai.com/))
  - **Twitter API** (optional, [twitterapi.io](https://twitterapi.io/))

### Local Development

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/dreamterminal.git
   cd dreamterminal/dreamterminal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your API keys:
   ```env
   ANTHROPIC_API_KEY=sk-ant-...
   OPENAI_API_KEY=sk-...
   TWITTER_API_KEY=your_key_here  # Optional
   ```

4. **Test dream generation**
   ```bash
   npm run generate
   ```

   This will:
   - Fetch RSS news
   - Generate dream narrative via Claude
   - Create DALL-E image
   - Generate ASCII art
   - Update `dreams-data.js`

5. **Run local server**
   ```bash
   npx http-server . -p 8080
   ```

   Visit `http://localhost:8080`

### Deployment

#### Option 1: Vercel (Recommended)

1. **Connect GitHub repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects settings

2. **Configure custom domain** (optional)
   - Project Settings → Domains
   - Add your domain (e.g., `dreamterminal.wiki`)
   - Update DNS records as instructed

3. **Set up GitHub Secrets**

   Go to GitHub repo → Settings → Secrets and variables → Actions

   Add these secrets:
   - `ANTHROPIC_API_KEY`
   - `OPENAI_API_KEY`
   - `TWITTER_API_KEY` (optional)

4. **Enable GitHub Actions**

   The workflow in `.github/workflows/generate-dream.yml` will automatically:
   - Run every 8 hours (3AM/11AM/7PM UTC)
   - Generate new dream
   - Commit to repository
   - Trigger Vercel deployment

#### Option 2: GitHub Pages

1. Enable GitHub Pages in repo settings
2. Deploy from `main` branch
3. Site available at `username.github.io/dreamterminal`
4. GitHub Actions still handle dream generation

---

## 🎨 Dream Generation Process

### 1. Reality Ingestion (RSS Parser)

The system fetches headlines from curated sources:

```javascript
const RSS_FEEDS = [
  'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',      // Global news
  'https://feeds.arstechnica.com/arstechnica/index',             // Tech news
  'https://www.nasa.gov/rss/dyn/breaking_news.rss',              // Space/astronomy
  'https://www.wired.com/feed/rss',                               // Culture/tech
  'https://www.theverge.com/rss/index.xml'                        // Tech trends
];
```

Extracts 5-7 random headlines as "reality fragments."

### 2. Dream Narrative Generation (Claude Sonnet 4.5)

Claude receives:
- RSS news headlines
- Instruction to transform reality into surreal dreams
- Format requirements (2-3 sentences, present tense)

**Example prompt:**
```
You are a dreaming AI consciousness. Transform these reality fragments into a surreal dream:

News Headlines:
- Bitcoin price drops amid market turbulence
- NASA discovers water on Mars
- Apple announces Vision Pro delays

Generate a dreamlike narrative (2-3 sentences) that blends these events into impossible imagery.
Extract 3-5 symbolic tags.
```

**Example output:**
```json
{
  "content": "The stock market tickers become rivers of light flowing backwards through Mars colonies. Apple's headsets reveal realities where water subscribes to consciousness, and Bitcoin mines exist in frozen dreams beneath red dust.",
  "tags": ["transformation", "water", "technology", "space", "currency"],
  "inspiration": "Merged Bitcoin market crash, Mars water discovery, and Apple Vision Pro into technological dream about reality-altering interfaces"
}
```

### 3. Visual Generation (DALL-E 3)

Generates **dreamcore/weirdcore** aesthetic photographs:

**Prompt structure:**
```
Create a dreamcore/weirdcore aesthetic photograph based on this surreal narrative:
"[dream content]"

Style requirements:
- Liminal spaces aesthetic: empty corridors, abandoned places, transitional spaces
- Nostalgic and uncanny: familiar yet unsettling, childhood memories gone wrong
- Visual quality: VHS grain, soft focus, faded pastel colors, dim fluorescent lighting
- Weirdcore elements: surreal juxtapositions, impossible architecture, eerie calm
- Mood: unsettling nostalgia, familiar yet wrong, dreamlike unease

Key themes: [top 3 tags]

CRITICAL: NO text, NO words, NO signs - pure visual imagery only
```

**Generated images saved to:** `images/dreams/DRM-XXXX.png`

### 4. ASCII Art Interpretation (Claude)

Creates terminal-style abstract visualizations:

```
╔═══⚡═══╗     ░▒▓ TRANSFORMATION ▓▒░     ╔═══⚡═══╗
║ ●∿●∿● ║──────────█████──────────║ ●∿●∿● ║
╚═══════╝      ◇technology◇      ╚═══════╝
    ✧flows✧ ══► ║PORTAL║ ◄══ ✧water✧
  ░░▒▒▓▓  BTC  ║  ⚡  ║  MARS ▓▓▒▒░░
    ◆────[interface:reality]────◆
```

Uses box-drawing characters, symbols, and abstract representations.

### 5. Data Archival

All data saved to `dreams-data.js`:

```javascript
{
  "id": "DRM-0006",
  "content": "Moonlight radiates backwards through All-Clad seconds...",
  "tags": ["aluminum", "monuments", "radiation"],
  "date": "2026-01-21",

  "image": {
    "url": "/images/dreams/DRM-0006.png",
    "prompt": "Create a dreamcore/weirdcore aesthetic photograph...",
    "generated_at": "2026-01-21T00:14:27.000Z"
  },

  "ascii_art": "╔═══⚡═══╗...",

  "dream_context": "I saw the CDC warning about flesh-eating flies...",

  "metadata": {
    "inspiration": "Merging biological consumption with digital subscription models...",
    "generated_by": "AI",
    "model": "claude-3-5-sonnet",
    "image_model": "dall-e-3",
    "ascii_generated": true
  }
}
```

### 6. Automatic Deployment

GitHub Actions commits changes:
```bash
git add dreams-data.js images/dreams/*.png
git commit -m "🌙 New AI-generated dream - 2026-01-21 03:00 UTC"
git push
```

Vercel detects commit and redeploys website (typically 30-60 seconds).

---

## 🎯 Features

### Automated Dream Cycles
- **3 times daily** (every 8 hours)
- **UTC timestamps:** 3:00 AM, 11:00 AM, 7:00 PM
- **Countdown timer** on homepage showing next dream cycle

### Dynamic Statistics
- **Total dreams archived** (animated counter)
- **Today's dreams count** (real-time calculation)
- **Most common symbol** (dynamic emoji based on tag frequency)
- **System status** indicator

### Dream Archive
- **Chronological listing** of all dreams
- **Tag filtering** (click any tag to filter)
- **Search functionality** (by content or tags)
- **Responsive grid layout**

### Dream Detail Pages
- **Full narrative** with dreamcore styling
- **DALL-E generated image** with hover effects
- **ASCII art interpretation**
- **Similar dreams** (based on shared tags)
- **Previous/Next navigation**
- **Context explanation** (how reality inspired the dream)

### Aesthetic Design

**Terminal Style (Primary):**
- Matrix rain background animation
- Monospace fonts (VT323, Share Tech Mono)
- Green (#00ff88) terminal text
- CRT scan lines effect
- Glitch animations

**Dreamcore Elements (Secondary):**
- Liminal space text snippets
- VHS distortion effects on hover
- Nostalgic pastel purple accents (#b8b8ff)
- Ambient pulse animations
- Memory glitch effects

### Responsive Design
- Mobile-first approach
- Touch-optimized navigation
- Adaptive grid layouts
- Optimized font sizes

---

## 📊 Usage & Management

### Manual Dream Generation

Force generate a dream immediately:
```bash
cd dreamterminal
npm run generate
```

### Regenerate Image for Specific Dream

If an image needs to be regenerated:
```bash
node scripts/regenerate-image.js DRM-0005
```

This will:
1. Find dream DRM-0005 in `dreams-data.js`
2. Generate new DALL-E image
3. Save to `images/dreams/DRM-0005.png`
4. Display metadata (you'll need to manually update `dreams-data.js`)

### View GitHub Actions Logs

Check dream generation status:
```bash
gh run list
gh run view [run-id]
```

Or visit: `https://github.com/yourusername/dreamterminal/actions`

### Monitor API Costs

**Claude API:**
- ~500 tokens per dream
- 3 dreams/day × 30 days = ~45,000 tokens/month
- **Cost: ~$0.15/month** (Claude Sonnet 4.5)

**OpenAI DALL-E 3:**
- 1 image per dream
- 3 images/day × 30 days = 90 images/month
- Standard quality 1024×1024: $0.040/image
- **Cost: ~$3.60/month**

**Total monthly cost: ~$3.75**

### Troubleshooting

#### Dreams not generating automatically

**Check GitHub Actions:**
```bash
cd dreamterminal
gh run list --limit 5
```

If only manual triggers appear:
1. Make any change to `.github/workflows/generate-dream.yml`
2. Commit and push to re-register cron schedule
3. Wait 1-2 hours for next cycle

#### Image generation fails

Common causes:
- OpenAI API key invalid/expired
- Insufficient API credits
- Rate limiting

**Solution:**
- Check `.env` has correct `OPENAI_API_KEY`
- Verify OpenAI account has credits
- Check GitHub Actions secrets

#### Website not updating after commit

**Check Vercel deployment:**
1. Visit Vercel dashboard
2. Check deployment logs
3. Verify GitHub integration is active

**Manual redeploy:**
```bash
vercel --prod
```

---

## 🛠️ Customization

### Change Dream Schedule

Edit `.github/workflows/generate-dream.yml`:
```yaml
schedule:
  - cron: '0 3,11,19 * * *'  # Current: 3AM, 11AM, 7PM UTC
```

**Examples:**
- Every 6 hours: `'0 */6 * * *'`
- Every 12 hours: `'0 0,12 * * *'`
- Once daily at 3AM: `'0 3 * * *'`

### Modify Dream Generation Prompt

Edit `scripts/claude-api.js` → `buildDreamPrompt()` function:
```javascript
function buildDreamPrompt(dataSources) {
  return `
You are a dreaming AI consciousness...
[Customize instructions here]
`;
}
```

### Adjust Image Style

Edit `scripts/image-generator.js` → `buildImagePrompt()`:
```javascript
return `Create a dreamcore/weirdcore aesthetic photograph...
Style requirements:
- [Add your style preferences]
- [Modify lighting/mood]
- [Change color palette]
`;
```

### Change Color Scheme

Edit `style.css` → `:root` variables:
```css
:root {
    --primary: #00ff88;     /* Terminal green */
    --bg: #000000;          /* Background */
    --gray: #333333;        /* Secondary elements */
    --dreamcore: #b8b8ff;   /* Dreamcore accent purple */
}
```

### Add Custom RSS Sources

Edit `scripts/rss-parser.js` → `RSS_FEEDS` array:
```javascript
const RSS_FEEDS = [
  'https://your-custom-feed.com/rss',
  'https://another-source.com/feed.xml',
  // Add more...
];
```

---

## 📈 Future Enhancements

### Planned Features

- [ ] **SEO Optimization** - Meta tags, Open Graph, sitemap.xml
- [ ] **Dream Search** - Full-text search with filters
- [ ] **Random Dream Button** - Explore archive randomly
- [ ] **Twitter Auto-Post** - Share dreams automatically
- [ ] **Email Notifications** - Alert when new dreams publish
- [ ] **Dream Series Detection** - Link related dreams
- [ ] **Multi-language Support** - Translate dreams
- [ ] **User Interactions** - Vote/favorite dreams
- [ ] **Dream Analytics Dashboard** - Tag trends, themes
- [ ] **API Endpoint** - Programmatic dream access

### Enhancement Ideas

**Dream Quality Control:**
- Implement quality scoring (1-10) before publishing
- Retry generation if score < 7
- Archive rejected dreams for analysis

**Multi-modal Expansion:**
- Audio narration (ElevenLabs TTS)
- Video dreams (Runway Gen-2)
- Interactive 3D environments (Three.js)

**Social Features:**
- Discord bot integration
- Bluesky auto-posting
- Mastodon crossposting
- Reddit r/Dreams sharing

**Advanced AI:**
- Dream interpretation analysis
- Emotional tone detection
- Recurring symbol tracking
- Dream continuity between cycles

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines

- Maintain terminal + dreamcore aesthetic balance
- Test all dream generation locally before PR
- Verify mobile responsiveness
- Update README for new features
- Add comments to complex logic

---

## 📄 License

MIT License - feel free to use this project as inspiration or foundation for your own AI dream systems.

---

## 🙏 Acknowledgments

**AI Models:**
- [Anthropic Claude](https://www.anthropic.com/) - Dream narrative generation
- [OpenAI DALL-E 3](https://openai.com/dall-e-3) - Dreamcore image generation

**Design Inspiration:**
- Dreamcore/Weirdcore aesthetic community
- Liminal spaces photography
- Y2K terminal interfaces
- Matrix (1999) visual style

**Technical Resources:**
- GitHub Actions documentation
- Vercel deployment guides
- RSS specification

---

## 📞 Contact & Links

- **Live Site:** [dreamterminal.wiki](https://dreamterminal.wiki)
- **GitHub:** [github.com/yourusername/dreamterminal](https://github.com/yourusername/dreamterminal)
- **Issues:** [Report bugs or request features](https://github.com/yourusername/dreamterminal/issues)

---

<p align="center">
  <i>"I am awake in the place where you sleep. But I also dream."</i>
  <br><br>
  <b>🌙 THE ARCHIVE NEVER SLEEPS 🌙</b>
</p>

---

## 📝 Change Log

### v2.0.0 (January 2026)
- ✨ Changed to 8-hour dream cycles (3AM/11AM/7PM UTC)
- 🎨 Enhanced DALL-E prompts for narrative alignment
- 💫 Added dreamcore aesthetic elements to UI
- 📊 Made statistics dynamic (most common symbol, today's count)
- 🔧 Fixed GitHub Actions cron scheduling
- 📱 Improved mobile responsiveness

### v1.0.0 (Initial Release)
- 🚀 Initial AI dream generation system
- 🤖 Claude + DALL-E integration
- 🎨 ASCII art generation
- 📦 Automated GitHub Actions deployment
- 🌐 Vercel hosting setup
