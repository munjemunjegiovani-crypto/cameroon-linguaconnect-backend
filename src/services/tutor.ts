// Rule-based tutor replies. This is the single place to plug in a real AI model later.
export function tutorReply(input: string, lang: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("hello") || lower.includes("greet")) {
    return `In ${lang}, a warm greeting is "Mbolo" (Ewondo) or "Idiba" (Duala). The tone matters — say it gently to elders.`;
  }
  if (lower.includes("thank")) {
    return `"Akiba" is "thank you" in Ewondo. In Duala, "Na ber masoma." Try saying it aloud — I'll listen.`;
  }
  if (lower.includes("food") || lower.includes("eat")) {
    return `Cameroonian cuisine is poetry. Try "Ndolé" — bitter leaves with peanuts and meat. Want me to teach you the words for the ingredients?`;
  }
  return `Beautiful question. In ${lang}, we'd phrase that with care for the listener. Let's break it down word by word — ready?`;
}
