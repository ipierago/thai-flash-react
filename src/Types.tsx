export type Term = {
  th: string;
  en: string[];
  ipa: string;
  tags: string[];
};

export enum QuizMode {
  Listen = 'Listen',
  Speak = 'Speak',
}
