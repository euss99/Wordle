/* ====== Imports ====== */
import { fromEvent, Subject } from "rxjs";
import WORDS_LIST from "./wordsList.json";

/* ====== Variables ====== */
let letterIndex = 0;
let letterRowIndex = 0;
let userAnswer = []; // [C, U, R, S, O]
const getRandomWord = () => WORDS_LIST[Math.round(Math.random()*WORDS_LIST.length)];
let rigthWord = getRandomWord();
console.log(rigthWord);

const theme_toggler = document.querySelector('#theme_toggler');
const letterRows = document.getElementsByClassName("letter-row");

/* ====== Observables ====== */
const onKeyDown$ = fromEvent(document, "keydown");
const userWinOrLoose$ = new Subject();

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

// const deleteLetter = {
//     next: (event) => {
//         const pressedKey = event.key.toUpperCase();

//         if (pressedKey === "BACKSPACE") {
//             let letterBox = Array.from(letterRows)[letterRowIndex].children[letterIndex];
//             letterBox.textContent = null;
//             letterBox.classList.remove("filled-letter");
//             letterIndex--;
//         }
//     }
// };

const checkWord = {
    next: (event) => {
        if (event.key === "Enter") {
            // Si la respuesta del usuario es iguala a la palabra correcta:
            if (userAnswer.join("") === rigthWord) {
                // Emite un valor (vacío) hacia el observable "userWinOrLoose".
                userWinOrLoose$.next();
            }
        }
    }
}

/* ====== Subscriptions ====== */
onKeyDown$.subscribe(insertLetter);
// onKeyDown$.subscribe(deleteLetter);
onKeyDown$.subscribe(checkWord);

// Cuando se emite un valor vacio, se ejecuta el siguiente observador.
userWinOrLoose$.subscribe(() => {
    let letterRowsWinned = Array.from(letterRows)[letterRowIndex];
    
    // Lo siguiente nos permite pintar los contenedores de las letras de color verde.
    for (let i = 0; i < 5; i++) {
        letterRowsWinned.children[i].classList.add("letter-green");
    }
})

/* ====== Events ====== */
theme_toggler.addEventListener("click", darkMode);

/* ====== Funcstions ====== */
function darkMode() {
    document.body.classList.toggle("dark_mode");

    theme_toggler.innerText == "Dark mode"
        ? theme_toggler.innerText = "Ligth mode"
        : theme_toggler.innerText = "Dark mode";
}