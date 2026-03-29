// ===== SCREEN PERSISTENCE =====
function saveScreen(screen) {
    localStorage.setItem('kitcat_screen', screen);
}

function restoreScreen() {
    const saved = localStorage.getItem('kitcat_screen');
    if (!saved || saved === 'password') return;

    // Hide all screens
    document.getElementById('passwordScreen').classList.add('hidden');
    document.getElementById('beatScreen').classList.add('hidden');
    document.getElementById('letterScreen').classList.add('hidden');
    document.getElementById('mainContent').classList.add('hidden');
    document.getElementById('finalScreen').classList.add('hidden');
    document.getElementById('choiceScreen').classList.add('hidden');

    if (saved === 'beat') {
        document.getElementById('beatScreen').classList.remove('hidden');
    } else if (saved === 'letter') {
        document.getElementById('letterScreen').classList.remove('hidden');
        document.getElementById('letterScreen').style.opacity = '1';
        document.querySelector('.please-read-letter').style.opacity = '1';
        document.querySelector('.please-read-letter').style.animation = 'none';
        document.getElementById('letterContinueBtn').style.opacity = '1';
        document.getElementById('letterContinueBtn').style.animation = 'none';
    } else if (saved === 'choice') {
        document.getElementById('choiceScreen').classList.remove('hidden');
        document.getElementById('choiceScreen').style.opacity = '1';
        document.querySelector('.choice-subtitle').style.opacity = '1';
        document.querySelector('.choice-subtitle').style.animation = 'none';
        document.querySelector('.choice-buttons').style.opacity = '1';
        document.querySelector('.choice-buttons').style.animation = 'none';
    } else if (saved === 'main') {
        document.getElementById('mainContent').classList.remove('hidden');
        initScrollReveal();
        createSparkles();
    } else if (saved === 'final') {
        document.getElementById('finalScreen').classList.remove('hidden');
        document.getElementById('finalScreen').style.opacity = '1';
        document.querySelector('.final-message').style.opacity = '1';
        document.querySelector('.final-message').style.animation = 'none';
        document.querySelector('.final-sign-off').style.opacity = '1';
        document.querySelector('.final-sign-off').style.animation = 'none';
        document.getElementById('finalContinueBtn').style.opacity = '1';
        document.getElementById('finalContinueBtn').style.animation = 'none';
    }
}

document.addEventListener('DOMContentLoaded', restoreScreen);

function goBack(targetScreen) {
    // Find currently visible screen
    const screens = ['passwordScreen', 'beatScreen', 'letterScreen', 'finalScreen', 'choiceScreen', 'mainContent'];
    let currentId = null;
    for (const id of screens) {
        const el = document.getElementById(id);
        if (el && !el.classList.contains('hidden')) {
            currentId = id;
            break;
        }
    }
    if (!currentId) return;

    const screenMap = {
        'password': 'passwordScreen',
        'beat': 'beatScreen',
        'letter': 'letterScreen',
        'final': 'finalScreen',
        'choice': 'choiceScreen',
        'main': 'mainContent',
    };

    const targetId = screenMap[targetScreen];
    if (!targetId) return;

    document.getElementById(currentId).style.opacity = '0';
    document.getElementById(currentId).style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.getElementById(currentId).classList.add('hidden');
        const target = document.getElementById(targetId);
        target.classList.remove('hidden');
        target.style.opacity = '0';
        requestAnimationFrame(() => {
            target.style.transition = 'opacity 0.5s ease';
            target.style.opacity = '1';
        });
        saveScreen(targetScreen);

        if (targetScreen === 'main') {
            initScrollReveal();
            createSparkles();
        }
    }, 500);
}

// ===== PASSWORD CHECK =====
const PASSWORD = "Iamcrazyaboutmaria1!";

document.getElementById("passwordInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") checkPassword();
});

