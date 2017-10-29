chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {

        if (request.greeting == "hello") {
            chrome.tabs.getSelected(null, function (tab) {
                chrome.pageAction.show(tab.id);

                sendResponse({ farewell: "goodbye" + tab.id });
            });

        }

        else
            sendResponse({}); // snub them.
    });