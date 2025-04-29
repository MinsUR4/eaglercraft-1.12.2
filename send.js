<html>
<head></head>
<body>

<script>
// Set the whole page to just a button
document.documentElement.innerHTML = `
    <button id="loadButton" style="font-size:24px; margin:50px;">Click to Load</button>
`;

document.getElementById('loadButton').addEventListener('click', function() {
    document.documentElement.innerHTML = `
        <h1 style="text-align:center; margin-top:50px;">Content Loaded!</h1>
        <p style="text-align:center;">This appeared after you clicked the button.</p>
    `;
});
</script>

</body>
</html>