function checkPassword() {
    const input = document.getElementById("passwordInput").value;
    const errorMsg = document.getElementById("errorMsg");

    if (input === PASSWORD) {
        // Correct password — transition to beat screen
        document.getElementById("passwordScreen").style.opacity = "0";
        document.getElementById("passwordScreen").style.transition = "opacity 0.8s ease";

        setTimeout(() => {
            document.getElementById("passwordScreen").classList.add("hidden");
            document.getElementById("beatScreen").classList.remove("hidden");
            document.getElementById("beatScreen").style.opacity = "0";
            requestAnimationFrame(() => {
                document.getElementById("beatScreen").style.transition = "opacity 1s ease";
                document.getElementById("beatScreen").style.opacity = "1";
            });
            saveScreen('beat');
        }, 800);
    } else {
        // Wrong password
        errorMsg.classList.add("show");
        document.getElementById("passwordInput").value = "";
        setTimeout(() => errorMsg.classList.remove("show"), 2000);
    }
}

// ===== FLOATING HEARTS BACKGROUND =====
function createFloatingHearts() {
    const container = document.getElementById("heartsBg");
    const hearts = ["\u2665", "\u2764", "\u2661", "\u2763"];

    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("floating-heart");
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + "%";
        heart.style.fontSize = (Math.random() * 20 + 12) + "px";
        heart.style.animationDuration = (Math.random() * 8 + 6) + "s";
        heart.style.opacity = Math.random() * 0.4 + 0.1;
        container.appendChild(heart);

        setTimeout(() => heart.remove(), 14000);
    }, 500);
}

createFloatingHearts();

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach((el) => observer.observe(el));
}

// ===== SPARKLES =====
function createSparkles() {
    const container = document.getElementById("sparkles");
    if (!container) return;

    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");
        sparkle.style.left = Math.random() * 100 + "%";
        sparkle.style.top = Math.random() * 100 + "%";
        sparkle.style.animationDelay = Math.random() * 3 + "s";
        sparkle.style.width = sparkle.style.height = (Math.random() * 6 + 3) + "px";
        container.appendChild(sparkle);
    }
}

// ===== HEART BURST INTERACTIVE =====
let heartClickCount = 0;
const loveMessages = [
    "You're amazing!",
    "I care about you so much!",
    "You make my heart smile!",
    "You're one of a kind!",
    "My heart beats for you!",
    "You light up my world!",
    "I'm so lucky to know you!",
    "You're my favorite person!",
    "Forever and always!",
    "You mean everything to me!"
];

function burstHearts() {
    const container = document.getElementById("burstContainer");
    const counter = document.getElementById("heartCounter");
    const hearts = ["\u2665", "\u2764", "\u2661", "\u2763", "\uD83E\uDD70", "\uD83D\uDC96", "\uD83D\uDC97"];

    heartClickCount++;

    // Create burst of hearts
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement("div");
        heart.classList.add("burst-heart");
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        const angle = (Math.PI * 2 / 12) * i;
        const distance = Math.random() * 100 + 60;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        heart.style.setProperty("--tx", tx + "px");
        heart.style.setProperty("--ty", ty + "px");
        heart.style.left = "50%";
        heart.style.top = "50%";
        heart.style.fontSize = (Math.random() * 1.5 + 1) + "rem";

        container.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }

    // Show rotating love messages
    const msg = loveMessages[(heartClickCount - 1) % loveMessages.length];
    counter.textContent = msg;
    counter.style.color = "#e75480";
    counter.style.fontWeight = "700";
}

// ===== CYCLING USAHANA SPEECH BUBBLE =====
const usaSpeechMessages = [
    "Hey! Password first~",
    "Nuh uh! Not without the password!",
    "You can't come in without telling me~",
    "Password pleaseee~!",
    "Hmm... do you know the password?",
    "No sneaking in! Password!",
    "Hey hey~ type the password first!",
    "I'm guarding this! Password~",
    "Ehe~ you need the secret password!",
    "Only special people know it~!",
];

