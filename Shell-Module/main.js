// Test the main process of the Electron application
console.log('main process working');

const { app, BrowserWindow, ipcMain, shell } = require('electron');

// Function to create an app window
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: `${__dirname}/preload.js`
        }
    });

    mainWindow.loadFile('index.html');
}

// Execute sjhell module functions when the corresponding events are triggered from the renderer process
ipcMain.on('open-folder-location', async() => {
    // Access the shell module to open a folder using the folder path
    shell.showItemInFolder('/home/eagornyrah/Desktop/WORK DIRECTORY/TRACKS.txt');
})

ipcMain.on('edit-file', async() => {
    // Access the shell module to open a file using the file path
    shell.openPath('/home/eagornyrah/Desktop/WORK DIRECTORY/TRACKS.txt');
})

ipcMain.on('open-external-link', async() => {
    // Access the shell module to open an external URL in the default browser
    shell.openExternal('https://www.electronjs.org');
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
