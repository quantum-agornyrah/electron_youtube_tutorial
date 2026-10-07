

// Get the button element from the HTML document and add an event listener to it
const errorEventButton = document.getElementById('errorButton');

errorEventButton.addEventListener('click', () => {
    // Create a channel to send a message to the main process to open an error dialog
    window.electronAPI.openErrorDialog();

    // Create a channel to receive a message from the main process that the error dialog has been opened
    window.electronAPI.errorDialogOpened((event, message) => {
        console.log(message);
    });
})
