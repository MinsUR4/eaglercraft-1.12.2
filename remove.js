function removeGameElements() {
    const elements = document.querySelectorAll('body *');
    
    elements.forEach(element => {
        if (element.textContent.toLowerCase().includes('game')) {
            element.remove();
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    removeGameElements();

    const observer = new MutationObserver(() => {
        removeGameElements();
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
