var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class DeadlockdleGame {
    constructor() {
        this.API_URL = "https://assets.deadlock-api.com/v2/heroes?language=english&client_version=5902&only_active=true";
        this.heroes = [];
        this.todaysHero = null;
        this.mode = null;
        this.history = [];
        this.guessedNames = new Set();
        this.isLoading = true;
        this.latestResult = null;
        this.HERO_EXTRAS = {
            "Infernus": { Emojis: "🏃‍♂️ 👉 😎 🔥", gender: "Male", build: "Gun", species: "Altered human" },
            "Seven": { Emojis: "🤸‍♂️ 🌩️ 🔶 ❓", gender: "Male", build: "Spirit", species: "Altered human" },
            "Vindicta": { Emojis: "🪽 👣 🪤 🐦‍⬛", gender: "Female", build: "Spirit", species: "Altered human" },
            "LadyGeist": { Emojis: "💎 🗡️ 👩‍🦳 ❓", gender: "Female", build: "Spirit", species: "Human" },
            "Abrams": { Emojis: "📖 🛡️ 👓 🥊", gender: "Male", build: "Vitality", species: "Altered human" },
            "Wraith": { Emojis: "♦️ 🦾 💜 ❓", gender: "Female", build: "Spirit", species: "Human" },
            "McGinnis": { "Emojis": "🧱 🔧 👷‍♀️ ❓", gender: "Female", build: "Gun", species: "Human" },
            "Paradox": { "Emojis": "⌛ 🧱 🔄️ ❓", gender: "Female", build: "Gun", species: "Altered human" },
            "Dynamo": { "Emojis": "🧑‍🔬 🤖 ☄️ ❓", gender: "Male", build: "Spirit", species: "Golem" },
            "Kelvin": { "Emojis": "❄️ ⛸️ 👨‍🦰 ❓", gender: "Male", build: "Spirit", species: "Human" },
            "Haze": { "Emojis": "🗡️ 💤 🫥 🤫", gender: "Female", build: "Gun", species: "Altered human" },
            "Holliday": { "Emojis": "🤠 🪢 🦘 ❓", gender: "Female", build: "Gun", species: "Human" },
            "Bebop": { "Emojis": "💣 🤖 🪝 🥊", gender: "Male", build: "Vitality", species: "Golem" },
            "Calico": { "Emojis": "🐈‍⬛ 💣 💜 ❓", gender: "Female", build: "Spirit", species: "Altered human" },
            "Grey Talon": { "Emojis": "🦉 🏹 🪤 👴", gender: "Male", build: "Spirit", species: "Human" },
            "Mo & Krill": { "Emojis": "👥 ❓ ❓ ❓", gender: "Male", build: "Spirit", species: "Animal" },
            "Shiv": { "Emojis": "🎸 🗡️ ❓ ❓", gender: "Male", build: "Spirit", species: "Human" },
            "Ivy": { "Emojis": "🪽 🗿 ❓ ❓", gender: "Female", build: "Gun", species: "Animal" },
            "Warden": { "Emojis": "🚨 👮 🪝 🧪", gender: "Male", build: "Spirit", species: "Human" },
            "Yamato": { "Emojis": "🗾 🤺 🥷 ❓", gender: "Female", build: "Spirit", species: "Altered human" },
            "Lash": { "Emojis": "😎 🪢 💪 ❓", gender: "Male", build: "Spirit", species: "Human" },
            "Viscous": { "Emojis": "🟩 🟢 ❓ ❓", gender: "Male", build: "Gun", species: "Altered human" },
            "Pocket": { "Emojis": "️🐸 💼 ☮️ 🧣", gender: "Other", build: "Spirit", species: "Human" },
            "Mirage": { "Emojis": "🧞 🏜️ 🪲 ❓", gender: "Male", build: "Vitality", species: "Human" },
            "Vyper": { "Emojis": "🐍 ☣️ 🪨 ❓", gender: "Female", build: "Gun", species: "Animal" },
            "Sinclair": { "Emojis": "🎩 🪄 🐇 ❓", gender: "Male", build: "Spirit", species: "Altered human" },
            "Mina": { "Emojis": "🦇 🩸 🧛 ☂️", gender: "Female", build: "Spirit", species: "Altered human" },
            "Drifter": { "Emojis": "🩸 👨‍🦯 😶‍🌫️ 🧛", gender: "Male", build: "Vitality", species: "Altered human" },
            "Victor": { "Emojis": "🧟 ☣️ 🔋 🫀", gender: "Male", build: "Vitality", species: "Altered human" },
            "Paige": { "Emojis": "📗 🐉 🐎 ⚔️", gender: "Female", build: "Spirit", species: "Human" },
            "The Doorman": { "Emojis": "🛒 🛎️ 🚪 🏨", gender: "Male", build: "Spirit", species: "Human" },
            "Billy": { Emojis: "🤟 🐐 ❓ ❓", gender: "Male", build: "Gun", species: "Animal" }
        };
        this.emojiClues = [];
        this.revealedEmojiCount = 0;
        this.elements = {
            clue: document.getElementById("clue"),
            guessInput: document.getElementById("guessInput"),
            suggestions: document.getElementById("suggestions"),
            result: document.getElementById("result"),
            historyList: document.getElementById("historyList"),
            guessBtn: document.getElementById("guessBtn"),
            modeDeadlockdle: document.getElementById("modeDeadlockdle"),
            modeEmoji: document.getElementById("modeEmoji")
        };
        this.init();
        this.setupEventListeners();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.API_URL);
                if (!response.ok)
                    throw new Error(`HTTP ${response.status}`);
                this.heroes = yield response.json();
                this.isLoading = false;

                this.startDeadlockdle();
            }
            catch (error) {
                console.error("Failed to load heroes:", error);
                this.elements.clue.innerHTML = "Couldn't load hero data. Try again later.";
                this.elements.clue.className = "clue-text result-error";
            }
        });
    }
    setupEventListeners() {
        this.elements.modeDeadlockdle.onclick = () => this.startDeadlockdle();
        this.elements.modeEmoji.onclick = () => this.startEmoji();
        this.elements.guessBtn.onclick = () => this.handleGuess();
        this.elements.guessInput.addEventListener("input", () => this.handleInput());
        this.elements.guessInput.addEventListener("keydown", (e) => this.handleKeydown(e));

        document.addEventListener("click", (e) => {
            if (!this.elements.guessInput.contains(e.target) &&
                !this.elements.suggestions.contains(e.target)) {
                this.elements.suggestions.style.display = "none";
            }
        });
    }
    pickDailyIndex(length, modifier = 0) {
        const dateString = new Date().toISOString().slice(0, 10);
        let hash = 0;

        for (const char of dateString)
            hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
        hash += modifier * 9999;
        return hash % length;
    }
    normalize(str) {
        return str.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim();
    }
    updateModeButtons() {
        document.querySelectorAll(".mode-buttons button")
            .forEach(btn => btn.classList.remove("active"));
        if (this.mode === "deadlockdle")
            this.elements.modeDeadlockdle.classList.add("active");
        else if (this.mode === "emoji")
            this.elements.modeEmoji.classList.add("active");
    }
    startDeadlockdle() {
        if (this.isLoading || !this.heroes.length)
            return;
        const index = this.pickDailyIndex(this.heroes.length, 0);
        this.todaysHero = this.heroes[index];
        this.mode = "deadlockdle";
        this.resetGame();
        this.elements.clue.innerHTML = "<strong>Deadlockdle started!</strong> Guess todays hero.";
        this.updateModeButtons();
    }
    startEmoji() {
        var _a;
        if (this.isLoading)
            return;

        const names = Object.keys(this.HERO_EXTRAS);
        const index = this.pickDailyIndex(names.length, 1);
        const name = names[index];
        this.todaysHero = this.heroes.find(h => h.name === name) || { name };
        this.mode = "emoji";
        this.resetGame();
        const emojiString = ((_a = this.HERO_EXTRAS[name]) === null || _a === void 0 ? void 0 : _a.Emojis) || "❓ ❓ ❓ ❓";
        this.emojiClues = emojiString.split(" ");
        this.revealedEmojiCount = 1;
        this.updateEmojiClue();
        this.updateModeButtons();
    }
    updateEmojiClue(showAll = false) {
        const totalEmojis = 4;
        const visible = showAll ? this.emojiClues.length : this.revealedEmojiCount;
        let displayed = this.emojiClues.slice(0, visible).join(" ");

        for (let i = visible; i < totalEmojis; i++) {
            displayed += " ❓";
        }
        this.elements.clue.innerHTML =
            `<strong>Emoji-mode!</strong> Guess the hero based on emojis: ` +
                `<span style="font-size: 28px; margin-left: 10px;">${displayed}</span>`;
    }
    resetGame() {
        this.history = [];
        this.guessedNames.clear();
        this.latestResult = null;
        this.clearResult();
        this.renderHistory();
        this.elements.guessInput.value = "";
        this.elements.guessInput.disabled = false;
        this.elements.guessBtn.disabled = false;
    }
    checkGuess(guess) {
        var _a;
        const hero = this.heroes.find(h => this.normalize(h.name) === this.normalize(guess) && !this.guessedNames.has(h.name));
        if (!hero)
            return null;
        this.guessedNames.add(hero.name);
        const isCorrect = hero.name === ((_a = this.todaysHero) === null || _a === void 0 ? void 0 : _a.name);
        if (this.mode === "deadlockdle")
            return this.createDeadlockdleResult(hero, isCorrect);
        if (this.mode === "emoji")
            return this.createEmojiResult(hero, isCorrect);
        return null;
    }
    createDeadlockdleResult(hero, isCorrect) {
        var _a, _b, _c, _d, _e, _f, _g;
        const extrasHero = this.HERO_EXTRAS[hero.name];
        const extrasTarget = this.HERO_EXTRAS[(_b = (_a = this.todaysHero) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : ""];
        const cluesArray = [
            {
                text: `Complexity: ${hero.complexity}${this.getComplexityArrow(hero.complexity, 
                    (_c = this.todaysHero) === null || _c === void 0 ? void 0 : _c.complexity)}`,
                status: hero.complexity === ((_d = this.todaysHero) === null || _d === void 0 ? void 0 : _d.complexity) ? "correct" : "wrong"
            },
            { text: `Type: ${hero.hero_type}`, status: hero.hero_type === 
            ((_e = this.todaysHero) === null || _e === void 0 ? void 0 : _e.hero_type) ? "correct" : "wrong" },
            { text: `Weapon: ${hero.gun_tag}`, status: hero.gun_tag === 
            ((_f = this.todaysHero) === null || _f === void 0 ? void 0 : _f.gun_tag) ? "correct" : "wrong" }
        ];
        if (extrasHero.gender && extrasTarget.gender)
            cluesArray.push({ text: `Gender: ${extrasHero.gender}`, status: extrasHero.gender === extrasTarget.gender ? "correct" : "wrong" });
        if (extrasHero.build && extrasTarget.build)
            cluesArray.push({ text: `Build: ${extrasHero.build}`, status: extrasHero.build === extrasTarget.build ? "correct" : "wrong" });
        if (extrasHero.species && extrasTarget.species)
            cluesArray.push({ text: `Species: ${extrasHero.species}`, status: extrasHero.species === extrasTarget.species ? "correct" : "wrong" });
        return { name: hero.name, img: (_g = hero.images) === null || _g === void 0 ? void 0 : _g.icon_hero_card, cluesArray, correct: isCorrect };
    }
    createEmojiResult(hero, isCorrect) {
        var _a;
        return { name: hero.name, img: (_a = hero.images) === null || _a === void 0 ? void 0 : _a.icon_hero_card, correct: isCorrect };
    }
    getComplexityArrow(heroComplexity, targetComplexity) {
        const hero = parseInt(heroComplexity !== null && heroComplexity !== void 0 ? heroComplexity : "");
        const target = parseInt(targetComplexity !== null && targetComplexity !== void 0 ? targetComplexity : "");
        if (isNaN(hero) || isNaN(target))
            return "";
        if (hero === target)
            return "";
        return hero > target ? " ⬇️" : " ⬆️";
    }
    handleGuess() {
        var _a;
        if (!this.mode) {
            this.showResult("Choose gamemode first!", "error");
            return;
        }
        const guess = this.elements.guessInput.value.trim();
        if (!guess) {
            this.showResult("Enter hero name!", "error");
            return;
        }
        this.elements.guessInput.value = "";
        this.elements.suggestions.style.display = "none";
        const result = this.checkGuess(guess);
        if (!result) {
            this.showResult("Invalid name or already guessed!", "error");
            return;
        }
        this.history.unshift(result);
        this.renderHistory();
        if (result.correct) {
            this.showResult(`🎉 Correct! It was: ${(_a = this.todaysHero) === null || _a === void 0 ? void 0 : _a.name}`, "success");
            if (this.mode === "emoji")
                this.updateEmojiClue(true);
            this.endGame();
        }
        else {
            this.showResult(`❌ Wrong, try again! (${this.history.length} guesses)`, "error");
            if (this.mode === "emoji" && this.revealedEmojiCount < this.emojiClues.length) {
                this.revealedEmojiCount++;
                this.updateEmojiClue();
            }
        }
    }
    formatGuessCount(n) {
        return n === 1 ? `${n} guess` : `${n} guesses`;
    }
    showResult(message, type) {
        const countRegex = /\(\s*\d+\s*guesses?\s*\)/i;
        if (countRegex.test(message)) {
            const replacement = `(${this.formatGuessCount(this.history.length)})`;
            message = message.replace(countRegex, replacement);
        }
        this.latestResult = { message, type };
        this.renderLatestResult();
    }
    clearResult() {
        this.latestResult = null;
        const existing = this.elements.historyList.querySelector("#global-result");
        if (existing)
            existing.remove();
        this.elements.result.textContent = "";
        this.elements.result.className = "";
    }
    renderLatestResult() {
        const existing = this.elements.historyList.querySelector("#global-result");
        if (existing)
            existing.remove();
        if (!this.latestResult)
            return;
        const div = document.createElement("div");
        div.id = "global-result";
        div.className = `result-message ${this.latestResult.type === "success" ? "result-success" : "result-error"}`;
        div.style.marginTop = "10px";
        div.textContent = this.latestResult.message;
        this.elements.historyList.appendChild(div);
    }
    endGame() {
        this.elements.guessInput.disabled = true;
        this.elements.guessBtn.disabled = true;
    }
    renderHistory() {
        if (this.history.length === 0) {
            this.elements.historyList.innerHTML = '<div class="loading">Nothing yet</div>';
            if (this.latestResult)
                this.renderLatestResult();
            return;
        }
        if (this.mode === "deadlockdle")
            this.renderDeadlockdleHistory();
        else if (this.mode === "emoji")
            this.renderEmojiHistory();
    }
    renderDeadlockdleHistory() {
        const categories = ["Hero", "Complexity", "Type", "Weapon", "Gender", "Main build", "Species"];
        let html = '<div class="grid-container"><div class="grid-header">';
        categories.forEach(category => html += `<div class="grid-cell">${category}</div>`);
        html += "</div>";
        this.history.forEach(guess => {
            var _a;
            html += '<div class="grid-row">';
            html += '<div class="grid-cell">';
            if (guess.img)
                html += `<img src="${guess.img}" alt="${guess.name}" title="${guess.name}">`;
            html += "</div>";
            (_a = guess.cluesArray) === null || _a === void 0 ? void 0 : _a.forEach(clue => {
                const cls = clue.status === "correct" ? "cell-correct" : "cell-wrong";
                const displayText = clue.text.split(": ")[1] || clue.text;
                html += `<div class="grid-cell ${cls}">${displayText}</div>`;
            });
            html += "</div>";
        });
        html += "</div>";
        this.elements.historyList.innerHTML = html;
        if (this.latestResult)
            this.renderLatestResult();
    }
    renderEmojiHistory() {
        let html = '<div class="emoji-history">';
        this.history.forEach(guess => {
            const statusClass = guess.correct ? "correct" : "wrong";
            html += `<div class="emoji-guess ${statusClass}" title="${guess.name}">`;
            if (guess.img)
                html += `<img src="${guess.img}" alt="${guess.name}">`;
            html += `</div>`;
        });
        html += "</div>";
        this.elements.historyList.innerHTML = html;
        if (this.latestResult)
            this.renderLatestResult();
    }
    matchQueryToHeroName(queryWords, heroName) {
        const heroWords = heroName.toLowerCase().split(/\s+/);
        if (queryWords.length > heroWords.length)
            return false;
        for (let start = 0; start <= heroWords.length - queryWords.length; start++) {
            let ok = true;
            for (let i = 0; i < queryWords.length; i++) {
                if (!heroWords[start + i].startsWith(queryWords[i])) {
                    ok = false;
                    break;
                }
            }
            if (ok)
                return true;
        }
        return false;
    }
    handleInput() {
        const queryRaw = this.elements.guessInput.value.trim().toLowerCase();
        if (!queryRaw) {
            this.elements.suggestions.style.display = "none";
            return;
        }
        const qWords = queryRaw.split(/\s+/).filter(Boolean);
        const matches = this.heroes
            .filter(hero => !this.guessedNames.has(hero.name))
            .filter(hero => this.matchQueryToHeroName(qWords, hero.name))
            .slice(0, 8);
        if (matches.length === 0) {
            this.elements.suggestions.style.display = "none";
            return;
        }
        let html = "";
        matches.forEach(hero => {
            var _a;
            const img = ((_a = hero.images) === null || _a === void 0 ? void 0 : _a.icon_hero_card) || "";
            html += `<div class="suggestion" data-name="${hero.name}">
        <img src="${img}" alt="${hero.name}" loading="lazy">
        <span>${hero.name}</span>
        </div>`;
        });
        this.elements.suggestions.innerHTML = html;
        this.elements.suggestions.style.display = "block";
        this.elements.suggestions.querySelectorAll(".suggestion").forEach(suggestion => {
            suggestion.onclick = () => {
                const name = suggestion.dataset.name;
                this.elements.guessInput.value = name;
                this.elements.suggestions.style.display = "none";
                this.handleGuess();
            };
        });
    }
    handleKeydown(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const firstSuggestionEl = this.elements.suggestions.querySelector(".suggestion");
            if (firstSuggestionEl && this.elements.suggestions.style.display !== "none") {
                const name = firstSuggestionEl.dataset.name;
                this.elements.guessInput.value = name;
                this.elements.suggestions.style.display = "none";
            }
            this.handleGuess();
        }
        else if (event.key === "Escape") {
            this.elements.suggestions.style.display = "none";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => new DeadlockdleGame());
