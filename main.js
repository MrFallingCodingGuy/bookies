const GAME_STATE = {
    cookies: 0,
    cps: 0,
    clickPower: 1,
    upgrades: [
        // Gambling is now the first upgrade: special spinner behavior (requires >= 1,000,000 cookies to use)
        { id: 'gambling', name: 'GAMBLING', description: 'Risk everything: spend all cookies to spin the wheel (must have at least 1,000,000 cookies).', baseCost: 1000000, costMultiplier: 1.0, baseCps: 0, count: 0 },
        { id: 'cursor', name: 'Cursor', description: 'Clicks automatically.', baseCost: 15, costMultiplier: 1.15, baseCps: 0.1, count: 0 },
        { id: 'grandma', name: 'Grandma', description: 'Bakes slightly faster.', baseCost: 100, costMultiplier: 1.15, baseCps: 1, count: 0, contrast: 1.0 },
        { id: 'farm', name: 'Farm', description: 'Grows cookie plants.', baseCost: 1100, costMultiplier: 1.15, baseCps: 8, count: 0 },
        { id: 'mine', name: 'Mine', description: 'Digs for rare sugar and minerals.', baseCost: 5000, costMultiplier: 1.15, baseCps: 15, count: 0 },
        { id: 'factory', name: 'Factory', description: 'Produces cookies using raw ingredients.', baseCost: 12000, costMultiplier: 1.15, baseCps: 40, count: 0 },
        { id: 'bank', name: 'Bank', description: 'Stores wealth and increases passive income.', baseCost: 25000, costMultiplier: 1.15, baseCps: 100, count: 0 },
        { id: 'temple', name: 'Temple', description: 'Harness ancient cookie wisdom.', baseCost: 100000, costMultiplier: 1.15, baseCps: 300, count: 0 },
        { id: 'wizard', name: 'wizard', description: 'Conjures cookies from thin air.', baseCost: 500000, costMultiplier: 1.15, baseCps: 1200, count: 0 },
        { id: 'fandom_ship', name: 'Fandom Ship', description: 'Sails on collective devotion and synergy.', baseCost: 750000, costMultiplier: 1.15, baseCps: 3000, count: 0 },
        { id: 'infinite_craft', name: 'Infinite Craft', description: 'Endless crafting power — massively increases CPS.', baseCost: 2500000, costMultiplier: 1.15, baseCps: 15000, count: 0 },
        { id: 'portal', name: 'Portal', description: 'A shimmering gateway that alters reality (and your background).', baseCost: 8000000, costMultiplier: 1.15, baseCps: 50000, count: 0 }
    ]
};

const DURATION_MS = 1000 / 30; // 30 FPS update rate for visual/minor calculations
const TICK_RATE_MS = 1000; // 1 second base unit for CPS

// --- Language / i18n support ---
const LANG_STORAGE_KEY = 'cookie_bakery_lang_v1';
const SUPPORTED_LANGS = ['en','es','fr','de','zh','jp','gl'];
// Minimal translation map (keys used across the UI)
const TRANSLATIONS = {
    en: {
        titleDefault: "Cookie Bakery",
        upgradesTitle: "Upgrades",
        saveFile: "Save to File",
        loadFile: "Load from File",
        console: "Console",
        changeLang: "Change Language",
        reset: "Reset",
        renameHeading: "Rename Your Bakery",
        renamePlaceholder: "Enter new name...",
        confirm: "Confirm",
        random: "Random",
        cancel: "Cancel",
        consoleHeading: "Console",
        consoleRun: "Run",
        consoleCancel: "Cancel",
        resetHeading: "Reset Game",
        resetConfirm: "Yes, Reset",
        resetCancel: "Cancel",
        skip: "Skip"
    },
    es: {
        titleDefault: "Panadería de Galletas",
        upgradesTitle: "Mejoras",
        saveFile: "Guardar archivo",
        loadFile: "Cargar archivo",
        console: "Consola",
        changeLang: "Cambiar idioma",
        reset: "Reiniciar",
        renameHeading: "Renombra tu Panadería",
        renamePlaceholder: "Introduce un nuevo nombre...",
        confirm: "Confirmar",
        random: "Aleatorio",
        cancel: "Cancelar",
        consoleHeading: "Consola",
        consoleRun: "Ejecutar",
        consoleCancel: "Cancelar",
        resetHeading: "Reiniciar Juego",
        resetConfirm: "Sí, Reiniciar",
        resetCancel: "Cancelar",
        skip: "Omitir"
    },
    fr: {
        titleDefault: "Boulangerie de Cookies",
        upgradesTitle: "Améliorations",
        saveFile: "Enregistrer",
        loadFile: "Charger",
        console: "Console",
        changeLang: "Changer de langue",
        reset: "Réinitialiser",
        renameHeading: "Renommez votre Boulangerie",
        renamePlaceholder: "Entrez un nouveau nom...",
        confirm: "Confirmer",
        random: "Aléatoire",
        cancel: "Annuler",
        consoleHeading: "Console",
        consoleRun: "Exécuter",
        consoleCancel: "Annuler",
        resetHeading: "Réinitialiser le Jeu",
        resetConfirm: "Oui, Réinitialiser",
        resetCancel: "Annuler",
        skip: "Passer"
    },
    de: {
        titleDefault: "Keks-Bäckerei",
        upgradesTitle: "Upgrades",
        saveFile: "Speichern",
        loadFile: "Laden",
        console: "Konsole",
        changeLang: "Sprache ändern",
        reset: "Zurücksetzen",
        renameHeading: "Benennen Sie Ihre Bäckerei um",
        renamePlaceholder: "Geben Sie einen neuen Namen ein...",
        confirm: "Bestätigen",
        random: "Zufällig",
        cancel: "Abbrechen",
        consoleHeading: "Konsole",
        consoleRun: "Ausführen",
        consoleCancel: "Abbrechen",
        resetHeading: "Spiel zurücksetzen",
        resetConfirm: "Ja, zurücksetzen",
        resetCancel: "Abbrechen",
        skip: "Überspringen"
    },
    zh: {
        titleDefault: "曲奇面包房",
        upgradesTitle: "升级",
        saveFile: "保存文件",
        loadFile: "加载文件",
        console: "控制台",
        changeLang: "更改语言",
        reset: "重置",
        renameHeading: "重命名你的面包房",
        renamePlaceholder: "输入新名称...",
        confirm: "确认",
        random: "随机",
        cancel: "取消",
        consoleHeading: "控制台",
        consoleRun: "运行",
        consoleCancel: "取消",
        resetHeading: "重置游戏",
        resetConfirm: "是，重置",
        resetCancel: "取消",
        skip: "跳过"
    },
    jp: {
        titleDefault: "クッキーベーカリー",
        upgradesTitle: "アップグレード",
        saveFile: "ファイル保存",
        loadFile: "ファイル読み込み",
        console: "コンソール",
        changeLang: "言語を変更",
        reset: "リセット",
        renameHeading: "ベーカリーの名前を変更",
        renamePlaceholder: "新しい名前を入力...",
        confirm: "確認",
        random: "ランダム",
        cancel: "キャンセル",
        consoleHeading: "コンソール",
        consoleRun: "実行",
        consoleCancel: "キャンセル",
        resetHeading: "ゲームをリセット",
        resetConfirm: "はい、リセット",
        resetCancel: "キャンセル",
        skip: "スキップ"
    },
    gl: {
        titleDefault: "World Bakery",
        upgradesTitle: "Upgrades",
        saveFile: "Save to File",
        loadFile: "Load from File",
        console: "Console",
        changeLang: "Change Language",
        reset: "Reset",
        renameHeading: "Rename Your Bakery",
        renamePlaceholder: "Enter new name...",
        confirm: "Confirm",
        random: "Random",
        cancel: "Cancel",
        consoleHeading: "Console",
        consoleRun: "Run",
        consoleCancel: "Cancel",
        resetHeading: "Reset Game",
        resetConfirm: "Yes, Reset",
        resetCancel: "Cancel",
        skip: "Skip"
    }
};

/**
 * Get current language (from localStorage) or null if not set.
 */
function getSavedLang() {
    try {
        const v = localStorage.getItem(LANG_STORAGE_KEY);
        if (v && SUPPORTED_LANGS.includes(v)) return v;
    } catch (e) {}
    return null;
}

/**
 * Save language code to localStorage.
 */
function saveLang(lang) {
    try {
        if (SUPPORTED_LANGS.includes(lang)) {
            localStorage.setItem(LANG_STORAGE_KEY, lang);
        }
    } catch (e) {}
}

/**
 * Apply translations for the chosen language to UI text nodes.
 */
