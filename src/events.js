chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(null, (list) => {
        const readAfter = list.readAfter || [];
        chrome.storage.sync.set({
            "readAfter": readAfter
        });
        chrome.browserAction.setBadgeText({
            text: readAfter.length > 0 ? readAfter.length.toString() : ""
        });
        chrome.browserAction.setBadgeBackgroundColor({
            color: "red"
        });
    });
});
chrome.storage.onChanged.addListener(() => {
    chrome.storage.sync.get(null, (list) => {
        const readAfter = list.readAfter;
        chrome.browserAction.setBadgeText({
            text: readAfter.length > 0 ? readAfter.length.toString() : ""
        });
    });
});