# ≡ƒÄ╡ World Stage ΓÇö A Music Industry RPG

> *From a Lagos open mic to the Tokyo Dome. Your journey starts with one track.*

**World Stage** is a mobile RPG set inside the global music industry. You play as an emerging artist navigating the unique scenes, politics, and sounds of music cities around the world ΓÇö building reputation, signing deals, recording tracks, and forging relationships that shape your career.

---

## ≡ƒîì The World

Eight playable regions (more coming), each with distinct genres, cultures, venues, NPCs, and narrative arcs:

| Region | Country | Genres | Unlock |
|---|---|---|---|
| ≡ƒç│≡ƒç¼ Lagos | Nigeria | Afrobeats, Highlife, Afro-House | Starter |
| ≡ƒç¼≡ƒçº London | UK | Grime, Drill, Electronic | Level 4 |
| ≡ƒç║≡ƒç╕ Atlanta | USA | Hip-Hop, R&B, Trap | Level 6 |
| ≡ƒçº≡ƒç╖ S├úo Paulo | Brazil | Baile Funk, Samba, Latin Pop | Level 5 |
| ≡ƒç░≡ƒç╖ Seoul | South Korea | K-Pop, Hip-Hop, R&B | Level 5 |
| ≡ƒç║≡ƒç╕ Nashville | USA | Country, Rock, Pop | Level 7 |
| ≡ƒç┐≡ƒçª Johannesburg | South Africa | Amapiano, Afro-House | Level 6 |
| ≡ƒç»≡ƒç╡ Tokyo | Japan | J-Pop, Electronic | Level 12 (Seoul deal required) |

---

## ≡ƒÄ« Core Gameplay Loop

```
Travel ΓåÆ Meet NPCs ΓåÆ Accept Quests ΓåÆ Record Tracks ΓåÆ Perform ΓåÆ Build Rep ΓåÆ Unlock New Regions
```

### Artist Stats
Your five stats grow as you play and make decisions:

- **Talent** ΓÇö Raw musical ability. Affects track quality.
- **Charisma** ΓÇö Stage presence and networking. Affects performance outcomes and NPC relationships.
- **Business** ΓÇö Deal-making instincts. Affects contract negotiation.
- **Production** ΓÇö Studio craft. Affects track quality and beat selection.
- **Global Reach** ΓÇö Cross-cultural appeal. Unlocks new regions and boosts international streams.

### Reputation
Every region tracks your reputation separately (0ΓÇô100). Higher rep means access to better venues, bigger events, and more powerful NPCs willing to work with you.

### Relationships
Every NPC has an affinity score. Choices in dialogue move it up or down. Hit certain thresholds and relationships evolve from *stranger* ΓåÆ *acquaintance* ΓåÆ *ally* ΓåÆ *collaborator* ΓåÆ *friend* (or *rival* if you burn bridges).

### Recording
Track quality is calculated from your stats, the beat you use, your equipment, and a random creativity factor. Quality determines streams, rep gained, and earnings.

---

## ≡ƒ¢á Tech Stack

| Layer | Tech |
|---|---|
| Framework | React Native (Expo SDK 50) |
| Language | TypeScript (strict) |
| State | Redux Toolkit |
| Navigation | React Navigation v6 |
| Styling | StyleSheet (custom dark theme) |
| Gradients | expo-linear-gradient |

---

## ≡ƒÜÇ Getting Started

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

## ≡ƒôü Project Structure

