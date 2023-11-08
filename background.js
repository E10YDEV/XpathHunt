
// Basic system to handle and allow comunication between Content.JS and other Scripts (like menu.JS)
function tabsRequest(message, sender) {
  browser.tabs.sendMessage(sender.tab.id, { action: message.action, requestValue: message.requestValue });
}

browser.runtime.onMessage.addListener(tabsRequest);
//
// Listener to show or hide the interface (Fired when a browser action icon is clicked)
browser.action.onClicked.addListener(function (tab) {
  browser.tabs.sendMessage(tab.id, { action: "toggleUpdate" });
});
///

    