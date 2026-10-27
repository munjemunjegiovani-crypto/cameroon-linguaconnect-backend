// Demo learner data. Replace with real per-user data once authentication and a database are added.
export type DashboardStat = {
  key: "streak" | "xp" | "lessons" | "rank";
  label: string;
  value: string;
};

export type DashboardLesson = {
  lang: string;
  title: string;
  progress: number;
};

export type DashboardBadge = {
  name: string;
  desc: string;
};

export const dashboard = {
  user: { name: "Aminatou", dailyGoalXp: 20 },
  stats: [
    { key: "streak", label: "Day streak", value: "12" },
    { key: "xp", label: "XP this week", value: "1,240" },
    { key: "lessons", label: "Lessons done", value: "38" },
    { key: "rank", label: "Rank", value: "#142" },
  ] satisfies DashboardStat[],
  lessons: [
    { lang: "Ewondo", title: "Greetings & introductions", progress: 100 },
    { lang: "Ewondo", title: "Family vocabulary", progress: 70 },
    { lang: "Duala", title: "At the market", progress: 45 },
    { lang: "Fulfulde", title: "Numbers 1–20", progress: 20 },
  ] satisfies DashboardLesson[],
  badges: [
    { name: "First Word", desc: "Spoke your first phrase" },
    { name: "Elder Listener", desc: "Heard 50 native recordings" },
    { name: "Storyteller", desc: "Completed your first folktale" },
    { name: "Streak Keeper", desc: "10-day learning streak" },
  ] satisfies DashboardBadge[],
};
