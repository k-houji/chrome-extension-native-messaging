chrome.runtime.onMessage.addListener((request, sender, setResponse) => {
    try {
        chrome.runtime.sendNativeMessage('com.client.extension.sample.host', request, (response) => {
            if (response) {
                setResponse(response);
            } else {
                setResponse(chrome.runtime.lastError);
            }
        });
        return true;
    } catch (error) {
        setResponse(error);
        return false;
    }
});
