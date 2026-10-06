// Test the main process of the Electron application
console.log('main process working');

const { app, BrowserWindow } = require('electron');

// Function to create an app window
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 500,
        height: 250,

        // Remove the window frame for a frameless design
        frame: false,

        // Initially hide the window until it's ready to be shown
        show: false,
    });

    mainWindow.loadFile('index.html');

    // Show the window only when it's ready to avoid visual glitches
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
}

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