let usaSpeechIndex = 0;
setInterval(() => {
    const speechEl = document.querySelector('.usa-speech span');
    if (!speechEl) return;
    usaSpeechIndex = (usaSpeechIndex + 1) % usaSpeechMessages.length;
    speechEl.style.opacity = '0';
    setTimeout(() => {
        speechEl.textContent = usaSpeechMessages[usaSpeechIndex];
        speechEl.style.opacity = '1';
    }, 300);
}, 4000);

// ===== BEAT UP ADHAM SCREEN =====
let hitCount = 0;
let currentWeapon = 'bat';
const HITS_REQUIRED = 20;

const reactions = [
    "I'm genuinely so sorry...", "I deserve every bit of this",
    "I know I hurt you and I hate myself for it", "You deserved so much better than what I gave you",
    "I'm truly sorry from the bottom of my heart", "I think about what I did every single day",
    "I would do anything to take it back", "I know I broke your trust and I'm so sorry",
    "You didn't deserve any of that pain", "I failed you and I know it",
    "I should have treated you like the queen you are", "I'm sorry I wasn't the person you needed",
    "I hate that I'm the reason you cried", "You mean everything to me and I ruined it",
    "I will spend forever making it up to you", "I don't deserve your forgiveness but I'm begging",
    "I was so stupid... I'm so sorry", "You are the best thing that ever happened to me",
    "I'm sorry I took you for granted", "I promise I'll be better... I swear",
    "I never wanted to see you hurt, especially by me", "Every day I regret what I did",
    "You trusted me and I let you down... I'm sorry", "I would give anything to see you smile again",
    "I'm sorry... I know those words aren't enough", "I'll never stop trying to make things right",
    "You deserve the entire world and I gave you pain", "I'm so deeply sorry...",
    "I was wrong. Completely. I'm sorry.", "Please know that I truly care about you",
    "I'd rather feel this pain than ever hurt you again", "I'm sorry for every tear you shed because of me",
    "You are so special and I was too blind to see it", "I'm working on being better... for you",
    "I'm sorry I wasn't man enough to treat you right", "My biggest regret is making you feel unloved",
];

const weaponEffects = {
    bat: { emoji: "\u{1F3CF}", stars: ["\u2B50", "\u{1F4A5}", "\u26A1"], sound: "BONK!" },
    gloves: { emoji: "\u{1F94A}", stars: ["\u{1F4A2}", "\u{1F4A5}", "\u{1F94A}"], sound: "POW!" },
    knuckles: { emoji: "\u270A", stars: ["\u{1F4A5}", "\u{1F4AB}", "\u2604\uFE0F"], sound: "CRACK!" },
    hellokitty: { emoji: "\u{1F431}", stars: ["\u{1F338}", "\u2764\uFE0F", "\u{1F431}"], sound: "BONK! (with love)" },
    maria: { emoji: "\u{1F1E8}\u{1F1F1}", stars: ["\u2764\uFE0F", "\u{1F495}", "\u{1F496}", "\u{1F49E}", "\u{1F338}"], sound: "Maria..." },
};

const healReactions = [
    "M-Maria...?!", "I... I don't deserve you", "My heart...",
    "You're so beautiful...", "I can't breathe you're here",
    "Maria... I'm so sorry", "I love you so much...",
    "You healed me just by existing", "Maria my everything...",
    "I feel alive again...", "You're the only one who can fix me",
    "My heart is beating so fast...", "Maria... you're my whole world",
    "I don't deserve your kindness", "You make everything better...",
];

