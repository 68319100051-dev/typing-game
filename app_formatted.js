console.log("CYBERHACK: Engine initializing...");
const KEYBOARD_MAP = {
    en: {
        'Digit1': '1', 'Digit2': '2', 'Digit3': '3', 'Digit4': '4', 'Digit5': '5', 'Digit6': '6', 'Digit7': '7', 'Digit8': '8', 'Digit9': '9', 'Digit0': '0', 'Minus': '-', 'Equal': '=',        'KeyQ': 'Q', 'KeyW': 'W', 'KeyE': 'E', 'KeyR': 'R', 'KeyT': 'T', 'KeyY': 'Y', 'KeyU': 'U', 'KeyI': 'I', 'KeyO': 'O', 'KeyP': 'P', 'BracketLeft': '[', 'BracketRight': ']',        'KeyA': 'A', 'KeyS': 'S', 'KeyD': 'D', 'KeyF': 'F', 'KeyG': 'G', 'KeyH': 'H', 'KeyJ': 'J', 'KeyK': 'K', 'KeyL': 'L', 'Semicolon': '; ', 'Quote': "'",        'KeyZ': 'Z', 'KeyX': 'X', 'KeyC': 'C', 'KeyV': 'V', 'KeyB': 'B', 'KeyN': 'N', 'KeyM': 'M', 'Comma': ',', 'Period': '.', 'Slash': '/'    }
,    th: {
        'Digit1': 'เน…', 'Digit2': '/', 'Digit3': '-', 'Digit4': 'เธ ', 'Digit5': 'เธ–', 'Digit6': 'เธธ', 'Digit7': 'เธถ', 'Digit8': 'เธ', 'Digit9': 'เธ•', 'Digit0': 'เธ', 'Minus': 'เธ', 'Equal': 'เธ',        'KeyQ': 'เน', 'KeyW': 'เน', 'KeyE': 'เธณ', 'KeyR': 'เธ', 'KeyT': 'เธฐ', 'KeyY': 'เธฑ', 'KeyU': 'เธต', 'KeyI': 'เธฃ', 'KeyO': 'เธ', 'KeyP': 'เธข', 'BracketLeft': 'เธ', 'BracketRight': 'เธฅ',        'KeyA': 'เธ', 'KeyS': 'เธซ', 'KeyD': 'เธ', 'KeyF': 'เธ”', 'KeyG': 'เน€', 'KeyH': 'เน', 'KeyJ': 'เน', 'KeyK': 'เธฒ', 'KeyL': 'เธช', 'Semicolon': 'เธง', 'Quote': 'เธ',        'KeyZ': 'เธ', 'KeyX': 'เธ', 'KeyC': 'เน', 'KeyV': 'เธญ', 'KeyB': 'เธด', 'KeyN': 'เธ—', 'KeyM': 'เธก', 'Comma': 'เน', 'Period': 'เธ', 'Slash': '.'    }
}
;
const state = {
    screen: "lobby", battleEnded: false, playerClass: null,    hp: 100, maxHp: 100, energy: 100, maxEnergy: 100, credits: 0, score: 0, streak: 0, combo: 1,    unlockedLogs: ["log_act1"], maxUnlockedLevel: 1, currentLevel: null, levelStars: {
}
, currentLang: "en",    upgrades: {
 hpLevel: 0, enLevel: 0, autoShield: 0, slowDuration: 0 }
,    fallingWords: [], usedWordsPerLevel: [], wordIdCounter: 0, activeTyping: "",    wordsClearedThisLevel: 0, savedTypingValue: null, savedActiveTyping: null,    correctKeystrokes: 0, totalKeystrokes: 0, battleStartTime: 0,    bossHp: 0, bossMaxHp: 100, bossName: "", bossBanterTimer: null, bossSkillTimer: null,    spawnInterval: null, gameLoopInterval: null, energyInterval: null,    shieldActive: false, shieldDuration: 0, timeSlowActive: false, timeSlowDuration: 0,    dodgeWindowActive: false, dodgeTimeout: null,    tutorial: {
 step: 0, wordsSpawned: false, dodgeTimer: null }
,    cutscene: {
 dialogues: [], currentIndex: 0, typewriterInterval: null, nextScreen: null }
,    settings: {
 photosensitive: false, scanlines: true, volume: 50 }
,    finisher: {
 passage: "", words: [], currentIndex: 0, timer: 15, interval: null }
,    numpad: {
 targetCode: "", inputCode: "", timer: 5, interval: null }
,    shopIndex: 0, classicLang: "en", classicTimeLeft: 60, classicActive: false, classicTypedChars: 0, classicErrors: 0, classicWords: [], classicWordIndex: 0, classicCharIndex: 0, classicStartTime: 0}
;
let inputField, tutorialInput, playField, tutorialField, finisherInput, settingsModal;
let lobbyIndex = 0, modeIndex = 0, classIndex = 0;
let learnState = {
 lesson: null, subIndex: 0, chatInterval: null }
;
function setupSoundControl() {
    const btn = document.getElementById("btn-toggle-mute");
    if (btn) {
      btn.addEventListener("click", () => {
        state.settings.muted = !state.settings.muted;
        setVolume(state.settings.muted ? 0 : state.settings.volume);
        btn.textContent = state.settings.muted ? "UNMUTE" : "MUTE";
      });
    }
    setVolume(state.settings.volume || 50);
  }