function applyLanguage(lang) {
    const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];
    // Title
    const currentTitle = titleText.textContent || '';
    // If title is default, replace with localized default; otherwise keep user's custom title
    if (!currentTitle || currentTitle === TRANSLATIONS['en'].titleDefault || currentTitle === 'Cookie Bakery') {
        titleText.textContent = t.titleDefault;
    }
    // Buttons and static labels
    document.querySelector('#upgrade-panel h2').textContent = t.upgradesTitle;
    document.getElementById('save-file-btn').textContent = t.saveFile;
    document.getElementById('load-file-btn').textContent = t.loadFile;
    document.getElementById('consle-btn').textContent = t.console;
    document.getElementById('reset-btn').textContent = t.reset;

    // Rename modal
    document.querySelector('#name-modal .modal-content h3').textContent = t.renameHeading;
    document.getElementById('new-bakery-name').placeholder = t.renamePlaceholder;
    document.getElementById('save-name-btn').textContent = t.confirm;
    document.getElementById('random-name-btn').textContent = t.random;
    document.getElementById('cancel-name-btn').textContent = t.cancel;

    // Console modal
    document.querySelector('#console-modal .modal-content h3').textContent = t.consoleHeading;
    document.getElementById('console-run-btn').textContent = t.consoleRun;
    document.getElementById('console-cancel-btn').textContent = t.consoleCancel;

    // Prompt modal title remains dynamic
    document.querySelector('#reset-modal .modal-content h3').textContent = t.resetHeading;
    document.getElementById('confirm-reset-btn').textContent = t.resetConfirm;
    document.getElementById('cancel-reset-btn').textContent = t.resetCancel;

    // Lang modal skip button
    const skipBtn = document.getElementById('lang-skip-btn');
    if (skipBtn) skipBtn.textContent = t.skip;
    // Update Change Language button text if present
    const changeLangBtn = document.getElementById('change-lang-btn');
    if (changeLangBtn) changeLangBtn.textContent = t.changeLang || 'Change Language';
}

// --- Persistence keys & autosave interval ---
const STORAGE_KEY = 'cookie_bakery_state_v1';
const AUTOSAVE_MS = 5000; // save every 5 seconds

 // DOM Elements
 const cookieButton = document.getElementById('cookie-button');
 const cookieCountDisplay = document.getElementById('cookie-count');
 const cpsDisplay = document.getElementById('cps-display');
 const upgradeListElement = document.getElementById('upgrade-list');
 const clickerArea = document.getElementById('clicker-area');
 // background audio element (hidden in DOM)
 const bgAudio = document.getElementById('bg-audio');

 // audio playback guard so we only try to resume/play once via user gesture
 let audioStarted = false;

 /**
  * Ensure background audio plays. Called on first user interaction; also attempted on init.
  * Respects browser autoplay policies by calling play() only after a user gesture if required.
  */
 function ensureAudioPlays() {
     if (audioStarted || !bgAudio) return;
     // try to set a reasonable volume
     try {
         bgAudio.volume = 0.18;
     } catch (e) {
         // ignore if setting volume isn't allowed
     }
     // Attempt to play; if blocked, will succeed later when triggered by a user gesture.
     const playPromise = bgAudio.play();
     if (playPromise && typeof playPromise.then === 'function') {
         playPromise.then(() => {
             audioStarted = true;
         }).catch(() => {
             // Playback blocked; will try again on explicit interactions
         });
     } else {
         // legacy browsers
         audioStarted = true;
     }
 }

 // Simple click sound: use bundled clickb5.mp3 for consistent playback
 // Keep a reusable Audio instance to avoid reloading on every click.
 let audioCtx = null; // retained (not required) to avoid changing other code references

 function playClickSound() {
     try {
         // Create a singleton Audio object on first use
         if (!window._clickAudio) {
             const a = new Audio('clickb5 (1).mp3');
             a.preload = 'auto';
             a.volume = 0.55; // comfortable default
             // small playback tweak: allow overlapping by cloning when needed
             window._clickAudio = a;
         }

         // Play by cloning the source so repeated quick clicks can overlap cleanly
         const original = window._clickAudio;
         const clone = original.cloneNode();
         // Start immediately; handle promise rejection silently (autoplay policies)
         const p = clone.play();
         if (p && typeof p.then === 'function') {
             p.catch(() => {
                 // ignore play errors (e.g., autoplay restrictions)
             });
         }
     } catch (e) {
         // swallow errors so clicking never throws
     }
 }

// New DOM Elements for Renaming
const titleStrip = document.getElementById('title-strip');
const titleText = document.getElementById('title-text');
const nameModal = document.getElementById('name-modal');
const newBakeryNameInput = document.getElementById('new-bakery-name');
const saveNameBtn = document.getElementById('save-name-btn');
const cancelNameBtn = document.getElementById('cancel-name-btn');
const randomNameBtn = document.getElementById('random-name-btn'); // New button

// (News strip removed)
// News rotation data & state
// const newsStrip = document.getElementById('news-strip');
// const NEWS_ITEMS = [
//     "New: Grandma teaches a baking class today!",
//     "Sale: 2-for-1 on cookies for the next hour!",
//     "Update: Factory now produces 10% faster!",
//     "Tip: Click the cookie for bonus sparks!",
//     "Event: Harvest festival — farms produce double!",
//     "Secret: Try renaming your bakery for a surprise."
// ];
// let newsIndex = 0;
// let newsIntervalId = null;
// const NEWS_ROTATE_MS = 10000; // 10 seconds

// /**
//  * Show current news item in the strip.
//  * If forceAdvance is true, moves to the next item before showing.
//  */
// function showNews(forceAdvance = false) {
//     if (!newsStrip) return;
//     if (forceAdvance) newsIndex = (newsIndex + 1) % NEWS_ITEMS.length;
//     newsStrip.textContent = NEWS_ITEMS[newsIndex];
//     // Reset font-size then adjust to ensure it fits within its container
//     newsStrip.style.fontSize = ''; // clear inline sizing to let adjust function start from stylesheet size
//     adjustNewsFont();
// }

// /**
//  * Adjust the font-size of the news strip so the text fits within its container.
//  * This reduces font-size iteratively until the scroll width no longer overflows,
//  * but never goes below a minimum size to remain readable.
//  */
// function adjustNewsFont() {
//     if (!newsStrip) return;
//     const container = newsStrip;
//     const style = window.getComputedStyle(container);
//     // Start from a large size based on container height to give room to scale down
//     const containerHeight = container.clientHeight || parseFloat(style.getPropertyValue('font-size')) * 1.2;
//     // We'll use px units for precise control
//     let fontSize = Math.min(containerHeight * 1.1, 72); // start size (cap at 72px)
//     const minSize = 12; // don't go below 12px
//     container.style.whiteSpace = 'nowrap'; // prefer one-line news for clarity
//     container.style.fontSize = fontSize + 'px';

//     // If it overflows horizontally, reduce until it fits or minSize reached
//     // Allow a few iterations (should be fast)
//     let iterations = 0;
//     while (container.scrollWidth > container.clientWidth && fontSize > minSize && iterations < 20) {
//         fontSize = Math.max(minSize, fontSize - 2); // decrement in 2px steps for speed and stability
//         container.style.fontSize = fontSize + 'px';
//         iterations += 1;
//     }

//     // If still overflowing, allow wrapping as fallback and slightly increase line-height
//     if (container.scrollWidth > container.clientWidth) {
//         container.style.whiteSpace = 'normal';
//         container.style.lineHeight = '1.0';
//     }
// }

// /**
//  * Start automatic news rotation.
//  */
// function startNewsRotation() {
//     if (!newsStrip) return;
//     showNews(false);
//     if (newsIntervalId) clearInterval(newsIntervalId);
//     newsIntervalId = setInterval(() => {
//         newsIndex = (newsIndex + 1) % NEWS_ITEMS.length;
//         showNews(false);
//     }, NEWS_ROTATE_MS);
// }

// /**
//  * Stop automatic news rotation.
//  */
// function stopNewsRotation() {
//     if (newsIntervalId) {
//         clearInterval(newsIntervalId);
//         newsIntervalId = null;
//     }
// }

 // New file control elements
const saveFileBtn = document.getElementById('save-file-btn');
const loadFileBtn = document.getElementById('load-file-btn');
const loadFileInput = document.getElementById('load-file-input');
const consleBtn = document.getElementById('consle-btn');
const resetBtn = document.getElementById('reset-btn');
const supportBtn = document.getElementById('support-btn');

// Console modal elements
const consoleModal = document.getElementById('console-modal');
const consoleInput = document.getElementById('console-input');
const consoleRunBtn = document.getElementById('console-run-btn');
const consoleCancelBtn = document.getElementById('console-cancel-btn');

// Prompt modal elements (opened by prompt:<title>)
const promptModal = document.getElementById('prompt-modal');
const promptTitle = document.getElementById('prompt-title');
const promptTextarea = document.getElementById('prompt-textarea');
const promptOkBtn = document.getElementById('prompt-ok-btn');
const promptCancelBtn = document.getElementById('prompt-cancel-btn');