// Damage stages: [hitThreshold, cssSelector]
const damageStages = [
    [2,  '.dmg-bruise1'],
    [3,  '.dmg-bruise2'],
    [4,  '.dmg-blackeye-l'],
    [5,  '.dmg-bandage1'],
    [6,  '.dmg-bump1'],
    [7,  '.dmg-blackeye-r'],
    [8,  '.dmg-cut1'],
    [9,  '.dmg-nosebleed'],
    [10, '.dmg-bandage2'],
    [12, '.dmg-bruise3'],
    [14, '.dmg-bump2'],
    [16, '.dmg-cut2'],
    [18, '.dmg-swollen'],
    [19, '.dmg-body-bruise1'],
    [20, '.dmg-xeye-l'],
    [21, '.dmg-body-bruise2'],
    [22, '.dmg-xeye-r'],
    [23, '.dmg-arm-bandage'],
    [25, '.dmg-bandage-wrap'],
    [27, '.dmg-shirt-rip'],
    [28, '.dmg-tooth'],
];

function selectWeapon(weapon, el) {
    currentWeapon = weapon;
    document.querySelectorAll('.weapon-item').forEach(w => w.classList.remove('active'));
    el.classList.add('active');

    // Set weapon cursor on adham area
    const area = document.querySelector('.adham-area');
    if (area) {
        area.className = 'adham-area';
        if (weapon === 'pickup') {
            area.classList.add('pickup-mode');
        } else {
            area.classList.add('cursor-' + weapon);
        }
    }
}

function attackAdham() {
    // If Maria is selected, heal instead
    if (currentWeapon === 'maria') {
        healAdham();
        return;
    }
    // If pickup mode, don't attack on click (drag handles it)
    if (currentWeapon === 'pickup') return;
    hitCount++;
    const character = document.getElementById('adhamCharacter');
    const hitCountEl = document.getElementById('hitCount');
    const reactionEl = document.getElementById('reactionText');
    const effectsEl = document.getElementById('damageEffects');
    const mouth = document.getElementById('adhamMouth');
    const head = document.querySelector('.adham-head');
    const tears = document.getElementById('adhamTears');
    const continueBtn = document.getElementById('continueBtn');
    const weapon = weaponEffects[currentWeapon];

    // Update counter
    hitCountEl.textContent = hitCount;

    // Shake animation — gets more intense with more hits
    character.classList.remove('shake');
    void character.offsetWidth;
    character.classList.add('shake');

    // Flash effect
    character.classList.add('flash');
    setTimeout(() => character.classList.remove('flash'), 100);

    // Show reaction — always apologetic
    const reaction = reactions[Math.floor(Math.random() * reactions.length)];
    reactionEl.textContent = reaction;
    reactionEl.classList.remove('show');
    void reactionEl.offsetWidth;
    reactionEl.classList.add('show');
    setTimeout(() => reactionEl.classList.remove('show'), 5000);

    // Spawn hit stars/effects — more stars as hits increase
    const starCount = Math.min(5 + Math.floor(hitCount / 3), 12);
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('hit-star');
        star.textContent = weapon.stars[Math.floor(Math.random() * weapon.stars.length)];
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 80 + 40;
        star.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
        star.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
        star.style.left = '50%';
        star.style.top = '40%';
        effectsEl.appendChild(star);
        setTimeout(() => star.remove(), 800);
    }

    // Apply all damage stages
    damageStages.forEach(([threshold, selector]) => {
        if (hitCount >= threshold) {
            const el = document.querySelector(selector);
            if (el) el.style.opacity = '1';
        }
    });

    // Mouth progression
    mouth.className = 'adham-mouth';
    if (hitCount >= 3 && hitCount < 7) mouth.classList.add('worried');
    if (hitCount >= 7 && hitCount < 15) mouth.className = 'adham-mouth pain';
    if (hitCount >= 15) mouth.className = 'adham-mouth crying';

    // Head bruising color
    head.classList.remove('bruised', 'very-bruised', 'wrecked');
    if (hitCount >= 8 && hitCount < 16) head.classList.add('bruised');
    if (hitCount >= 16 && hitCount < 24) head.classList.add('very-bruised');
    if (hitCount >= 24) head.classList.add('wrecked');

    // Tears start at hit 12
    if (hitCount >= 12) tears.style.opacity = '1';

    // Arms droop at high damage
    const armL = document.getElementById('adhamArmL');
    const armR = document.getElementById('adhamArmR');
    if (hitCount >= 15 && armL && armR) {
        armL.style.transform = 'rotate(25deg)';
        armR.style.transform = 'rotate(-25deg)';
        armL.style.transition = 'transform 0.5s';
        armR.style.transition = 'transform 0.5s';
    }
    if (hitCount >= 25 && armL && armR) {
        armL.style.transform = 'rotate(40deg)';
        armR.style.transform = 'rotate(-40deg)';
    }

    // Character tilts at extreme damage
    if (hitCount >= 20 && hitCount < 50) {
        character.style.transform = `rotate(${Math.sin(hitCount) * 3}deg)`;
    }
    if (hitCount >= 30 && hitCount < 50) {
        character.style.transform = `rotate(${Math.sin(hitCount) * 6}deg) scale(0.95)`;
    }

    // Kneeling at 20+ hits
    if (hitCount >= 20) {
        character.classList.add('kneeling');
    }

    // Sobbing/crying at 50+ hits
    if (hitCount >= 50) {
        character.classList.add('sobbing');
        character.style.transform = '';
    }

    // Unlock continue at required hits
    if (hitCount >= HITS_REQUIRED) {
        continueBtn.classList.remove('disabled');
        continueBtn.classList.add('enabled');
    }
}