document.addEventListener("DOMContentLoaded", () => {
    console.log("CYBERHACK: DOM Loaded.");
        inputField = document.getElementById("terminal-input");
    tutorialInput = document.getElementById("tutorial-input");
    playField = document.getElementById("play-field");
    tutorialField = document.getElementById("tutorial-field");
    finisherInput = document.getElementById("passage-input");
    settingsModal = document.getElementById("settings-modal");
    loadGame();
     setupSettings();
     setupSoundControl();
    setupKeyboardNavigation();
    addKeyboardListeners();
    // Lobby clicks
    document.querySelectorAll("#screen-lobby .menu-item").forEach((item, idx) => {
        item.addEventListener("click", () => {
            const items = document.querySelectorAll("#screen-lobby .menu-item");
            items[lobbyIndex].classList.remove("active");
            lobbyIndex = idx;
            items[lobbyIndex].classList.add("active");
            handleLobbyAction(item.getAttribute("data-lobby-action"));
        }
);
    }
);
    document.querySelectorAll(".class-card").forEach(card => card.addEventListener("click", () => selectClass(card.getAttribute("data-class"))));
        document.querySelectorAll(".mode-card").forEach(card => card.addEventListener("click", () => {
        const mode = card.getAttribute("data-mode");
        if (mode === "story" && !card.classList.contains("disabled")) startStoryMode();
        else if (mode === "custom" && !card.classList.contains("disabled")) showScreen("custom-menu");
        else if (mode === "classic" && !card.classList.contains("disabled")) initClassicMode();
    }
));
    document.querySelectorAll("[data-custom-sub]").forEach(card => card.addEventListener("click", () => {
        const sub = card.getAttribute("data-custom-sub");
        if (sub === "learn") {
 renderLearnLessons();
 showScreen("learn-menu");
 }
        else if (sub === "practice") showScreen("practice-config");
    }
));
    document.querySelectorAll(".btn-lang").forEach(btn => btn.addEventListener("click", () => setLanguage(btn.getAttribute("data-lang"))));
    document.getElementById("btn-mode-back").addEventListener("click", () => showScreen("lobby"));
    document.getElementById("btn-custom-back").addEventListener("click", () => showScreen("mode-select"));
    document.getElementById("btn-learn-back").addEventListener("click", () => showScreen("custom-menu"));
    document.getElementById("btn-practice-start").addEventListener("click", startPracticeSession);
    document.getElementById("btn-practice-back").addEventListener("click", () => showScreen("custom-menu"));
        const btnClassicBack = document.getElementById("btn-classic-back");
    if(btnClassicBack) btnClassicBack.addEventListener("click", () => {
 endClassicMode();
 showScreen("mode-select");
 }
);
        const btnClassicRestart = document.getElementById("btn-classic-restart");
    if(btnClassicRestart) btnClassicRestart.addEventListener("click", () => initClassicMode(state.classicLang));
    document.getElementById("btn-close-logs").addEventListener("click", () => showScreen("lobby"));
    document.getElementById("btn-close-settings").addEventListener("click", toggleSettings);
    document.getElementById("btn-cutscene-next").addEventListener("click", advanceCutscene);
    document.getElementById("btn-cutscene-skip").addEventListener("click", skipCutscene);
    document.getElementById("btn-summary-retry").addEventListener("click", () => startBattle(state.currentLevel));
    document.getElementById("btn-summary-map").addEventListener("click", () => showScreen("map"));
    document.getElementById("btn-summary-upgrade").addEventListener("click", openShopScreen);
        const btnMapShop = document.getElementById("btn-map-shop");
 if (btnMapShop) btnMapShop.addEventListener("click", openShopScreen);
    document.getElementById("btn-shop-map").addEventListener("click", () => showScreen("map"));
    inputField.addEventListener("input", handleMainTypingInput);
    inputField.addEventListener("keydown", handleActionKeys);
    tutorialInput.addEventListener("input", handleTutorialTypingInput);
    tutorialInput.addEventListener("keydown", handleTutorialActionKeys);
    finisherInput.addEventListener("input", handleFinisherInput);
    for (let i = 1;
 i <= 10;
 i++) if (state.levelStars[i] === undefined) state.levelStars[i] = 0;
        // Virtual Keyboard Effects
        document.addEventListener("keydown", (e) => {
        if (e.repeat) return;
        const btn = document.querySelector(`.key-btn[data-code="${e.code}"]`);         if (btn) btn.classList.add("correct-press");
    }
);
    document.addEventListener("keyup", (e) => {
        const btn = document.querySelector(`.key-btn[data-code="${e.code}"]`);         if (btn) btn.classList.remove("correct-press", "wrong-press");
    }
);
    updateWallet();
    showScreen("lobby");
 // Force lobby initialization
 console.log("CYBERHACK: Ready.");
}
);
function setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
        if (state.screen === "lobby") {
            const items = document.querySelectorAll("#screen-lobby .menu-item");
            if (items.length === 0) return;
            if (e.key === "ArrowDown") {
 playSound("click");
 items[lobbyIndex].classList.remove("active");
 lobbyIndex = (lobbyIndex + 1) % items.length;
 items[lobbyIndex].classList.add("active");
 }
            else if (e.key === "ArrowUp") {
 playSound("click");
 items[lobbyIndex].classList.remove("active");
 lobbyIndex = (lobbyIndex - 1 + items.length) % items.length;
 items[lobbyIndex].classList.add("active");
 }
            else if (e.key === "Enter") handleLobbyAction(items[lobbyIndex].getAttribute("data-lobby-action"));
            else if (e.key === "1") {
 lobbyIndex = 0;
 handleLobbyAction("start");
 }
            else if (e.key === "2") {
 lobbyIndex = 1;
 handleLobbyAction("settings");
 }
            else if (e.key === "3") {
 lobbyIndex = 2;
 handleLobbyAction("logs");
 }
        }
 else if (state.screen === "mode-select") {
            const cards = document.querySelectorAll("#screen-mode-select .mode-card");
            if (cards.length === 0) return;
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
 playSound("click");
 cards[modeIndex].classList.remove("active");
 modeIndex = (modeIndex + 1) % cards.length;
 cards[modeIndex].classList.add("active");
 }
            else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
 playSound("click");
 cards[modeIndex].classList.remove("active");
 modeIndex = (modeIndex - 1 + cards.length) % cards.length;
 cards[modeIndex].classList.add("active");
 }
            else if (e.key === "Enter") {
 const m = cards[modeIndex].getAttribute("data-mode");
 if (m === "story") startStoryMode();
 else if (m === "custom") showScreen("custom-menu");
 else if (m === "classic") initClassicMode();
 }
        }
 else if (state.screen === "custom-menu") {
            const cards = document.querySelectorAll("#screen-custom-menu .mode-card");
            if (cards.length === 0) return;
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
 playSound("click");
 cards[modeIndex].classList.remove("active");
 modeIndex = (modeIndex + 1) % cards.length;
 cards[modeIndex].classList.add("active");
 }
            else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
 playSound("click");
 cards[modeIndex].classList.remove("active");
 modeIndex = (modeIndex - 1 + cards.length) % cards.length;
 cards[modeIndex].classList.add("active");
 }
            else if (e.key === "Enter") {
 const m = cards[modeIndex].getAttribute("data-custom-sub");
 if (m === "learn") {
 renderLearnLessons();
 showScreen("learn-menu");
 }
 else if (m === "practice") showScreen("practice-config");
 }
        }
 else if (state.screen === "learn-menu") {
            const cards = document.querySelectorAll("#screen-learn-menu .learn-card");
            if (!state.learnCardIndex) state.learnCardIndex = 0;
            const cols = Math.max(1, Math.floor(cards[0]?.parentElement.clientWidth / 250) || 2);
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
 playSound("click");
 if (cards[state.learnCardIndex]) cards[state.learnCardIndex].classList.remove("focused");
 state.learnCardIndex = (state.learnCardIndex + 1) % cards.length;
 if (cards[state.learnCardIndex]) {
 cards[state.learnCardIndex].classList.add("focused");
 cards[state.learnCardIndex].focus();
 }
 }
            else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
 playSound("click");
 if (cards[state.learnCardIndex]) cards[state.learnCardIndex].classList.remove("focused");
 state.learnCardIndex = (state.learnCardIndex - 1 + cards.length) % cards.length;
 if (cards[state.learnCardIndex]) {
 cards[state.learnCardIndex].classList.add("focused");
 cards[state.learnCardIndex].focus();
 }
 }
            else if (e.key === "Enter") {
 if (cards[state.learnCardIndex]) cards[state.learnCardIndex].click();
 }
        }
 else if (state.screen === "boot") {
            const cards = document.querySelectorAll(".class-card");
            if (cards.length === 0) return;
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
 playSound("click");
 cards[classIndex].classList.remove("selected");
 classIndex = (classIndex + 1) % cards.length;
 cards[classIndex].classList.add("selected");
 }
            else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
 playSound("click");
 cards[classIndex].classList.remove("selected");
 classIndex = (classIndex - 1 + cards.length) % cards.length;
 cards[classIndex].classList.add("selected");
 }
            else if (e.key === "Enter") selectClass(cards[classIndex].getAttribute("data-class"));
        }
 else if (state.screen === "shop") {
            const cards = document.querySelectorAll("#screen-shop .select-shop-item");
            if (cards.length > 0 && !state.shopIndex) state.shopIndex = 0;
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
 playSound("click");
 if (cards[state.shopIndex]) cards[state.shopIndex].classList.remove("focused");
 state.shopIndex = (state.shopIndex + 1) % cards.length;
 if (cards[state.shopIndex]) cards[state.shopIndex].classList.add("focused");
 }
            else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
 playSound("click");
 if (cards[state.shopIndex]) cards[state.shopIndex].classList.remove("focused");
 state.shopIndex = (state.shopIndex - 1 + cards.length) % cards.length;
 if (cards[state.shopIndex]) cards[state.shopIndex].classList.add("focused");
 }
            else if (e.key === "Enter") {
 if (cards[state.shopIndex]) cards[state.shopIndex].click();
 }
        }
 else if (state.screen === "summary") {
            if (e.key.toLowerCase() === "r") startBattle(state.currentLevel);
            else if (e.key.toLowerCase() === "s") openShopScreen();
            else if (e.key.toLowerCase() === "m") showScreen("map");
        }
 else if (state.screen === "map") {
            if (e.key >= "1" && e.key <= "9") {
 const n = parseInt(e.key);
 if (n <= state.maxUnlockedLevel) selectLevel(n);
 }
            else if (e.key === "0" && state.maxUnlockedLevel === 10) selectLevel(10);
            else if (e.key.toLowerCase() === "s") openShopScreen();
        }
 else if (state.screen === "cutscene") {
            if (e.key === " ") {
 e.preventDefault();
 advanceCutscene();
 }
            else if (e.key.toLowerCase() === "s") skipCutscene();
        }
 else if (state.screen === "numpad") {
            if (e.key >= "0" && e.key <= "9") {
 handleNumpadInput(e.key);
 }
        }
 else if (state.screen === "tutorial") {
            if (e.key === " " && state.tutorial.step === 99 && typeof learnState !== 'undefined' && learnState.chatInterval) {
                e.preventDefault();
 skipLearnChat();
            }
        }
        // Global mute shortcut
        if (e.ctrlKey && e.key.toLowerCase() === "m") {
            e.preventDefault();
            const muted = toggleMute();
            document.getElementById("btn-sound-toggle").textContent = muted ? "๐” เน€เธเธดเธ”เน€เธชเธตเธขเธ [Ctrl+M]" : "๐” เธเธดเธ”เน€เธชเธตเธขเธ [Ctrl+M]";
            return;
        }
        // Global ESC handler
        if (e.key === "Escape") {
            if (!settingsModal.classList.contains("hidden")) {
 toggleSettings();
 }
            else if (state.screen === "mode-select") {
 showScreen("lobby");
 }
            else if (state.screen === "custom-menu") {
 showScreen("mode-select");
 }
            else if (state.screen === "classic-typing") {
 endClassicMode();
 showScreen("mode-select");
 }
            else if (state.screen === "learn-menu") {
 showScreen("custom-menu");
 }
            else if (state.screen === "practice-config") {
 showScreen("custom-menu");
 }
            else if (state.screen === "map") {
 showScreen("lobby");
 }
            else if (state.screen === "shop") {
 showScreen("map");
 }
            else if (state.screen === "logs") {
 showScreen("lobby");
 }
            else if (["battle", "tutorial"].includes(state.screen)) {
 toggleSettings();
 }
            return;
        }
        // Map Screen Language Shortcuts
        if (state.screen === "map" && !e.ctrlKey && !e.altKey && !e.metaKey) {
            if (e.key.toLowerCase() === "e") setLanguage("en");
            else if (e.key.toLowerCase() === "t") setLanguage("th");
            else if (e.key.toLowerCase() === "c") setLanguage("code");
        }
        // Practice Config Screen - Language selection with E/T/C
        if (state.screen === "practice-config" && !e.ctrlKey && !e.altKey && !e.metaKey) {
            if (e.key.toLowerCase() === "e") {
 setLanguage("en");
 document.querySelectorAll("#screen-practice-config .btn-lang").forEach(b => b.classList.remove("active"));
 const btn = document.querySelector("#screen-practice-config .btn-lang[data-lang='en']");
 if (btn) btn.classList.add("active");
 }
            else if (e.key.toLowerCase() === "t") {
 setLanguage("th");
 document.querySelectorAll("#screen-practice-config .btn-lang").forEach(b => b.classList.remove("active"));
 const btn = document.querySelector("#screen-practice-config .btn-lang[data-lang='th']");
 if (btn) btn.classList.add("active");
 }
            else if (e.key.toLowerCase() === "c") {
 setLanguage("code");
 document.querySelectorAll("#screen-practice-config .btn-lang").forEach(b => b.classList.remove("active"));
 const btn = document.querySelector("#screen-practice-config .btn-lang[data-lang='code']");
 if (btn) btn.classList.add("active");
 }
        }
    }
);
}
// Use event delegation to handle all button clicks with keyboard support
function addKeyboardListeners() {
    const handleButtonKeydown = (e) => {
        // Check if the clicked element or parent is a button-like element
        const isButton = e.target.matches('.btn-retro, .menu-item, .class-card, .mode-card, .learn-card, .shop-card, .select-shop-item, .btn-lang, button, .log-item-btn, [data-custom-sub]');
        if (!isButton) return;
                if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.target.click();
        }
    }
