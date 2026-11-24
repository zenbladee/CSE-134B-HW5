//Dark Theme

const toggle = document.querySelector("#theme-toggle"); //toggle button
const root = document.documentElement; //root ele where light and dark mode are

//applies the themes to a page and changes the button
//CSS reads the root and swaps it
function applyTheme(theme) {
    root.dataset.theme = theme; //set the theme
    //changes the button text based on theme, if dark button = light mode, if light button = dark mode
    toggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
}

//gets the saved theme from the local storage
function getTheme(){
    try {
        return localStorage.getItem("theme");
    } catch (error) {
        return null;
    }
}

//saves the theme to other pages that have JS
function saveTheme(theme) {
    try {
        localStorage.setItem("theme", theme);
    } catch (error) {
        console.warn("The theme preference was not saved.");
    }
}

//when the page loads the theme will be applied, if dark theme, dark will be used, if light light will be used
applyTheme(getTheme() === "dark" ? "dark" : "light");

//java is working so button should work and be shown
toggle.hidden = false; //unhide the button

//when the button is clicked then the theme should switch and be saved
toggle.addEventListener("click", function () {
    const newTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
    saveTheme(newTheme);
});