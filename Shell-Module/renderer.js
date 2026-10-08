const openFolderButtonElement = document.getElementById('openFolderButton');
const editButtonElement = document.getElementById('editFileButton');
const openExternalLinkButtonElement = document.getElementById('openExternalLinkButton');

// Add event listeners to the buttons to trigger the corresponding functions in the main process
openFolderButtonElement.addEventListener('click', () => {
    window.electronAPI.openFolderLocation();
}); 

openExternalLinkButtonElement.addEventListener('click', () => {
    window.electronAPI.openExternalLink();
});

editButtonElement.addEventListener('click', () => {
    window.electronAPI.editFile();
}); 