function healAdham() {
    const character = document.getElementById('adhamCharacter');
    const head = document.querySelector('.adham-head');
    const mouth = document.getElementById('adhamMouth');
    const tears = document.getElementById('adhamTears');
    const reactionEl = document.getElementById('reactionText');
    const effectsEl = document.getElementById('damageEffects');
    const armL = document.getElementById('adhamArmL');
    const armR = document.getElementById('adhamArmR');

    // Reset hit count to 0 (but keep continue unlocked if it was)
    hitCount = 0;
    document.getElementById('hitCount').textContent = '0';

    // Remove ALL damage
    document.querySelectorAll('.dmg').forEach(el => el.style.opacity = '0');

    // Reset head color
    head.classList.remove('bruised', 'very-bruised', 'wrecked');

    // Stop tears
    tears.style.opacity = '0';

    // Reset arms
    if (armL && armR) {
        armL.style.transform = 'rotate(10deg)';
        armR.style.transform = 'rotate(-10deg)';
    }

    // Reset character tilt
    character.style.transform = '';

    // Remove kneeling/sobbing
    character.classList.remove('kneeling', 'sobbing');

    // Heal glow
    character.classList.remove('healed');
    void character.offsetWidth;
    character.classList.add('healed');

    // Love mouth (happy smile)
    mouth.className = 'adham-mouth love';

    // Add heart eyes
    document.querySelectorAll('.heart-eye-overlay').forEach(el => el.remove());
    const heartL = document.createElement('div');
    heartL.className = 'heart-eye-overlay left';
    heartL.textContent = '\u2764\uFE0F';
    const heartR = document.createElement('div');
    heartR.className = 'heart-eye-overlay right';
    heartR.textContent = '\u2764\uFE0F';
    head.appendChild(heartL);
    head.appendChild(heartR);

    // Add big blush
    document.querySelectorAll('.adham-lovebush').forEach(el => el.remove());
    const blushL = document.createElement('div');
    blushL.className = 'adham-lovebush left';
    const blushR = document.createElement('div');
    blushR.className = 'adham-lovebush right';
    head.appendChild(blushL);
    head.appendChild(blushR);

    // Show love reaction
    const reaction = healReactions[Math.floor(Math.random() * healReactions.length)];
    reactionEl.textContent = reaction;
    reactionEl.classList.remove('show');
    void reactionEl.offsetWidth;
    reactionEl.classList.add('show');
    setTimeout(() => reactionEl.classList.remove('show'), 5000);

    // Burst of hearts
    const hearts = ["\u2764\uFE0F", "\u{1F495}", "\u{1F496}", "\u{1F49E}", "\u{1F338}", "\u{1F1E8}\u{1F1F1}"];
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heal-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = (30 + Math.random() * 40) + '%';
        heart.style.top = (30 + Math.random() * 30) + '%';
        heart.style.animationDelay = (Math.random() * 0.5) + 's';
        effectsEl.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
    }

    // Remove heart eyes and blush after 4 seconds if user switches weapon
    setTimeout(() => {
        if (currentWeapon !== 'maria') {
            document.querySelectorAll('.heart-eye-overlay').forEach(el => el.remove());
            document.querySelectorAll('.adham-lovebush').forEach(el => el.remove());
            mouth.className = 'adham-mouth';
        }
    }, 4000);
}

