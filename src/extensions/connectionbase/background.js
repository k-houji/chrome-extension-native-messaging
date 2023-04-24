chrome.runtime.onConnect.addListener((port) => {
    let portNative = chrome.runtime.connectNative('com.client.extension.sample.host');

    portNative.onMessage.addListener((response) => {
        port.postMessage(response);
    });

    portNative.onDisconnect.addListener(() => {
        portNative.lastError = chrome.runtime.lastError;
        port.postMessage(portNative.lastError);
    });

    port.onDisconnect.addListener(() => {
        portNative.disconnect();
    });
    
    port.onMessage.addListener((request) => {
        if (portNative.lastError === undefined) {
            try {
                portNative.postMessage(request);
            } catch (error) {
                portNative.lastError = error;
                port.postMessage(portNative.lastError);
            }
        } else {
            port.postMessage(portNative.lastError);
        }
    });
});
