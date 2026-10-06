// Test the main process of the Electron application
console.log('main process working');

const { app, BrowserWindow } = require('electron');

// Function to create an app window
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });

    // Open DevTools for debugging
    mainWindow.webContents.openDevTools();

    mainWindow.loadFile('index.html');
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
