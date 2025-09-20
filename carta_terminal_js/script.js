
                                
const commands = [
    { text: 'system.scan --user=JAZMIN', delay: 100, pause: 1200 },
    { text: 'Scan complete. Status: Pseudo soltera', delay: 50, pause: 800 },
    { text: 'love_protocol.exe --initiate', delay: 80, pause: 1500 },
    { text: 'run --module="chistes_internos.dll"', delay: 100, pause: 1200 },
    { text: 'Preparing question...', delay: 100, pause: 1800 },
    { text: 'Awaiting response for: ¿te gustó? (Pon Y para si o N para no)', delay: 120, isQuestion: true },

];

const successMessage = `
> Access Granted. Iniciando protocolo "RAMO_DE_FLORES.exe"...

            ✿ ❀ ✿ ❀ ✿
        ❀ ✿ ❀ ✿ ❀ ✿ ❀
      ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿
        ❀ ✿ ❀ ✿ ❀ ✿ ❀
           ✿ ❀ ✿ ❀ ✿
               ❀ ✿
                ❀
                ❀
                ❀
                ❀
                ❀
                ❀

`;

const successArt = `
      .-.   .-.   .-.   .-.   .-.   .-.   .-.
     (   \`-'   \`-'   \`-'   \`-'   \`-'   \`-'   )
      \`-.   .-'   .-'   .-'   .-'   .-'   .-'
         \`-'   \`-'   \`-'   \`-'   \`-'   \`-'
`;
const errorMessage = '> Secuencia rechazada. Recalibrando sentimientos... ¿y que tal una patada? Reiniciando protocolo en 3... 2... 1...';


const outputEl = document.getElementById('output');
const currentLineEl = document.getElementById('current-line');
const terminalEl = document.getElementById('terminal');
let commandIndex = 0;

function typeWriter(text, element, delay, callback) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;

            const contentArea = terminalEl.querySelector('#terminal-content');
            contentArea.scrollTop = contentArea.scrollHeight;
            setTimeout(type, delay);
        } else if (callback) {
            callback();
        }
    }
    type();
}

function processCommands() {

    if (commandIndex >= commands.length) return;

    const command = commands[commandIndex];

    typeWriter(command.text, currentLineEl, command.delay, () => {

        outputEl.innerHTML += '<div>' + currentLineEl.innerHTML + '</div>';
        currentLineEl.innerHTML = '';

        if (command.isQuestion) {

            waitForInput();
        } else {

            commandIndex++;
            setTimeout(processCommands, command.pause || 1000);
        }
    });
}

function waitForInput() {
    document.addEventListener('keydown', handleKey);
}

function handleKey(e) {
    const key = e.key.toUpperCase();

    if (key !== 'Y' && key !== 'N') return;

    document.removeEventListener('keydown', handleKey);

    outputEl.innerHTML += '<div>' + currentLineEl.innerHTML + ' ' + key + '</div>';
    currentLineEl.innerHTML = '';

    if (key === 'Y') {
        handleSuccess();
    } else {
        handleFailure();
    }
}

function handleSuccess() {

    const successContainer = document.createElement('pre');
    successContainer.className = 'success-message';
    typeWriter(successMessage, successContainer, 50, () => {
        const artContainer = document.createElement('pre');
        artContainer.className = 'success-art';
        typeWriter(successArt, artContainer, 20, null);
        outputEl.appendChild(artContainer);

        const contentArea = terminalEl.querySelector('#terminal-content');
        contentArea.scrollTop = contentArea.scrollHeight;
    });
    outputEl.appendChild(successContainer);
}

function handleFailure() {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message';
    typeWriter(errorMessage, errorContainer, 75, () => {

        setTimeout(() => {
            outputEl.innerHTML = '';
            currentLineEl.innerHTML = '';
            commandIndex = 0;
            processCommands();
        }, 3000);
    });
    outputEl.appendChild(errorContainer);
}
function startLoading() {
    const loadingText = 'Initializing LoveOS v2.0...';
    const loadingBarContainer = document.createElement('div');
    outputEl.appendChild(loadingBarContainer);

    typeWriter(loadingText, loadingBarContainer, 50, () => {
        let bar = '[';
        let percent = 0;
        const barElement = document.createElement('div');
        outputEl.appendChild(barElement);

        const interval = setInterval(() => {
            bar += '#';
            percent += 5;

            barElement.innerText = bar + ' '.repeat(20 - percent/5) + '] ' + percent + '%';
            if (percent >= 100) {
                clearInterval(interval);

                setTimeout(() => {
                    outputEl.innerHTML = '';
                    processCommands();
                }, 500);
            }
        }, 100);
    });
}
window.onload = () => {
    const minimizeBtn = document.getElementById('minimize-btn');
    const maximizeBtn = document.getElementById('maximize-btn');
    const closeBtn = document.getElementById('close-btn');
    const titleBar = document.getElementById('title-bar');

    let isDragging = false;
    let offsetX, offsetY;

    titleBar.addEventListener('mousedown', (e) => {

        if (window.innerWidth < 600) return;
        isDragging = true;

        terminalEl.style.position = 'absolute';
        offsetX = e.clientX - terminalEl.offsetLeft;
        offsetY = e.clientY - terminalEl.offsetTop;
        titleBar.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        terminalEl.style.left = (e.clientX - offsetX) + 'px';
        terminalEl.style.top = (e.clientY - offsetY) + 'px';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        titleBar.style.cursor = 'grab';
        document.body.style.userSelect = '';
    });

    minimizeBtn.addEventListener('click', () => {
        alert("¡Ouch! No me minimices, que me da complejo.");
    });
    maximizeBtn.addEventListener('click', () => {
        alert("¡WOW! Me siento GRANDE. Aunque en realidad no cambio de tamaño.");
    });
    closeBtn.addEventListener('click', () => {
        alert("No puedes cerrarme... el destino nos unió. <3");
    });

    startLoading();
};
                                         