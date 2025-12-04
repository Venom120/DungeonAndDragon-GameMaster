# D&D Game Master - Frontend

> 🎮 **Voice-Controlled Fantasy Adventure Interface**
>
> This is the frontend application for the D&D Game Master voice agent, providing an immersive visual interface for your fantasy adventures.
> See the [main README](../README.md) for complete setup instructions and project overview.

An interactive web application built with Next.js and React that brings your D&D adventure to life. Features real-time voice interaction with an AI Game Master, dynamic world state visualization, and a beautiful fantasy-themed interface.

**Based on:** [livekit-examples/agent-starter-react](https://github.com/livekit-examples/agent-starter-react)

**Technologies:** Next.js 14 • React 18 • TypeScript • LiveKit Client SDK • TailwindCSS

<picture>
  <source srcset="./.github/assets/readme-hero-dark.webp" media="(prefers-color-scheme: dark)">
  <source srcset="./.github/assets/readme-hero-light.webp" media="(prefers-color-scheme: light)">
  <img src="./.github/assets/readme-hero-light.webp" alt="App screenshot">
</picture>

### Features:

- 🎙️ **Real-time Voice Interaction** - Natural conversation with your AI Game Master
- 📊 **Live Game Panels** - Dynamic character stats, inventory, NPCs, and quest tracking
- 🎨 **Fantasy-Themed UI** - Immersive backgrounds and responsive design
- 💬 **Chat Transcript** - Complete conversation history with auto-scroll
- 🌓 **Theme Support** - Dark/light mode with system preference detection
- 🎮 **Interactive Inventory** - Detailed item information with modals
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile
- ⚡ **Real-time Updates** - World state syncs instantly via LiveKit data channels
- 🔧 **Customizable** - Easy branding and configuration via `app-config.ts`

### Project Structure

```
frontend/
├── app/
│   ├── (app)/              # Main app routes
│   │   ├── layout.tsx      # Game layout wrapper
│   │   ├── page.tsx        # Landing page
│   │   └── opengraph-image.tsx
│   ├── api/
│   │   └── connection-details/  # LiveKit token generation
│   └── ui/                 # UI-only routes
├── components/
│   ├── app/                # D&D Game components
│   │   ├── character-panel.tsx    # Player stats & inventory
│   │   ├── npc-panel.tsx          # NPC tracker
│   │   ├── quests-panel.tsx       # Quest log
│   │   ├── chat-transcript.tsx    # Message history
│   │   ├── session-view.tsx       # Main game view
│   │   ├── welcome-view.tsx       # Pre-connection screen
│   │   └── tile-layout.tsx        # Layout manager
│   └── livekit/            # LiveKit UI components
│       ├── agent-control-bar/
│       ├── scroll-area/
│       └── chat-entry.tsx
├── hooks/
│   ├── useWorldStateFromMessages.ts  # World state sync
│   ├── useChatMessages.ts            # Chat management
│   ├── useRoom.ts                     # LiveKit room logic
│   └── useDebug.ts
├── public/
│   ├── bg-desktop.png      # Fantasy background (desktop)
│   ├── bg-mobile.png       # Fantasy background (mobile)
│   └── opengraph-image-bg.png
├── styles/
│   └── globals.css         # Global styles & theme
├── app-config.ts           # App configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager (`npm install -g pnpm`)
- LiveKit credentials (API key, secret, and URL)
- Backend agent running (see [backend README](../backend/README.md))

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your LiveKit credentials
# LIVEKIT_URL=ws://localhost:7880
# LIVEKIT_API_KEY=your_api_key
# LIVEKIT_API_SECRET=your_api_secret
```

### Development

```bash
# Start the development server
pnpm dev

# Open in your browser
# http://localhost:3000
```

### Production Build

```bash
# Create optimized production build
pnpm build

# Start production server
pnpm start
```

### Docker

```bash
# Build the Docker image
docker build -t dnd-gamemaster-frontend .

# Run the container
docker run -p 3000:3000 --env-file .env.local dnd-gamemaster-frontend

# Or use docker-compose from root directory
cd ..
docker-compose up frontend
```

> **Note:** The backend agent must be running for the voice interaction to work. See the [main README](../README.md) for complete setup instructions.

## Configuration

### App Configuration (`app-config.ts`)

Customize the game's branding and features:

```ts
export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'Venom120',
  pageTitle: 'D&D Game Master',
  pageDescription: 'An interactive voice-controlled fantasy adventure game powered by AI',

  supportsChatInput: true,      // Enable text chat
  supportsVideoInput: false,    // Disable video (voice-only)
  supportsScreenShare: false,   // Disable screen sharing
  isPreConnectBufferEnabled: true,  // Pre-connect audio buffer

  logo: '/lk-logo.svg',
  accent: '#9333ea',            // Purple theme for fantasy feel
  logoDark: '/lk-logo-dark.svg',
  accentDark: '#a855f7',
  startButtonText: 'Begin Adventure',  // Custom CTA

  sandboxId: undefined,
  agentName: undefined,
};
```

### Customization Options

- **Branding**: Update `pageTitle`, `companyName`, and logos
- **Theme Colors**: Change `accent` and `accentDark` for different color schemes
- **Features**: Toggle `supportsChatInput`, `supportsVideoInput`, `supportsScreenShare`
- **Backgrounds**: Replace `bg-desktop.png` and `bg-mobile.png` in `/public`
- **Styles**: Modify `styles/globals.css` for custom themes

### Environment Variables

Create `.env.local` (development):

```env
# LiveKit Connection (must match backend)
LIVEKIT_URL=ws://localhost:7880
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret

# Optional: For production deployment
# LIVEKIT_URL=wss://your-livekit-cloud.livekit.cloud
```

**Important:** These credentials must match your backend configuration for the agent to connect properly.

## Key Components

### Character Panel
Displays player stats including:
- Name, class, level, and XP
- HP and status (Healthy/Unconscious)
- Attributes (Strength, Intelligence, Luck)
- Interactive inventory with detailed item modals

### NPC Panel
Tracks encountered NPCs:
- Expandable cards with full details
- Role, attitude, and location
- Alive/dead status
- Character descriptions

### Quests Panel
Manages your adventure objectives:
- Active quests with descriptions
- Completed quests log
- Quest status tracking

### Chat Transcript
Conversation history:
- GM narration and player responses
- Auto-scrolling with manual override
- Persistent throughout session

### World State Synchronization
Real-time updates via LiveKit data channels:
```typescript
// Automatically syncs from backend via useWorldStateFromMessages hook
const worldState = useWorldStateFromMessages(chatMessages);
```

## Development

### Hot Reloading
Next.js Fast Refresh enables instant updates during development:
- Component changes reflect immediately
- State is preserved across reloads
- No manual refresh needed

### Debugging
```bash
# Enable debug mode
export DEBUG=livekit*
pnpm dev

# Check browser console for:
# - LiveKit connection logs
# - World state updates
# - WebRTC connection status
```

### Adding Custom Components
1. Create component in `components/app/`
2. Import in `session-view.tsx`
3. Add to tile layout
4. Connect to world state via hooks

## Troubleshooting

**Issue: "Failed to connect to agent"**
- Verify backend agent is running
- Check `.env.local` credentials match backend
- Ensure LiveKit server is accessible

**Issue: "World state not updating"**
- Check browser console for data channel messages
- Verify backend is calling function tools
- Inspect network tab for LiveKit data packets

**Issue: "Microphone not working"**
- Grant browser microphone permissions
- Check browser compatibility (Chrome/Edge recommended)
- Verify microphone is not in use by another app

## Resources

- [Main Project README](../README.md)
- [Backend Documentation](../backend/README.md)
- [LiveKit Docs](https://docs.livekit.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS](https://tailwindcss.com/docs)

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

For major changes, open an issue first to discuss proposed modifications.

## License

This project is based on MIT-licensed templates from LiveKit. See [LICENSE](../LICENSE) for details.
