// `image` is a key the frontend maps to one of its bundled images.
export type CultureItem = {
  image: "dance" | "food" | "textile";
  tag: string;
  title: string;
  description: string;
};

export type Proverb = {
  lang: string;
  text: string;
  meaning: string;
};

export const cultureItems: CultureItem[] = [
  { image: "dance", tag: "Dance", title: "Bikutsi — the rhythm of the Beti", description: "A 6/8 beat that turns sorrow into celebration. Once danced only by women, now a national heartbeat." },
  { image: "food", tag: "Food", title: "Ndolé — Cameroon's national dish", description: "Bitter leaves slow-cooked with peanuts, beef and shrimp. Served with miondo or plantain." },
  { image: "textile", tag: "Textile", title: "Ndop — the cloth of kings", description: "Indigo-dyed fabric of the Grassfields, worn by chiefs and worn through history." },
];

export const proverbs: Proverb[] = [
  { lang: "Ewondo", text: "Akeleng a si bera mbol nye ningi.", meaning: "The river never forgets its source." },
  { lang: "Duala", text: "Mulema ma moto, ma timba na minia.", meaning: "The heart of a person is deeper than the sea." },
  { lang: "Fulfulde", text: "Ko nder waynaago haala woni.", meaning: "Inside the silence, the truth speaks." },
];
