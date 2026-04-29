import { WardrobeItem, Photographer, ArtistAesthetic, Distributor } from '../types';

// ─── Wardrobe Items ───────────────────────────────────────────────────────────

export const WARDROBE_ITEMS: WardrobeItem[] = [
  // Street / Urban
  {
    id: 'thrift_fit',
    name: 'Thrift Store Fit',
    cost: 30,
    imageBonus: 5,
    aesthetic: 'Raw & Authentic',
    description: 'Clean thrift-store finds. Low budget, high character. The streets respect the grind.',
  },
  {
    id: 'basic_streetwear',
    name: 'Basic Streetwear Set',
    cost: 120,
    imageBonus: 12,
    aesthetic: 'Street',
    description: 'Nike, Champion, joggers. Recognizable, comfortable, and relatable.',
  },
  {
    id: 'custom_streetwear',
    name: 'Custom Streetwear',
    cost: 400,
    imageBonus: 25,
    aesthetic: 'Street',
    description: 'Custom printed hoodies and tees with your brand. Looks like merch before it\'s merch.',
  },
  // Luxury
  {
    id: 'luxury_starter',
    name: 'Luxury Starter Pieces',
    cost: 800,
    imageBonus: 30,
    aesthetic: 'Luxury',
    description: 'A few strategic designer pieces — belt, shoes, accessories. Signal the level.',
  },
  {
    id: 'full_designer',
    name: 'Full Designer Look',
    cost: 3000,
    imageBonus: 55,
    aesthetic: 'Luxury',
    description: 'Head-to-toe designer. Balenciaga, Off-White, Gucci. Turns heads in any room.',
  },
  // Afrocentric
  {
    id: 'ankara_set',
    name: 'Ankara Print Set',
    cost: 150,
    imageBonus: 20,
    aesthetic: 'Afrocentric',
    description: 'Vibrant African print two-piece. Cultural, bold, distinctive.',
  },
  {
    id: 'agbada',
    name: 'Custom Agbada',
    cost: 350,
    imageBonus: 35,
    aesthetic: 'Afrocentric',
    description: 'Hand-tailored traditional West African wear, modernized. Instantly iconic.',
  },
  // Minimalist
  {
    id: 'monochrome_minimal',
    name: 'Monochrome Minimal Set',
    cost: 250,
    imageBonus: 22,
    aesthetic: 'Minimalist',
    description: 'All-black or all-white. Clean lines. The music speaks louder when the look steps back.',
  },
  // Avant-garde
  {
    id: 'avant_garde_custom',
    name: 'Avant-Garde Custom Piece',
    cost: 1200,
    imageBonus: 45,
    aesthetic: 'Avant-garde',
    description: 'One-of-a-kind piece from an emerging fashion designer. Polarizing — people will talk.',
  },
  // Vintage
  {
    id: 'vintage_90s',
    name: '90s Vintage Archive',
    cost: 200,
    imageBonus: 18,
    aesthetic: 'Vintage',
    description: 'Curated vintage from thrift and archive sites. Nostalgic and unique.',
  },
  // Futuristic
  {
    id: 'techwear',
    name: 'Techwear Set',
    cost: 600,
    imageBonus: 32,
    aesthetic: 'Futuristic',
    description: 'Sleek, functional, futuristic. ACRONYM-style layers. You look like you\'re from 2040.',
  },
];

// ─── Photographers ────────────────────────────────────────────────────────────

