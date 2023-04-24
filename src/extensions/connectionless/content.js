function setResponse(response) {
    document.dispatchEvent(new CustomEvent('ClientExtensionResponse_ConnectionLess', { bubbles: true, detail: JSON.stringify(response) }));
}

let element = document.getElementById('ClientExtensionVersion_ConnectionLess');
if (element) {
    element.value = chrome.runtime.getManifest().version;

    document.addEventListener('ClientExtensionRequest_ConnectionLess', (e) => {
        try {
            let request = JSON.parse(e.detail);
            chrome.runtime.sendMessage(request, (response) => {
                if (response) {
                    setResponse(response);
                } else {
                    setResponse(chrome.runtime.lastError);
                }
            });
        } catch (error) {
            setResponse(error);
        }
    }, false);
}
