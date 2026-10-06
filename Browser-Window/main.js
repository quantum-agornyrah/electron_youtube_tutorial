// Test the main process of the Electron application
console.log('main process working');

const { app, BrowserWindow } = require('electron');

// let mainWindow, defaultWindow, backgroundColorWindow, framelessWindow, transparentWindow;
let parentWindow, childWindow;

// Function to create an app window
function createWindow() {
    parentWindow = new BrowserWindow({
        title: 'Parent Window',
        width: 1000,
        height: 900,
    })

    childWindow = new BrowserWindow({
        parent: parentWindow,
        // This makes the child window a modal which needs attention before the user can interact with the parent window
        modal: true,
        // This makes the child window hidden when it is created and will be shown when the user clicks on the button in the parent window
        show: false,
        title: 'Child Window',
        width: 800,
        height: 700,
    });

    childWindow.loadURL('http://172.18.200.207:8090/');

    // Trigger show to TRUE once the link is loaded properly on the child window
    childWindow.once('ready-to-show', () => {
        childWindow.show();
    })

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // defaultWindow = new BrowserWindow()

    // backgroundColorWindow = new BrowserWindow({
    //     width: 1000,
    //     height: 800,
    //     backgroundColor: '#2e2c29',
    // });

    // framelessWindow = new BrowserWindow({
    //     width: 600,
    //     height: 600,
    //     frame: false
    // });

    // transparentWindow = new BrowserWindow({
    //     width: 600,
    //     height: 600,
    //     transparent: true
    // });

    // mainWindow = new BrowserWindow({
    //     width: 400,
    //     height: 300,
    // });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
