// Test the main process of the Electron application
console.log("main process working");

const { app, BrowserWindow, Menu, shell } = require("electron");

// Function to create an app window
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.loadFile("index.html");
}

// Trigger the 'ready' event when the app is ready to create custom menus. 
// This is the main entry point for the application.
app.on("ready", () => {
  // Populate the application menu with a simple template
  const template = [
    {
      label: "Demo",
      submenu: [
        {
          label: "MenuItem1",

          // Add a click event to the menu item
          click: () => {
            console.log("MenuItem1 clicked");
          },
        },
        { label: "MenuItem2" },
        { type: "separator" },
        { label: "MenuItem3" },
      ],
    },
    {
      label: "Default",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { type: "separator" },
        { role: "quit" },
      ],
    },
    {
      label: "Help",

      // Add a click event that opens an external URL
      click: async () => {
        await shell.openExternal("https://electronjs.org");
      },
    },
  ];

  // Build the menu using the custom template and set it as the application menu
  const menuTemplate = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menuTemplate);
});

// Execute the createWindow function when the app is ready
app.whenReady().then(createWindow);

// Trigger when window is closed for all platforms except macOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Trigger a new window when the app is accessed from the dock on macOS
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
