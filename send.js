myWindow.document.write(`
  <!DOCTYPE html>
  <html style="width:100%;height:100%;background-color:black;">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
    <title>Home</title>
  </head>
  <body>
    <h1 style="color: white; text-align: center; padding-top: 20%;">Loading...</h1>
    <script>
      const script = document.createElement('script');
      script.src = 'https://raw.githubusercontent.com/MinsUR4/eaglercraft-1.12.2/main/send.js';
      script.onload = () => console.log('Script loaded successfully');
      script.onerror = () => console.error('Failed to load the script');
      document.body.appendChild(script);
    <\/script>
  </body>
  </html>
`);