// ===== PICK UP & THROW RAGDOLL =====
let isDragging = false;
let dragOffsetX = 0, dragOffsetY = 0;
let velocityX = 0, velocityY = 0;
let lastMouseX = 0, lastMouseY = 0;
let adhamX = 0, adhamY = 0;
let isRagdoll = false;
let throwAnimId = null;
const throwReactions = [
    "I deserve this too...", "I earned every bit of that",
    "I'm so sorry... even this isn't enough", "Throw me harder, I deserve it",
    "I know I deserve worse than this", "I'm sorry... I won't complain",
    "This pain is nothing compared to what I put you through",
    "I deserve to be thrown around...", "I'm sorry for everything...",
    "I know I messed up... keep going", "I deserve this and more",
    "You have every right...", "I'm truly sorry...",
];

function initPickupMode() {
    const area = document.querySelector('.adham-area');
    const character = document.getElementById('adhamCharacter');

    area.addEventListener('mousedown', startDrag);
    area.addEventListener('touchstart', startDragTouch, { passive: false });
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDragTouch, { passive: false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    function startDrag(e) {
        if (currentWeapon !== 'pickup') return;
        const rect = character.getBoundingClientRect();
        const areaRect = area.getBoundingClientRect();
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;

        isDragging = true;
        if (throwAnimId) { cancelAnimationFrame(throwAnimId); throwAnimId = null; }

        // Enter ragdoll mode
        if (!isRagdoll) {
            isRagdoll = true;
            character.classList.add('ragdoll');
            character.style.position = 'absolute';
            adhamX = rect.left - areaRect.left;
            adhamY = rect.top - areaRect.top;
        }

        dragOffsetX = e.clientX - areaRect.left - adhamX;
        dragOffsetY = e.clientY - areaRect.top - adhamY;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        velocityX = 0;
        velocityY = 0;
        e.preventDefault();
    }

    function startDragTouch(e) {
        if (currentWeapon !== 'pickup' || !e.touches.length) return;
        const touch = e.touches[0];
        startDrag({ clientX: touch.clientX, clientY: touch.clientY, preventDefault: () => e.preventDefault() });
    }

    function onDrag(e) {
        if (!isDragging) return;
        const areaRect = area.getBoundingClientRect();
        velocityX = e.clientX - lastMouseX;
        velocityY = e.clientY - lastMouseY;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;

        adhamX = e.clientX - areaRect.left - dragOffsetX;
        adhamY = e.clientY - areaRect.top - dragOffsetY;

        character.style.left = adhamX + 'px';
        character.style.top = adhamY + 'px';
        character.style.transform = `rotate(${velocityX * 2}deg)`;
    }

    function onDragTouch(e) {
        if (!isDragging || !e.touches.length) return;
        e.preventDefault();
        onDrag({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;

        // Throw with velocity
        const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        if (speed > 3) {
            throwAdham(velocityX * 2, velocityY * 2);
        }
    }
}

function throwAdham(vx, vy) {
    const area = document.querySelector('.adham-area');
    const character = document.getElementById('adhamCharacter');
    const areaRect = area.getBoundingClientRect();
    const gravity = 0.5;
    const bounce = 0.6;
    const friction = 0.98;
    const charW = 140, charH = 250;
    let rotation = 0;
    let rotSpeed = vx * 0.5;

    function frame() {
        vy += gravity;
        vx *= friction;

        adhamX += vx;
        adhamY += vy;
        rotation += rotSpeed;
        rotSpeed *= 0.98;

        let hitWall = false;

        // Bounce off walls
        if (adhamX < 0) {
            adhamX = 0; vx = -vx * bounce; rotSpeed = -rotSpeed * 0.7; hitWall = true;
        }
        if (adhamX + charW > areaRect.width) {
            adhamX = areaRect.width - charW; vx = -vx * bounce; rotSpeed = -rotSpeed * 0.7; hitWall = true;
        }
        if (adhamY < 0) {
            adhamY = 0; vy = -vy * bounce; hitWall = true;
        }
        if (adhamY + charH > areaRect.height) {
            adhamY = areaRect.height - charH; vy = -vy * bounce; rotSpeed *= 0.8; hitWall = true;
        }

        // Damage on wall hit
        if (hitWall) {
            const impactForce = Math.sqrt(vx * vx + vy * vy);
            if (impactForce > 3) {
                // Add multiple hits based on impact
                const hits = Math.min(Math.floor(impactForce / 3), 5);
                for (let i = 0; i < hits; i++) hitCount++;
                document.getElementById('hitCount').textContent = hitCount;

                // Apply damage visuals
                applyDamageVisuals();

                // Wall flash
                area.classList.remove('wall-flash');
                void area.offsetWidth;
                area.classList.add('wall-flash');

                // Show reaction
                const reactionEl = document.getElementById('reactionText');
                reactionEl.textContent = throwReactions[Math.floor(Math.random() * throwReactions.length)];
                reactionEl.classList.remove('show');
                void reactionEl.offsetWidth;
                reactionEl.classList.add('show');
                setTimeout(() => reactionEl.classList.remove('show'), 1500);

                // Spawn impact stars
                const effectsEl = document.getElementById('damageEffects');
                for (let i = 0; i < 4; i++) {
                    const star = document.createElement('div');
                    star.classList.add('hit-star');
                    star.textContent = ["\u{1F4A5}", "\u2B50", "\u{1F4AB}", "\u26A1"][Math.floor(Math.random() * 4)];
                    const angle = Math.random() * Math.PI * 2;
                    const dist = Math.random() * 60 + 30;
                    star.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
                    star.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
                    star.style.left = (adhamX + charW / 2) + 'px';
                    star.style.top = (adhamY + 40) + 'px';
                    effectsEl.appendChild(star);
                    setTimeout(() => star.remove(), 800);
                }

                // Unlock continue
                if (hitCount >= HITS_REQUIRED) {
                    document.getElementById('continueBtn').classList.remove('disabled');
                    document.getElementById('continueBtn').classList.add('enabled');
                }
            }
        }

        character.style.left = adhamX + 'px';
        character.style.top = adhamY + 'px';
        character.style.transform = `rotate(${rotation}deg)`;

        // Stop when slow enough
        if (Math.abs(vx) < 0.5 && Math.abs(vy) < 0.5 && adhamY + charH >= areaRect.height - 5) {
            character.style.transform = `rotate(0deg)`;
            throwAnimId = null;
            return;
        }

        throwAnimId = requestAnimationFrame(frame);
    }

    throwAnimId = requestAnimationFrame(frame);
}

function applyDamageVisuals() {
    const head = document.querySelector('.adham-head');
    const mouth = document.getElementById('adhamMouth');
    const tears = document.getElementById('adhamTears');

    damageStages.forEach(([threshold, selector]) => {
        if (hitCount >= threshold) {
            const el = document.querySelector(selector);
            if (el) el.style.opacity = '1';
        }
    });

    mouth.className = 'adham-mouth';
    if (hitCount >= 3 && hitCount < 7) mouth.classList.add('worried');
    if (hitCount >= 7 && hitCount < 15) mouth.className = 'adham-mouth pain';
    if (hitCount >= 15) mouth.className = 'adham-mouth crying';

    head.classList.remove('bruised', 'very-bruised', 'wrecked');
    if (hitCount >= 8 && hitCount < 16) head.classList.add('bruised');
    if (hitCount >= 16 && hitCount < 24) head.classList.add('very-bruised');
    if (hitCount >= 24) head.classList.add('wrecked');

    if (hitCount >= 12) tears.style.opacity = '1';

    const character = document.getElementById('adhamCharacter');
    if (hitCount >= 20) character.classList.add('kneeling');
    if (hitCount >= 50) character.classList.add('sobbing');
}

// Initialize pickup mode when page loads
document.addEventListener('DOMContentLoaded', () => {
    initPickupMode();
    // Set default cursor
    const area = document.querySelector('.adham-area');
    if (area) area.classList.add('cursor-bat');
});

function continueToLetter() {
    if (hitCount < HITS_REQUIRED) return;

    document.getElementById("beatScreen").style.opacity = "0";
    document.getElementById("beatScreen").style.transition = "opacity 0.8s ease";

    setTimeout(() => {
        document.getElementById("beatScreen").classList.add("hidden");
        document.getElementById("letterScreen").classList.remove("hidden");
        document.getElementById("letterScreen").style.opacity = "0";
        requestAnimationFrame(() => {
            document.getElementById("letterScreen").style.transition = "opacity 1.5s ease";
            document.getElementById("letterScreen").style.opacity = "1";
        });
        saveScreen('letter');
    }, 800);
}

function continueToFinal() {
    document.getElementById("letterScreen").style.opacity = "0";
    document.getElementById("letterScreen").style.transition = "opacity 0.8s ease";

    setTimeout(() => {
        document.getElementById("letterScreen").classList.add("hidden");
        document.getElementById("finalScreen").classList.remove("hidden");
        document.getElementById("finalScreen").style.opacity = "0";
        requestAnimationFrame(() => {
            document.getElementById("finalScreen").style.transition = "opacity 1.5s ease";
            document.getElementById("finalScreen").style.opacity = "1";
        });
        saveScreen('final');
    }, 800);
}

function goToChoice() {
    document.getElementById("finalScreen").style.opacity = "0";
    document.getElementById("finalScreen").style.transition = "opacity 0.8s ease";

    setTimeout(() => {
        document.getElementById("finalScreen").classList.add("hidden");
        document.getElementById("choiceScreen").classList.remove("hidden");
        document.getElementById("choiceScreen").style.opacity = "0";
        requestAnimationFrame(() => {
            document.getElementById("choiceScreen").style.transition = "opacity 1s ease";
            document.getElementById("choiceScreen").style.opacity = "1";
        });
        saveScreen('choice');
    }, 800);
}

function pickChoice(choice) {
    if (choice === 'everything') {
        document.getElementById("choiceScreen").style.opacity = "0";
        document.getElementById("choiceScreen").style.transition = "opacity 0.8s ease";

        setTimeout(() => {
            document.getElementById("choiceScreen").classList.add("hidden");
            document.getElementById("mainContent").classList.remove("hidden");
            document.getElementById("mainContent").style.opacity = "0";
            requestAnimationFrame(() => {
                document.getElementById("mainContent").style.transition = "opacity 1s ease";
                document.getElementById("mainContent").style.opacity = "1";
            });
            initScrollReveal();
            createSparkles();
            saveScreen('main');
        }, 800);
    } else if (choice === 'sudoku') {
        saveScreen('choice');
        window.location.href = '/sudoku/';
    }
}
