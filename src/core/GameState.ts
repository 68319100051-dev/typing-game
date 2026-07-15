import type {
  GameState,
  ScreenName,
  PlayerClass,
  Language,
  WordNode,
  Upgrades,
  Settings,
  LevelConfig,
  TutorialState,
  CutsceneState,
  FinisherState,
  NumpadState,
  LearnState,
} from '../types';
import { eventBus } from './EventBus';

const DEFAULT_STATE: GameState = {
  screen: 'lobby',
  battleEnded: false,
  playerClass: null,
  hp: 100,
  maxHp: 100,
  energy: 100,
  maxEnergy: 100,
  credits: 0,
  score: 0,
  streak: 0,
  combo: 1,
  unlockedLogs: ['log_act1'],
  maxUnlockedLevel: 1,
  currentLevel: null,
  levelStars: {},
  currentLang: 'en',
  upgrades: { hpLevel: 0, enLevel: 0, autoShield: 0, slowDuration: 0 },
  fallingWords: [],
  usedWordsPerLevel: [],
  wordIdCounter: 0,
  activeTyping: '',
  wordsClearedThisLevel: 0,
  savedTypingValue: '',
  savedActiveTyping: '',
  correctKeystrokes: 0,
  totalKeystrokes: 0,
  battleStartTime: 0,
  bossHp: 0,
  bossMaxHp: 100,
  bossName: '',
  bossBanterTimer: null,
  bossSkillTimer: null,
  spawnInterval: null,
  gameLoopInterval: null,
  energyInterval: null,
  practiceCountdown: null,
  surgeTimer: null,
  shieldActive: false,
  shieldDuration: 0,
  timeSlowActive: false,
  timeSlowDuration: 0,
  dodgeWindowActive: false,
  dodgeTimeout: null,
  finisherTriggered: false,
  tutorial: { step: 0, wordsSpawned: false, dodgeTimer: null },
  cutscene: {
    dialogues: [],
    currentIndex: 0,
    typewriterInterval: null,
    nextScreen: null,
    onFinish: null,
  },
  settings: { photosensitive: false, scanlines: true, volume: 50 },
  finisher: { passage: '', words: [], currentIndex: 0, timer: 15, interval: null, prevInputLen: 0 },
  numpad: { targetCode: '', inputCode: '', timer: 5, interval: null },
  shopIndex: 0,
  learnState: { lesson: null, subIndex: 0, chatInterval: null },
};

export class GameStateManager {
  private state: GameState = { ...DEFAULT_STATE };
  private listeners: Map<keyof GameState, Set<(value?: unknown) => void>> = new Map();

  getState(): Readonly<GameState> {
    return this.state;
  }

  get<K extends keyof GameState>(key: K): GameState[K] {
    return this.state[key];
  }

  set<K extends keyof GameState>(key: K, value: GameState[K]): void {
    const oldValue = this.state[key];
    this.state[key] = value;
    this.notifyListeners(key, value, oldValue);
    eventBus.emit('state:changed', { key, value, oldValue });
  }

  update<K extends keyof GameState>(key: K, updater: (current: GameState[K]) => GameState[K]): void {
    this.set(key, updater(this.state[key]));
  }

  subscribe<K extends keyof GameState>(key: K, callback: (value: GameState[K]) => void): () => void {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set<(value?: unknown) => void>());
    }
    const wrapper = (v?: unknown) => callback(v as GameState[K] ?? this.state[key]);
    this.listeners.get(key)!.add(wrapper);
    return () => this.listeners.get(key)?.delete(wrapper);
  }

  private notifyListeners<K extends keyof GameState>(key: K, value: GameState[K], oldValue: GameState[K]): void {
    const callbacks = this.listeners.get(key);
    if (callbacks) {
      callbacks.forEach((cb) => cb(value));
    }
  }

  reset(): void {
    this.state = { ...DEFAULT_STATE };
    this.listeners.forEach((callbacks, key) => {
      callbacks.forEach((cb) => cb(this.state[key]));
    });
  }

  loadSave(data: Partial<GameState>): void {
    (Object.keys(data) as Array<keyof GameState>).forEach((key) => {
      const value = data[key];
      if (value !== undefined) {
        (this.state as Record<keyof GameState, unknown>)[key] = value;
      }
    });
    this.listeners.forEach((callbacks, key) => {
      callbacks.forEach((cb) => cb(this.state[key]));
    });
  }

  toSaveObject(): Partial<GameState> {
    return {
      maxUnlockedLevel: this.state.maxUnlockedLevel,
      levelStars: this.state.levelStars,
      credits: this.state.credits,
      upgrades: this.state.upgrades,
      unlockedLogs: this.state.unlockedLogs,
      settings: this.state.settings,
    };
  }
}

export const gameState = new GameStateManager();