// Reset modal elements
const resetModal = document.getElementById('reset-modal');
const confirmResetBtn = document.getElementById('confirm-reset-btn');
const cancelResetBtn = document.getElementById('cancel-reset-btn');

// New lists for random name generation
const ADJECTIVES = [
    "Sweet", "Fluffy", "Crispy", "Golden", "Chocolatey", "Sugar", "Warm", 
    "Delightful", "Heavenly", "Perfect", "Cozy", "Tiny", "Mighty", "Grand"
];
const NOUNS = [
    "Oven", "Whisk", "Dough", "Sprinkle", "Crumb", "Batch", "Treat", 
    "Spoon", "Mixer", "Muffin", "Cake", "Loaf", "Pantry", "Jar",
    "Bear", "Cat", "Dog", "Fox", "Panda", "Squirrel", "Bee", "Elephant"
];

// New DOM ref for modal content
const modalContent = document.querySelector('.modal-content');

// Utility for formatting numbers
const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
});

/**
 * Calculates the cost for the next upgrade purchase.
 * Cost = baseCost * (multiplier ^ currentCount)
 */
function calculateCost(upgrade) {
    // Compute raw cost
    let raw = upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.count);
    // Guard against overflow/Infinity/NaN by clamping to a very large finite value.
    // This ensures cost remains a usable number so upgrades never become "infinite".
    if (!Number.isFinite(raw) || isNaN(raw)) {
        raw = 1e15; // large practical cap
    } else {
        // Also clamp to a max sensible cap to avoid runaway exponential
        raw = Math.min(raw, 1e15);
    }
    return Math.ceil(raw);
}

/**
 * Updates the CPS based on all purchased upgrades.
 */
function calculateCPS() {
    let totalCps = 0;
    GAME_STATE.upgrades.forEach(upgrade => {
        totalCps += upgrade.baseCps * upgrade.count;
    });
    GAME_STATE.cps = totalCps;
}

/**
 * Renders the current game state to the UI.
 */
function updateUI() {
    // Ensure cookies never display below zero (treat non-finite as 0)
    if (!Number.isFinite(GAME_STATE.cookies) || GAME_STATE.cookies < 0) {
        GAME_STATE.cookies = 0;
    }

    // Only display whole cookies in the count, but keep floating point internally for accuracy
    cookieCountDisplay.textContent = `${formatter.format(Math.floor(GAME_STATE.cookies))} Cookies`;
    
    // Display CPS formatted
    const formattedCps = formatter.format(GAME_STATE.cps);
    cpsDisplay.textContent = `per second ${formattedCps}`;

    // Update upgrade list affordability
    GAME_STATE.upgrades.forEach(upgrade => {
        const cost = calculateCost(upgrade);
        const itemElement = document.getElementById(`upgrade-item-${upgrade.id}`);
        
        // Ensure element exists before querying children
        if (itemElement) {
            const button = itemElement.querySelector('.upgrade-button');
            const costDisplay = itemElement.querySelector('.upgrade-cost');
            const countDisplay = itemElement.querySelector('.upgrade-count');
            
            costDisplay.textContent = `Cost: ${formatter.format(cost)} Cookies`;
            countDisplay.textContent = `(Owned: ${upgrade.count})`;
            
            // Treat non-finite cookie counts as 0 for affordability checks (clicks can recover NaN)
            const currentCookies = Number.isFinite(GAME_STATE.cookies) ? GAME_STATE.cookies : 0;
            // Ensure cost is finite (calculateCost already clamps) but double-check
            const safeCost = Number.isFinite(cost) ? cost : 1e15;
            const canAfford = currentCookies >= safeCost;
            button.disabled = !canAfford;
            itemElement.classList.toggle('disabled', !canAfford);
        }
    });

    // If the player owns the portal upgrade, switch the page background to the provided GIF and swap the cookie image; otherwise revert both
    try {
        const portal = GAME_STATE.upgrades.find(u => u.id === 'portal');
        const cookieImg = document.querySelector('#cookie-button img');
        if (portal && portal.count > 0) {
            // Use the animated GIF as the page background and make it cover the viewport
            document.body.style.backgroundImage = 'url("/841666uly00b1.gif")';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundPosition = 'center center';
            // Swap the main cookie image to the PerfectCookie asset if available
            if (cookieImg) cookieImg.src = '/PerfectCookie.png';
        } else {
            // Revert to the original tiled blue pleated paper background
            document.body.style.backgroundImage = 'url("/bgBlue.jpg")';
            document.body.style.backgroundSize = '240px 240px';
            document.body.style.backgroundRepeat = 'repeat';
            document.body.style.backgroundPosition = 'center';
            // Revert cookie image to default
            if (cookieImg) cookieImg.src = 'cookie.png';
        }
    } catch (e) {
        // swallow background/errors to avoid breaking UI updates
    }
}

/**
 * Creates and displays visual feedback for clicks.
 */
