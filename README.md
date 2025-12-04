# D&D Game Master - AI Voice Agent

Welcome to the **D&D Game Master Voice Agent** - an immersive, voice-powered Dungeons & Dragons experience built with cutting-edge AI technologies!

## 🎮 About This Project

This is an interactive D&D Game Master powered by AI voice agents, featuring real-time voice interaction, dynamic world state management, and a beautiful fantasy-themed interface. The Game Master narrates your adventure, manages NPCs, tracks quests, and responds to your actions in real-time through natural voice conversations.

### Key Features

- 🎙️ **Voice-First Gameplay** - Speak naturally to your AI Game Master
- ⚔️ **Dynamic World State** - Real-time tracking of characters, NPCs, quests, and inventory
- 🗺️ **Rich Fantasy Setting** - Medieval fantasy realm with dragons, magic, and mystery
- 📊 **Live Game Panels** - Character stats, NPC information, quest tracking, and inventory management
- 🎨 **Immersive UI** - Custom fantasy-themed backgrounds and responsive design
- 🔧 **Function Tools** - Advanced game mechanics with item durability, HP management, and quest progression

## Repository Structure

This is a **monorepo** containing both backend and frontend applications:

```
D&D-GameMaster/
├── backend/              # Python-based LiveKit Agents backend
│   ├── src/
│   │   ├── agent.py     # Main Game Master agent with D&D logic
│   │   └── __init__.py
│   ├── tests/           # Test suite
│   ├── Dockerfile       # Production-ready container
│   ├── pyproject.toml   # Python dependencies
│   └── .env.local       # Environment configuration (create from .env.example)
├── frontend/            # Next.js/React frontend
│   ├── app/             # Next.js app router
│   ├── components/
│   │   ├── app/         # Game-specific components
│   │   │   ├── character-panel.tsx   # Player stats & inventory
│   │   │   ├── npc-panel.tsx         # NPC tracker
│   │   │   ├── quests-panel.tsx      # Quest log
│   │   │   ├── chat-transcript.tsx   # Conversation history
│   │   │   └── session-view.tsx      # Main game view
│   │   └── livekit/     # LiveKit UI components
│   ├── public/
│   │   ├── bg-desktop.png   # Fantasy desktop background
│   │   ├── bg-mobile.png    # Fantasy mobile background
│   │   └── opengraph-image-bg.png
│   ├── Dockerfile       # Production-ready container
│   └── .env.local       # Environment configuration
├── docker-compose.yml   # Docker orchestration
├── start_app.sh         # Quick start script
├── Demo.mp4             # Demo Video
└── README.md            # This file
```

### Backend - The Game Master Brain

