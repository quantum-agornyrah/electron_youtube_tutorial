// Test the main process of the Electron application
console.log("main process working");

const { app, BrowserWindow, Menu, MenuItem } = require("electron");

// Function to create an app window
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.loadFile("index.html");

  // Initialize Context Menu
  const contextMenu = new Menu();

  // Add a context menu item with a click event
  contextMenu.append(
    new MenuItem({
      label: "ContextMenuItem1",
      click: () => {
        console.log("Context Menu Item 1 clicked");
      },
    }),
  );

  // Add a context menu item with a role
  contextMenu.append(
    new MenuItem({
      role: "selectall",
      click: () => {
        console.log("Context Menu Item 1 clicked");
      },
    }),
  );

  // Trigger the context menu to popup on the BrowserWindow when right-clicking in the window
  mainWindow.webContents.on("context-menu", (e, params) => {
    contextMenu.popup(mainWindow, params.x, params.y);
  });
}

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