```
world-stage/
Γö£ΓöÇΓöÇ App.tsx                     # Entry point
Γö£ΓöÇΓöÇ app.json                    # Expo config
Γö£ΓöÇΓöÇ src/
Γöé   Γö£ΓöÇΓöÇ types/
Γöé   Γöé   ΓööΓöÇΓöÇ index.ts            # All TypeScript types & interfaces
Γöé   Γö£ΓöÇΓöÇ data/
Γöé   Γöé   Γö£ΓöÇΓöÇ regions.ts          # World regions data
Γöé   Γöé   Γö£ΓöÇΓöÇ npcs.ts             # NPC roster with dialogues
Γöé   Γöé   ΓööΓöÇΓöÇ quests.ts           # Quest definitions
Γöé   Γö£ΓöÇΓöÇ store/
Γöé   Γöé   Γö£ΓöÇΓöÇ index.ts            # Redux store
Γöé   Γöé   Γö£ΓöÇΓöÇ playerSlice.ts      # Player state & actions
Γöé   Γöé   ΓööΓöÇΓöÇ gameSlice.ts        # Game phase, quests, settings
Γöé   Γö£ΓöÇΓöÇ screens/
Γöé   Γöé   Γö£ΓöÇΓöÇ MainMenuScreen.tsx
Γöé   Γöé   Γö£ΓöÇΓöÇ CharacterCreationScreen.tsx
Γöé   Γöé   Γö£ΓöÇΓöÇ WorldMapScreen.tsx
Γöé   Γöé   Γö£ΓöÇΓöÇ StudioScreen.tsx
Γöé   Γöé   Γö£ΓöÇΓöÇ QuestsScreen.tsx
Γöé   Γöé   Γö£ΓöÇΓöÇ ProfileScreen.tsx
Γöé   Γöé   ΓööΓöÇΓöÇ RegionScreen.tsx
Γöé   Γö£ΓöÇΓöÇ navigation/
Γöé   Γöé   ΓööΓöÇΓöÇ index.tsx           # Stack + Tab navigators
Γöé   ΓööΓöÇΓöÇ utils/
Γöé       ΓööΓöÇΓöÇ gameEngine.ts       # Core game logic (quality, streams, performance)
ΓööΓöÇΓöÇ assets/
    Γö£ΓöÇΓöÇ images/
    ΓööΓöÇΓöÇ sounds/
```

---

## ≡ƒù║ Roadmap

### v0.2 ΓÇö NPC Economy
- [ ] Full NPC dialogue trees with branching
- [ ] Collaboration feature (co-write / feature tracks)
- [ ] Label contract negotiation mini-game

### v0.3 ΓÇö Live Performance
- [ ] Performance mini-game (rhythm / crowd reaction)
- [ ] Festival booking system
- [ ] Award show events with narrative outcomes

### v0.4 ΓÇö Business Layer
- [ ] Record label deal flow
- [ ] Publishing royalties and sync licensing
- [ ] Manager/agent NPC tier
- [ ] Rival artist system

### v0.5 ΓÇö Audio & Polish
- [ ] Regional ambient soundscapes
- [ ] Beat preview system (original audio)
- [ ] Animated region transitions
- [ ] Save/load system (AsyncStorage)

### v1.0 ΓÇö Launch
- [ ] Full narrative arcs for all 8 regions
- [ ] Multiplayer charts (global leaderboard by region)
- [ ] App Store / Google Play release

---

## ≡ƒñ¥ Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/new-region-mumbai`)
3. Commit your changes (`git commit -m 'Add Mumbai region'`)
4. Push to the branch (`git push origin feature/new-region-mumbai`)
5. Open a Pull Request

---

## ≡ƒôä License

MIT ┬⌐ Fellito Rodriguez
---

## License & Brand

<img src="FEDGE-2O-Logo.png" alt="FEDGE 2.O Logo" width="120" height="120">

### FEDGE 2.O | Powered by Rafael Fellito Rodriguez and Eclat Universe

**┬⌐ 2026 FEDGE 2.O. All rights reserved.**

This project is part of the FEDGE 2.O ecosystem and is protected under full intellectual property rights reserved by Rafael Fellito Rodriguez and Eclat Universe.

### License Details

- **Type:** Proprietary - All Rights Reserved
- **Owner:** Rafael Fellito Rodriguez and Eclat Universe
- **Brand:** FEDGE 2.O
- **Status:** Protected and Confidential

### Key Rights

Γ£ô **All intellectual property retained**
Γ£ô **Reproduction prohibited without permission**
Γ£ô **Distribution rights reserved**
Γ£ô **Derivative works not permitted**
Γ£ô **Commercial use requires authorization**

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