export const PHOTOGRAPHERS: Photographer[] = [
  {
    id: 'local_photographer',
    name: 'Local Amateur Photographer',
    cost: 100,
    quality: 1,
    specialty: 'Street & Lifestyle',
    description: 'A friend with a good camera. The shots are decent but nothing editorial. Gets the job done.',
  },
  {
    id: 'semi_pro_photographer',
    name: 'Semi-Pro Music Photographer',
    cost: 400,
    quality: 2,
    specialty: 'Artist Portraits',
    description: 'Has shot local artists and small shows. Good technical skills, understands the vibe.',
  },
  {
    id: 'editorial_photographer',
    name: 'Editorial Photographer',
    cost: 1200,
    quality: 3,
    specialty: 'Magazine & Press',
    description: 'Has credits in regional magazines. Knows lighting, knows composition, knows how to make you look like a star.',
  },
  {
    id: 'industry_photographer',
    name: 'Industry Photographer',
    cost: 3000,
    quality: 4,
    specialty: 'Billboard & Campaign',
    description: 'Their portfolio reads like a who\'s who. Shot covers. Knows how to create an iconic image.',
  },
  {
    id: 'celebrity_photographer',
    name: 'Celebrity Photographer',
    cost: 8000,
    quality: 5,
    specialty: 'World-Class Editorial',
    description: 'Vogue, Rolling Stone, Billboard. When you work with them, people notice. The photos tell a story before you say a word.',
  },
];

// ─── Distributors ─────────────────────────────────────────────────────────────

export const DISTRIBUTORS: Distributor[] = [
  {
    id: 'distrokid',
    name: 'DistroKid',
    annualFee: 20,
    royaltyRate: 1.0, // keeps 100% of royalties
    description: 'Cheapest option. Upload unlimited tracks, keep 100% of royalties. Basic analytics.',
    perks: ['100% royalty keep', 'Unlimited releases', 'Fast distribution'],
  },
  {
    id: 'tunecore',
    name: 'TuneCore',
    annualFee: 30,
    royaltyRate: 1.0,
    description: 'Established platform, strong reporting, sync licensing opportunities.',
    perks: ['100% royalty keep', 'Sync licensing', 'Detailed analytics', 'Publishing admin'],
  },
  {
    id: 'amuse',
    name: 'Amuse',
    annualFee: 0,
    royaltyRate: 0.85,
    description: 'Free distribution. Takes 15% of royalties. They also scout artists for record deals.',
    perks: ['Free to use', 'Label scouting', 'Artist development'],
  },
  {
    id: 'empire',
    name: 'EMPIRE Distribution',
    annualFee: 0,
    royaltyRate: 0.80,
    description: 'Major indie distributor with marketing support. Strong in Hip-Hop and R&B. 80/20 split.',
    perks: ['Marketing support', 'Playlist pitching', 'Global reach', 'Radio promo'],
  },
  {
    id: 'sony_orchard',
    name: 'The Orchard (Sony)',
    annualFee: 0,
    royaltyRate: 0.70,
    description: 'Sony-owned major distributor. Tier-1 global reach, full marketing suite. 70/30 split.',
    perks: ['Sony network', 'Premium playlist access', 'Global radio', 'Sync deals', 'Tour support'],
  },
];

// ─── Aesthetics Config ────────────────────────────────────────────────────────

export const AESTHETIC_COLORS: Record<ArtistAesthetic, string> = {
  'Street': '#FF4E00',
  'Luxury': '#C9B037',
  'Afrocentric': '#1DB954',
  'Minimalist': '#FFFFFF',
  'Avant-garde': '#9B59B6',
  'Vintage': '#B7935A',
  'Futuristic': '#00D4FF',
  'Raw & Authentic': '#F5A623',
};

export const AESTHETIC_DESCRIPTIONS: Record<ArtistAesthetic, string> = {
  'Street': 'Grounded in urban culture. Hoodies, sneakers, gold chains. Relatable.',
  'Luxury': 'Designer everything. Every photo looks expensive. Aspirational.',
  'Afrocentric': 'Celebrating African heritage through fashion and visual identity.',
  'Minimalist': 'Less is more. Clean, stripped-back visuals. The art speaks loudest.',
  'Avant-garde': 'Boundary-pushing, fashion-forward. You\'re ahead of the curve.',
  'Vintage': 'Nostalgic references, archive pieces. Timeless and curated.',
  'Futuristic': 'Techwear, chrome, digital aesthetics. You\'re from the future.',
  'Raw & Authentic': 'No filters, no pretense. What you see is what you get.',
};
