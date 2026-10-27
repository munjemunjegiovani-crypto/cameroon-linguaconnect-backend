export type Language = {
  slug: string;
  name: string;
  region: string;
  speakers: string;
  difficulty: "Easy" | "Medium" | "Hard";
  greeting: string;
  meaning: string;
  description: string;
};

export const languages: Language[] = [
  { slug: "ewondo", name: "Ewondo", region: "Centre", speakers: "1.2M", difficulty: "Medium", greeting: "Mbolo", meaning: "Hello", description: "Spoken across Yaoundé and the Centre region, Ewondo is a Bantu language at the heart of Beti culture." },
  { slug: "duala", name: "Duala", region: "Littoral", speakers: "900K", difficulty: "Easy", greeting: "Idiba", meaning: "Good morning", description: "The historical trade language of coastal Cameroon, rich with maritime tradition." },
  { slug: "fulfulde", name: "Fulfulde", region: "North", speakers: "1.5M", difficulty: "Medium", greeting: "Jam waali", meaning: "Good morning", description: "Spoken by the Fulani people across the Sahel — pastoral, poetic, and proud." },
  { slug: "basaa", name: "Basaa", region: "Centre / Littoral", speakers: "300K", difficulty: "Medium", greeting: "Mbolo wee", meaning: "Hello to you", description: "A melodic Bantu language carried through generations of oral tradition." },
  { slug: "bamileke", name: "Bamiléké", region: "West", speakers: "2M", difficulty: "Hard", greeting: "Yoo", meaning: "Hello", description: "A family of related dialects from the Grassfields — known for entrepreneurship and ritual." },
  { slug: "kom", name: "Kom", region: "North-West", speakers: "230K", difficulty: "Hard", greeting: "Mbeh", meaning: "Greetings", description: "From the Kingdom of Kom — a tonal Grassfields language with rich royal tradition." },
  { slug: "bakweri", name: "Bakweri", region: "South-West", speakers: "100K", difficulty: "Medium", greeting: "Eyala", meaning: "Hello", description: "The language of the people of Mount Cameroon, deeply tied to volcanic legends." },
  { slug: "hausa", name: "Hausa", region: "North", speakers: "Millions", difficulty: "Easy", greeting: "Sannu", meaning: "Hello", description: "A major lingua franca across West and Central Africa." },
  { slug: "medumba", name: "Medumba", region: "West", speakers: "210K", difficulty: "Hard", greeting: "Yoo", meaning: "Hello", description: "A Grassfields language spoken in Bangangté with deep philosophical roots." },
  { slug: "nso", name: "Lamnso'", region: "North-West", speakers: "280K", difficulty: "Hard", greeting: "Wir gha?", meaning: "How are you?", description: "The language of the Nso people, kingdom of Kumbo — proud and ceremonial." },
];
