/* ====== Imports ====== */
import { fromEvent, Subject } from "rxjs";
import WORDS_LIST from "./wordsList.json";

/* ====== Variables ====== */
let letterIndex = 0;
let letterRowIndex = 0;
let userAnswer = []; // [C, U, R, S, O]
const getRandomWord = () => WORDS_LIST[Math.round(Math.random()*WORDS_LIST.length)];
let rightWord = getRandomWord();
console.log(`Right word: ${rightWord}`);

const theme_toggler = document.querySelector('#theme_toggler');
const messageText = document.querySelector(".message-text");
const restartBtn = document.querySelector(".restart-button");
const letterRows = document.getElementsByClassName("letter-row");

/* ====== Observables ====== */
const onKeyDown$ = fromEvent(document, "keydown");

/* ====== Observers ====== */
const insertLetter = {
    next: (event) => {
        const pressedKey = event.key.toUpperCase();

        // Condicional para que solo se tomen las letras
        if (pressedKey.length === 1 && pressedKey.match(/[a-z]/i)) {
            let letterBox = Array.from(letterRows)[letterRowIndex].children[letterIndex];
            letterBox.textContent = pressedKey;
            letterBox.classList.add("filled-letter");
            userAnswer.push(pressedKey);

            letterIndex++;
        } 
    }
};

const deleteLetter = {
    next: (event) => {
        const pressedKey = event.key.toUpperCase();

        // Verificamos si es la tecla BACKSPACE y que no estemos en la primera posición [0]. 
        if (pressedKey === "BACKSPACE" && letterIndex !== 0) {
            let currentRow = letterRows[letterRowIndex];
            let letterBox = currentRow.children[letterIndex - 1];
            letterBox.textContent = "";
            letterBox.classList.remove("filled-letter");
            letterIndex--;
            userAnswer.pop();
        }
    }
};

const checkWord = {
    next: (event) => {
        if (event.key === "Enter") {
            if (userAnswer.length !== 5) {
                messageText.textContent = `¡Te faltan ${5 - userAnswer.length} letras!`;
                return; // <- Este return nos permite parar la ejecución del observable
            }

            console.log(userAnswer.join(""));
            console.log(rightWord);

            // Iteramos sobre las letras en índices [0,1,2,3,4]
            userAnswer.map((_, i) => {
                let letterColor = "";
                let letterBox = letterRows[letterRowIndex].children[i];

                // Verificamos si la posición de la letra del usuario coincide con la posición correcta, si la letra no se encuentra, indexOd() devolverá -1.
                let letterPosition = rightWord.indexOf(userAnswer[i]);

                if (rightWord[i] === userAnswer[i]) {
                    letterColor = "letter-green"; // Pintar de verde 🟩 si coincide letra[posición]
                } else {
                    if (letterPosition === -1) {
                        letterColor = "letter-grey"; // Pintar de gris ⬜️ si no coincide letra o posición
                    } else {
                        letterColor = "letter-yellow"; // Pintar de amarillo 🟨 si coincide letra, pero no posición
                    }
                }
                
                letterBox.classList.add(letterColor);
            });

            if (userAnswer.join("") === rightWord) {
                messageText.textContent = "Adivinaste la palabra, ¡Felicidades!";
                restartBtn.disabled = false;
                return;
            }

            if (userAnswer.length === 5) {
                letterIndex = 0;
                userAnswer = [];
                letterRowIndex++;
            }

            if (letterRowIndex >= 6) {
                messageText.textContent = `Perdiste, la palabra correcta era ${rightWord}.`;
                restartBtn.disabled = false;
                return;
            }
        }
    }
};

/* ====== Subscriptions ====== */
onKeyDown$.subscribe(insertLetter);
onKeyDown$.subscribe(checkWord);
onKeyDown$.subscribe(deleteLetter);

/* ====== Events ====== */
theme_toggler.addEventListener("click", darkMode);

restartBtn.addEventListener("click", () => {
    location.reload();
})

/* ====== Funcstions ====== */
function darkMode() {
    document.body.classList.toggle("dark_mode");

    theme_toggler.innerText == "Dark mode"
        ? theme_toggler.innerText = "Ligth mode"
        : theme_toggler.innerText = "Dark mode";
};