;
        // Use event delegation - single listener on document
        if (!document.__keyboardListenerAttached) {
        document.addEventListener('keydown', handleButtonKeydown);
        document.__keyboardListenerAttached = true;
    }
        // Ensure all button-like elements are focusable
        const selectors = [        '.btn-retro', '.menu-item', '.class-card', '.mode-card', '.learn-card',        '.shop-card', '.select-shop-item', '.btn-lang', '#btn-mode-back', '#btn-close-logs',        '#btn-close-settings', '#btn-cutscene-next', '#btn-cutscene-skip', '#btn-summary-retry',        '#btn-summary-map', '#btn-summary-upgrade', '#btn-map-shop', '#btn-shop-map', 'button', '.log-item-btn',        '[data-custom-sub]', '[data-lobby-action]'    ];
    selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            if (!el.hasAttribute('tabindex') && el.getAttribute('tabindex') !== '0') {
                el.setAttribute('tabindex', '0');
            }
        }
);
    }
);
}
function handleLobbyAction(action) {
    initAudio();
 playSound("click");
    if (action === "start") showScreen("mode-select");
    else if (action === "settings") toggleSettings();
    else if (action === "logs") openLogsView();
}
function showScreen(screenName) {
    try {
        state.screen = screenName;
        // Reset navigation indices for menu screens
        if (screenName === "custom-menu") modeIndex = 0;
        if (screenName === "learn-menu") state.learnCardIndex = 0;
        if (screenName === "boot") classIndex = 0;
                const mainHUD = document.getElementById("main-hud-header");
        if (mainHUD) {
 if (["battle", "tutorial", "finisher", "numpad"].includes(screenName)) mainHUD.classList.remove("hidden");
 else mainHUD.classList.add("hidden");
 }
        document.querySelectorAll(".terminal-screen").forEach(s => {
            if (s.id === `screen-${screenName}`) {
 s.classList.remove("hidden");
 s.style.display = "flex";
 }
            else {
 s.classList.add("hidden");
 s.style.display = "none";
 }
        }
);
        if (screenName === "map") renderLevelNodes();
        if (screenName === "boot") {
            const bootCards = document.querySelectorAll(".class-card");
            bootCards.forEach((c, i) => {
 if (i === classIndex) c.classList.add("selected");
 else c.classList.remove("selected");
 }
);
            if (bootCards[classIndex]) bootCards[classIndex].focus();
        }
        const inputMap = {
 "battle": "terminal-input", "tutorial": "tutorial-input", "finisher": "passage-input" }
;
        if (inputMap[screenName]) {
 const f = document.getElementById(inputMap[screenName]);
 if (f) {
 f.value = "";
 setTimeout(() => f.focus(), 100);
 }
 }
        if (screenName !== "numpad") clearInterval(state.numpad.interval);
    }
 catch (err) {
 console.error("SCREEN ERROR:", err);
 }
}
function startStoryMode() {
 initAudio();
 playSound("click");
 state.cutscene.dialogues = STORY_CUTSCENES.prologue;
 state.cutscene.currentIndex = 0;
 state.cutscene.nextScreen = "boot";
 showScreen("cutscene");
 document.getElementById("cutscene-chat-box").innerHTML = "";
 renderCutsceneLine();
 }
function selectClass(className) {
 initAudio();
 playSound("click");
 state.playerClass = className;
 state.maxHp = (className === "brute" ? 150 : 100) + state.upgrades.hpLevel * 25;
 state.hp = state.maxHp;
 state.maxEnergy = 100 + state.upgrades.enLevel * 20;
 state.energy = state.maxEnergy;
 document.getElementById("hud-deck-name").textContent = `ZERO_DECK:${className.toUpperCase()}`;
 startTutorialMode();
 }
function renderLearnLessons() {
    const grid = document.getElementById("learn-lessons-grid");
 if (!grid) return;
 grid.innerHTML = "";
    const icons = ["๐–๏ธ","โ","๐ค","โ๏ธ","๐‘","๐‘","๐‘","๐ค","๐”ข","๐"];
    const completed = JSON.parse(localStorage.getItem("learnCompleted") || "[]");
    LEARN_LESSONS.forEach((lesson, i) => {
        const isDone = completed.includes(lesson.id);
        const card = document.createElement("div");
        card.className = "learn-card" + (isDone ? " completed" : "");
        card.innerHTML = `            <div class="learn-card-header">                <span class="learn-card-icon">${icons[i] || "๐“–"}</span>                <span class="learn-card-num">${String(lesson.id).padStart(2, '0')}</span>            </div>            <div class="learn-card-title">${lesson.title}</div>            <div class="learn-card-desc">${lesson.desc}</div>            <div class="learn-card-meta">                <span>${lesson.subLessons.length}เธเธ—เธขเนเธญเธข</span>                <span class="learn-card-status">${isDone ? "โ“ PASSED" : "โ–บ START"}</span>            </div>        `;
        card.setAttribute('tabindex', '0');
        card.addEventListener('click', () => startLearnLesson(lesson));
        card.addEventListener('keydown', (e) => {
 if (e.key === 'Enter' || e.key === ' ') {
 e.preventDefault();
 startLearnLesson(lesson);
 }
 }
);
        grid.appendChild(card);
    }
);
    // Update overall progress
    const pct = Math.round((completed.length / LEARN_LESSONS.length) * 100);
    const bar = document.getElementById("learn-overall-progress");
 if (bar) bar.style.width = pct + "%";
    const txt = document.getElementById("learn-progress-text");
 if (txt) txt.textContent = `${completed.length}/ ${LEARN_LESSONS.length}COMPLETED`;
}
function startLearnLesson(lesson) {
    initAudio();
 playSound("click");
    learnState.lesson = lesson;
    learnState.subIndex = 0;
    showScreen("tutorial");
    state.tutorial.step = 99;
        // Keyboard Language Alert logic
        let langHint = "";
    const banner = document.getElementById("tutorial-guide-banner");
    if (lesson.id >= 5 && lesson.id <= 8) {
        langHint = " [เธเธฃเธธเธ“เธฒเน€เธเธฅเธตเนเธขเธเน€เธเนเธเนเธเนเธเธเธดเธกเธเนเนเธ—เธข]";
        if (banner) banner.style.color = "var(--warn-yellow)";
    }
 else {
        langHint = " [Switch to English Keyboard]";
        if (banner) banner.style.color = "var(--cyber-cyan)";
    }
    if (banner) banner.textContent = `LESSON ${lesson.id}: ${lesson.desc}${langHint}`;
    document.getElementById("zero-chat-container").classList.remove("hidden");
    const deck = document.querySelector("#screen-tutorial .skills-deck");
 if(deck) deck.style.display = "none";
    const barrier = document.querySelector("#screen-tutorial .firewall-barrier");
 if(barrier) barrier.style.display = "none";
    loadSubLesson();
}
function loadSubLesson() {
    const sub = learnState.lesson.subLessons[learnState.subIndex];
    if (!sub) {
        playSound("win");
 tutorialInput.oninput = null;
        if (!completed.includes(learnState.lesson.id)) {
 completed.push(learnState.lesson.id);
 localStorage.setItem("learnCompleted", JSON.stringify(completed));
 }
        document.getElementById("zero-chat-container").classList.add("hidden");
        const deck = document.querySelector("#screen-tutorial .skills-deck");
 if(deck) deck.style.display = "flex";
        const barrier = document.querySelector("#screen-tutorial .firewall-barrier");
 if(barrier) barrier.style.display = "flex";
        renderLearnLessons();
 showScreen("learn-menu");
 return;
    }
        tutorialField.querySelectorAll(".word-node").forEach(n => n.remove());
    const chatText = document.getElementById("zero-chat-text");
    chatText.textContent = "";
 clearInterval(learnState.chatInterval);
    let charIdx = 0;
 tutorialInput.disabled = true;
 tutorialInput.value = "";
        learnState.chatInterval = setInterval(() => {
        chatText.textContent += sub.dialogue[charIdx];
        if (charIdx % 3 === 0) playSound("click");
        charIdx++;
        if (charIdx >= sub.dialogue.length) {
            clearInterval(learnState.chatInterval);
 learnState.chatInterval = null;
 showSubLessonTarget(sub);
        }
    }
, 30);
}
function skipLearnChat() {
    if (state.screen === "tutorial" && state.tutorial.step === 99 && learnState.chatInterval) {
        clearInterval(learnState.chatInterval);
 learnState.chatInterval = null;
        const sub = learnState.lesson.subLessons[learnState.subIndex];
        if (sub) {
 document.getElementById("zero-chat-text").textContent = sub.dialogue;
 showSubLessonTarget(sub);
 }
    }
}
function showSubLessonTarget(sub) {
    tutorialInput.disabled = false;
 tutorialInput.focus();
    const el = document.createElement("div");
 el.className = "word-node learn-target";
 el.textContent = sub.target;
     el.style.left = "50%";
 el.style.top = "50%";
 el.style.transform = "translate(-50%, -50%)";
 tutorialField.appendChild(el);
    tutorialInput.value = "";
     tutorialInput.oninput = (e) => {
        const val = e.target.value;
         if (sub.target.startsWith(val)) {
             const match = sub.target.substring(0, val.length), remain = sub.target.substring(val.length);
             el.innerHTML = `<span class="typed-match">${match}</span>${remain}`;
             if (val === sub.target) {
                 playSound("laser");
                 tutorialInput.value = "";
                 learnState.subIndex++;
                 setTimeout(loadSubLesson, 200);
             }
         }
 else {
             playSound("error");
             e.target.value = val.substring(0, val.length - 1);
             const newVal = e.target.value;
             const match = sub.target.substring(0, newVal.length), remain = sub.target.substring(newVal.length);
             el.innerHTML = `<span class="typed-match">${match}</span>${remain}`;
         }
    }
;
}
function startPracticeSession() {
    initAudio();
 playSound("click");
    const zone = document.getElementById("practice-zone").value, timeLimit = parseInt(document.getElementById("practice-time").value);
    state.currentLevel = 99;
 state.practiceConfig = {
 name: `PRACTICE: ${zone.toUpperCase()}`, speed: zone === "zone1" ? 1.0 : (zone === "zone2" ? 1.4 : 1.8), wordsToClear: 999, maxSimultaneous: 4, type: "normal" }
;
    proceedToBattle(99);
    let timeLeft = timeLimit;
 const timerDisplay = document.createElement("div");
    timerDisplay.id = "practice-timer-overlay";
 timerDisplay.style.cssText = "position:absolute;  top:80px;  right:20px;  font-size:40px;  color:var(--cyber-cyan);  text-shadow:var(--neon-cyan-glow);  z-index:100; ";
    timerDisplay.textContent = timeLeft + "s";
 playField.appendChild(timerDisplay);
    clearInterval(state.practiceCountdown);
    state.practiceCountdown = setInterval(() => {
 timeLeft--;
 if (timerDisplay) timerDisplay.textContent = timeLeft + "s";
 if (timeLeft <= 0 || state.screen !== "battle") {
 clearInterval(state.practiceCountdown);
 state.practiceCountdown = null;
 if (timerDisplay) timerDisplay.remove();
 if (state.screen === "battle") victory();
 }
 }
, 1000);
}
function renderCutsceneLine() {
    if (!state.cutscene.dialogues || state.cutscene.currentIndex >= state.cutscene.dialogues.length) return;
    const data = state.cutscene.dialogues[state.cutscene.currentIndex];
 if (!data) return;
    const box = document.getElementById("cutscene-chat-box"), bubble = document.createElement("div");
    bubble.className = `chat-bubble ${data.speaker.toLowerCase()}`;
 box.appendChild(bubble);
    let charIdx = 0;
 bubble.textContent = `${data.speaker}: `;
    clearInterval(state.cutscene.typewriterInterval);
    state.cutscene.typewriterInterval = setInterval(() => {
 bubble.textContent += data.text[charIdx];
 if (charIdx % 3 === 0) playSound("click");
 charIdx++;
 if (charIdx >= data.text.length) {
 clearInterval(state.cutscene.typewriterInterval);
 box.scrollTop = box.scrollHeight;
 }
 }
, 25);
}
function advanceCutscene() {
 clearInterval(state.cutscene.typewriterInterval);
 const data = state.cutscene.dialogues[state.cutscene.currentIndex], box = document.getElementById("cutscene-chat-box");
 let bubble = box.lastChild;
 if (bubble && data) bubble.textContent = `${data.speaker}: ${data.text}`;
 state.cutscene.currentIndex++;
 if (state.cutscene.currentIndex < state.cutscene.dialogues.length) renderCutsceneLine();
 else finishCutscene();
 }
