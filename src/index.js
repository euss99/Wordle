let style = {
    dark_mode: false,
}

let theme_toggler = document.querySelector('#theme_toggler');

theme_toggler.addEventListener("click", function(){ 
    document.body.classList.toggle("dark_mode");

    if (theme_toggler.innerText == "Dark mode") {
        theme_toggler.innerText = "Ligth mode";
    } else {
        theme_toggler.innerText = "Dark mode";
    }
});