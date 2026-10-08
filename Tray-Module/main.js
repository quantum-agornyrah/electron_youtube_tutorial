// Test the main process of the Electron application
console.log('main process working');

const path = require('path')
const { app, BrowserWindow, Tray, Menu } = require('electron');
const iconSelected = path.join(__dirname, 'tutorial-tray-icon.png')

// Declare tray as global variable first so that it doesnt get deleted from memory after the ready event finishes executing
let newTray = null

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

// Execute the tray icon on the tray once code runs or lanches
app.on('ready', () => {
    // Initialze the tray
    newTray = new Tray(iconSelected)

    // Implement a menu template for the tray
    const trayMenuTemplate = [
        {
            label: 'Audio',
            submenu: [
                { 
                    label: 'Low',
                    type: 'radio',
                    checked: true,
                },
                { 
                    label: 'High',
                    type: 'radio',
                }
            ]
        },
        {
            label: 'Video',
            submenu: [
                { 
                    label: '1080px',
                    type: 'radio',
                    checked: true,
                },
                { 
                    label: '720px',
                    type: 'radio',
                    checked: false,
                },
                { 
                    label: '480px',
                    type: 'radio',
                    checked: false,
                }
            ]
        },
    ];

    // Set the menu template and assign the menu to the initialized tray
    const trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
    newTray.setContextMenu(trayMenu);

    // Ignored in LINUX systems
    newTray.setToolTip('Electron Tutorial Tray Icon')
    
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