function skipCutscene() {
 clearInterval(state.cutscene.typewriterInterval);
 finishCutscene();
 }
function finishCutscene() {
 if (typeof state.cutscene.onFinish === "function") {
 const cb = state.cutscene.onFinish;
 state.cutscene.onFinish = null;
 cb();
 }
 else if (state.cutscene.nextScreen) showScreen(state.cutscene.nextScreen);
 else if (state.screen === "cutscene" && state.currentLevel) proceedToBattle(state.currentLevel);
 else showScreen("boot");
 }
function startTutorialMode() {
 showScreen("tutorial");
 state.tutorial.step = 0;
 state.hp = state.maxHp;
 state.energy = state.maxEnergy;
 updateHUD();
 loadTutorialStep();
 }
function loadTutorialStep() {
    const data = TUTORIAL_STEPS[state.tutorial.step];
 document.getElementById("tutorial-guide-banner").textContent = data.instruction;
 tutorialField.querySelectorAll(".word-node").forEach(n => n.remove());
 clearTimeout(state.tutorial.dodgeTimer);
 document.querySelectorAll(".tutorial-layout .skill-key").forEach(k => k.classList.remove("ready", "active-power"));
    if (data.type === "typing" || data.type === "ctrl-c") spawnTutorialTarget(data.targetText, data.type === "ctrl-c" ? "absorb" : "normal");
    else if (data.type === "dodge") {
 playSound("glitch");
 document.getElementById("glitch-overlay").classList.add("glitch-active");
 state.dodgeWindowActive = true;
 document.getElementById("tut-skill-shift").classList.add("ready", "active-power");
 state.tutorial.dodgeTimer = setTimeout(() => {
 if (state.dodgeWindowActive) {
 state.dodgeWindowActive = false;
 document.getElementById("glitch-overlay").classList.remove("glitch-active");
 playSound("breach");
 loadTutorialStep();
 }
 }
, 3000);
 }
    else if (data.type === "f1") {
 state.hp = 30;
 state.energy = 50;
 updateHUD();
 document.getElementById("tut-skill-f1").classList.add("ready");
 }
}
function spawnTutorialTarget(t, ty) {
 const el = document.createElement("div");
 el.className = `word-node ${ty}`;
 el.textContent = t;
 el.style.left = "50%";
 el.style.top = "30%";
 tutorialField.appendChild(el);
 }
function handleTutorialTypingInput(e) {
    const val = e.target.value;
 playSound("click");
 if (["skip", "เธเนเธฒเธก", "เธซเธ—เธฃเธข"].includes(val.trim().toLowerCase())) {
 e.target.value = "";
 skipTutorial();
 return;
 }
    if (state.tutorial.step === 99) return;
    const data = TUTORIAL_STEPS[state.tutorial.step], node = tutorialField.querySelector(".word-node");
    if (node && data && data.targetText) {
 if (data.targetText.toLowerCase().startsWith(val.toLowerCase())) {
 const m = data.targetText.substring(0, val.length), r = data.targetText.substring(val.length);
 node.innerHTML = `<span class="typed-match">${m}</span>${r}`;
 }
 else node.textContent = data.targetText;
 }
}
function handleTutorialActionKeys(e) {
    if (e.key === "Escape") {
 e.preventDefault();
 skipTutorial();
 return;
 }
    const inputVal = tutorialInput.value.trim().toLowerCase();
    if (["skip", "เธเนเธฒเธก", "เธซเธ—เธฃเธข"].includes(inputVal) && (e.key === " " || e.key === "Enter")) {
 e.preventDefault();
 tutorialInput.value = "";
 skipTutorial();
 return;
 }
    if (state.tutorial.step === 99) return;
    const data = TUTORIAL_STEPS[state.tutorial.step];
    if (!data) return;
    if (e.key === " " || e.key === "Enter") {
        if (e.key === " ") {
 e.preventDefault();
 if (data.type === "typing" && inputVal === data.targetText.toLowerCase()) {
 playSound("laser");
 advanceTutorialStep();
 }
 else playSound("error");
 tutorialInput.value = "";
 }
    }
 else if (e.key === "Shift") {
 e.preventDefault();
 if (data.type === "dodge" && state.dodgeWindowActive) {
 clearTimeout(state.tutorial.dodgeTimer);
 state.dodgeWindowActive = false;
 document.getElementById("glitch-overlay").classList.remove("glitch-active");
 playSound("shield");
 advanceTutorialStep();
 }
 }
    if (e.ctrlKey && e.key.toLowerCase() === "c") {
 e.preventDefault();
 if (data.type === "ctrl-c" && tutorialInput.value.trim().toLowerCase() === data.targetText.toLowerCase()) {
 playSound("heal");
 advanceTutorialStep();
 }
 }
}
function advanceTutorialStep() {
 state.tutorial.step++;
 if (state.tutorial.step < TUTORIAL_STEPS.length) loadTutorialStep();
 else {
 playSound("win");
 showScreen("map");
 }
 }
function skipTutorial() {
     initAudio();
 playSound("click");
 tutorialField.querySelectorAll(".word-node").forEach(n => n.remove());
     clearTimeout(state.tutorial.dodgeTimer);
 document.getElementById("glitch-overlay").classList.remove("glitch-active");
 state.dodgeWindowActive = false;
     if (state.tutorial.step === 99) {
         if (typeof learnState !== 'undefined') clearInterval(learnState.chatInterval);
        document.getElementById("zero-chat-container").classList.add("hidden");
        const deck = document.querySelector("#screen-tutorial .skills-deck");
 if(deck) deck.style.display = "flex";
        const barrier = document.querySelector("#screen-tutorial .firewall-barrier");
 if(barrier) barrier.style.display = "flex";
        showScreen("learn-menu");
     }
 else {
 showScreen("map");
 }
}
function renderLevelNodes() {
    const grid = document.getElementById("map-nodes-grid");
 if (!grid) return;
 grid.innerHTML = "";
    for (let i = 1;
 i <= 10;
 i++) {
        const node = document.createElement("div");
 const isLocked = i > state.maxUnlockedLevel;
 let cls = "level-node";
 if (isLocked) cls += " locked";
 else if (i === state.maxUnlockedLevel) cls += " active-unlocked";
 if (i === 10) cls += " boss-node";
 node.className = cls;
 node.innerHTML = `<span class="node-num">${i === 10 ? "BOSS" : `1.${i}`}</span><div class="node-stars">${"โ…".repeat(state.levelStars[i] || 0)}</div>`;
        if (!isLocked) node.addEventListener("click", () => selectLevel(i));
 grid.appendChild(node);
    }
}
function selectLevel(levelNum) {
 initAudio();
 playSound("click");
 state.currentLevel = levelNum;
 if (PRE_LEVEL_DIALOGUES[levelNum]) {
 showScreen("cutscene");
 document.getElementById("cutscene-chat-box").innerHTML = "";
 state.cutscene.dialogues = PRE_LEVEL_DIALOGUES[levelNum];
 state.cutscene.currentIndex = 0;
 state.cutscene.nextScreen = null;
 renderCutsceneLine();
 }
 else proceedToBattle(levelNum);
 }
