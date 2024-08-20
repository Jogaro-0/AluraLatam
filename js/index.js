

let selectedEncryption = 'morse';
let caesarShift = 13;

const morseCode = {
    'A': '.-',    'B': '-...',  'C': '-.-.',  'D': '-..',   'E': '.',
    'F': '..-.',  'G': '--.',   'H': '....',  'I': '..',    'J': '.---',
    'K': '-.-',   'L': '.-..',  'M': '--',    'N': '-.',    'O': '---',
    'P': '.--.',  'Q': '--.-',  'R': '.-.',   'S': '...',   'T': '-',
    'U': '..-',   'V': '...-',  'W': '.--',   'X': '-..-',  'Y': '-.--',
    'Z': '--..',  '1': '.----', '2': '..---', '3': '...--', '4': '....-', 
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', 
    '0': '-----', ' ': ' ',
};

const numberCode = {
    'A': '1', 'B': '2', 'C': '3', 'D': '4', 'E': '5',
    'F': '6', 'G': '7', 'H': '8', 'I': '9', 'J': '10',
    'K': '11', 'L': '12', 'M': '13', 'N': '14', 'O': '15',
    'P': '16', 'Q': '17', 'R': '18', 'S': '19', 'T': '20',
    'U': '21', 'V': '22', 'W': '23', 'X': '24', 'Y': '25',
    'Z': '26', ' ': '0',
    '1': '27', '2': '28', '3': '29', '4': '30', '5': '31',
    '6': '32', '7': '33', '8': '34', '9': '35', '0': '36'
};

function reverseString(text) {
    return text.split('').reverse().join('');
}

function caesarCipher(text, shift) {
    return text.split('').map(char => {
        let code = char.charCodeAt(0);

        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + shift) % 26) + 65);
        }

        if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }

        return char;
    }).join('');
}

function caesarDecipher(text, shift) {
    return caesarCipher(text, 26 - shift);
}

const morseCodeReverse = Object.fromEntries(Object.entries(morseCode).map(([key, value]) => [value, key]));
const numberCodeReverse = Object.fromEntries(Object.entries(numberCode).map(([key, value]) => [value, key]));

function encrypt(text) {
    if (selectedEncryption === 'morse') {
        return text.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
    } else if (selectedEncryption === 'number') {
        return text.toUpperCase().split('').map(char => numberCode[char] || char).join(' ');
    } else if (selectedEncryption === 'reverse') {
        return reverseString(text);
    } else if (selectedEncryption === 'caesar') {
        return caesarCipher(text, caesarShift);
    }
}

function decrypt(code) {
    if (selectedEncryption === 'morse') {
        return code.split(' ').map(symbol => morseCodeReverse[symbol] || symbol).join('');
    } else if (selectedEncryption === 'number') {
        return code.split('').map(num => numberCodeReverse[num] || num).join('');
    } else if (selectedEncryption === 'reverse') {
        return reverseString(code);
    } else if (selectedEncryption === 'caesar') {
        return caesarDecipher(code, caesarShift);
    }
}

const sidebarButtons = document.querySelectorAll('.side__button');
sidebarButtons.forEach(button => {
    button.addEventListener('click', () => {
        sidebarButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        
        switch(button.dataset.name) {
            case 'morse':
                selectedEncryption = 'morse';
                break;
            case 'number':
                selectedEncryption = 'number';
                break;
            case 'reverse':
                selectedEncryption = 'reverse';
                break;
            case 'caesar':
                selectedEncryption = 'caesar';
                break;
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const encryptButton = document.querySelector('.select__button:nth-child(1)');
    const decryptButton = document.querySelector('.select__button:nth-child(2)');
    const inputTextarea = document.querySelector('.box__text textarea:nth-child(1)');
    const outputTextarea = document.querySelector('.box__text textarea:nth-child(2)');

    encryptButton.addEventListener('click', () => {
        const inputText = inputTextarea.value;
        const outputText = encrypt(inputText);
        outputTextarea.value = outputText;
    });

    decryptButton.addEventListener('click', () => {
        const inputMorse = outputTextarea.value;
        const outputText = decrypt(inputMorse);
        inputTextarea.value = outputText;
    });
});

const modeToggle = document.querySelector('.icon__mode');
const body = document.body;
const toggleIcons = document.querySelectorAll('.img__side, .icon__mode');

modeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');

    toggleIcons.forEach(icon => {
        if (body.classList.contains('dark-mode')) {
            icon.src = icon.src.replace('_light.png', '_dark.png');
        } else {
            icon.src = icon.src.replace('_dark.png', '_light.png');
        }
    });
});