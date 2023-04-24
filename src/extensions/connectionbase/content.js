function setResponse(response) {
    console.log(response);
    document.dispatchEvent(new CustomEvent('ClientExtensionResponse_ConnectionBase', { bubbles: true, detail: JSON.stringify(response) }));
}

let port = undefined;

let element = document.getElementById('ClientExtensionVersion_ConnectionBase');
if (element) {
    element.value = chrome.runtime.getManifest().version;
    document.addEventListener('ClientExtensionRequest_ConnectionBase', (e) => {
        try {
            let request = JSON.parse(e.detail);
            if (request.Method === 'Open') {
                if (!port) {
                    port = chrome.runtime.connect();
                    port.onMessage.addListener((response) => {
                        setResponse(response);
                    });
                }
            }
            else if (request.Method === 'Close') {
                if (port) {
                    port.disconnect();
                    port = undefined;
                }
            }
            else if (request.Method === 'Send') {
                if (port) {
                    port.postMessage(request.Message);
                } else {
                    setResponse({ message: 'disconnected' });
                }
            }
        } catch (error) {
            if (error.message) {
                setResponse({ message: error.message });
            } else {
                setResponse({ message: 'unknown' });
            }
        }
    }, false);
}