function getLevelConfig(levelNum) {
    if (levelNum === 99 && state.practiceConfig) return state.practiceConfig;
    return LEVEL_CONFIGS[levelNum];
}
function proceedToBattle(levelNum) {
    showScreen("battle");
 state.battleEnded = false;
 if (!levelNum) levelNum = 1;
 const config = getLevelConfig(levelNum);
    state.currentLevel = levelNum;
 state.savedTypingValue = "";
 state.savedActiveTyping = "";
 state.hp = state.maxHp;
 state.energy = state.maxEnergy;
    state.score = 0;
 state.streak = 0;
 state.combo = 1;
 state.correctKeystrokes = 0;
 state.totalKeystrokes = 0;
 state.wordsClearedThisLevel = 0;
 state.battleStartTime = Date.now();
    state.shieldActive = false;
 state.shieldDuration = 0;
 state.timeSlowActive = false;
 state.timeSlowDuration = 0;
 state.dodgeWindowActive = false;
    state.finisherTriggered = false;
 clearTimeout(state.surgeTimer);
    if (config.type === "mini-boss") initMiniBoss("PROXY_DAEMON");
    if (config.type === "boss") {
 state.bossHp = 100;
 state.bossMaxHp = 100;
 state.bossName = "AI://CORE-7_MAINFRAME";
 document.getElementById("boss-hud-section").classList.remove("hidden");
 document.getElementById("boss-name-display").textContent = state.bossName;
 }
 else if (config.type !== "mini-boss") {
 state.bossHp = 0;
 document.getElementById("boss-hud-section").classList.add("hidden");
 }
    playField.querySelectorAll(".word-node").forEach(node => node.remove());
 state.fallingWords = [];
 state.usedWordsPerLevel = [];
 state.wordIdCounter = 0;
 updateHUD();
 updateSkillUI();
 resumeGameplay();
 speakBossBanter(`BREACHING NODE 1.${levelNum}...`);
    clearInterval(state.energyInterval);
 state.energyInterval = setInterval(() => {
 if (state.energy < state.maxEnergy) {
 state.energy = Math.min(state.maxEnergy, state.energy + 5);
 updateHUD();
 updateSkillUI();
 }
 }
, 1000);
}
function pauseGameplay() {
 clearInterval(state.spawnInterval);
 clearInterval(state.gameLoopInterval);
 clearInterval(state.bossBanterTimer);
 clearInterval(state.bossSkillTimer);
 clearTimeout(state.surgeTimer);
 clearTimeout(state.dodgeTimeout);
 state.dodgeWindowActive = false;
 if (playField) playField.classList.remove("warning-flash");
 if (state.practiceCountdown) {
 clearInterval(state.practiceCountdown);
 state.practiceCountdown = null;
 }
 }
function resumeGameplay() {
 if (state.screen !== "battle") return;
 pauseGameplay();
 const c = getLevelConfig(state.currentLevel);
 let r = 2200 - (state.currentLevel * 120);
 if (state.playerClass === "speed") r *= 1.25;
 state.spawnInterval = setInterval(spawnWord, Math.max(700, r));
 state.gameLoopInterval = setInterval(updatePhysics, 50);
 if (state.currentLevel >= 4 && state.currentLevel !== 99) {
 state.bossBanterTimer = setInterval(triggerBossBanter, 6000);
 state.bossSkillTimer = setInterval(triggerBossSkill, 10000);
 }
 }
function spawnWord(forcedType = null) {
    const config = getLevelConfig(state.currentLevel);
 if (state.fallingWords.length >= config.maxSimultaneous) return;
    let zone = state.currentLevel >= 8 ? "zone3" : (state.currentLevel >= 4 ? "zone2" : "zone1"), list = WORD_BANK[state.currentLang][zone], active = state.fallingWords.map(w => w.text), avail = list.filter(w => !active.includes(w) && !state.usedWordsPerLevel.includes(w));
    if (avail.length === 0) {
 state.usedWordsPerLevel = [];
 avail = list.filter(w => !active.includes(w));
 }
 if (avail.length === 0) return;
    let txt = avail[Math.floor(Math.random() * avail.length)];
 state.usedWordsPerLevel.push(txt);
    let type = forcedType || 'normal';
 if (!forcedType && state.currentLevel >= 3) {
 const r = Math.random();
 if (r < 0.15) type = 'hazard';
 else if (r < 0.30) type = 'absorb';
 else if (r < 0.40) type = 'reflect';
 }
    let spd = config.speed;
 if (state.playerClass === "speed") spd *= 0.8;
    const el = document.createElement("div");
 el.className = `word-node ${type}`;
 el.textContent = txt;
    const x = Math.max(80, Math.min(playField.clientWidth - 80, Math.floor(Math.random() * playField.clientWidth)));
    el.style.left = `${x}px`;
 el.style.top = `-20px`;
 playField.appendChild(el);
    state.fallingWords.push({
 id: state.wordIdCounter++, text: txt, displayWordText: txt, type: type, x: x, y: -20, speed: spd, element: el }
);
}
let lastHUDUpdate = 0;
function updatePhysics() {
    if (playField.clientHeight <= 0) return;
 const firewallY = playField.clientHeight - 40;
    let mult = state.timeSlowActive ? 0.4 : 1.0;
 if (state.timeSlowActive) {
 state.timeSlowDuration -= 50;
 if (state.timeSlowDuration <= 0) state.timeSlowActive = false;
 }
    if (state.shieldActive) {
 state.shieldDuration -= 50;
 if (state.shieldDuration <= 0) state.shieldActive = false;
 }
    for (let i = state.fallingWords.length - 1;
 i >= 0;
 i--) {
 const w = state.fallingWords[i];
 w.y += w.speed * mult;
 w.element.style.top = `${w.y}px`;
 if (state.combo >= 3 && !state.settings.photosensitive) w.element.classList.add("combo-glow");
 else w.element.classList.remove("combo-glow");
 if (w.y >= firewallY + 20) {
 triggerBreach(w);
 state.fallingWords.splice(i, 1);
 }
 }
    const now = performance.now();
    if (now - lastHUDUpdate > 100) {
 updateHUD();
 lastHUDUpdate = now;
 }
}
function triggerBreach(w) {
    w.element.remove();
 playSound("breach");
 triggerVisualGlitch();
 if (state.shieldActive) return;
 if (state.upgrades.autoShield > 0 && Math.random() < 0.5) {
 speakBossBanter("AUTO_SHIELD!");
 playSound("shield");
 return;
 }
    let dmg = w.type === "hazard" ? 25 : 12;
 if (state.playerClass === "brute") dmg = Math.floor(dmg * 0.7);
    state.hp = Math.max(0, state.hp - dmg);
 state.streak = 0;
 state.combo = 1;
 if (state.hp <= 0) gameOver();
}
function handleMainTypingInput(e) {
    state.activeTyping = e.target.value.trim();
 playSound("click");
 if (e.inputType !== "deleteContentBackward" && e.inputType !== "deleteContentForward") state.totalKeystrokes++;
    const match = state.fallingWords.find(w => w.displayWordText.startsWith(state.activeTyping) && state.activeTyping.length > 0);
    if (match) {
 match.element.innerHTML = `<span class="typed-match">${match.displayWordText.substring(0, state.activeTyping.length)}</span>${match.displayWordText.substring(state.activeTyping.length)}`;
 }
    state.fallingWords.forEach(w => {
 if (w !== match) w.element.textContent = w.displayWordText;
 }
);
}
function handleActionKeys(e) {
    if (e.key === " ") {
 e.preventDefault();
 fireBlaster("space");
 }
    else if (e.key === "Shift") {
 e.preventDefault();
 triggerDodge();
 }
    else if (e.key === "F1") {
 e.preventDefault();
 useSkillHeal();
 }
    else if (e.key === "F2") {
 e.preventDefault();
 useSkillShield();
 }
    else if (e.key === "F3") {
 e.preventDefault();
 useSkillSlow();
 }
    else if (e.ctrlKey && e.key.toLowerCase() === "c") {
 e.preventDefault();
 fireBlaster("ctrl-c");
 }
    else if (e.ctrlKey && e.key.toLowerCase() === "v") {
 e.preventDefault();
 fireBlaster("ctrl-v");
 }
}
function fireBlaster(actionKey = "space") {
    const t = state.activeTyping;
 let idx = state.fallingWords.findIndex(w => w.displayWordText === t);
    if (idx !== -1) {
        const w = state.fallingWords[idx];
        if (w.type === 'absorb' && actionKey !== 'ctrl-c') {
 playSound("error");
 return;
 }
        if (w.type === 'reflect' && actionKey !== 'ctrl-v') {
 playSound("error");
 return;
 }
        if ((w.type === 'normal' || w.type === 'hazard') && actionKey !== 'space') {
 playSound("error");
 return;
 }
        playSound("laser");
 w.element.remove();
 state.fallingWords.splice(idx, 1);
        state.correctKeystrokes += t.length;
 state.streak++;
        let d = state.playerClass === "precision" ? 8 : 5;
 if (state.streak % (state.playerClass === "precision" ? 5 : 8) === 0) state.combo++;
        let fd = d * state.combo;
 if (w.type === 'absorb') {
 state.energy = Math.min(state.maxEnergy, state.energy + 30);
 playSound("heal");
 }
 else if (w.type === 'reflect') fd *= 2;
        state.score += 100 * state.combo;
 const c = LEVEL_CONFIGS[state.currentLevel];
        if (c.type === "boss" || c.type === "mini-boss") {
 state.bossHp = Math.max(0, state.bossHp - fd);
 if (c.type === "boss" && state.bossHp <= 20 && state.bossHp > 0 && !state.finisherTriggered) {
 state.finisherTriggered = true;
 triggerFinisherPhase();
 }
 else if (state.bossHp <= 0) victory();
 }
        else {
 state.wordsClearedThisLevel++;
 if (state.wordsClearedThisLevel >= c.wordsToClear) victory();
 }
        state.activeTyping = "";
 inputField.value = "";
    }
 else if (t.length > 0) {
 playSound("error");
 state.streak = 0;
 state.combo = 1;
 }
    updateHUD();
}
function triggerDodge() {
 if (state.dodgeWindowActive) {
 clearTimeout(state.dodgeTimeout);
 state.dodgeWindowActive = false;
 playField.classList.remove("warning-flash");
 playSound("shield");
 document.getElementById("glitch-overlay").classList.remove("glitch-active");
 speakBossBanter("EVADED!");
 }
 }
