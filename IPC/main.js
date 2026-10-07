// Test the main process of the Electron application
console.log('main process working');

const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

// Function to create an app window
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');
}

// Receive the message from the renderer process to open an error dialog
ipcMain.on('open-error-dialog', (event) => {
    // Open an error dialog with a title and message
    dialog.showErrorBox('Error Dialog', 'An error has occurred!');

    // Open a new channel to communicate back to the sender process that the error dialog has been opened
    event.sender.send('error-dialog-opened', 'Error dialog has been opened');
});

// Execute the createWindow function when the app is ready
app.whenReady().then(createWindow);

// Trigger when window is closed for all platforms except macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Trigger a new window when the app is accessed from the dock on macOS
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
