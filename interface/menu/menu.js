import { themes } from "../../themes.js"; 
var xpathInput = document.querySelector("#inputXpathHunt");
var resultsOutput = document.querySelector("#resultsXpathHunt");
var iconClose = document.querySelector("#close");
var iconSettings = document.querySelector("#settings");
var iconSource = document.querySelector("#source");


// Listener for the buttons and Xpath expression //
xpathInput.addEventListener("input", function () {
    browser.runtime.sendMessage({ requestValue: xpathInput.value, action: "xpathUpdate" });
});

iconClose.addEventListener("click", function () {
    browser.runtime.sendMessage({ action: "toggleUpdate" });
});
iconSettings.addEventListener("click", function () {
    browser.runtime.sendMessage({ action: "openSettings" });
});

browser.runtime.onMessage.addListener(function (message) {
    if (message.action === "updateOutput")
        resultsOutput.value = message.requestValue
});
//// 

function setTheme(settings) {
    let theme = settings.theme;
    let r = document.querySelector(':root');
    r.style.setProperty('--color1', themes[theme]["color1"]);
    r.style.setProperty('--color2', themes[theme]["color2"]);
    r.style.setProperty('--color3', themes[theme]["color3"]);
    r.style.setProperty('--textColor', themes[theme]["textColor"])
}

// Verify if exists theme in localstorage and apply the theme //
browser.storage.local.get("settings").then(result => {
    if (result.settings) {
        setTheme(result.settings)
    }}).catch(error => {
    console.error('Error local storage:', error);
  });
////