function useSkillHeal() {
 if (state.energy >= 30) {
 state.energy -= 30;
 state.hp = Math.min(state.maxHp, state.hp + 25);
 playSound("heal");
 updateHUD();
 updateSkillUI();
 }
 else playSound("error");
 }
function useSkillShield() {
 if (state.energy >= 40) {
 state.energy -= 40;
 state.shieldActive = true;
 state.shieldDuration = 5000;
 playSound("shield");
 updateHUD();
 updateSkillUI();
 }
 else playSound("error");
 }
function useSkillSlow() {
 if (state.energy >= 50) {
 state.energy -= 50;
 state.timeSlowActive = true;
 state.timeSlowDuration = 3000 + state.upgrades.slowDuration;
 playSound("slow");
 updateHUD();
 updateSkillUI();
 }
 else playSound("error");
 }
function updateSkillUI() {
 [1,2,3].forEach(n => {
 const s = document.getElementById(`skill-f${n}`);
 if (s) {
 const cost = [30,40,50][n-1];
 if (state.energy >= cost) s.classList.add("ready");
 else s.classList.remove("ready");
 }
 }
);
 }
function speakBossBanter(t) {
 const el = document.getElementById("boss-talk-text");
 if (el) el.textContent = t;
 }
function triggerBossBanter() {
 const p = ["LOCATING_IP...", "YOU.CANNOT.BREACH", "DELETING_KEYS..."];
 speakBossBanter(p[Math.floor(Math.random() * p.length)]);
 }
function triggerBossSkill() {
    initAudio();
 playSound("glitch");
 const r = Math.random();
    if (r < 0.33) {
 speakBossBanter("SYSTEM GLITCH!");
 if (!state.settings.photosensitive) {
 document.getElementById("glitch-overlay").classList.add("glitch-active");
 setTimeout(() => document.getElementById("glitch-overlay").classList.remove("glitch-active"), 2500);
 }
 }
    else if (r < 0.66) {
        speakBossBanter("ORBITAL TARGETING!");
 state.dodgeWindowActive = true;
 if (!state.settings.photosensitive) playField.classList.add("warning-flash");
        state.dodgeTimeout = setTimeout(() => {
            playField.classList.remove("warning-flash");
            if (state.dodgeWindowActive) {
 state.dodgeWindowActive = false;
 const b = document.createElement("div");
 b.className = "laser-beam";
 b.style.left = "50%";
 if (!state.settings.photosensitive) playField.appendChild(b);
 setTimeout(() => b.remove(), 1000);
 playSound("breach");
 triggerVisualGlitch();
                if (!state.shieldActive) {
 let d = 35;
 if (state.playerClass === "brute") d = Math.floor(d * 0.7);
 state.hp = Math.max(0, state.hp - d);
 updateHUD();
 }
                if (state.hp <= 0) gameOver();
            }
        }
, 1500);
    }
 else bossSkillNumpadCrack();
}
function bossSkillNumpadCrack() {
    state.savedTypingValue = inputField.value;
 state.savedActiveTyping = state.activeTyping;
 pauseGameplay();
 showScreen("numpad");
 playSound("error");
    const c = Math.floor(1000 + Math.random() * 9000).toString();
 state.numpad.targetCode = c;
 state.numpad.inputCode = "";
 state.numpad.timer = 5;
    document.getElementById("numpad-target").textContent = c;
 document.getElementById("numpad-display").textContent = "----";
    clearInterval(state.numpad.interval);
 state.numpad.interval = setInterval(() => {
 state.numpad.timer--;
 document.getElementById("numpad-time-left").textContent = `${state.numpad.timer}s`;
        if (state.numpad.timer <= 0) {
 clearInterval(state.numpad.interval);
 playSound("breach");
 state.hp = Math.max(0, state.hp - 30);
 updateHUD();
 showScreen("battle");
 restoreSavedTypingState();
 resumeGameplay();
 if (state.hp <= 0) gameOver();
 }
    }
, 1000);
}
function restoreSavedTypingState() {
 if (state.savedTypingValue !== null && state.savedTypingValue !== "") {
 inputField.value = state.savedTypingValue;
 state.activeTyping = state.savedActiveTyping;
 state.fallingWords.forEach(w => {
 const t = w.displayWordText, i = state.activeTyping;
 if (t.startsWith(i) && i.length > 0) w.element.innerHTML = `<span class="typed-match">${t.substring(0, i.length)}</span>${t.substring(i.length)}`;
 else w.element.textContent = t;
 }
);
 }
 }
function handleNumpadInput(d) {
    if (state.numpad.inputCode.length >= 4) return;
    playSound("click");
    state.numpad.inputCode = (state.numpad.inputCode + d).slice(0, 4);
    const placeholder = "-".repeat(4 - state.numpad.inputCode.length);
    document.getElementById("numpad-display").textContent = state.numpad.inputCode + placeholder;
    if (state.numpad.inputCode.length === 4) {
 clearInterval(state.numpad.interval);
 if (state.numpad.inputCode === state.numpad.targetCode) playSound("win");
 else {
 playSound("breach");
 state.hp = Math.max(0, state.hp - 20);
 updateHUD();
 }
 showScreen("battle");
 restoreSavedTypingState();
 resumeGameplay();
 if (state.hp <= 0) gameOver();
 }
}
function triggerFinisherPhase() {
    pauseGameplay();
 showScreen("finisher");
 playSound("slow");
 const p = WORD_BANK[state.currentLang].finisher, txt = p[Math.floor(Math.random() * p.length)];
    state.finisher.passage = txt;
 state.finisher.words = txt.split(" ");
 state.finisher.currentIndex = 0;
 let l = state.currentLang === "en" ? 15 : 20;
 if (state.playerClass === "speed") l += 5;
 state.finisher.timer = l;
 renderPassageHTML();
    clearInterval(state.finisher.interval);
 state.finisher.interval = setInterval(() => {
 state.finisher.timer -= 0.05;
 if (state.finisher.timer <= 0) {
 clearInterval(state.finisher.interval);
 playSound("error");
 state.bossHp = 35;
 state.finisherTriggered = false;
 showScreen("battle");
 resumeGameplay();
 }
 else document.getElementById("finisher-timer").textContent = `${state.finisher.timer.toFixed(2)}s`;
 }
, 50);
}
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
function renderPassageHTML() {
    const box = document.getElementById("passage-box"), typed = finisherInput.value;
    box.innerHTML = state.finisher.words.map((w, idx) => {
        const safeWord = escapeHtml(w);
        if (idx < state.finisher.currentIndex) return `<span class="passage-word correct">${safeWord}</span>`;
        if (idx === state.finisher.currentIndex) {
 let h = "";
 for (let i = 0;
 i < safeWord.length;
 i++) {
 if (i < typed.length) h += `<span class="${typed[i] === safeWord[i] ? 'typed-match' : 'typed-wrong'}">${ escapeHtml(safeWord[i])} </span>`;  else h += safeWord[i];  }  return `<span class="passage-word current">${h}</span>`;
 }
        return `<span class="passage-word">${safeWord}</span>`;
    }
).join(" ");
}
function handleFinisherInput(e) {
    const v = e.target.value, cw = state.finisher.words[state.finisher.currentIndex];
 playSound("click");
     // Count keystrokes based on length difference for better mobile/IME support
     const currentLen = v.length;
    const prevLen = state.finisher.prevInputLen || 0;
    if (currentLen > prevLen) state.totalKeystrokes += (currentLen - prevLen);
    state.finisher.prevInputLen = currentLen;
    if (v.length > 0 && !cw.startsWith(v)) playSound("error");
    const last = state.finisher.currentIndex === state.finisher.words.length - 1;
    if (v.endsWith(" ") || (last && v === cw)) {
 if (v.trim() === cw) {
 state.correctKeystrokes += cw.length;
 state.finisher.currentIndex++;
 e.target.value = "";
 state.finisher.prevInputLen = 0;
 if (state.finisher.currentIndex >= state.finisher.words.length) {
 clearInterval(state.finisher.interval);
 setTimeout(() => victory(), 300);
 }
 }
 }
    renderPassageHTML();
}
function gameOver() {
 if (state.battleEnded) return;
 state.battleEnded = true;
 pauseGameplay();
 clearInterval(state.finisher.interval);
 clearInterval(state.numpad.interval);
 playSound("lose");
 document.getElementById("summary-title").textContent = "DECK ERROR";
 document.getElementById("summary-title").className = "text-red title-glow";
 calculateResults(false);
 showScreen("summary");
 }
