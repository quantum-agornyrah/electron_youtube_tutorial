const { contextBridge, ipcRenderer } = require('electron');

// Create and expose a channel to the renderer process to execute the main process function to open a new window
contextBridge.exposeInMainWorld('electronAPI', {
    openErrorDialog: () => ipcRenderer.send('open-error-dialog'),
    errorDialogOpened: (callback) => ipcRenderer.on('error-dialog-opened', callback)
});