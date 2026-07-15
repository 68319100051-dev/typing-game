export type ScreenName =
  | 'lobby'
  | 'mode-select'
  | 'custom-menu'
  | 'learn-menu'
  | 'practice-config'
  | 'cutscene'
  | 'tutorial'
  | 'boot'
  | 'map'
  | 'battle'
  | 'finisher'
  | 'numpad'
  | 'logs'
  | 'summary'
  | 'shop';

export type PlayerClass = 'speed' | 'precision' | 'brute';
export type Language = 'en' | 'th' | 'code';
export type WordType = 'normal' | 'hazard' | 'absorb' | 'reflect';
export type LevelType = 'normal' | 'mini-boss' | 'boss';

export interface LevelConfig {
  name: string;
  speed: number;
  wordsToClear: number;
  maxSimultaneous: number;
  type: LevelType;
}

export interface WordNode {
  id: number;
  text: string;
  displayWordText: string;
  type: WordType;
  x: number;
  y: number;
  speed: number;
  element: HTMLElement;
}

export interface Upgrades {
  hpLevel: number;
  enLevel: number;
  autoShield: number;
  slowDuration: number;
}

export interface Settings {
  photosensitive: boolean;
  scanlines: boolean;
  volume: number;
}

export interface CutsceneState {
  dialogues: CutsceneDialogue[];
  currentIndex: number;
  typewriterInterval: number | null;
  nextScreen: ScreenName | null;
  onFinish: (() => void) | null;
}

export interface CutsceneDialogue {
  speaker: string;
  text: string;
}

export interface FinisherState {
  passage: string;
  words: string[];
  currentIndex: number;
  timer: number;
  interval: number | null;
  prevInputLen: number;
}

export interface NumpadState {
  targetCode: string;
  inputCode: string;
  timer: number;
  interval: number | null;
}

export interface TutorialState {
  step: number;
  wordsSpawned: boolean;
  dodgeTimer: number | null;
}

export interface LearnState {
  lesson: LearnLesson | null;
  subIndex: number;
  chatInterval: number | null;
}

export interface LearnLesson {
  id: number;
  title: string;
  desc: string;
  subLessons: SubLesson[];
}

export interface SubLesson {
  target: string;
  dialogue: string;
}

export interface NarrativeLog {
  id: string;
  title: string;
  zoneRequired: number;
  content: string;
}

export interface StoryCutscene {
  [key: string]: CutsceneDialogue[];
}

export interface PreLevelDialogue {
  [key: number]: CutsceneDialogue[];
}

export interface WordBank {
  en: LanguageWordBank;
  th: LanguageWordBank;
  code: LanguageWordBank;
}

export interface LanguageWordBank {
  zone1: string[];
  zone2: string[];
  zone3: string[];
  finisher: string[];
}

export interface GameState {
  screen: ScreenName;
  battleEnded: boolean;
  playerClass: PlayerClass | null;
  hp: number;
  maxHp: number;
  energy: number;
  maxEnergy: number;
  credits: number;
  score: number;
  streak: number;
  combo: number;
  unlockedLogs: string[];
  maxUnlockedLevel: number;
  currentLevel: number | null;
  levelStars: Record<number, number>;
  currentLang: Language;
  upgrades: Upgrades;
  fallingWords: WordNode[];
  usedWordsPerLevel: string[];
  wordIdCounter: number;
  activeTyping: string;
  wordsClearedThisLevel: number;
  savedTypingValue: string;
  savedActiveTyping: string;
  correctKeystrokes: number;
  totalKeystrokes: number;
  battleStartTime: number;
  bossHp: number;
  bossMaxHp: number;
  bossName: string;
  bossBanterTimer: number | null;
  bossSkillTimer: number | null;
  spawnInterval: number | null;
  gameLoopInterval: number | null;
  energyInterval: number | null;
  practiceCountdown: number | null;
  surgeTimer: number | null;
  shieldActive: boolean;
  shieldDuration: number;
  timeSlowActive: boolean;
  timeSlowDuration: number;
  dodgeWindowActive: boolean;
  dodgeTimeout: number | null;
  finisherTriggered: boolean;
  tutorial: TutorialState;
  cutscene: CutsceneState;
  settings: Settings;
  finisher: FinisherState;
  numpad: NumpadState;
  shopIndex: number;
  learnState: LearnState;
}

export interface KeyboardMap {
  en: Record<string, string>;
  th: Record<string, string>;
}

export interface ShopItem {
  id: string;
  title: string;
  desc: string;
  cost: number;
  type: 'upgrade' | 'item';
  maxLevel?: number;
}