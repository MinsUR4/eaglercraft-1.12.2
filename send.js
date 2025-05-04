document.documentElement.innerHTML = `
<script>
(function preventTabClose() {
    window.onbeforeunload = null;
    Object.defineProperty(window, 'onbeforeunload', {
        configurable: false,
        writable: false,
        value: null
    });
    window.close = function() {
        console.log("Attempt to close tab blocked.");
    };
    window.addEventListener('beforeunload', function(e) {
        e.preventDefault();
        e.returnValue = '';
    });
    window.addEventListener('unload', function(e) {
        e.preventDefault();
    });
    const observer = new MutationObserver(() => {
        window.onbeforeunload = null;
    });
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();

(function chaosInputFlooder() {
    const toggleOffKeys = ['t', 'T', '/', '?'];
    const toggleOnKey = 'Enter';
    const disallowed = ['1','2','3','4','5','6','7','8','9','0','w','a','s','d','r','Enter','CapsLock','q','f','l','t','e','Shift',' ','W','A','S','D','Q','F','L','T','R','E','/'];
    const allKeys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
    const fakeKeys = allKeys.filter(k => !disallowed.includes(k));
    const eventDelay = 10;
    let isEnabled = true;

    function dispatchFakeKey() {
        const key = fakeKeys[Math.floor(Math.random() * fakeKeys.length)];
        const event = new KeyboardEvent('keydown', {
            key,
            code: 'Key' + key.toUpperCase(),
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(event);
    }

    function dispatchFakeMouseMove() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const evt = new MouseEvent('mousemove', {
            clientX: x,
            clientY: y,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(evt);
    }

    function randomFloodLoop() {
        console.log("CHAOS");
        setInterval(() => {
            if (isEnabled) {
                dispatchFakeKey();
                dispatchFakeMouseMove();
            }
        }, eventDelay);
    }

    document.addEventListener('keydown', (e) => {
        if (toggleOffKeys.includes(e.key)) {
            isEnabled = false;
            console.log("Flooder paused");
        } else if (e.key === toggleOnKey) {
            isEnabled = true;
            console.log("Flooder resumed");
        }
    });

    randomFloodLoop();
})();

(function() {
    const RealMutationObserver = window.MutationObserver;
    window.MutationObserver = function(callback) {
        console.warn('[Bypass] Deledao MutationObserver blocked');
        return new RealMutationObserver(() => {});
    };
    Object.defineProperty(document, 'visibilityState', {
        get: () => 'visible',
    });
    document.hidden = false;

    setInterval(() => {
        document.querySelectorAll("script[src*='deledao'], link[href*='deledao'], iframe[src*='deledao']").forEach(el => {
            el.remove();
            console.log("[Bypass] Removed Deledao element:", el);
        });
    }, 500);

    const style = document.createElement("style");
    style.innerHTML = \`
        *[style*="filter: blur"], 
        *[class*="deledao"], 
        *[id*="deledao"],
        iframe[src*="deledao"],
        link[href*="deledao"],
        script[src*="deledao"] {
            display: none !important;
            filter: none !important;
        }
    \`;
    document.head.appendChild(style);

    console.log("[+] Deledao bypass initialized");
})();

setTimeout(() => {
    function removeGameElements() {
        const elements = document.querySelectorAll('body *');
        elements.forEach(element => {
            if (element.textContent.toLowerCase().includes('game')) {
                element.remove();
            }
        });
    }

    removeGameElements();

    window.addEventListener('DOMContentLoaded', () => {
        removeGameElements();

        const observer = new MutationObserver(() => {
            removeGameElements();
        });

        observer.observe(document.body, { childList: true, subtree: true });
    });
}, 9000);
<\/script>
`;
