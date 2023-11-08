
var iconClose = document.querySelector("#close");
var iconHome = document.querySelector("#home");
var iconSource = document.querySelector("#source");
var theme = document.querySelector("#theme");
var customCSS = document.querySelector("#customCSSContainer");
var color = document.querySelector("#color");

// Verify if exists localstorage and show them //
browser.storage.local.get("settings").then(result => {
    if (result.settings) {
        theme.value= result.settings.theme;
        customCSS.value=result.settings.customCSS;
        color.value= result.settings.color;
    }}).catch(error => {
    console.error('Error local storage:', error);
  });
////

// Listener for the buttons and load in storage the Settings //
iconClose.addEventListener("click", function () {
    browser.runtime.sendMessage({ action: "toggleUpdate" });
});

iconHome.addEventListener("click", function () {
    let settings={
        theme: theme.value,
        customCSS: customCSS.value,
        color : color.value
    }
    browser.storage.local.set({settings});
    browser.runtime.sendMessage({ action: "openHome" });
});

////


