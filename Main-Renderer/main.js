// Test the main process of the Electron application
console.log('main process working');

const { app, BrowserWindow, ipcMain } = require('electron');
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

    // Open DevTools for debugging
    mainWindow.webContents.openDevTools();

    mainWindow.loadFile('index.html');
}

// Listen for the 'open-new-window' event from the renderer process
ipcMain.on('open-new-window', () => {
    const newMainWindow = new BrowserWindow({
        width: 400,
        height: 300,
    });

    // Open DevTools for debugging
    newMainWindow.webContents.openDevTools();

    newMainWindow.loadFile('newWindow.html');
})

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
