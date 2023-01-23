/* ====== Imports ====== */
import { fromEvent } from "rxjs";

/* ====== Variables ====== */
let letterIndex = 0;
let letterRowIndex = 0;
const theme_toggler = document.querySelector('#theme_toggler');
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

            letterIndex++;
        } 
    }
};

const deleteLetter = {
    next: (event) => {
        const pressedKey = event.key.toUpperCase();

        if (pressedKey === "BACKSPACE") {
            let letterBox = Array.from(letterRows)[letterRowIndex].children[letterIndex];
            letterBox.textContent = "";
            letterBox.classList.remove("filled-letter");
            letterIndex--;
        }
    }
}

/* ====== Subscriptions ====== */
onKeyDown$.subscribe(insertLetter);
onKeyDown$.subscribe(deleteLetter);

/* ====== Events ====== */
theme_toggler.addEventListener("click", darkMode);

/* ====== Funcstions ====== */
function darkMode() {
    document.body.classList.toggle("dark_mode");

    theme_toggler.innerText == "Dark mode"
        ? theme_toggler.innerText = "Ligth mode"
        : theme_toggler.innerText = "Dark mode";
}