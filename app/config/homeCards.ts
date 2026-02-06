export const HOME_SECTION_LABEL = "APIs and integrations";

export interface HomeCard {
  title: string;
  description: string;
  href: string;
}

export const HOME_CARDS: HomeCard[] = [
  {
    title: "APIs",
    description:
      "Walk through Keywords AI API endpoints step-by-step (Logs, Traces, …).",
    href: "/apis",
  },
  {
    title: "Integration",
    description:
      "Vercel AI SDK tracing demo (OpenAI provider + 3 tracing examples).",
    href: "/integration",
  },
  {
    title: "Examples",
    description:
      "Rho demo use cases: Invoice generator (AI autofill) and internal banking chatbot.",
    href: "/examples",
  },
];