function showClickFeedback(amount, event) {
    const feedback = document.createElement('div');
    feedback.className = 'click-feedback';
    feedback.textContent = `+${formatter.format(amount)}`;
    
    let clientX, clientY;
    
    if (event.touches && event.touches.length > 0) {
        // Mobile touch
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else {
        // Desktop click or mouse down
        const rect = cookieButton.getBoundingClientRect();
        // Position slightly above the cookie center
        clientX = rect.left + rect.width / 2;
        clientY = rect.top + rect.height / 2 - 20; 
    }
    
    // Adjust position to center the text label itself
    feedback.style.left = `${clientX}px`;
    feedback.style.top = `${clientY}px`;
    
    document.body.appendChild(feedback);

    setTimeout(() => {
        feedback.remove();
    }, 1000);
}

/**
 * Handles setting the bakery name and closing the modal.
 * @param {string} baseName The name input by the user or generated randomly.
 */
function setBakeryName(baseName) {
    if (baseName.length > 0) {
        // Append "'s Bakery"
        titleText.textContent = `${baseName}'s Bakery`;
    } else {
        // Fallback or maintain default if input is empty
        titleText.textContent = "Cookie Bakery";
    }
    closeRenameModal();
    saveState(); // persist name change immediately
}

/**
 * Handles renaming the bakery (Manual input).
 */
function saveNewName() {
    let name = newBakeryNameInput.value.trim();
    setBakeryName(name);
}

/**
 * Generates a random bakery name (Adjective Noun) and applies it.
 */
function generateRandomName() {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const nn = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    setBakeryName(`${adj} ${nn}`);
}

function openRenameModal() {
    // Set current name in input, removing the "'s Bakery" suffix if present
    let currentName = titleText.textContent;
    if (currentName.endsWith("'s Bakery")) {
        currentName = currentName.substring(0, currentName.length - "'s Bakery".length);
    } else if (currentName === "Cookie Bakery") {
        currentName = ""; // Clear placeholder if it's the default
    }
    newBakeryNameInput.value = currentName;

    // Ensure modal content uses default style (in case it was changed earlier)
    if (modalContent) modalContent.style.backgroundColor = ''; // reset to CSS default

    nameModal.classList.add('visible');
    newBakeryNameInput.focus();
}

function closeRenameModal() {
    nameModal.classList.remove('visible');
    // Restore modal content background to default (CSS black) when closing
    if (modalContent) modalContent.style.backgroundColor = '';
}


/**
 * Handles cookie clicking.
 */
function clickCookie(event) {
    // Attempt to start background audio on first meaningful interaction
    ensureAudioPlays();
    // play a short click sound (uses Web Audio API and is safe if audio is suspended/blocked)
    playClickSound();

    // Inner bounce: add class to image to play quick animation
    try {
        const img = cookieButton.querySelector('img');
        if (img) {
            // Remove if already present so re-adding restarts animation
            img.classList.remove('inner-bounce');
            // Force reflow to ensure the class restart is recognized by the browser
            void img.offsetWidth;
            img.classList.add('inner-bounce');
            // Clean up after animation completes as a fallback timeout
            const cleanup = () => {
                img.classList.remove('inner-bounce');
                img.removeEventListener('animationend', cleanup);
            };
            img.addEventListener('animationend', cleanup);
            // Failsafe removal in case animationend doesn't fire
            setTimeout(cleanup, 300);
        }
    } catch (e) {
        // no-op if anything goes wrong
    }

    // Prevent multiple clicks from touchstart/mousedown if both fire
    if (event.detail === 0 && event.type === 'click') return; 

    // If cookies is NaN or non-finite, treat it as 0 so clicks can recover the counter
    const current = Number.isFinite(GAME_STATE.cookies) ? GAME_STATE.cookies : 0;
    GAME_STATE.cookies = current + GAME_STATE.clickPower;
    
    // Award "um, yah" achievement on first meaningful interaction (idempotent)
    try {
        awardAchievement('um_yah');
    } catch (e) {
        // ignore if something goes wrong awarding achievement
    }

    // Visual feedback
    showClickFeedback(GAME_STATE.clickPower, event);

    updateUI();
    saveState(); // save after manual clicks to keep progress
}

/**
 * Handles buying an upgrade.
 */
function buyUpgrade(upgradeId) {
    const upgrade = GAME_STATE.upgrades.find(u => u.id === upgradeId);
    if (!upgrade) return;

    const cost = calculateCost(upgrade);

    if (GAME_STATE.cookies >= cost) {
        GAME_STATE.cookies -= cost;
        upgrade.count += 1;
        
        // Recalculate CPS (this will be reflected in gameLoop/updateUI)
        calculateCPS();
        
        // Update UI immediately
        updateUI();

        saveState(); // persist purchase
    }
}

/**
 * Initializes the upgrade list DOM elements.
 */
function initializeUpgrades() {
    // ensure each upgrade has an image path so it's easy to swap files later
    const defaultImages = {
        gambling: 'Gamblecore.png',
        cursor: 'cursor.png',
        grandma: 'grandma.png',
        farm: 'farm.png',
        mine: 'mine.png',
        factory: 'factory.png',
        bank: 'bank.png',
        temple: 'mlon.png',
        wizard: 'yes-yes-chad.gif',
        infinite_craft: '/hq720.jpg',
        fandom_ship: '/9de30632abc549025aa33384d466b126.jpg',
        portal: '/Nether_portal_ 28animated 29.png'
    };

    GAME_STATE.upgrades.forEach(upgrade => {
        const cost = calculateCost(upgrade);
        
        const item = document.createElement('div');
        item.className = 'upgrade-item';
        item.id = `upgrade-item-${upgrade.id}`;

        // Determine image source (fallback to cookie if missing)
        const imgSrc = upgrade.image || defaultImages[upgrade.id] || 'cookie.png';
        
        item.innerHTML = `
            <div class="upgrade-info">
                <img class="upgrade-icon" src="${imgSrc}" alt="${upgrade.name} icon" />
                <div class="upgrade-name">${upgrade.name} <span class="upgrade-count">(Owned: 0)</span></div>
                <div class="upgrade-cost">Cost: ${formatter.format(cost)} Cookies</div>
                <div class="upgrade-stats">+${formatter.format(upgrade.baseCps)} CPS</div>
            </div>
            <button class="upgrade-button" data-id="${upgrade.id}">Buy</button>
        `;

        const button = item.querySelector('.upgrade-button');

        // Special handler for gambling: trigger spinner instead of normal purchase
        if (upgrade.id === 'gambling') {
            button.textContent = 'Gamble';
            button.addEventListener('click', () => {
                // Require at least 1,000,000 cookies to gamble
                const currentCookies = Number.isFinite(GAME_STATE.cookies) ? GAME_STATE.cookies : 0;
                if (currentCookies < 1000000) {
                    showWarning('You need at least 1,000,000 cookies to gamble.');
                    return;
                }
                // Spend all cookies up front
                const stake = Math.floor(currentCookies);
                GAME_STATE.cookies = 0;
                updateUI();
                saveState();
                openGambleModal(stake);
            });
        } else {
            button.addEventListener('click', () => buyUpgrade(upgrade.id));
        }
        
        // If this upgrade has an adjustable image property (like grandma contrast), initialize it
        const imgEl = item.querySelector('.upgrade-icon');
        if (imgEl) {
            // ensure contrast exists and apply it (we only adjust contrast for visuals)
            if (typeof upgrade.contrast !== 'number' || !Number.isFinite(upgrade.contrast)) {
                upgrade.contrast = 1.0;
            }
            const c = Math.max(0.1, Math.min(2, upgrade.contrast));
            imgEl.style.filter = `contrast(${c})`;

            // Special interaction: clicking grandma image reduces brightness each click and increases contrast
            if (upgrade.id === 'grandma') {
                imgEl.style.cursor = 'pointer';
                imgEl.addEventListener('click', (e) => {
                    // Increase contrast by 10% per click up to a cap (2.0)
                    const deltaContrast = 0.10;
                    const maxContrast = 2.0;
                    if (typeof upgrade.contrast !== 'number' || !Number.isFinite(upgrade.contrast)) {
                        upgrade.contrast = 1.0;
                    }
                    upgrade.contrast = Math.min(maxContrast, +(upgrade.contrast + deltaContrast).toFixed(2));

                    // Apply contrast filter only
                    imgEl.style.filter = `contrast(${upgrade.contrast})`;

                    // Persist the changed value so it survives reload/file save
                    saveState();
                    // Prevent the click from bubbling and triggering purchase
                    e.stopPropagation();
                });
            }

            // If this is the portal icon, make it clearly animated/cursor pointer
            if (upgrade.id === 'portal') {
                imgEl.style.cursor = 'pointer';
                // ensure animated images don't get filtered out by accidental CSS; no further handler needed
            }
        }
        
        upgradeListElement.appendChild(item);
    });
}

/* ---------------- Achievements ---------------- */

// Define achievements
const ACHIEVEMENTS = [
    {
        id: 'timed',
        title: 'Timed',
        description: 'Played for 15 minutes',
        image: 'timed.png',
        earned: false
    },
    {
        id: 'thousand',
        title: 'Invested!',
        description: 'Reach 1,000 cookies',
        image: 'invested.png',
        earned: false
    },
    {
        id: 'um_yah',
        title: 'um, yah',
        description: 'Just playing the game',
        image: 'umyah.png',
        earned: true
    },
    {
        id: 'taco_tuesday',
        title: 'Taco Tuesday',
        description: "Played the game on a Tuesday",
        image: 'taco.png',
        earned: false
    },
    {
        id: 'mlon_eusk',
        title: 'Mlon Eusk',
        description: 'Reach 100,000 cookies',
        image: '/1635154770553.jpeg',
        earned: false
    },
    {
        id: 'beff_jezos',
        title: 'Beff Jezos',
        description: 'Reach 1,000,000 cookies',
        image: '/images (4).jpeg',
        earned: false
    }
];

/**
 * Create achievements UI list (populates achievements-panel)
 */
function initializeAchievementsUI() {
    const achievementsList = document.getElementById('achievements-list');
    if (!achievementsList) return;
    achievementsList.innerHTML = '';
    ACHIEVEMENTS.forEach(a => {
        const el = document.createElement('div');
        el.className = 'achievement-item';
        el.id = `achievement-${a.id}`;
        el.innerHTML = `
            <img src="${a.image}" alt="${a.title}">
            <div style="display:flex;flex-direction:column;">
                <div style="font-weight:800;">${a.title}</div>
                <div style="font-size:0.9rem;color:#c7fff0;">${a.description}</div>
            </div>
            <div style="margin-left:auto;font-weight:800;color:${a.earned ? '#cbe9e1' : '#666'}">${a.earned ? 'Unlocked' : 'Locked'}</div>
        `;
        achievementsList.appendChild(el);
    });
}

/**
 * Award an achievement by id (idempotent)
 */
function awardAchievement(id) {
    const ach = ACHIEVEMENTS.find(x => x.id === id);
    if (!ach || ach.earned) return;
    ach.earned = true;
    // Update achievements UI
    const item = document.getElementById(`achievement-${id}`);
    if (item) {
        const status = item.querySelector('div[style*="margin-left:auto"]') || item.lastElementChild;
        if (status) status.textContent = 'Unlocked';
        status.style.color = '#cbe9e1';
    }
    // Show toast
    showAchievementToast(ach);
    // Persist achievements to saved state (ensure they are always saved when earned)
    try {
        saveState();
    } catch (e) {
        // fallback: save minimal achievements map directly
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
            saved.achievements = saved.achievements || {};
            saved.achievements[id] = true;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
        } catch (err) { /* ignore */ }
    }
}

/**
 * Show a teal toast in bottom-right with image, title, description, close button.
 * Auto-hide after 10 seconds.
 */
function showAchievementToast(ach) {
    const container = document.getElementById('achievement-toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.setAttribute('role','status');
    toast.innerHTML = `
        <img src="${ach.image}" alt="${ach.title}">
        <div class="toast-body">
            <div class="toast-title">${ach.title}</div>
            <div class="toast-desc">${ach.description}</div>
        </div>
        <button class="toast-close" title="Close">✕</button>
    `;
    // allow interaction with close button
    toast.style.pointerEvents = 'auto';
    container.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close');
    let removed = false;
    function removeToast() {
        if (removed) return;
        removed = true;
        toast.remove();
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeToast();
        });
    }

    // Auto-hide after 10 seconds
    setTimeout(() => {
        removeToast();
    }, 10000);
}

