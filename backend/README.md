<a href="https://livekit.io/">
  <img src="./.github/assets/livekit-mark.png" alt="LiveKit logo" width="100" height="100">
</a>

# D&D Game Master - Backend

> 🎮 **AI-Powered Dungeon Master**
>
> This backend implements an intelligent D&D Game Master using LiveKit Agents, featuring dynamic storytelling, world state management, and real-time voice interaction.
> See the [main README](../README.md) for complete setup instructions and project overview.

A sophisticated Python-based LiveKit Agent that serves as your personal Dungeon Master, managing game state, NPCs, quests, inventory, and narrating your fantasy adventure in real-time.

**Based on:** [livekit-examples/agent-starter-python](https://github.com/livekit-examples/agent-starter-python)

## Features

### Voice AI Pipeline
- **Murf Falcon TTS** - Ultra-fast, natural text-to-speech for GM narration
- **Google Gemini 2.5 Flash** - Advanced LLM for dynamic storytelling
- **Deepgram Nova 3** - High-accuracy speech-to-text
- **Silero VAD** - Voice activity detection
- **Multilingual Turn Detector** - Context-aware conversation flow
- **Background Noise Cancellation** - Clean audio processing

### Game Master Capabilities
- 🎭 **Dynamic Storytelling** - Generates immersive D&D narratives
- 🗺️ **World State Management** - Tracks entire game state in memory
- 📦 **Advanced Inventory System** - Items with durability, weight, value
- ⚔️ **Combat Mechanics** - HP tracking and item durability
- 🧙 **NPC Management** - Creates and tracks NPCs with personalities
- 📜 **Quest System** - Active and completed quest tracking
- 🔧 **Function Tools** - Real-time state updates via specialized functions
- 📡 **Live Broadcasting** - Pushes updates to frontend via data channels

### Technical Features
- Complete test suite with evaluation framework
- Integrated metrics and logging
- Production-ready Dockerfile
- Compatible with web/mobile frontends
- MCP server support for coding agents

## Coding agents and MCP

This project is designed to work with coding agents like [Cursor](https://www.cursor.com/) and [Claude Code](https://www.anthropic.com/claude-code).

To get the most out of these tools, install the [LiveKit Docs MCP server](https://docs.livekit.io/mcp).

For Cursor, use this link:

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-light.svg)](https://cursor.com/en-US/install-mcp?name=livekit-docs&config=eyJ1cmwiOiJodHRwczovL2RvY3MubGl2ZWtpdC5pby9tY3AifQ%3D%3D)

For Claude Code, run this command:

```
claude mcp add --transport http livekit-docs https://docs.livekit.io/mcp
```

For Codex CLI, use this command to install the server:

```
codex mcp add --url https://docs.livekit.io/mcp livekit-docs
```

For Gemini CLI, use this command to install the server:

```
gemini mcp add --transport http livekit-docs https://docs.livekit.io/mcp
```

The project includes a complete [AGENTS.md](AGENTS.md) file for these assistants. You can modify this file your needs. To learn more about this file, see [https://agents.md](https://agents.md).

## Getting Started

### Prerequisites

- Python 3.10 or higher
- [uv](https://docs.astral.sh/uv/) package manager
- LiveKit server (local or cloud)
- API keys for:
  - LiveKit (URL, API key, API secret)
  - Murf.ai (for Falcon TTS)
  - Google (for Gemini LLM)
  - Deepgram (for Nova 3 STT)

### Installation

```bash
cd backend

# Install dependencies with uv
uv sync

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your API keys
# LIVEKIT_URL=ws://localhost:7880
# LIVEKIT_API_KEY=your_key
# LIVEKIT_API_SECRET=your_secret
# MURF_API_KEY=your_murf_key
# GOOGLE_API_KEY=your_google_key
# DEEPGRAM_API_KEY=your_deepgram_key
```

### Using LiveKit Cloud (Optional)

Automatically load credentials using the [LiveKit CLI](https://docs.livekit.io/home/cli/cli-setup):

```bash
lk cloud auth
lk app env -w -d .env.local
```

## Running the Agent

### Download Required Models

Before first run, download AI models ([Silero VAD](https://docs.livekit.io/agents/build/turns/vad/) and [Turn Detector](https://docs.livekit.io/agents/build/turns/turn-detector/)):

```bash
uv run python src/agent.py download-files
```

### Development Mode

Run the agent and connect with the frontend:

```bash
uv run python src/agent.py dev
```

This starts the agent in development mode, listening for connections from the frontend or other clients.

### Console Mode (Testing)

Test the Game Master directly in your terminal:

```bash
uv run python src/agent.py console
```

Speak to the agent using your microphone without needing the frontend.

### Production Mode

For production deployment:

```bash
uv run python src/agent.py start
```

### Docker

```bash
# Build the Docker image
docker build -t dnd-gamemaster-backend .

# Run the container
docker run --env-file .env.prod dnd-gamemaster-backend

# Or use docker-compose from root
cd ..
docker-compose up backend
```

## Game Master Architecture

### World State Management

The agent maintains a complete game state in memory:

```python
self.world_state = {
    "player": {
        "name": "Adventurer",
        "class": "Wanderer",
        "hp": 100,
        "status": "Healthy",
        "attributes": {"Strength": 10, "Intelligence": 10, "Luck": 10},
        "inventory": []
    },
    "npcs": {},
    "locations": {},
    "events": [],
    "quests": {"active": [], "completed": []}
}
```

### Function Tools

The GM uses specialized function tools to update game state:

```python
# NPC Management
@function_tool
async def update_npc(name: str, data: dict):
    """Create or update an NPC with role, attitude, location"""

# Inventory Management  
@function_tool
async def give_item(item: dict):
    """Add items with durability, weight, value, descriptions"""

# Health Management
@function_tool
async def change_hp(amount: int, reason: str):
    """Modify player HP with automatic status updates"""

# Quest Management
@function_tool
async def apply_world_patch(patch: dict):
    """Apply bulk updates to world state"""
```

### Real-time Broadcasting

State changes are broadcast to all connected clients via LiveKit data channels:

```python
def broadcast_world_state(self):
    """Send current world_state to frontend via data channel"""
    payload = json.dumps(self.world_state).encode('utf-8')
    await self._room.local_participant.publish_data(
        payload=payload,
        topic="world_state",
        reliable=True
    )
```

## Frontend Integration

This backend works with the included Next.js frontend in `../frontend/`:
- Real-time world state synchronization
- Character, NPC, and quest panels
- Voice interaction interface
- See [frontend README](../frontend/README.md) for details

## Testing

Run the test suite using pytest:

```bash
# Run all tests
uv run pytest

# Run with coverage
uv run pytest --cov

# Run specific test file
uv run pytest tests/test_agent.py

# Verbose output
uv run pytest -v
```

Tests include:
- Agent initialization
- Function tool validation
- World state management
- NPC and inventory operations
- Quest tracking logic

See [LiveKit testing documentation](https://docs.livekit.io/agents/build/testing/) for more details.

## Customization

### Modifying the Game Master Personality

Edit the `instructions` prompt in `src/agent.py`:

```python
class Assistant(Agent):
    def __init__(self, room=None) -> None:
        super().__init__(
            instructions="""You are an epic Game Master...
            
            # Customize the setting, tone, and rules here
            """)
```

### Adding New Function Tools

Create custom game mechanics:

```python
@function_tool
async def cast_spell(self, spell_name: str, target: str):
    """Custom spell-casting mechanic"""
    # Your logic here
    pass
```

### Changing AI Models

Swap TTS, STT, or LLM providers in the `entrypoint` function:

```python
session = AgentSession(
    # Change STT provider
    stt=deepgram.STT(model="nova-3"),
    
    # Change LLM provider  
    llm=google.LLM(model="gemini-2.5-flash"),
    
    # Change TTS provider
    tts=murf.TTS(voice="en-US-matthew"),
)
```

See [LiveKit model documentation](https://docs.livekit.io/agents/models/) for available options.

## Debugging

Enable verbose logging:

```bash
# Set log level
export LIVEKIT_LOG_LEVEL=debug
uv run python src/agent.py dev

# Or use Python logging
import logging
logging.basicConfig(level=logging.DEBUG)
```

Check logs for:
- Function tool calls
- World state changes
- LLM responses
- Audio pipeline events

## Deployment

### Production Deployment

This project is production-ready with a working `Dockerfile`:

```bash
# Build production image
docker build -t dnd-gamemaster-backend .

# Run with production config
docker run -d \
  --env-file .env.prod \
  --name gamemaster-agent \
  dnd-gamemaster-backend
```

See [LiveKit deployment guide](https://docs.livekit.io/agents/ops/deployment/) for cloud deployment options.

### Environment Variables (Production)

Create `.env.prod` for production:

```env
LIVEKIT_URL=wss://your-livekit-cloud.livekit.cloud
LIVEKIT_API_KEY=your_production_key
LIVEKIT_API_SECRET=your_production_secret
MURF_API_KEY=your_murf_production_key
GOOGLE_API_KEY=your_google_production_key
DEEPGRAM_API_KEY=your_deepgram_production_key
```

### Self-hosted LiveKit

You can self-host LiveKit instead of using LiveKit Cloud:
- See [self-hosting guide](https://docs.livekit.io/home/self-hosting/)
- Use [model plugins](https://docs.livekit.io/agents/models/#plugins) for local inference
- Remove noise cancellation plugin if not using LiveKit Cloud

## Troubleshooting

**Agent won't start:**
- Verify all API keys in `.env.local`
- Check LiveKit server is running
- Ensure models are downloaded (`download-files`)

**No audio/TTS issues:**
- Verify Murf API key is valid
- Check network connectivity
- Review logs for TTS errors

**World state not broadcasting:**
- Confirm frontend is connected
- Check data channel permissions
- Verify `broadcast_world_state()` is called

**Function tools not working:**
- Check LLM is calling tools correctly
- Review function signatures match instructions
- Enable debug logging to see tool calls

## Resources

- [Main Project README](../README.md)
- [Frontend Documentation](../frontend/README.md)
- [LiveKit Agents Documentation](https://docs.livekit.io/agents)
- [Murf Falcon TTS Docs](https://murf.ai/api/docs)
- [Google Gemini API](https://ai.google.dev/docs)
- [Deepgram API](https://developers.deepgram.com/)

## Contributing

We welcome contributions!

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add/update tests
5. Submit a pull request

### Ideas for Contributions
- Additional game mechanics (magic, crafting)
- More robust combat system
- Save/load game state
- Multiple campaign settings
- Voice cloning for NPCs

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