function victory() {
    if (state.battleEnded) return;
 state.battleEnded = true;
 pauseGameplay();
 clearInterval(state.finisher.interval);
 clearInterval(state.numpad.interval);
 playSound("win");
 document.getElementById("summary-title").textContent = "NODE OVERRIDE GRANTED";
 document.getElementById("summary-title").className = "text-green title-glow";
    if (state.currentLevel === state.maxUnlockedLevel && state.maxUnlockedLevel < 10) state.maxUnlockedLevel++;
 calculateResults(true);
 saveGame();
    const k = `post_level_${state.currentLevel}`;
 if (STORY_CUTSCENES[k]) {
 state.cutscene.dialogues = STORY_CUTSCENES[k];
 state.cutscene.currentIndex = 0;
 state.cutscene.nextScreen = "summary";
 showScreen("cutscene");
 document.getElementById("cutscene-chat-box").innerHTML = "";
 renderCutsceneLine();
 }
 else showScreen("summary");
}
function calculateResults(win) {
    const t = ((Date.now() - state.battleStartTime) / 1000) / 60, wpm = (state.correctKeystrokes > 0 && t > 0.01) ? Math.round((state.correctKeystrokes / 5) / t) : 0, acc = state.totalKeystrokes > 0 ? Math.round((state.correctKeystrokes / state.totalKeystrokes) * 100) : 100;
    document.getElementById("summary-wpm").textContent = wpm;
 document.getElementById("summary-accuracy").textContent = `${acc}%`;
    let cr = 0, stars = 0;
 if (win) {
 stars = 1;
 if (acc >= 85 && wpm >= 35) stars = 2;
 if (acc >= 95 && wpm >= 55 && state.hp >= (state.maxHp * 0.7)) stars = 3;
 cr = (state.currentLevel * 30) + (stars * 40);
 state.credits += cr;
 if (stars > (state.levelStars[state.currentLevel] || 0)) state.levelStars[state.currentLevel] = stars;
 }
    document.getElementById("summary-credits-earned").textContent = `+${cr}CR`;
 document.getElementById("summary-stars").textContent = "โ…".repeat(stars) + "โ".repeat(3 - stars);
 updateWallet();
}
function openShopScreen() {
 initAudio();
 playSound("click");
 state.shopIndex = 0;
 modeIndex = 0;
 showScreen("shop");
 updateWallet();
 renderShopSelections();
 }
function updateWallet() {
 document.getElementById("credits-hud-display").textContent = `${state.credits}CR`;
 document.getElementById("shop-credits-display").textContent = state.credits;
 }
function renderShopSelections() {
    const container = document.querySelector(".shop-grid");
    if (!container) return;
        const items = container.querySelectorAll('.select-shop-item');
    items.forEach(card => {
        const newCard = card.cloneNode(true);
        newCard.addEventListener('click', () => purchaseUpgrade(newCard.getAttribute('data-item')));
        newCard.setAttribute('tabindex', '0');
        card.replaceWith(newCard);
    }
);
}
// Reapply keyboard listeners after dynamic shop selections
function purchaseUpgrade(id) {
    initAudio();
 const costs = {
 up_hp: 150, up_en: 150, item_auto_shield: 100, item_slow_overload: 120 }
;
    if (state.credits >= costs[id]) {
 state.credits -= costs[id];
 playSound("win");
 if (id === "up_hp") {
 state.upgrades.hpLevel++;
 state.maxHp += 25;
 state.hp = state.maxHp;
 }
 else if (id === "up_en") {
 state.upgrades.enLevel++;
 state.maxEnergy += 20;
 state.energy = state.maxEnergy;
 }
 else if (id === "item_auto_shield") state.upgrades.autoShield++;
 else if (id === "item_slow_overload") state.upgrades.slowDuration += 1500;
 saveGame();
 updateWallet();
 updateHUD();
 }
 else playSound("error");
}
function updateHUD() {
    document.getElementById("player-hp-bar").style.width = `${(state.hp / state.maxHp) * 100}%`;
 document.getElementById("player-hp-text").textContent = `${state.hp}/${state.maxHp}`;
    document.getElementById("player-energy-bar").style.width = `${(state.energy / state.maxEnergy) * 100}%`;
 document.getElementById("player-energy-text").textContent = `${state.energy}/${state.maxEnergy}`;
    if (state.bossHp > 0) {
 document.getElementById("boss-hp-bar").style.width = `${(state.bossHp / state.bossMaxHp) * 100}%`;
 document.getElementById("boss-hp-text").textContent = `${Math.ceil((state.bossHp / state.bossMaxHp) * 100)}%`;
 }
    const t = ((Date.now() - state.battleStartTime) / 1000) / 60, wpm = (state.correctKeystrokes > 0 && t > 0.016) ? Math.round((state.correctKeystrokes / 5) / t) : 0, acc = state.totalKeystrokes > 0 ? Math.round((state.correctKeystrokes / state.totalKeystrokes) * 100) : 100;
    document.getElementById("wpm-display").textContent = wpm;
 document.getElementById("acc-display").textContent = `${acc}%`;
    const comboValue = document.getElementById("combo-value");
 if (comboValue) comboValue.textContent = state.combo;
    const cfg = getLevelConfig(state.currentLevel), p = document.getElementById("progress-display");
 if (cfg && p) p.textContent = cfg.type === "normal" ? `${state.wordsClearedThisLevel}/${cfg.wordsToClear}` : "BOSSFIGHT";
}
function setLanguage(l) {
 initAudio();
 playSound("click");
 state.currentLang = l;
 document.querySelectorAll(".btn-lang").forEach(b => b.classList.remove("active"));
 const b = document.querySelector(`.btn-lang[data-lang="${l}"]`);  if (b) b.classList.add("active");
 updateKeyboardLayout(l);
 }
function updateKeyboardLayout(lang) {
    const map = KEYBOARD_MAP[lang] || KEYBOARD_MAP['en'];
    if (!map) return;
    document.querySelectorAll(".key-btn").forEach(btn => {
        const code = btn.getAttribute("data-code");
        if (map[code]) btn.textContent = map[code];
    }
);
}
function triggerVisualGlitch() {
 if (state.settings.photosensitive) return;
 document.body.classList.add("shake-active");
 document.getElementById("glitch-overlay").classList.add("glitch-active");
 setTimeout(() => {
 document.body.classList.remove("shake-active");
 document.getElementById("glitch-overlay").classList.remove("glitch-active");
 }
, 300);
 }
function openLogsView() {
    initAudio();
 playSound("click");
 showScreen("logs");
 const s = document.getElementById("logs-sidebar-list");
 s.innerHTML = "";
    NARRATIVE_LOGS.forEach(log => {
        const u = state.maxUnlockedLevel >= log.zoneRequired, b = document.createElement("button");
 b.className = `log-item-btn ${u ? '' : 'locked'}`;
 b.textContent = u ? log.title : "๐”’ เนเธเนเธกเธเนเธญเธกเธนเธฅเธ–เธนเธเน€เธเนเธฒเธฃเธซเธฑเธช";
        if (u) b.addEventListener("click", () => {
 playSound("click");
 document.querySelectorAll(".log-item-btn").forEach(x => x.classList.remove("selected"));
 b.classList.add("selected");
 document.getElementById("log-detail-viewer").innerHTML = `<h3>${log.title}</h3><hr class="neon-line" style="margin:15px 0; "><pre style="font-family:monospace;white-space:pre-wrap;font-size:14px;">${ log.content} </pre>`;  } );         s.appendChild(b);     } ); } const CURRENT_SAVE_VERSION = 2; function saveGame() {  const d = {  version: CURRENT_SAVE_VERSION, maxUnlockedLevel: state.maxUnlockedLevel, levelStars: state.levelStars, credits: state.credits, upgrades: state.upgrades, unlockedLogs: state.unlockedLogs, playerClass: state.playerClass, settings: state.settings } ;  localStorage.setItem("cyberhack_save", JSON.stringify(d));
 }
function loadGame() {
 const r = localStorage.getItem("cyberhack_save");
 if (!r) return;
 try {
 const d = JSON.parse(r);
 state.maxUnlockedLevel = d.maxUnlockedLevel || 1;
 state.levelStars = d.levelStars || {
}
;
 state.credits = d.credits || 0;
 state.upgrades = d.upgrades || {
 hpLevel: 0, enLevel: 0, autoShield: 0, slowDuration: 0 }
;
 state.unlockedLogs = d.unlockedLogs || ["log_act1"];
 state.playerClass = d.playerClass || null;
 if (d.settings) {
 state.settings = {
 ...state.settings, ...d.settings }
;
 document.getElementById("setting-photosensitive").checked = state.settings.photosensitive;
 document.getElementById("setting-scanlines").checked = state.settings.scanlines;
 document.getElementById("setting-volume").value = state.settings.volume;
 setVolume(state.settings.volume);
 document.body.classList.toggle("scanlines", state.settings.scanlines);
 }
 if (state.playerClass) {
 state.maxHp = (state.playerClass === "brute" ? 150 : 100) + state.upgrades.hpLevel * 25;
 state.maxEnergy = 100 + state.upgrades.enLevel * 20;
 document.getElementById("hud-deck-name").textContent = `ZERO_DECK:${state.playerClass.toUpperCase()}`;
 }
 updateWallet();
 }
 catch (e) {
 console.error("Load failed", e);
 }
 }
