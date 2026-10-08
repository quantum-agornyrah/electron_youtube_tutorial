// Test the main process of the Electron application
console.log("main process working");

const { app, BrowserWindow, Menu, shell, MenuItem, globalShortcut } = require("electron");

// Function to create an app window
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.loadFile("index.html");

  // Create a context menu for the BrowserWindow
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
      submenu: [
        {
          label: "About Electron",
          click: async () => {
            await shell.openExternal("https://electronjs.org");
          },

          // Add a keyboard shortcut (accelerator) to the menu item
          accelerator: "CmdOrCtrl + Shift +H",
        }
      ]
    },
  ];

  // Build the menu using the custom template and set it as the application menu
  const menuTemplate = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menuTemplate);

  // Create a context menu for the BrowserWindow
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

  // Register a global shortcut to act even when the app is not in focus
  globalShortcut.register("Alt + 7", () => {
    mainWindow.show();
  })

  globalShortcut.register("Alt + 8", () => {
    mainWindow.minimize();
  })
}

// Unregister all global shortcuts when the app is about to quit
app.on("will-quit", () => {
    globalShortcut.unregisterAll();
})

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