/* --- Game Loop --- */
let lastTickTime = performance.now();

function gameLoop() {
    const now = performance.now();
    const deltaTime = now - lastTickTime;

    // Apply CPS incrementally based on deltaTime (fraction of a second)
    if (GAME_STATE.cps > 0) {
        const cookiesGained = GAME_STATE.cps * (deltaTime / TICK_RATE_MS);
        GAME_STATE.cookies += cookiesGained;
    }

    updateUI();

    // Achievement checks: award milestones when cookies reach thresholds
    try {
        const current = Number.isFinite(GAME_STATE.cookies) ? GAME_STATE.cookies : 0;

        // 1k achievement
        const ach1k = ACHIEVEMENTS.find(a => a.id === 'thousand');
        if (ach1k && !ach1k.earned && current >= 1000) {
            awardAchievement('thousand');
        }

        // Mlon Eusk: 100k achievement
        const achMlon = ACHIEVEMENTS.find(a => a.id === 'mlon_eusk');
        if (achMlon && !achMlon.earned && current >= 100000) {
            awardAchievement('mlon_eusk');
        }

        // Beff Jezos: 1,000,000 achievement (clone of Mlon Eusk)
        const achBeff = ACHIEVEMENTS.find(a => a.id === 'beff_jezos');
        if (achBeff && !achBeff.earned && current >= 1000000) {
            awardAchievement('beff_jezos');
        }
    } catch (e) {
        // swallow any errors here so main loop stays stable
    }

    lastTickTime = now;
    requestAnimationFrame(gameLoop);
}

/**
 * Save the minimal GAME_STATE to localStorage.
 */