function initMiniBoss(n) {
 state.bossHp = 100;
 state.bossMaxHp = 100;
 state.bossName = n;
 document.getElementById("boss-hud-section").classList.remove("hidden");
 document.getElementById("boss-name-display").textContent = n;
 state.surgeTimer = setTimeout(triggerSurge, 5000);
 speakBossBanter(n + ": OVERLOAD_SURGE IN 5s...");
 }
function triggerSurge() {
 speakBossBanter("OVERLOAD_SURGE ACTIVATED!");
 for(let i=0;
 i<3;
 i++) spawnWord("hazard");
 }
function toggleSettings() {
     const isHidden = settingsModal.classList.toggle("hidden");
     if (!isHidden) {
 if (state.screen === "battle") pauseGameplay();
 }
     else {
 if (state.screen === "battle" && !state.battleEnded) resumeGameplay();
 }
 }
function setupSettings() {
    document.getElementById("setting-photosensitive").addEventListener("change", (e) => state.settings.photosensitive = e.target.checked);
    document.getElementById("setting-scanlines").addEventListener("change", (e) => document.body.classList.toggle("scanlines", e.target.checked));
    document.getElementById("setting-volume").addEventListener("input", (e) => {
        state.settings.volume = e.target.value;
        setVolume(e.target.value);
    });
    document.getElementById("btn-settings-map").addEventListener("click", () => {
        if (state.screen === "battle" || state.screen === "numpad") {
            settingsModal.classList.add("hidden");
            pauseGameplay();
            showScreen("map");
        }
    });
    document.getElementById("btn-settings-retry").addEventListener("click", () => {
        if (state.currentLevel && (state.screen === "battle" || state.screen === "numpad")) {
            settingsModal.classList.add("hidden");
            pauseGameplay();
            proceedToBattle(state.currentLevel);
        }
    });
}
// ==========================================// CLASSIC TYPING MODE LOGIC// ==========================================
let classicInterval = null;
function initClassicMode(lang = 'en') {
    state.screen = "classic-typing";
    state.classicLang = lang;
    state.classicTimeLeft = 60;
    state.classicActive = false;
    state.classicTypedChars = 0;
    state.classicErrors = 0;
        document.getElementById("classic-summary-panel").classList.add("hidden");
    document.getElementById("classic-timer").textContent = "60s";
        document.querySelectorAll(".btn-classic-lang").forEach(b => {
        b.classList.remove("active");
        if(b.getAttribute("data-lang") === lang) b.classList.add("active");
    }
);
        generateClassicWords(lang);
    showScreen("classic-typing");
        document.removeEventListener("keydown", handleClassicTyping);
    document.addEventListener("keydown", handleClassicTyping);
}
document.querySelectorAll(".btn-classic-lang").forEach(btn => {
    btn.addEventListener("click", (e) => {
        initClassicMode(e.target.getAttribute("data-lang"));
    }
);
}
);
function generateClassicWords(lang) {
    let pool = [];
    if (lang === 'en' || lang === 'th' || lang === 'code') {
        pool = [...CLASSIC_WORDS[lang]];
    } else if (lang === 'mixed') {
        pool = [...CLASSIC_WORDS['en'], ...CLASSIC_WORDS['th'], ...CLASSIC_WORDS['code']];
    }

    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    state.classicWords = pool.slice(0, 100);
    state.classicWordIndex = 0;
    state.classicCharIndex = 0;
    renderClassicWords();
}
function renderClassicWords() {
    const container = document.getElementById("classic-text-display");
    container.innerHTML = "";
        state.classicWords.forEach((word, wIdx) => {
        const wordEl = document.createElement("span");
        wordEl.className = "classic-word";
        wordEl.id = `c-word-${wIdx}`;
                for (let i = 0;
 i < word.length;
 i++) {
            const letterEl = document.createElement("span");
            letterEl.className = "classic-letter";
            letterEl.textContent = word[i];
            wordEl.appendChild(letterEl);
        }
        container.appendChild(wordEl);
                // Add space between words (except last)
                if (wIdx < state.classicWords.length - 1) {
            container.appendChild(document.createTextNode(" "));
        }
    }
);
        updateClassicCursor();
}
function updateClassicCursor() {
    // Clear active status from all letters first
    document.querySelectorAll(".classic-letter").forEach(l => l.classList.remove("active"));
        const currentWordEl = document.getElementById(`c-word-${state.classicWordIndex}`);
    if (currentWordEl) {
        const letters = currentWordEl.querySelectorAll(".classic-letter");
        if (state.classicCharIndex < letters.length) {
            letters[state.classicCharIndex].classList.add("active");
        }
 else {
            // Target the last letter if we've typed past it but haven't hit Space yet
            const lastLetter = letters[letters.length - 1];
            if(lastLetter) lastLetter.classList.add("active");
        }
                const container = document.getElementById("classic-text-display");
        const offsetTop = currentWordEl.offsetTop;
        if (offsetTop > container.scrollTop + container.clientHeight - 40) {
            container.scrollTop = offsetTop - 40;
        }
 else if (offsetTop < container.scrollTop) {
            container.scrollTop = offsetTop - 10;
        }
    }
}
function handleClassicTyping(e) {
    if (state.screen !== "classic-typing" || e.ctrlKey || e.altKey || e.metaKey) return;

    if (e.key === "Escape" || e.key === "Tab") {
        e.preventDefault();
        if (e.key === "Tab") {
            initClassicMode(state.classicLang);
        } else {
            endClassicMode();
            showScreen("mode-select");
        }
        return;
    }

    const isPrintable = e.key.length === 1 || e.key === " " || e.key === "Backspace";
    if (!isPrintable) return;

    if (!state.classicActive && e.key !== "Backspace") {
        state.classicActive = true;
        state.classicStartTime = Date.now();
        classicInterval = setInterval(() => {
            state.classicTimeLeft--;
            document.getElementById("classic-timer").textContent = state.classicTimeLeft + "s";
            if (state.classicTimeLeft <= 0) {
                endClassicMode();
            }
        }, 1000);
    }

    if (state.classicTimeLeft <= 0) return;

    const word = state.classicWords[state.classicWordIndex];
    const currentWordEl = document.getElementById(`c-word-${state.classicWordIndex}`);
    if (!currentWordEl) return;
    const letters = currentWordEl.querySelectorAll(".classic-letter");

    if (e.key === "Backspace") {
        if (state.classicCharIndex > 0) {
            state.classicCharIndex--;
            letters[state.classicCharIndex].classList.remove("correct", "incorrect");
            currentWordEl.classList.remove("error");
            updateClassicCursor();
        } else if (state.classicCharIndex === 0 && state.classicWordIndex > 0) {
            const prevWordEl = document.getElementById(`c-word-${state.classicWordIndex - 1}`);
            if (prevWordEl) {
                state.classicWordIndex--;
                state.classicCharIndex = state.classicWords[state.classicWordIndex].length;
                prevWordEl.classList.remove("error");
                const prevLetters = prevWordEl.querySelectorAll(".classic-letter");
                prevLetters.forEach(l => l.classList.remove("correct", "incorrect"));
                updateClassicCursor();
            }
        }
        return;
    }

    if (e.key === " ") {
        e.preventDefault();
        if (state.classicCharIndex === 0) return;

        for (let i = state.classicCharIndex; i < letters.length; i++) {
            if (!letters[i].classList.contains("correct")) {
                letters[i].classList.add("incorrect");
                state.classicErrors++;
            }
        }

        let hasError = false;
        letters.forEach(l => {
            if (l.classList.contains("incorrect")) hasError = true;
        });
        if (hasError) currentWordEl.classList.add("error");

        state.classicWordIndex++;
        state.classicCharIndex = 0;

        if (state.classicWordIndex >= state.classicWords.length) {
            endClassicMode();
        } else {
            updateClassicCursor();
        }
        return;
    }

    if (state.classicCharIndex < word.length) {
        state.classicTypedChars++;
        const targetChar = word[state.classicCharIndex];
        const typedChar = e.key;

        if (typedChar === targetChar) {
            letters[state.classicCharIndex].classList.add("correct");
        } else {
            letters[state.classicCharIndex].classList.add("incorrect");
            state.classicErrors++;
        }
        state.classicCharIndex++;
        updateClassicCursor();
        playSound("keystroke");
    }
}
function endClassicMode() {
    clearInterval(classicInterval);
    state.classicActive = false;
    document.removeEventListener("keydown", handleClassicTyping);

    const elapsedMinutes = state.classicStartTime ? (Date.now() - state.classicStartTime) / 60000 : 1;
    const correctChars = Math.max(0, state.classicTypedChars - state.classicErrors);
    const wpm = elapsedMinutes > 0 ? Math.round((correctChars / 5) / elapsedMinutes) : 0;
    const acc = state.classicTypedChars > 0 ? Math.round((correctChars / state.classicTypedChars) * 100) : 0;

    const wpmEl = document.getElementById("classic-wpm");
    const accEl = document.getElementById("classic-acc");
    const summaryPanel = document.getElementById("classic-summary-panel");

    if (wpmEl) wpmEl.textContent = wpm;
    if (accEl) accEl.textContent = acc + "%";
    if (summaryPanel) summaryPanel.classList.remove("hidden");
}


