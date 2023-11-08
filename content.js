
// Create a Iframe for Visual Interface // 
var iframe = document.createElement("iframe");
document.body.style.marginTop = "150px";
iframe.src = browser.runtime.getURL("interface/menu/menu.html");
iframe.id = "xpathHuntIframe"
document.body.appendChild(iframe);
////

// Create a Style element for CustomCSS // 
var customCSS = document.createElement("style");
customCSS.classList.add("xpathHuntCustomCSS");
document.body.appendChild(customCSS);
////

// Functions for load and assing the preferences of the user //
function colorChanger(color) {
    let r = document.querySelector(':root');
    r.style.setProperty('--highlightColor', color);
}
function styleCustomCSS(storageCustomCSS) {
    let stringCSS = ".customXPathHunt{"+ storageCustomCSS + "}"
    customCSS.innerHTML= stringCSS
}
////

// Triggered onload extension or when storage is changed //
function handleSettings(){
    browser.storage.local.get("settings").then(result => {
        if (result.settings) {
            colorChanger(result.settings.color)
            styleCustomCSS(result.settings.customCSS)
        } 
      }).catch(error => {
        console.error('Error in storage', error);
      });
}
////

var nodos = []; // Variable for load and unload the highlight class from the Xpath Results

// System to find the Xpath expression and assing (or remove) the custom class // 
function xpathFinder(xpath) {
    try {
        for (var i = 0; i < nodos.length; i++) {
            nodos[i] && nodos[i].classList.toggle("customXPathHunt", false); // Clean all "customXPathHunt" from nodos

        }
    } catch (error) {
        console.error("Error expression XPath:", error);
    }
    nodos = [];
    let expresionXPath = xpath;
    let resultadoXPath = document.evaluate(expresionXPath, document, null, XPathResult.ANY_TYPE, null);

    let nodo = resultadoXPath.iterateNext();
    while (nodo) {
        nodos.push(nodo);
        nodo = resultadoXPath.iterateNext();
    }
    console.log(nodos)
    let stringOutput = "";
    nodos.forEach(function (nodo) {
        stringOutput = stringOutput + nodo.innerText + "\n";
        nodo.classList.add("customXPathHunt");
        console.log(nodo.innerText)
    });
    browser.runtime.sendMessage({ action: "updateOutput", requestValue: stringOutput }) // Send to interface (menu.js) the results of the xpath expression

}
////

// Hidde and show the interface
function toggleUpdate(){
    let state = getComputedStyle(iframe).display
    if(state==="none"){
        document.body.style.marginTop = "150px";
        iframe.style.display="block"
    }
    else{
        document.body.style.marginTop = "0px";
        iframe.style.display="none"
        xpathFinder("//");
    }
}
///

// Triggered onMessage to Handle diferent Actions
function handleActions(message) {
    switch (message.action) {
        case "xpathUpdate":
            xpathFinder(message.requestValue);
            break;
        case "toggleUpdate":
            toggleUpdate();
            break;
        case "openSettings":
            iframe.src = browser.runtime.getURL("interface/settings/menu2.html");
            break;
        case "openHome":
            iframe.src = browser.runtime.getURL("interface/menu/menu.html");
            break;
        default:
            break;
    }
}
////
handleSettings() // Load all setting (if exists)
browser.runtime.onMessage.addListener(handleActions); // Listen message from BackgroundScripts 
browser.storage.onChanged.addListener(handleSettings); // Listen any change from the browser storage