function saveState() {
    try {
        const toSave = {
            cookies: GAME_STATE.cookies,
            clickPower: GAME_STATE.clickPower,
            upgrades: GAME_STATE.upgrades.map(u => {
                // Persist contrast property if present
                const base = { id: u.id, count: u.count };
                if (typeof u.contrast === 'number') base.contrast = u.contrast;
                return base;
            }),
            title: titleText.textContent,
            // persist achievements as a map of id => boolean
            achievements: ACHIEVEMENTS.reduce((acc, a) => {
                acc[a.id] = !!a.earned;
                return acc;
            }, {})
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
        // console.log('Game saved');
    } catch (e) {
        console.warn('Save failed', e);
    }
}

/**
 * Export current minimal state to a downloadable JSON file.
 * A short editable comment is prepended to the file for easy manual edits.
 *
 * NOTE: Achievements are intentionally excluded from the exported file.
 */
function saveToFile() {
    try {
        const toSave = {
            cookies: GAME_STATE.cookies,
            clickPower: GAME_STATE.clickPower,
            upgrades: GAME_STATE.upgrades.map(u => ({ id: u.id, count: u.count })),
            title: titleText.textContent
            // achievements intentionally omitted from export
        };
        // Prepend the user's requested comment at the top of the exported file.
        const comment = "// hey hi um, i made this and yes this is really easy to edit so ur welcome\n";
        const blob = new Blob([comment + JSON.stringify(toSave, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const safeName = (titleText.textContent || 'cookie_bakery').replace(/[^a-z0-9_\-]/gi, '_');
        a.download = `${safeName}_save.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    } catch (e) {
        console.warn('Export failed', e);
    }
}

/**
 * Reset the game state and clear persisted saves.
 */
/**
 * Perform reset actions (no confirmation here) — called after user confirms.
 */
function resetGame() {
    // Reset in-memory state
    GAME_STATE.cookies = 0;
    GAME_STATE.clickPower = 1;
    GAME_STATE.upgrades.forEach(u => u.count = 0);
    calculateCPS();

    // Clear achievements in-memory and from saved state
    ACHIEVEMENTS.forEach(a => a.earned = false);

    // Clear stored state
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.warn('Failed to remove save from localStorage', e);
    }

    // Update achievements UI and main UI immediately
    initializeAchievementsUI();
    updateUI();

    // Persist cleared state so reset removes achievements from storage
    try { saveState(); } catch (e) { /* ignore */ }

    // NOTE: do not open the rename modal after reset.
    // The previous code applied the upgrade-panel background to the modal content
    // and then opened the rename modal; those lines were removed so reset is silent.
}

/* Reset modal controls */
function openResetModal() {
    if (resetModal) resetModal.classList.add('visible');
}
function closeResetModal() {
    if (resetModal) resetModal.classList.remove('visible');
}

/**
 * Apply a parsed save object into GAME_STATE (merge).
 * This mirrors loadState but works from an object (e.g. loaded from file).
 */
function applyLoadedState(parsed) {
    if (!parsed || typeof parsed !== 'object') return;
    if (typeof parsed.cookies === 'number') GAME_STATE.cookies = parsed.cookies;
    if (typeof parsed.clickPower === 'number') GAME_STATE.clickPower = parsed.clickPower;
    if (Array.isArray(parsed.upgrades)) {
        parsed.upgrades.forEach(savedUp => {
            const u = GAME_STATE.upgrades.find(x => x.id === savedUp.id);
            if (u && typeof savedUp.count === 'number') u.count = savedUp.count;
            // restore contrast if present
            if (u && typeof savedUp.contrast === 'number') {
                u.contrast = savedUp.contrast;
            }
        });
    }
    if (typeof parsed.title === 'string' && parsed.title.length > 0) {
        titleText.textContent = parsed.title;
    }

    // Restore achievements if present in the loaded object
    if (parsed.achievements && typeof parsed.achievements === 'object') {
        try {
            Object.keys(parsed.achievements).forEach(id => {
                const a = ACHIEVEMENTS.find(x => x.id === id);
                if (a) a.earned = !!parsed.achievements[id];
            });
            // refresh the achievements UI to reflect loaded flags
            initializeAchievementsUI();
        } catch (e) {
            // ignore malformed achievements block
        }
    }

    calculateCPS();
    updateUI();
    saveState(); // persist into localStorage after applying
    // Reset grandma's visual properties (contrast only) on page load
    const grandmaUpgrade = GAME_STATE.upgrades.find(u => u.id === 'grandma');
    if (grandmaUpgrade) {
        grandmaUpgrade.contrast = 1.0;
    }
}

/**
 * Load saved state from localStorage and merge into GAME_STATE.
 */
function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (typeof parsed.cookies === 'number') GAME_STATE.cookies = parsed.cookies;
        if (typeof parsed.clickPower === 'number') GAME_STATE.clickPower = parsed.clickPower;
        if (Array.isArray(parsed.upgrades)) {
            parsed.upgrades.forEach(savedUp => {
                const u = GAME_STATE.upgrades.find(x => x.id === savedUp.id);
                if (u && typeof savedUp.count === 'number') u.count = savedUp.count;
                if (u && typeof savedUp.contrast === 'number') {
                    u.contrast = savedUp.contrast;
                }
            });
        }
        if (typeof parsed.title === 'string' && parsed.title.length > 0) {
            titleText.textContent = parsed.title;
        }
        calculateCPS();
    } catch (e) {
        console.warn('Load failed', e);
    }
}

/**
 * Handle a user-chosen file and load its JSON content.
 */
function handleFileLoad(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            // Some exported save files include a prepended comment line (e.g. "// ...\n"), so strip any leading
            // single-line // comments before attempting to parse JSON. This makes the loader tolerant of the
            // saveToFile format which adds an editable comment at the top.
            let text = String(e.target.result || '');
            // Remove one leading single-line comment if present (any number of leading whitespace/newlines allowed)
            text = text.replace(/^\s*\/\/.*\r?\n/, '');
            const parsed = JSON.parse(text);
            applyLoadedState(parsed);
        } catch (err) {
            console.warn('Failed to parse save file', err);
            // On invalid JSON: set cookies and cps to NaN and title to NULL, then update UI
            GAME_STATE.cookies = NaN;
            GAME_STATE.cps = NaN;
            titleText.textContent = 'NULL';
            updateUI();
            saveState(); // persist the NaN/NULL state to localStorage as requested behavior
            showWarning('Failed to load file: invalid JSON.');
        }
    };
    reader.onerror = () => {
        console.warn('File read error');
        // On read error: mirror the same visible failure state
        GAME_STATE.cookies = NaN;
        GAME_STATE.cps = NaN;
        titleText.textContent = 'NULL';
        updateUI();
        saveState();
        showWarning('Failed to read file.');
    };
    reader.readAsText(file);
}


/**
 * Show a transient red warning at the bottom of the screen.
 * message: text to display.
 *
 * Behavior:
 * - Immediately shows a red fixed banner.
 * - After 3 seconds, starts a pulsing fade by changing opacity every 100ms by 0.1 (10%).
 * - Stops when opacity reaches 0 or after 8 seconds of pulsing.
 */
function showWarning(message) {
    // Remove existing warnings first
    const existing = document.querySelector('.file-warning');
    if (existing) existing.remove();

    const el = document.createElement('div');
    el.className = 'file-warning';
    el.textContent = message;
    document.body.appendChild(el);

    // After 3 seconds start the opacity change every 100ms by 0.1 (10%)
    const delayMs = 3000;
    const stepMs = 100;
    const stepAmount = 0.15;

    // Keep full opacity until delay passes
    setTimeout(() => {
        let opacity = 1.0;
        const intervalId = setInterval(() => {
            opacity = Math.max(0, +(opacity - stepAmount).toFixed(2));
            el.style.opacity = String(opacity);
            // Stop when fully transparent
            if (opacity <= 0) {
                clearInterval(intervalId);
                el.remove();
            }
        }, stepMs);
        // Failsafe: remove after 8000ms ms pulsing in case rounding prevents exact zero
        setTimeout(() => {
            if (document.body.contains(el)) {
                el.remove();
            }
            clearInterval(intervalId);
        }, 8000);
    }, delayMs);
}

/**
 * Show a persistent white "print" message in the bottom-left as a list element that must be clicked to close.
 * Uses a <ul> with a single <li> showing the message; clicking the list removes it.
 */
function showPrint(message) {
    // Remove any existing print boxes (only one at a time)
    const existing = document.querySelector('.print-box');
    if (existing) existing.remove();

    // Create list container and item
    const ul = document.createElement('ul');
    ul.className = 'print-box';
    // make it focusable for accessibility and clickable
    ul.tabIndex = 0;

    const li = document.createElement('li');
    li.className = 'print-item';
    li.textContent = message;

    // Add a small close hint/button visually (not required but helpful)
    const closeBtn = document.createElement('button');
    closeBtn.className = 'print-close';
    closeBtn.textContent = 'Close';
    closeBtn.setAttribute('aria-label', 'Close print message');

    // Clicking either the list or the close button removes it
    function removePrint() {
        if (ul && ul.parentElement) ul.remove();
    }
    ul.addEventListener('click', removePrint);
    closeBtn.addEventListener('click', (ev) => {
        ev.stopPropagation(); // prevent double-handling
        removePrint();
    });

    ul.appendChild(li);
    li.appendChild(closeBtn); // put the button inside the li for layout

    document.body.appendChild(ul);
}

/**
 * Open the in-page console modal (not the prompt). The modal supports:
 *   ctr:<number> or cks:<number>   -> sets GAME_STATE.cookies to the provided number
 */
function openConsole() {
    if (!consoleModal) return;
    // Reset input and ensure modal visible
    consoleInput.value = '';
    consoleModal.classList.add('visible');
    consoleInput.focus();
}

function closeConsole() {
    if (!consoleModal) return;
    consoleModal.classList.remove('visible');
}

/**
 * Open the prompt modal with a custom title and empty textarea.
 * titleText: string to set as the modal title
 */
function openPromptModal(titleText) {
    if (!promptModal) return;
    // Set title from parsed command (trim and fallback)
    promptTitle.textContent = titleText && titleText.trim().length ? titleText.trim() : 'Prompt';
    promptTextarea.value = '';
    promptModal.classList.add('visible');
    promptTextarea.focus();
}

function closePromptModal() {
    if (!promptModal) return;
    promptModal.classList.remove('visible');
}

/**
 * Parse and execute a single console command string.
 */
function runConsoleCommand(raw) {
    if (!raw || typeof raw !== 'string') {
        showWarning('Console: empty command.');
        return;
    }
    const trimmed = raw.trim();
    const m = trimmed.match(/^(?:ctr|cks):\s*([+-]?\d+(\.\d+)?)/i);
    if (m) {
        const val = Number(m[1]);
        if (!Number.isNaN(val) && Number.isFinite(val)) {
            GAME_STATE.cookies = val;
            if (!Number.isFinite(GAME_STATE.cps)) {
                calculateCPS();
            }
            updateUI();
            saveState();
            closeConsole();
            return;
        }
    }

    // support cps:<number> to set CPS directly
    const m2 = trimmed.match(/^cps:\s*([+-]?\d+(\.\d+)?)/i);
    if (m2) {
        const val = Number(m2[1]);
        if (!Number.isNaN(val) && Number.isFinite(val) && val >= 0) {
            GAME_STATE.cps = val;
            if (!Number.isFinite(GAME_STATE.cookies)) {
                GAME_STATE.cookies = 0;
            }
            updateUI();
            saveState();
            closeConsole();
            return;
        } else {
            showWarning('Console: invalid CPS value.');
            return;
        }
    }

    // New: support prompt:<title> to open a prompt modal with given title
    const m3 = trimmed.match(/^prompt:\s*(.+)/i);
    if (m3) {
        const title = m3[1].trim();
        openPromptModal(title);
        // Keep console open or close it? We'll close the console modal to show the distinct prompt UI.
        closeConsole();
        return;
    }

    // New: support warning:<message> to display a red warning banner with custom text
    const m4 = trimmed.match(/^(?:warning|warn):\s*(.+)/i);
    if (m4) {
        const msg = m4[1].trim();
        if (msg.length) {
            showWarning(msg);
            closeConsole();
            return;
        } else {
            showWarning('Console: empty warning message.');
            return;
        }
    }

    // New: support print:<message> to display a white persistent bottom-left list element that must be clicked to close
    const m5 = trimmed.match(/^print:\s*(.+)/i);
    if (m5) {
        const msg = m5[1].trim();
        if (msg.length) {
            showPrint(msg);
            closeConsole();
            return;
        } else {
            showWarning('Console: empty print message.');
            return;
        }
    }

    showWarning('Console: unrecognized command or invalid number.');
}

// --- Initialization ---

function init() {
    // Add font link for Ole (used by Gambling upgrade name)
    const gf = document.createElement('link');
    gf.rel = 'stylesheet';
    gf.href = 'https://fonts.googleapis.com/css2?family=Ole&display=swap';
    document.head.appendChild(gf);

    // Gambling modal controls and spinner logic setup
    const gambleModal = document.getElementById('gamble-modal');
    const spinBtn = document.getElementById('spin-btn');
    const cancelGambleBtn = document.getElementById('cancel-gamble-btn');
    const gambleCanvas = document.getElementById('gamble-wheel');
    const gambleResult = document.getElementById('gamble-result');

    // Wheel segments (removed "LOSE EVERYTHING")
    const WHEEL_SEGMENTS = [
        { label: '+1k CPS', type: 'cps', value: 1000 },
        { label: '+100 CPS', type: 'cps', value: 100 },
        { label: '+10k CPS', type: 'cps', value: 10000 },
        { label: '+100k CPS', type: 'cps', value: 100000 },
        { label: '+1M Cookies', type: 'cookies', value: 1000000 },
        { label: 'x2 Cookies', type: 'mult', value: 2 },
        { label: 'Useless Prompt', type: 'prompt' }
    ];

    function drawWheel(rotation = 0) {
        if (!gambleCanvas) return;
        const ctx = gambleCanvas.getContext('2d');
        const w = gambleCanvas.width;
        const h = gambleCanvas.height;
        ctx.clearRect(0, 0, w, h);
        const cx = w / 2;
        const cy = h / 2;
        const r = Math.min(w, h) / 2 - 6;
        const seg = 2 * Math.PI / WHEEL_SEGMENTS.length;

        // create a rainbow color for each segment using HSL; spread hues across segments
        WHEEL_SEGMENTS.forEach((s, i) => {
            const start = rotation + i * seg;
            const end = start + seg;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, r, start, end);
            ctx.closePath();

            // compute a hue across 0..360 for rainbow effect
            const hue = Math.round((i / WHEEL_SEGMENTS.length) * 360);
            // slightly darker fill and a lighter inner rim by using two-step fill (outer then inner)
            ctx.fillStyle = `hsl(${hue}deg 85% 45%)`;
            ctx.fill();

            // subtle inner highlight
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, r * 0.92, start + 0.008, end - 0.008);
            ctx.closePath();
            ctx.fillStyle = `linear-gradient` // placeholder to keep shape; canvas gradients applied below
            ctx.restore();

            ctx.strokeStyle = 'rgba(255,255,255,0.12)';
            ctx.lineWidth = 2;
            ctx.stroke();

            // label
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate((start + end) / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#0a0a0a';
            ctx.font = 'bold 13px sans-serif';
            ctx.fillText(s.label, r - 12, 4);
            ctx.restore();
        });

        // pointer
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(cx + r + 6, cy - 12);
        ctx.lineTo(cx + r + 26, cy);
        ctx.lineTo(cx + r + 6, cy + 12);
        ctx.closePath();
        ctx.fill();
    }

    let spinning = false;
    function openGambleModal(stake) {
        if (!gambleModal) return;
        gambleResult.textContent = `Stake: ${formatter.format(stake)} cookies`;
        gambleModal.classList.add('visible');
        drawWheel(0);
        // wire spin button
        if (spinBtn) {
            spinBtn.disabled = false;
            spinBtn.onclick = () => {
                if (spinning) return;
                spinning = true;
                spinBtn.disabled = true;
                // random final index
                const finalIndex = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
                // spin physics: large rotations + target
                const rotations = 6;
                const seg = 2 * Math.PI / WHEEL_SEGMENTS.length;
                const finalAngle = (Math.PI * 1.5) - (finalIndex * seg + seg / 2); // pointer at right, so align accordingly
                const start = performance.now();
                const duration = 3600 + Math.random() * 1200; // ms
                function step(now) {
                    const t = Math.min(1, (now - start) / duration);
                    // ease out cubic
                    const eased = 1 - Math.pow(1 - t, 3);
                    const rotation = (rotations * 2 * Math.PI + finalAngle) * eased;
                    drawWheel(rotation);
                    if (t < 1) requestAnimationFrame(step);
                    else {
                        // resolved segment index
                        const segIndex = finalIndex % WHEEL_SEGMENTS.length;
                        applyGambleOutcome(WHEEL_SEGMENTS[segIndex], stake);
                        spinning = false;
                    }
                }
                requestAnimationFrame(step);
            };
        }
    }

    function closeGambleModal() {
        if (!gambleModal) return;
        gambleModal.classList.remove('visible');
        gambleResult.textContent = '';
    }

    if (cancelGambleBtn) cancelGambleBtn.addEventListener('click', () => {
        closeGambleModal();
        // Refund stake partially? keep behavior simple: nothing refunded (stake already spent)
    });

    function applyGambleOutcome(segment, stake) {
        if (!segment) return;
        const type = segment.type;
        gambleResult.textContent = `Result: ${segment.label}`;
        // small delay to show result then apply
        setTimeout(() => {
            if (type === 'cps') {
                // create a temporary "upgrade" effect: add to cps directly (persistent)
                GAME_STATE.upgrades.push({
                    id: `gamble_cps_${Date.now()}`,
                    name: `${segment.label}`,
                    description: 'Gamble reward (persistent CPS)',
                    baseCost: 1,
                    costMultiplier: 1,
                    baseCps: segment.value,
                    count: 1
                });
                calculateCPS();
                showPrint(`Gamble won: ${segment.label} (added ${formatter.format(segment.value)} CPS)`);
            } else if (type === 'cookies') {
                GAME_STATE.cookies = (Number.isFinite(GAME_STATE.cookies) ? GAME_STATE.cookies : 0) + segment.value;
                showPrint(`Gamble won: +${formatter.format(segment.value)} Cookies`);
            } else if (type === 'mult') {
                // multiply the original stake and award it (stake was spent)
                const reward = Math.floor(stake * (segment.value));
                GAME_STATE.cookies = (Number.isFinite(GAME_STATE.cookies) ? GAME_STATE.cookies : 0) + reward;
                showPrint(`Gamble won: x${segment.value} = +${formatter.format(reward)} Cookies`);
            } else if (type === 'prompt') {
                openPromptModal('You triggered a useless prompt...');
            } else {
                // unknown segment type — no-op but notify
                showWarning('Gamble completed: no change.');
            }
            calculateCPS();
            updateUI();
            saveState();
            // close after a moment
            setTimeout(closeGambleModal, 900);
        }, 800);
    }

    // Language: if not set, show language modal on first load
    const savedLang = getSavedLang();
    const langModal = document.getElementById('lang-modal');
    const langButtons = document.querySelectorAll('.lang-button');
    const langSkipBtn = document.getElementById('lang-skip-btn');

    if (!savedLang && langModal) {
        // Show modal
        langModal.classList.add('visible');
        // Attach handlers
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const chosen = btn.getAttribute('data-lang');
                if (SUPPORTED_LANGS.includes(chosen)) {
                    saveLang(chosen);
                    applyLanguage(chosen);
                } else {
                    saveLang('en');
                    applyLanguage('en');
                }
                langModal.classList.remove('visible');
            });
        });
        if (langSkipBtn) {
            langSkipBtn.addEventListener('click', () => {
                // default to English if skipped
                saveLang('en');
                applyLanguage('en');
                langModal.classList.remove('visible');
            });
        }
    } else {
        // Apply saved language (or default to English)
        applyLanguage(savedLang || 'en');
    }

    // 0. Load persisted state if available
    loadState();

    // Reset grandma's visual properties (contrast only) on page load
    const grandmaUpgrade = GAME_STATE.upgrades.find(u => u.id === 'grandma');
    if (grandmaUpgrade) {
        grandmaUpgrade.contrast = 1.0;
    }

    // 1. Initialize UI elements
    initializeUpgrades();
    // Ensure gamble modal references are available globally for functions used elsewhere
    window.openGambleModal = openGambleModal;

    // --- Auto-buy controls (immediate: enabled when a target is selected) ---
    const autoBuySelect = document.getElementById('auto-buy-select');
    let autoBuyTarget = ''; // upgrade id
    // autoBuyEnabled is derived from whether a target is selected

    // Populate the select with available upgrade options (by id)
    function populateAutoBuyOptions() {
        if (!autoBuySelect) return;
        // Clear except first default option
        autoBuySelect.innerHTML = '<option value="">Auto-buy: Off</option>';
        // Add an "All upgrades" option that attempts to buy any affordable upgrade
        const allOpt = document.createElement('option');
        allOpt.value = 'ALL';
        allOpt.textContent = 'Auto-buy: All upgrades';
        autoBuySelect.appendChild(allOpt);
        GAME_STATE.upgrades.forEach(u => {
            const opt = document.createElement('option');
            opt.value = u.id;
            opt.textContent = `${u.name}`;
            autoBuySelect.appendChild(opt);
        });
    }
    populateAutoBuyOptions();



    if (autoBuySelect) {
        autoBuySelect.addEventListener('change', (e) => {
            autoBuyTarget = e.target.value || '';
            // auto-buy is immediate: enabled whenever a non-empty upgrade is selected
            // show a short notice if turned off by selecting the blank option
            if (!autoBuyTarget) {
                showWarning('Auto-buy turned off.');
            } else {
                // optional: give brief feedback that auto-buy is enabled for the chosen upgrade
                const label = autoBuySelect.selectedOptions[0] ? autoBuySelect.selectedOptions[0].text : autoBuyTarget;
                showPrint(`Auto-buy enabled: ${label}`);
            }
        });
    }

    // Continuous auto-buy attempt with no delay: check every tick (~30 FPS) to avoid perceptible delay.
    setInterval(() => {
        if (!autoBuyTarget) return; // immediate off if no target selected
        const currentCookies = Number.isFinite(GAME_STATE.cookies) ? GAME_STATE.cookies : 0;

        // If "ALL" selected: attempt to buy any affordable upgrades, cheapest-first
        if (autoBuyTarget === 'ALL') {
            // Build a list of upgrades with their next-cost, exclude gambling entirely
            const affordable = GAME_STATE.upgrades
                .map(u => ({ u, cost: calculateCost(u) }))
                .filter(x => Number.isFinite(x.cost) && x.u.id !== 'gambling') // exclude gambling
                .sort((a, b) => a.cost - b.cost); // cheapest first

            // Try to buy as many as possible in cheap-to-expensive order (single-pass per tick)
            let madePurchase = false;
            for (const item of affordable) {
                if (item.cost <= currentCookies) {
                    GAME_STATE.cookies -= item.cost;
                    item.u.count += 1;
                    madePurchase = true;
                }
            }
            if (madePurchase) {
                calculateCPS();
                updateUI();
                saveState();
            }
            return;
        }

        // Otherwise a single-target auto-buy (existing behavior)
        const upgrade = GAME_STATE.upgrades.find(u => u.id === autoBuyTarget);
        if (!upgrade) return;
        const cost = calculateCost(upgrade);
        const safeCookies = Number.isFinite(GAME_STATE.cookies) ? GAME_STATE.cookies : 0;
        if (safeCookies >= cost) {
            // Special-case gambling: respect its custom flow (open modal) rather than normal buy
            if (upgrade.id === 'gambling') {
                // spend all cookies and open gamble modal
                const stake = Math.floor(safeCookies);
                GAME_STATE.cookies = 0;
                updateUI();
                saveState();
                openGambleModal(stake);
            } else {
                // buy normally
                GAME_STATE.cookies -= cost;
                upgrade.count += 1;
                calculateCPS();
                updateUI();
                saveState();
            }
        }
    }, 33); // ~30 checks per second for effectively no delay

    // Initialize achievements UI and load saved achievement flags
    initializeAchievementsUI();
    // Restore saved achievements if present
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        if (saved && saved.achievements) {
            Object.keys(saved.achievements).forEach(id => {
                const a = ACHIEVEMENTS.find(x => x.id === id);
                if (a) a.earned = !!saved.achievements[id];
            });
            // refresh the achievements UI to reflect restored values
            initializeAchievementsUI();
        }
    } catch (e) { /* ignore */ }

    // Ensure the "um, yah" achievement is always unlocked regardless of loaded saves
    try {
        const forced = ACHIEVEMENTS.find(x => x.id === 'um_yah');
        if (forced) forced.earned = true;
        // reflect the forced state in the UI
        initializeAchievementsUI();
    } catch (e) { /* ignore */ }

    // Wire up achievements button
    const achievementsBtn = document.getElementById('achievements-btn');
    const achievementsPanel = document.getElementById('achievements-panel');
    const closeAchievements = document.getElementById('close-achievements');
    if (achievementsBtn && achievementsPanel) {
        achievementsBtn.addEventListener('click', () => {
            achievementsPanel.classList.add('visible');
        });
    }
    if (closeAchievements) closeAchievements.addEventListener('click', () => {
        if (achievementsPanel) achievementsPanel.classList.remove('visible');
    });

    // Timed achievement: award after 15 minutes (900000 ms) of play from init
    setTimeout(() => {
        awardAchievement('timed');
    }, 15 * 60 * 1000);

    // Automatic Taco Tuesday award: if today is Tuesday (JS getDay() === 2), unlock immediately
    try {
        const today = new Date().getDay(); // 0=Sun,1=Mon,2=Tue...
        if (today === 2) {
            awardAchievement('taco_tuesday');
        }
    } catch (e) { /* ignore date errors */ }

    // (News strip removed — no rotation or related listeners)

    // Add swap layout button: toggles shop <-> cookie positions and persists choice
    const swapLayoutBtn = document.getElementById('swap-layout-btn');
    const LAYOUT_KEY = 'cookie_bakery_layout_swapped_v1';

    // Apply saved layout preference on init
    try {
        const saved = localStorage.getItem(LAYOUT_KEY);
        if (saved === '1') {
            document.getElementById('app').classList.add('reversed');
        } else {
            document.getElementById('app').classList.remove('reversed');
        }
    } catch (e) { /* ignore */ }

    if (swapLayoutBtn) {
        swapLayoutBtn.addEventListener('click', () => {
            const appEl = document.getElementById('app');
            const newState = !appEl.classList.toggle('reversed');
            // Save the inverse because toggle returns true when class removed; store explicit state
            try {
                localStorage.setItem(LAYOUT_KEY, appEl.classList.contains('reversed') ? '1' : '0');
            } catch (e) { /* ignore */ }
            // brief visual feedback
            showPrint(appEl.classList.contains('reversed') ? 'Layout: Shop Left, Cookie Right' : 'Layout: Shop Right, Cookie Left');
        });
    }

    // 2. Set up event listeners for fast touch/click response
    // Use touchstart for primary mobile interaction
    cookieButton.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent touch delay and potential scroll
        clickCookie(e);
    }, { passive: false });
    
    // Use mousedown for primary desktop interaction (faster than click)
    cookieButton.addEventListener('mousedown', clickCookie);

    // 3. Set up renaming listeners
    titleStrip.addEventListener('click', openRenameModal);
    saveNameBtn.addEventListener('click', saveNewName);
    cancelNameBtn.addEventListener('click', closeRenameModal);
    randomNameBtn.addEventListener('click', generateRandomName);

    // File controls listeners
    saveFileBtn.addEventListener('click', saveToFile);
    loadFileBtn.addEventListener('click', () => loadFileInput.click());
    loadFileInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        handleFileLoad(file);
        // Clear input so same file can be chosen again if needed
        loadFileInput.value = '';
    });

    // Consle button opens the modal-based console
    if (consleBtn) consleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openConsole();
    });

    // Console modal button handlers
    if (consoleRunBtn) {
        consoleRunBtn.addEventListener('click', () => {
            runConsoleCommand(consoleInput.value);
        });
    }
    if (consoleCancelBtn) {
        consoleCancelBtn.addEventListener('click', () => {
            closeConsole();
        });
    }

    // Change Language button (placed below console actions)
    const changeLangBtn = document.getElementById('change-lang-btn');
    if (changeLangBtn) {
        changeLangBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Close console modal and open language modal
            closeConsole();
            const langModalEl = document.getElementById('lang-modal');
            if (langModalEl) {
                langModalEl.classList.add('visible');
                // focus first language button for accessibility
                const firstBtn = langModalEl.querySelector('.lang-button');
                if (firstBtn) firstBtn.focus();
            }
        });
    }
    // Allow Enter key inside console input to run the command
    if (consoleInput) {
        consoleInput.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter') {
                ev.preventDefault();
                runConsoleCommand(consoleInput.value);
            } else if (ev.key === 'Escape') {
                ev.preventDefault();
                closeConsole();
            }
        });
    }

    // Prompt modal buttons
    if (promptOkBtn) {
        promptOkBtn.addEventListener('click', () => {
            // For now, OK simply closes the prompt (content not persisted)
            closePromptModal();
        });
    }
    if (promptCancelBtn) {
        promptCancelBtn.addEventListener('click', () => {
            closePromptModal();
        });
    }
    // Allow Escape to close prompt modal
    if (promptTextarea) {
        promptTextarea.addEventListener('keydown', (ev) => {
            if (ev.key === 'Escape') {
                ev.preventDefault();
                closePromptModal();
            }
        });
    }

    // Reset button opens a confirmation modal
    resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openResetModal();
    });

    // Support button: open external YouTube subscription link in a new tab
    if (supportBtn) {
        supportBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // open subscribe prompt in a new tab/window
            window.open('https://www.youtube.com/@FallGameDev?sub_confirmation=1', '_blank', 'noopener');
        });
    }

    // Modal button listeners for reset confirmation
    if (confirmResetBtn) confirmResetBtn.addEventListener('click', () => {
        closeResetModal();
        resetGame();
    });
    if (cancelResetBtn) cancelResetBtn.addEventListener('click', () => {
        closeResetModal();
    });

    // 3b. Save on page unload
    window.addEventListener('beforeunload', saveState);

    // 3c. Start autosave interval
    setInterval(saveState, AUTOSAVE_MS);

    // 4. Start the loop
    calculateCPS(); // Initial CPS calculation (should be 0)
    updateUI(); // Initial render
    gameLoop();

    // Playtime bonus: every ~2 minutes grant the player a bonus.
    // If cookies < 5000 => +1000 cookies; otherwise grant 10% of current cookies.
    function grantPlaytimeBonus() {
        // Treat non-finite cookie counts as 0
        const current = Number.isFinite(GAME_STATE.cookies) ? GAME_STATE.cookies : 0;
        let bonus = 0;
        if (current < 5000) {
            bonus = 1000;
        } else {
            bonus = Math.floor(current * 0.10); // 10% of what they have
            if (bonus < 1) bonus = 1;
        }

        GAME_STATE.cookies = current + bonus;
        // Give immediate feedback and persist
        showPrint(`Playtime bonus: +${formatter.format(bonus)} cookies`);
        saveState();
        updateUI();
    }

    // Start interval (~2 minutes = 120000ms). Use slight jitter to avoid strict alignment.
    const PLAYTIME_BONUS_MS = 120000;
    setInterval(grantPlaytimeBonus, PLAYTIME_BONUS_MS);

    // --- Autoplay attempt: try to start music on load ---
    // Use muted play trick so browsers allow muted autoplay, then unmute if play succeeds.
    // Implement a retrying autoplay routine: try muted play and unmute on success.
    (function tryAutoplayWithRetries() {
        if (!bgAudio) return;
        bgAudio.volume = 0.18;
        let attempts = 0;
        const maxAttempts = 8;
        const retryDelay = 2000; // ms

        function attemptPlay() {
            attempts += 1;
            const prevMuted = bgAudio.muted;
            // Start muted so browsers that allow muted autoplay will play
            try {
                bgAudio.muted = true;
            } catch (e) { /* ignore */ }

            const p = bgAudio.play();
            if (p && typeof p.then === 'function') {
                p.then(() => {
                    // Playback started while muted; unmute to make audible
                    try { bgAudio.muted = false; } catch (e) {}
                    audioStarted = true;
                }).catch(() => {
                    // Failed this attempt: restore previous mute state and retry later
                    try { bgAudio.muted = prevMuted; } catch (e) {}
                    if (attempts < maxAttempts) {
                        setTimeout(attemptPlay, retryDelay);
                    }
                });
            } else {
                // If play returned no promise, assume it played; unmute
                try { bgAudio.muted = false; } catch (e) {}
                audioStarted = true;
            }
        }

        // Start first attempt immediately
        attemptPlay();
    })();
}

init();

