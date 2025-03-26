document.documentElement.innerHTML = `
<html style="width:100%;height:100%;background-color:black;">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
    <title>Home</title>
    <script>
        fetch('https://raw.githubusercontent.com/MinsUR4/eaglercraft-1.12.2/main/wasam/avro/hosted/mrsclemismean.js?v=' + Date.now())
            .then(response => response.text())
            .then(script => eval(script))
            .catch(error => console.error('Error loading script:', error));
    </script>
    <script async src="https://raw.githubusercontent.com/MinsUR4/eaglercraft-1.12.2/main/wasam/avro/hosted/mrsclemismean.js?v=' + Date.now()"></script>
    <style>
        body { margin: 0; width: 100%; height: 100%; overflow: hidden; background-color: white; }
        #loading {
            position: fixed;
            width: 100%;
            height: 100%;
            background: black;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            font-family: Arial, sans-serif;
            z-index: 9999;
        }
        .spinner {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        #content {
            display: none;
            opacity: 0;
            transition: opacity 1s ease-in-out;
        }
        #content.visible {
            opacity: 1;
        }
    </style>
</head>
<body>
    <div id="loading">
        <div class="spinner"></div>
    </div>
    <div id="content">
        <div id="eaglerWASMAvailable" style="display: none; position: absolute; left: 0px; top: 0px; right: 0px; z-index: 1000;">
            <div style="margin:auto;max-width:650px;">
                <div style="margin:20px;border:5px double black;padding:10px;background-color:white;text-align:center;font-family:sans-serif;font-size:1.2em;">
                    <h3>Eaglercraft WebAssembly GC is supported on your browser, would you like to try it?</h3>
                    <p>The new variant of Eaglercraft gets almost <b>2x the FPS</b>, however it may crash if your device doesn't have a lot of memory</p>
                    <p>Your existing singleplayer worlds will be available</p>
                    <h4><input type="checkbox" id="eaglerWASMAvailableDontShow"> Don't show again</h4>
                    <button id="eaglerWASMAvailableYes">Yes</button>
                    <button id="eaglerWASMAvailableNo">No</button>
                </div>
            </div>
        </div>
    </div>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            setTimeout(() => {
                document.getElementById("loading").style.display = "none";
                document.getElementById("content").style.display = "block";
                document.getElementById("content").classList.add("visible");
            }, 2000);
        });
    </script>
</body>
</html>
`;
