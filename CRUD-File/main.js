// Test the main process of the Electron application
console.log('main process working');

const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs')
const path = require('path')

// Function to create an app window
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // Open DevTools for debugging
    mainWindow.webContents.openDevTools();

    mainWindow.loadFile('index.html');
}

// Perform channel operation for FILE CREATE
ipcMain.handle('create-file', (event, fileName, fileContents) => {
    // Create a files directory to assign all files
    const fileDirectoryName = path.join(__dirname, 'Files')
    const filePathName = path.join(fileDirectoryName, fileName)

    // Implement a write operation of both arguments with a success alert
    try {
        fs.writeFileSync(filePathName, fileContents);  
        return { success : true }
    } catch (error) {
        return { 
            success: false, 
            error: error.message
        }
    }
})

// Perform channel operation for FILE READ
ipcMain.handle('read-file', (event, fileName) => {
    // Initialize a file directory to assign all files
    const fileDirectoryName = path.join(__dirname, 'Files')
    const filePathName = path.join(fileDirectoryName, fileName)

    // Implement a read operation of both arguments with a success alert
    try {
        const outputData = fs.readFileSync(filePathName, 'utf-8');  
        return { 
            success: true,
            data: outputData
        }
    } catch (error) {
        return { 
            success: false, 
            error: error.message
        }
    }
})

// Perform channel operation for FILE DELETE
ipcMain.handle('delete-file', (event, fileName) => {
    // Initialize a file directory to assign all files
    const fileDirectoryName = path.join(__dirname, 'Files')
    const filePathName = path.join(fileDirectoryName, fileName)

    // Implement a delete operation of both arguments with a success alert
    try {
        fs.unlinkSync(filePathName);  
        return { 
            success: true,
        }
    } catch (error) {
        return { 
            success: false, 
            error: error.message
        }
    }
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