The backend is a sophisticated Python-based LiveKit Agent that serves as your AI Game Master. Built on [LiveKit Agents](https://docs.livekit.io/agents), it integrates multiple AI services for a seamless D&D experience.

**Core Technologies:**

- **LiveKit Agents Framework** - Real-time voice agent orchestration
- **Murf Falcon TTS** - Ultra-fast, natural-sounding text-to-speech for GM narration
- **Google Gemini 2.5 Flash** - Advanced LLM for dynamic storytelling and game logic
- **Deepgram Nova 3** - High-accuracy speech-to-text for player commands
- **Silero VAD** - Voice activity detection for natural turn-taking
- **Multilingual Turn Detector** - Context-aware conversation management

**Game Master Features:**

- 🎭 **Dynamic Storytelling** - Generates immersive D&D narratives with sensory details
- 🧙 **World State Management** - Tracks player HP, inventory, NPCs, quests, and locations
- 📦 **Advanced Inventory System** - Items with durability, weight, value, and rich descriptions
- ⚔️ **Combat Mechanics** - Narrative-focused combat with HP and item durability tracking
- 🗣️ **NPC Management** - Creates and tracks NPCs with attitudes, roles, and locations
- 📜 **Quest System** - Active and completed quest tracking with status updates
- 🔧 **Function Tools** - Real-time world state updates via specialized function calls
- 📡 **Live Broadcasting** - Pushes world state updates to frontend via LiveKit data channels

**Agent Architecture:**

```python
# Core function tools available to the GM:
- update_npc(name, data)        # Create/update NPCs
- give_item(item)                # Add items with full attributes
- change_hp(amount, reason)      # Modify player health
- set_player_details(details)    # Update player metadata
- apply_world_patch(patch)       # Bulk state updates
```

[→ Detailed Backend Documentation](./backend/README.md)

### Frontend - The Adventure Interface

The frontend is a beautiful, responsive Next.js application that brings your D&D adventure to life with real-time updates and immersive visuals.

**Core Technologies:**

- **Next.js 14** with App Router
- **React 18** with TypeScript
- **LiveKit Client SDK** - Real-time voice and data streaming
- **TailwindCSS** - Responsive, fantasy-themed styling
- **Custom Hooks** - Real-time world state synchronization

**Game Interface Components:**

1. **Character Panel** (`character-panel.tsx`)
   - Player name, class, and level
   - HP and status tracking
   - Attribute display (Strength, Intelligence, Luck)
   - Interactive inventory with item details modal
   - Shows quantity, durability, weight, value, and descriptions

2. **NPC Panel** (`npc-panel.tsx`)
   - Lists all encountered NPCs
   - Expandable cards showing role, attitude, location
   - Alive/dead status tracking
   - Character descriptions and backstory

3. **Quests Panel** (`quests-panel.tsx`)
   - Active quests with descriptions and status
   - Completed quests log
   - Expandable quest details
   - Quest counter badges

4. **Chat Transcript** (`chat-transcript.tsx`)
   - Real-time conversation history
   - Distinguishes between player and GM messages
   - Auto-scroll with manual override
   - Timestamped entries

5. **Session View** (`session-view.tsx`)
   - Main game interface with tile layout
   - Video/audio controls
   - Agent connection status
   - Responsive panel management

**Visual Enhancements:**

- 🎨 **Custom Fantasy Backgrounds** - Immersive desktop and mobile backgrounds
- 🌓 **Dark/Light Theme** - System-aware theme switching
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile
- ✨ **Smooth Animations** - Polished UI transitions and effects

[→ Detailed Frontend Documentation](./frontend/README.md)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Python 3.10+** with [uv](https://docs.astral.sh/uv/) package manager
- **Node.js 18+** with pnpm (`npm install -g pnpm`)
- **Docker & Docker Compose** (for containerized deployment)
- **LiveKit Server** (automatically started in dev mode or via Docker)

### Quick Start Options

You can run this project in three ways:

1. **Docker Compose** (Recommended for production-like environment)
2. **Manual Setup** (Best for development)
3. **Quick Start Script** (Fast local testing)

---

## Option 1: Docker Compose (Recommended)

The easiest way to run the complete stack with all dependencies containerized.

### Step 1: Environment Setup

Create environment files for both backend and frontend:

```bash
# Backend environment
cd backend
cp .env.example .env.prod
# Edit .env.prod with your API keys:
# - LIVEKIT_URL=ws://localhost:7880
# - LIVEKIT_API_KEY=<your-key>
# - LIVEKIT_API_SECRET=<your-secret>
# - MURF_API_KEY=<your-murf-key>
# - GOOGLE_API_KEY=<your-google-key>
# - DEEPGRAM_API_KEY=<your-deepgram-key>

# Frontend environment
cd ../frontend
cp .env.example .env.prod
# Edit .env.prod with the same LiveKit credentials
```

### Step 2: Start with Docker Compose

```bash
# From the root directory
docker-compose up --build
```

This will:
- Build and start the backend agent container
- Build and start the frontend container
- Set up networking between services
- Persist volumes for dependencies and models

**Access the application:**
- Frontend: http://localhost:3000
- Backend logs: `docker-compose logs -f backend`

**Stop the services:**
```bash
docker-compose down
```

**Rebuild after changes:**
```bash
docker-compose up --build
```

---

## Option 2: Manual Setup (Development)

Run each service individually for maximum control and debugging capability.

### Step 1: Backend Setup

```bash
cd backend

# Install dependencies with uv
uv sync

# Create environment file
cp .env.example .env.local

# Edit .env.local with your credentials:
# - LIVEKIT_URL
# - LIVEKIT_API_KEY
# - LIVEKIT_API_SECRET
# - MURF_API_KEY (for Falcon TTS)
# - GOOGLE_API_KEY (for Gemini LLM)
# - DEEPGRAM_API_KEY (for Deepgram STT)

# Download required models
uv run python src/agent.py download-files
```

**Using LiveKit Cloud credentials (optional):**
```bash
lk cloud auth
lk app env -w -d .env.local
```

### Step 2: Frontend Setup

```bash
cd frontend

# Install dependencies with pnpm
pnpm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with the same LiveKit credentials
nano .env.local
```

### Step 3: Start LiveKit Server

```bash
# Install LiveKit server (if not already installed)
# macOS:
brew install livekit

# Windows: Download from https://github.com/livekit/livekit/releases
# Linux: Download from https://github.com/livekit/livekit/releases

# Start in development mode
livekit-server --dev
```

The server will run on `ws://localhost:7880` with auto-generated dev credentials.

### Step 4: Start Backend Agent

Open a new terminal:

```bash
cd backend
uv run python src/agent.py dev
```

The agent will connect to LiveKit and wait for client connections.

### Step 5: Start Frontend

Open another terminal:

```bash
cd frontend
pnpm dev
```

**Access the application:**
- Frontend: http://localhost:3000
- LiveKit Server: http://localhost:7880

---

## Option 3: Quick Start Script

For rapid local testing (Linux/macOS/WSL):

```bash
# Make the script executable
chmod +x start_app.sh

# Run everything
./start_app.sh
```

This script will:
1. Start LiveKit server in dev mode
2. Launch the backend agent
3. Start the frontend dev server

**Note:** This requires all prerequisites installed and `.env.local` files configured.

---

## Environment Variables Reference

### Backend (.env.local or .env.prod)

```env
# LiveKit Configuration
LIVEKIT_URL=ws://localhost:7880          # or wss://your-livekit-cloud.io
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret

# AI Service APIs
MURF_API_KEY=your_murf_api_key           # For Falcon TTS
GOOGLE_API_KEY=your_google_api_key       # For Gemini LLM
DEEPGRAM_API_KEY=your_deepgram_api_key   # For Nova 3 STT
```

### Frontend (.env.local or .env.prod)

```env
# Must match backend LiveKit configuration
LIVEKIT_URL=ws://localhost:7880
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
```

---

## Usage Guide

### Starting a New Adventure

1. Open http://localhost:3000 in your browser
2. Click "Start Call" to connect to the Game Master
3. Allow microphone permissions when prompted
4. Speak to begin your adventure!

### Interacting with the Game Master

- **Speak naturally** - The GM understands conversational language
- **Make decisions** - Choose dialogue options, combat actions, exploration paths
- **Check your panels** - Monitor HP, inventory, quests, and NPCs in real-time
- **Use items** - Mention items by name ("I use my healing potion")
- **Explore** - Ask about your surroundings, talk to NPCs, investigate clues

### Game Mechanics

- **HP System** - Damage reduces HP, healing restores it
- **Inventory** - Items have durability, weight, and value
- **Item Durability** - Weapons degrade with use, torches burn out over time
- **Quests** - Track active objectives and completed missions
- **NPCs** - Remember characters you meet and their attitudes toward you

---

## Testing

### Backend Tests

The backend includes a comprehensive test suite using pytest:

```bash
cd backend
uv run pytest

# Run with coverage
uv run pytest --cov

# Run specific test file
uv run pytest tests/test_agent.py
```

Learn more about testing voice agents in the [LiveKit testing documentation](https://docs.livekit.io/agents/build/testing/).

### Frontend Tests

```bash
cd frontend
pnpm test
```

---

## Development Tips

### Debugging the Agent

Enable verbose logging:

```bash
cd backend
LIVEKIT_LOG_LEVEL=debug uv run python src/agent.py dev
```

### Customizing the Game Master

Edit `backend/src/agent.py`:

- Modify the `instructions` prompt to change GM personality and behavior
- Add custom function tools for new game mechanics
- Adjust the initial `world_state` for different starting scenarios

### Styling the Frontend

- Update `frontend/styles/globals.css` for theme customization
- Replace background images in `frontend/public/`
- Modify component styles in individual `.tsx` files

### Hot Reloading

Both backend and frontend support hot reloading during development:
- **Backend**: Agent restarts automatically on code changes
- **Frontend**: Browser refreshes automatically via Next.js Fast Refresh

---

## Troubleshooting

### Common Issues

**Agent not connecting:**
- Verify LiveKit server is running (`livekit-server --dev`)
- Check `.env.local` credentials match between frontend and backend
- Ensure ports 7880 (LiveKit) and 3000 (frontend) are available

**No audio/microphone not working:**
- Grant browser microphone permissions
- Check browser console for WebRTC errors
- Try a different browser (Chrome/Edge recommended)

**Docker containers not starting:**
- Run `docker-compose down -v` to clean volumes
- Check Docker daemon is running
- Verify `.env.prod` files exist and are configured

**World state not updating:**
- Check backend logs for function call errors
- Verify LiveKit data channel connection in browser DevTools
- Ensure GM is using function tools (check logs for tool calls)

### Getting Help

- **Backend Issues**: See [backend/README.md](./backend/README.md)
- **Frontend Issues**: See [frontend/README.md](./frontend/README.md)
- **LiveKit Docs**: https://docs.livekit.io/
- **Community**: [LiveKit Slack](https://livekit.io/join-slack)

---

## Documentation & Resources

- [Murf Falcon TTS Documentation](https://murf.ai/api/docs/text-to-speech/streaming)
- [LiveKit Agents Documentation](https://docs.livekit.io/agents)
- [Google Gemini API](https://ai.google.dev/docs)
- [Deepgram API Documentation](https://developers.deepgram.com/)
- [Original Backend Template](https://github.com/livekit-examples/agent-starter-python)
- [Original Frontend Template](https://github.com/livekit-examples/agent-starter-react)

---

## Architecture Overview

### Data Flow

```
User Voice → Deepgram STT → Gemini LLM → Murf TTS → User Audio
                                  ↓
                            Function Tools
                                  ↓
                            World State Update
                                  ↓
                        LiveKit Data Channel
                                  ↓
                          Frontend Components
```

### World State Schema

```json
{
  "player": {
    "name": "Adventurer",
    "class": "Wanderer",
    "hp": 100,
    "status": "Healthy",
    "attributes": { "Strength": 10, "Intelligence": 10, "Luck": 10 },
    "inventory": [
      {
        "name": "Iron Sword",
        "qty": 1,
        "desc": "A sturdy blade...",
        "durability": 100,
        "weight": 5,
        "value": 50
      }
    ]
  },
  "npcs": {
    "Elder Thistlewick": {
      "role": "village elder",
      "attitude": "friendly",
      "alive": true,
      "location": "Oakhaven Village"
    }
  },
  "quests": {
    "active": [
      {
        "name": "Village Creatures",
        "description": "Investigate the attacks",
        "status": "active"
      }
    ],
    "completed": []
  },
  "locations": { ... },
  "events": [ ... ]
}
```

---

## Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Contribution Ideas

- Add new game mechanics (magic system, crafting, etc.)
- Create additional NPC interactions
- Implement combat dice rolling
- Add location-based encounters
- Improve UI/UX with animations
- Add save/load game functionality
- Create different campaign settings

---

## License

This project is based on MIT-licensed templates from LiveKit and includes integrations with various AI services. See individual LICENSE files in backend and frontend directories for details.

---

## Acknowledgments

- **LiveKit** - Real-time communication infrastructure
- **Murf.ai** - Ultra-fast TTS with Falcon
- **Google** - Gemini LLM for intelligent narration
- **Deepgram** - Accurate speech-to-text
- **AI Voice Agents Challenge** - Initial inspiration

---

## Project Status

🚀 **Active Development** - This project is actively being developed with new features and improvements regularly added.

### Roadmap

- [ ] Save/load game state persistence
- [ ] Multiple campaign scenarios
- [ ] Advanced combat system with dice mechanics
- [ ] Magic spell system
- [ ] Multiplayer support for party adventures
- [ ] Mobile app version
- [ ] Voice cloning for custom NPC voices
- [ ] Generated dungeon maps

---

Built with ❤️ for tabletop RPG enthusiasts and AI voice technology explorers!
