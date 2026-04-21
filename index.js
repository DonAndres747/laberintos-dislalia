// Constants inline — index.js must stay a plain script (not a module)
// so AFRAME.registerComponent runs synchronously before the scene initializes.
const PHRASE_DISPLAY_MS = 5000;
const SCORE_DISPLAY_MS = 5000;
const TOTAL_QUESTIONS = 15;

localStorage.clear();

// Loading screen — animates the bar smoothly while waiting for scene.loaded.
// The fake animation avoids the "stuck at 0%" problem since A-Frame 0.9.x
// doesn't expose a progress event on <a-scene>. The bar reaches ~90% on its own
// and jumps to 100% when all assets are actually done.
window.addEventListener('load', () => {
    const bar = document.getElementById('loading-bar');
    const pct = document.getElementById('loading-pct');
    const screen = document.getElementById('loading-screen');
    const scene = document.querySelector('a-scene');
    let current = 0;
    let animId;

    const tick = () => {
        if (current < 90) {
            current += (90 - current) * 0.015;
            bar.style.width = current.toFixed(1) + '%';
            pct.textContent = Math.round(current) + '%';
            animId = requestAnimationFrame(tick);
        }
    };

    const finish = () => {
        cancelAnimationFrame(animId);
        bar.style.width = '100%';
        pct.textContent = '100%';

        // Pre-compile all shaders and upload textures to GPU now,
        // while the loading screen is still visible, so the first camera
        // turn doesn't stutter.
        if (scene.renderer && scene.camera) {
            scene.renderer.compile(scene.object3D, scene.camera);
        }

        screen.style.opacity = '0';
        setTimeout(() => screen.remove(), 500);
    };

    if (scene.hasLoaded) { finish(); return; }
    requestAnimationFrame(tick);
    scene.addEventListener('loaded', finish);
});

AFRAME.registerComponent('collider', {
    init: function () {
        this.el.addEventListener('collide', function (e) {
            const triggerEl = e.detail.body.el;
            if (triggerEl.id !== 'trigger') return;

            const audio    = triggerEl.getAttribute('audio');
            const opc1     = triggerEl.getAttribute('opc1');
            const opc2     = triggerEl.getAttribute('opc2');
            const pos1     = triggerEl.getAttribute('post1');
            const pos2     = triggerEl.getAttribute('post2');
            const posW     = triggerEl.getAttribute('postW');
            const rotation = triggerEl.getAttribute('rt') ?? triggerEl.getAttribute('rotation');
            const rotW     = triggerEl.getAttribute('rtW');
            const src1     = triggerEl.getAttribute('src1');
            const src2     = triggerEl.getAttribute('src2');
            const depth    = triggerEl.getAttribute('depth1');
            const depthW   = triggerEl.getAttribute('depthW');
            const wallId   = triggerEl.getAttribute('nMuro');
            const rspType1 = triggerEl.getAttribute('rspTyp1');
            const rspType2 = triggerEl.getAttribute('rspTyp2');
            const widthW   = triggerEl.getAttribute('widthW');
            const heightW  = triggerEl.getAttribute('heightW');

            createOption(opc1, opc2, pos1, rotation, src1, depth, wallId, rspType1);
            createOption(opc1, opc2, pos2, rotation, src2, depth, wallId, rspType2);
            createWall(wallId, posW, rotW ?? rotation, depthW, widthW, heightW);

            document.querySelector("#" + audio).play();
            triggerEl.parentNode.removeChild(triggerEl);
        });
    }
});

function empezar() {
    document.querySelector('#start-plane').removeAttribute('onclick');
    document.querySelector("#player").setAttribute("position", "0 0 -1");
    document.querySelector("#luz").setAttribute("light", "intensity: 1");
    document.querySelector("#hud-counter").setAttribute("visible", "true");
}

let score = 0;
let questionsAnswered = 0;
let correctAnswers = 0;

function updateHud() {
    document.querySelector('#hud-counter').setAttribute('text', 'value', `${questionsAnswered} / ${TOTAL_QUESTIONS}`);
}

