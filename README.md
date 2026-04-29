# 🎵 World Stage — A Music Industry RPG

> *From a Lagos open mic to the Tokyo Dome. Your journey starts with one track.*

**World Stage** is a mobile RPG set inside the global music industry. You play as an emerging artist navigating the unique scenes, politics, and sounds of music cities around the world — building reputation, signing deals, recording tracks, and forging relationships that shape your career.

---

## 🌍 The World

Eight playable regions (more coming), each with distinct genres, cultures, venues, NPCs, and narrative arcs:

| Region | Country | Genres | Unlock |
|---|---|---|---|
| 🇳🇬 Lagos | Nigeria | Afrobeats, Highlife, Afro-House | Starter |
| 🇬🇧 London | UK | Grime, Drill, Electronic | Level 4 |
| 🇺🇸 Atlanta | USA | Hip-Hop, R&B, Trap | Level 6 |
| 🇧🇷 São Paulo | Brazil | Baile Funk, Samba, Latin Pop | Level 5 |
| 🇰🇷 Seoul | South Korea | K-Pop, Hip-Hop, R&B | Level 5 |
| 🇺🇸 Nashville | USA | Country, Rock, Pop | Level 7 |
| 🇿🇦 Johannesburg | South Africa | Amapiano, Afro-House | Level 6 |
| 🇯🇵 Tokyo | Japan | J-Pop, Electronic | Level 12 (Seoul deal required) |

---

## 🎮 Core Gameplay Loop

```
Travel → Meet NPCs → Accept Quests → Record Tracks → Perform → Build Rep → Unlock New Regions
```

### Artist Stats
Your five stats grow as you play and make decisions:

- **Talent** — Raw musical ability. Affects track quality.
- **Charisma** — Stage presence and networking. Affects performance outcomes and NPC relationships.
- **Business** — Deal-making instincts. Affects contract negotiation.
- **Production** — Studio craft. Affects track quality and beat selection.
- **Global Reach** — Cross-cultural appeal. Unlocks new regions and boosts international streams.

### Reputation
Every region tracks your reputation separately (0–100). Higher rep means access to better venues, bigger events, and more powerful NPCs willing to work with you.

### Relationships
Every NPC has an affinity score. Choices in dialogue move it up or down. Hit certain thresholds and relationships evolve from *stranger* → *acquaintance* → *ally* → *collaborator* → *friend* (or *rival* if you burn bridges).

### Recording
Track quality is calculated from your stats, the beat you use, your equipment, and a random creativity factor. Quality determines streams, rep gained, and earnings.

---

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Framework | React Native (Expo SDK 50) |
| Language | TypeScript (strict) |
| State | Redux Toolkit |
| Navigation | React Navigation v6 |
| Styling | StyleSheet (custom dark theme) |
| Gradients | expo-linear-gradient |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator (or the Expo Go app on your phone)

### Install & Run

```bash
git clone https://github.com/cryptofedge/world-stage.git
cd world-stage
npm install
npx expo start
```

Scan the QR code with **Expo Go** (iOS/Android) or press `i` for iOS Simulator / `a` for Android.

---

## 📁 Project Structure

```
world-stage/
├── App.tsx                     # Entry point
├── app.json                    # Expo config
├── src/
│   ├── types/
│   │   └── index.ts            # All TypeScript types & interfaces
│   ├── data/
│   │   ├── regions.ts          # World regions data
│   │   ├── npcs.ts             # NPC roster with dialogues
│   │   └── quests.ts           # Quest definitions
│   ├── store/
│   │   ├── index.ts            # Redux store
│   │   ├── playerSlice.ts      # Player state & actions
│   │   └── gameSlice.ts        # Game phase, quests, settings
│   ├── screens/
│   │   ├── MainMenuScreen.tsx
│   │   ├── CharacterCreationScreen.tsx
│   │   ├── WorldMapScreen.tsx
│   │   ├── StudioScreen.tsx
│   │   ├── QuestsScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── RegionScreen.tsx
│   ├── navigation/
│   │   └── index.tsx           # Stack + Tab navigators
│   └── utils/
│       └── gameEngine.ts       # Core game logic (quality, streams, performance)
└── assets/
    ├── images/
    └── sounds/
```

---

## 🗺 Roadmap

### v0.2 — NPC Economy
- [ ] Full NPC dialogue trees with branching
- [ ] Collaboration feature (co-write / feature tracks)
- [ ] Label contract negotiation mini-game

### v0.3 — Live Performance
- [ ] Performance mini-game (rhythm / crowd reaction)
- [ ] Festival booking system
- [ ] Award show events with narrative outcomes

### v0.4 — Business Layer
- [ ] Record label deal flow
- [ ] Publishing royalties and sync licensing
- [ ] Manager/agent NPC tier
- [ ] Rival artist system

### v0.5 — Audio & Polish
- [ ] Regional ambient soundscapes
- [ ] Beat preview system (original audio)
- [ ] Animated region transitions
- [ ] Save/load system (AsyncStorage)

### v1.0 — Launch
- [ ] Full narrative arcs for all 8 regions
- [ ] Multiplayer charts (global leaderboard by region)
- [ ] App Store / Google Play release

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/new-region-mumbai`)
3. Commit your changes (`git commit -m 'Add Mumbai region'`)
4. Push to the branch (`git push origin feature/new-region-mumbai`)
5. Open a Pull Request

---

## 📄 License

MIT © Fellito Rodriguez
---

## License & Brand

<img src="https://raw.githubusercontent.com/cryptofedge/FEDGE2.O/main/FEDGE-2O-Logo.png" alt="FEDGE 2.O Logo" width="120" height="120">

### FEDGE 2.O | Powered by Rafael Fellito Rodriguez and Eclat Universe

**© 2026 FEDGE 2.O. All rights reserved.**

This project is part of the FEDGE 2.O ecosystem and is protected under full intellectual property rights reserved by Rafael Fellito Rodriguez and Eclat Universe.

### License Details

- **Type:** Proprietary - All Rights Reserved
- **Owner:** Rafael Fellito Rodriguez and Eclat Universe
- **Brand:** FEDGE 2.O
- **Status:** Protected and Confidential

### Key Rights

✓ **All intellectual property retained**
✓ **Reproduction prohibited without permission**
✓ **Distribution rights reserved**
✓ **Derivative works not permitted**
✓ **Commercial use requires authorization**

### Attribution

When referencing this software, please include:
- FEDGE 2.O
- Rafael Fellito Rodriguez
- Eclat Universe

### Inquiries

For licensing, partnerships, or usage permissions:
Email: **cryptofedge@gmail.com**

---

**Learn more:** [Full License](LICENSE)