function onCorrect(opc1, opc2, wallId, sceneEl) {
    document.querySelector("#muro" + wallId).remove();
    sceneEl.querySelector("#" + opc1 + "Opc").remove();
    document.querySelector("#" + opc2 + "Opc").remove();
    score += 10;
    questionsAnswered++;
    correctAnswers++;
    updateHud();
}

function onWrong(opc1, opc2, wallId, sceneEl) {
    document.querySelector("#muro" + wallId).remove();
    sceneEl.querySelector("#" + opc1 + "Opc").remove();
    document.querySelector("#" + opc2 + "Opc").remove();
    questionsAnswered++;
    updateHud();
}

function createOption(opc1, opc2, position, rotation, src, depth, wallId, responseType) {
    const sceneEl = document.querySelector('a-scene');
    const box = document.createElement('a-box');

    box.setAttribute('id', (responseType === 'bien' ? opc1 : opc2) + "Opc");
    box.setAttribute('visible', 'true');
    box.setAttribute('position', position);
    box.setAttribute('rotation', rotation);
    box.setAttribute('src', src);
    box.setAttribute('depth', depth);
    box.onclick = () => {
        responseType === 'bien'
            ? onCorrect(opc1, opc2, wallId, sceneEl)
            : onWrong(opc1, opc2, wallId, sceneEl);
    };
    sceneEl.appendChild(box);
}

function createWall(wallId, position, rotation, depth, width, height) {
    const sceneEl = document.querySelector('a-scene');
    const wall = document.createElement('a-box');

    wall.setAttribute('id', "muro" + wallId);
    wall.setAttribute('visible', 'false');
    wall.setAttribute('position', position);
    wall.setAttribute('rotation', rotation);
    wall.setAttribute('depth', depth ?? '0.1');
    wall.setAttribute('width', width ?? '6');
    wall.setAttribute('height', height ?? '2');
    wall.setAttribute('static-body', '');
    sceneEl.appendChild(wall);
}

function showPhrase(position, src, width, height, rotation, onComplete) {
    const sceneEl = document.querySelector('a-scene');
    const phrase = document.createElement('a-plane');

    phrase.setAttribute('id', 'frase');
    phrase.setAttribute('position', position);
    phrase.setAttribute('src', src);
    phrase.setAttribute('material', "transparent:true");
    phrase.setAttribute('depth', '0.1');
    phrase.setAttribute('width', width);
    phrase.setAttribute('height', height);
    phrase.setAttribute('rotation', rotation ?? '0 0 0');
    sceneEl.appendChild(phrase);

    setTimeout(() => {
        sceneEl.removeChild(phrase);
        if (onComplete) onComplete();
    }, PHRASE_DISPLAY_MS);
}

function finalScore() {
    document.querySelector("#AC").play();

    const overlay = document.createElement('div');
    overlay.id = 'score-overlay';
    overlay.innerHTML = `
        <h2>¡Felicidades!</h2>
        <p class="label">Tu puntuación es:</p>
        <p class="value">${score}</p>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
            showScoreScreen();
        }, 500);
    }, SCORE_DISPLAY_MS);
}

function showScoreScreen() {
    document.exitPointerLock();
    const sceneEl = document.querySelector('a-scene');

    const wrapper = document.createElement('div');
    wrapper.setAttribute('style', "background-color:transparent;width:100%;height:100%;align-items:center;display:flex;justify-content:center;");

    const container = document.createElement('div');
    container.setAttribute('id', "menuContainer");
    container.setAttribute('class', "menuContainer");
    container.setAttribute('style', "width:100%;height:100%;align-items:center;display:flex;justify-content:center;border-radius:10%;z-index:1");

    const frame = document.createElement('iframe');
    frame.setAttribute('src', `./pages/puntuacion.html?score=${score}&answered=${questionsAnswered}&correct=${correctAnswers}&newScore=true`);
    frame.setAttribute('id', "iframe");
    frame.setAttribute('width', "100%");
    frame.setAttribute('height', "100%");
    frame.setAttribute('scrolling', "no");
    frame.setAttribute('frameborder', "0");
    frame.setAttribute('marginheight', "0");
    frame.setAttribute('marginwidth', "0");

    container.appendChild(frame);
    wrapper.appendChild(container);
    sceneEl.appendChild(wrapper);
}
